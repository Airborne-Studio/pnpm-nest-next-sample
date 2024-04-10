import type { FC, PropsWithChildren } from 'react';
import { Provider } from 'react-redux';

import { store } from '@/redux/store';

export const ReduxProvider: FC<PropsWithChildren> = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);
