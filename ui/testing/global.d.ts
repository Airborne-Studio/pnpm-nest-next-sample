/* eslint-disable no-var */
import type { ResizeObserverPolyfill } from 'resize-observer-polyfill';

declare global {
  namespace globalThis {
    var ResizeObserver: ResizeObserverPolyfill;
  }
}
