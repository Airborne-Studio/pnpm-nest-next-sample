import '@mantine/core/styles.css';
import '@mantine/nprogress/styles.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { type FC } from 'react';

import AppProviders from '@/components/AppProviders/AppProviders';
import Dashboard from '@/components/Dashboard/Dashboard';

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
      />
    </Head>
    <AppProviders>
      <Dashboard>
        <Component {...pageProps} />
      </Dashboard>
    </AppProviders>
  </>
);

export default App;
