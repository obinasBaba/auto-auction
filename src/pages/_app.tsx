import { AppProps } from 'next/app';
import '@global/index.scss';
import Layout from '@/component/common/Layout';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '@/theme';
import createEmotionCache from '@/createEmotoinCache';
import Head from 'next/head';
import { ManagedUIContext } from '@/context/ui/context';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { AppContext } from '@/context';
import NProgress from 'nprogress';
import '@/public/nprogress.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  session?: Session;
}

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp({
  Component,
  session,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: MyAppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleStart = (url: any) => {
      NProgress.start();
    };
    const handleStop = (url: any) => {
      NProgress.done();
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);

  return (
    <SessionProvider session={session} refetchInterval={0}>
      <AppContext>
        <CacheProvider value={emotionCache}>
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
            <title>This is a Layout</title>
          </Head>
          <ManagedUIContext>
            <ThemeProvider theme={theme}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <Layout pageProps={pageProps}>
                <Component {...pageProps} />
              </Layout>
            </ThemeProvider>
          </ManagedUIContext>
        </CacheProvider>
      </AppContext>
    </SessionProvider>
  );
}
