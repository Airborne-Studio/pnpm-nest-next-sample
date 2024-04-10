import { render } from 'testing';

import { Dashboard } from './Dashboard';

describe('Dashboard layout', () => {
  test('renders correctly', async () => {
    const childrenContent = 'Children content';

    const { container, getByText } = render(
      <Dashboard>
        <div>{childrenContent}</div>
      </Dashboard>
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
