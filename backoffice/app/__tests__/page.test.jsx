import { MantineProvider } from '@mantine/core';
import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';

import userReducer from '@/redux/table/tableSlice';

import Page from '../pages/index';

function renderWithProviders(ui, { reduxState } = {}) {
  const store = configureStore({
    reducer: { table: userReducer },
    preloadedState: reduxState,
  });

  return render(
    <Provider store={store}>
      <MantineProvider>{ui}</MantineProvider>
    </Provider>
  );
}

describe('DashboardHome', () => {
  const initialState = {
    table: {
      data: [
        {
          id: 1,
          name: 'John Doe',
          firstName: 'John',
          lastName: 'Doe',
          address: '1234 Road',
          phoneNumber: '1234567890',
          age: 30,
          description: 'A sample user',
        },
      ],
    },
  };

  test('renders with initial empty state and opens add new user modal', () => {
    renderWithProviders(<Page />, { reduxState: initialState });
    expect(screen.getByText('Home')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('addUser'));
    waitFor(() => {
      expect(screen.getByTestId('Name').value).toBe('');
    });
  });

  test('fills and submits new user form', async () => {
    renderWithProviders(<Page />, { reduxState: initialState });
    fireEvent.click(screen.getByTestId('addUser'));
    await waitFor(() => {
      fireEvent.change(screen.getByTestId('Name'), {
        target: { value: 'Jane Doe' },
      });
    });
    fireEvent.change(screen.getByTestId('First Name'), {
      target: { value: 'Jane' },
    });
    fireEvent.change(screen.getByTestId('Last Name'), {
      target: { value: 'Doe' },
    });
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(screen.queryByText('Jane Doe')).toBeInTheDocument();
    });
  });

  test('edits an existing user', async () => {
    renderWithProviders(<Page />, { reduxState: initialState });
    fireEvent.click(screen.getAllByText('Edit')[0]);

    await waitFor(() => {
      fireEvent.change(screen.getByTestId('Name'), {
        target: { value: 'Jane Doe' },
      });
    });

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(screen.queryByText('Jane Doe')).toBeInTheDocument();
    });
  });

  test('deletes a user after confirmation', async () => {
    renderWithProviders(<Page />, { reduxState: initialState });
    fireEvent.click(screen.getAllByText('Delete')[0]);
    await waitFor(() => {
      fireEvent.click(screen.getByTestId('delete'));
    });
    await waitFor(() => {
      expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    });
  });
});
