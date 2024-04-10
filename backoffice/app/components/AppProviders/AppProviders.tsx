import { MantineProvider } from '@mantine/core';
import type { FC, PropsWithChildren } from 'react';

import { RouterTransition } from '@/components/layout';
import { ReduxProvider } from '@/context/Redux';

const AppProviders: FC<PropsWithChildren> = ({ children }) => (
  <ReduxProvider>
    <MantineProvider>
      <RouterTransition />
      {children}
    </MantineProvider>
  </ReduxProvider>
);

export default AppProviders;
