import 'whatwg-fetch';
import '@testing-library/jest-dom';

import { MantineProvider } from '@mantine/core';
import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import ResizeObserverPolyfill from 'resize-observer-polyfill';

globalThis.ResizeObserver = ResizeObserverPolyfill;

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) =>
  render(ui, {
    wrapper: MantineProvider,
    ...options,
  });

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
export { customRender as render };
