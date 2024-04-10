import {
  AppShell,
  AppShellFooter,
  AppShellHeader,
  AppShellMain,
  AppShellNavbar,
  LoadingOverlay,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useRouter } from 'next/router';
import type { FC, PropsWithChildren } from 'react';
import { Suspense } from 'react';

import classes from './Dashboard.module.css';
import { DashboardNavigation } from './DashboardNavigation';

export const Dashboard: FC<PropsWithChildren> = ({ children }) => {
  const { pathname } = useRouter();
  const [opened, { close }] = useDisclosure();

  return (
    <AppShell
      classNames={{
        root: classes.root,
        main: classes.main,
        header: classes.header,
        navbar: classes.navbar,
        footer: classes.footer,
      }}
      layout="alt"
      header={{ height: { base: 55, md: 44 } }}
      navbar={{
        width: 230,
        breakpoint: 'md',
        collapsed: { mobile: !opened, desktop: false },
      }}
    >
      <AppShellHeader>
        <div id="header">
          <div id="breadcrumbs" />
        </div>
      </AppShellHeader>

      <AppShellNavbar>
        <DashboardNavigation close={close} />
      </AppShellNavbar>

      <AppShellMain id="main" data-pathname={pathname}>
        <div className={classes.mainContained}>
          <Suspense fallback={<LoadingOverlay visible />}>{children}</Suspense>
        </div>
      </AppShellMain>

      <AppShellFooter>
        <div id="footer" />
      </AppShellFooter>
    </AppShell>
  );
};

export default Dashboard;
