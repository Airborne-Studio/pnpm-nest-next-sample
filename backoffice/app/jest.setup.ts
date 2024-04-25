/* eslint-disable @typescript-eslint/no-explicit-any */
import 'jest-config-airborne/setup';

import _mockRouter from 'next-router-mock';

global.setImmediate =
  global.setImmediate ||
  ((fn: any, ...args: any[]) => global.setTimeout(fn, 0, ...args));

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

global.ResizeObserver = class ResizeObserver {
  constructor(callback) {
    this.callback = callback;
  }
  observe() {
    this.callback([{ contentRect: { width: 100, height: 100 } }]);
  }
  unobserve() {}
  disconnect() {}
};
