import { MantineProvider } from '@mantine/core';
import { render } from 'testing';

import { Dashboard } from './Dashboard';

describe('Dashboard layout', () => {
  test('renders correctly', async () => {
    const childrenContent = 'Children content';

    const { container, getByText } = render(
      <MantineProvider>
        <Dashboard>
          <div>{childrenContent}</div>
        </Dashboard>
      </MantineProvider>
    );

    const navbar = container.querySelector('nav');
    const header = container.querySelector('header');
    const homeMenu = container.querySelector('a[href="/"]');
    const children = getByText(childrenContent);

    expect(navbar).toBeInTheDocument();
    expect(header).toBeInTheDocument();
    expect(homeMenu).toBeInTheDocument();
    expect(children).toBeInTheDocument();
  });
});
