import { describe, expect, it } from '@jest/globals';
import { render, waitFor } from 'testing';

import AppProviders from '../components/AppProviders/AppProviders';
import Page from '../pages/index';

describe('Page', () => {
  it('renders', () => {
    const { getByLabelText } = render(
      <AppProviders>
        <Page />
      </AppProviders>
    );

    waitFor(
      () => {
        const el = getByLabelText(/password/i);
        expect(el).toBeInTheDocument();
      },
      { timeout: 10000 }
    );
  });
});
