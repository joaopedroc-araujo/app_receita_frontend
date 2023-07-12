import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';

describe('Componente Login', () => {
  test('renderiza o formulário de login corretamente', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );

    expect(screen.getByTestId('content-login')).toBeInTheDocument();
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('login-submit-btn')).toBeInTheDocument();
  });

  test('verifica o envio do formulário', () => {
    const mockPush = jest.fn();
    const mockSetItem = jest.spyOn(window.localStorage, 'setItem');
    jest.mock('react-router-dom', () => ({
      useHistory: () => ({
        navigate: mockPush,
      }),
    }));

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const submitButton = screen.getByTestId('login-submit-btn');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    expect(mockSetItem).toHaveBeenCalledWith('user', JSON.stringify({ email: 'test@example.com' }));
    expect(mockPush).toHaveBeenCalledWith('/meals');

    mockSetItem.mockRestore();
  });
});
