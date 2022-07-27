import { AppProps } from 'next/app';
import '@global/index.scss';
import Layout from '@/components/common/Layout';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '@/theme';
import createEmotionCache from '@/createEmotoinCache';
import Head from 'next/head';
import { ManagedUIContext } from '@/context/ui/context';
import { Session } from 'next-auth';
import { AppContext, useAppContext } from '@/context';
import NProgress from 'nprogress';
import '@/public/nprogress.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getUserToken } from '@/helpers/tokens';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { SnackbarProvider } from 'notistack';

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  session?: Session;
}

const wsLink =
  typeof window !== 'undefined'
    ? new GraphQLWsLink(
        createClient({
          url: 'ws://localhost:4000/graphql',
          connectionParams: {
            authToken: getUserToken(),
          },
        }),
      )
    : null;

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = getUserToken();

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const splitLink =
  typeof window !== 'undefined' && wsLink != null
    ? split(
        ({ query }) => {
          const dif = getMainDefinition(query);
          return (
            dif.kind === 'OperationDefinition' &&
            dif.operation === 'subscription'
          );
        },
        wsLink,
        authLink.concat(httpLink),
      )
    : authLink.concat(httpLink);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp({
  Component,
  session,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: MyAppProps) {
  const router = useRouter();
  const { currentUser } = useAppContext();

  useEffect(() => {
    const handleStart = (url: any) => {
      NProgress.start();
      if (router.pathname.startsWith('/dashboard') && !currentUser?.id) {
        // router.push('/');
      }
    };
    const handleStop = (url: any) => {
      NProgress.done();
    };

    const routeChanged = () => {
      handleStop(null);
      console.log('router: ', router.pathname, currentUser);
      if (router.pathname.startsWith('/dashboard') && !currentUser?.id) {
        // router.push('/');
      }
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', routeChanged);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', routeChanged);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);

  return (
    <ApolloProvider client={client}>
      <SnackbarProvider
        maxSnack={3}
        style={{
          fontFamily: 'Sofia-Soft',
        }}
      >
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
      </SnackbarProvider>
    </ApolloProvider>
  );
}
