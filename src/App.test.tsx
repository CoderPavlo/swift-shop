import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import LoginPage from './general/authentication/LoginPage';

describe('LoginPage', () => {
  test('renders login page with title and link', () => {
    render(<LoginPage />);
    // Перевіряємо, чи відображається заголовок
    const titleElement = screen.getByText(/Login/i);
    expect(titleElement).toBeInTheDocument();

    // Перевіряємо, чи відображається посилання на реєстрацію
    const registerLinkElement = screen.getByRole('link', { name: /register/i });
    expect(registerLinkElement).toBeInTheDocument();
    expect(registerLinkElement).toHaveAttribute('href', '/register');
  });
});