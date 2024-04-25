import { MantineProvider } from '@mantine/core';
import { render } from 'testing';

import { Breadcrumbs } from './Breadcrumbs';

describe('Breadcrumbs component', () => {
  test(`renders correctly`, async () => {
    const { getByText } = render(
      <>
        <MantineProvider>
          <div id="breadcrumbs" />
          <Breadcrumbs
            items={[{ label: 'Home', href: '/home' }, { label: 'Create' }]}
          />
        </MantineProvider>
      </>
    );

    const homeLink = getByText('Home').closest('a');
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/home');

    const createItem = getByText('Create');
    expect(createItem).toBeInTheDocument();
  });
});
