import Head from 'next/head';
import type { FC } from 'react';

import { DashboardHome } from '@/components/DashboardHome/DashboardHome';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs/Breadcrumbs';

const DashboardPage: FC = () => (
  <>
    <Head>
      <title>Dashboard</title>
    </Head>

    <Breadcrumbs
      items={[
        {
          label: 'Home',
          inactiveItem: true,
        },
      ]}
    />

    <DashboardHome />
  </>
);

export default DashboardPage;
