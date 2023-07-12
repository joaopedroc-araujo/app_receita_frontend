import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Footer from '../components/Footer';

describe('<Footer />', () => {
  test('Testa se o componente Footer é renderizado na tela', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>,
    );
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  test('Testa se o ícone de bebidas é renderizado na tela', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>,
    );
    expect(screen.getByTestId('drinks-bottom-btn')).toBeInTheDocument();
  });

  test('Testa se o ícone de comidas é renderizado na tela', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>,
    );
    expect(screen.getByTestId('meals-bottom-btn')).toBeInTheDocument();
  });

  test('Testa se a página de bebidas é renderizada na tela ao clicar no ícone de bebidas', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Footer />
      </Router>,
    );
    userEvent.click(screen.getByTestId('drinks-bottom-btn'));
    expect(history.location.pathname).toBe('/drinks');
  });

  test('Testa se a página de comidas é renderizada na tela ao clicar no ícone de comidas', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Footer />
      </Router>,
    );
    userEvent.click(screen.getByTestId('meals-bottom-btn'));
    expect(history.location.pathname).toBe('/meals');
  });
});
