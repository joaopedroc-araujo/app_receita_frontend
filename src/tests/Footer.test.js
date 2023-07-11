import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
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

  test('Testa se o ícone de bebida é renderizado na tela', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>,
    );
    expect(screen.getByTestId('drinks-bottom-btn')).toBeInTheDocument();
  });

  test('Testa se o ícone de comida é renderizado na tela', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>,
    );
    expect(screen.getByTestId('meals-bottom-btn')).toBeInTheDocument();
  });
});
