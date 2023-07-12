import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import Header from '../components/Header';

const idTestProfileIcon = 'profile-top-btn';
const idTestSearchIcon = 'search-top-btn';
const idTestPageTitle = 'page-title';

describe('Header', () => {
  test('renders profile icon and page title', () => {
    render(
      <MemoryRouter initialEntries={ ['/profile'] }>
        <Header />
      </MemoryRouter>,
    );

    const profileIcon = screen.getByTestId(idTestProfileIcon);
    const pageTitle = screen.getByTestId(idTestPageTitle);

    expect(profileIcon).toBeInTheDocument();
    expect(pageTitle).toHaveTextContent('Profile');
  });

  test('renders profile icon and page title', () => {
    render(
      <MemoryRouter initialEntries={ ['/drinks'] }>
        <Header />
      </MemoryRouter>,
    );

    const pageTitle = screen.getByTestId(idTestPageTitle);

    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle).toHaveTextContent('Drinks');
  });

  test('renders profile and search icons and page title', () => {
    render(
      <MemoryRouter initialEntries={ ['/meals'] }>
        <Header />
      </MemoryRouter>,
    );

    const profileIcon = screen.getByTestId(idTestProfileIcon);
    const searchIcon = screen.getByTestId(idTestSearchIcon);
    const pageTitle = screen.getByTestId(idTestPageTitle);

    expect(profileIcon).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
    expect(pageTitle).toHaveTextContent('Meals');
  });

  test('renders only profile icon and page title in "/done-recipes" route', () => {
    render(
      <MemoryRouter initialEntries={ ['/done-recipes'] }>
        <Header />
      </MemoryRouter>,
    );

    const profileIcon = screen.getByTestId(idTestProfileIcon);
    const searchIcon = screen.queryByTestId(idTestSearchIcon);
    const pageTitle = screen.getByTestId(idTestPageTitle);

    expect(profileIcon).toBeInTheDocument();
    expect(searchIcon).toBeNull();
    expect(pageTitle).toHaveTextContent('Done Recipes');
  });

  test('renders only profile icon and page title in "/favorite-recipes" route', () => {
    render(
      <MemoryRouter initialEntries={ ['/favorite-recipes'] }>
        <Header />
      </MemoryRouter>,
    );

    const profileIcon = screen.getByTestId(idTestProfileIcon);
    const searchIcon = screen.queryByTestId(idTestSearchIcon);
    const pageTitle = screen.getByTestId(idTestPageTitle);

    expect(profileIcon).toBeInTheDocument();
    expect(searchIcon).toBeNull();
    expect(pageTitle).toHaveTextContent('Favorite Recipes');
  });

  //   test('não renderiza ícones de perfil e pesquisa nas rotas de detalhes da receita', () => {
  //     render(
  //       <MemoryRouter initialEntries={ ['/meals/123', '/drinks/456', '/meals/123/in-progress', '/drinks/456/in-progress'] }>
  //         <Header />
  //       </MemoryRouter>,
  //     );

  //     const profileIcon = screen.queryByTestId('profile-top-btn');
  //     const searchIcon = screen.queryByTestId('search-top-btn');

  //     expect(profileIcon).toBeNull();
  //     expect(searchIcon).toBeNull();
  //   });

  test('exibe o componente de busca ao clicar no botão', () => {
    render(
      <MemoryRouter initialEntries={ ['/meals'] }>
        <Header />
      </MemoryRouter>,
    );

    const searchButton = screen.queryByTestId(idTestSearchIcon);
    userEvent.click(searchButton);

    const searchBarComponent = screen.getByTestId('search-input');
    expect(searchBarComponent).toBeInTheDocument();
  });

  test('oculta o componente de busca ao clicar novamente no botão', () => {
    render(
      <MemoryRouter initialEntries={ ['/meals'] }>
        <Header />
      </MemoryRouter>,
    );

    const searchButton = screen.queryByTestId(idTestSearchIcon);
    userEvent.click(searchButton);

    const searchBarComponent = screen.getByTestId('search-input');
    expect(searchBarComponent).toBeInTheDocument();

    userEvent.click(searchButton);

    expect(searchBarComponent).not.toBeInTheDocument();
  });
});
