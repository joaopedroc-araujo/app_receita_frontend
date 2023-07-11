import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import { Router } from 'react-router-dom/cjs/react-router-dom.min';
import App from '../App';
import Meals from '../components/Meals';
import Drinks from '../components/Drinks';
import Recipes from '../pages/Recipes';

describe('Testa a página de receitas', () => {
  test('testa o redirecionamento após o clique no login', () => {
    const history = createMemoryHistory();

    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginButton = screen.getByTestId('login-submit-btn');

    fireEvent.change(emailInput, {
      target: { value: 'test@example.com' },
    });

    fireEvent.change(passwordInput, {
      target: { value: 'password' },
    });

    fireEvent.click(loginButton);
    expect(history.location.pathname).toBe('/meals');
  });

  test('testa se as 12 primeiras receita de meal são renderizadas', async () => {
    const history = createMemoryHistory();

    render(
      <Router history={ history }>
        <Meals />
      </Router>,
    );

    const recipeCards = await screen.findAllByTestId(/-recipe-card/);
    const singleCard = await screen.findByTestId('0-recipe-card');

    expect(singleCard).toBeInTheDocument();
    expect(recipeCards.length).toBe(12);
  });

  test('testa se as 12 primeiras receitas de drink são renderizadas', async () => {
    const history = createMemoryHistory();

    render(
      <Router history={ history }>
        <Drinks />
      </Router>,
    );

    const singleCard = await screen.findByTestId('0-recipe-card');
    const drinkCards = await screen.findAllByTestId(/-recipe-card/);

    expect(singleCard).toBeInTheDocument();
    expect(drinkCards.length).toBe(12);
  });

  test('renderiza o componente Recipes', () => {
    const { getByText } = render(<Recipes />);

    expect(getByText(/recipes/i)).toBeInTheDocument();
  });
});
