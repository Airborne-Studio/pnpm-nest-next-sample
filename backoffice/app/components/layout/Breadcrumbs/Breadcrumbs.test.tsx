import { render } from 'testing';

import { Breadcrumbs } from './Breadcrumbs';

describe('Breadcrumbs component', () => {
  test(`renders correctly`, async () => {
    const { getByText } = render(
      <>
        <div id="breadcrumbs" />
        <Breadcrumbs
          items={[{ label: 'Home', href: '/home' }, { label: 'Create' }]}
        />
      </>
    );

    const homeLink = getByText('Home').closest('a');
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/home');

    const createItem = getByText('Create');
    expect(createItem).toBeInTheDocument();
  });
});
