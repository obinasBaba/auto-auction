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
