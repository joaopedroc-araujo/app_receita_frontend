import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Profile from '../pages/Profile';

describe('<Profile />', () => {
  const history = createMemoryHistory();

  beforeEach(() => {
    window.localStorage.setItem('user', JSON.stringify('email@email.com'));
  });

  it('Testa se a página Profile renderiza todos os itens', async () => {
    render(
      <Router history={ history }>
        <Profile />
      </Router>,
    );
    expect(screen.getByTestId('profile-email')).toBeInTheDocument();
    expect(screen.getByTestId('profile-done-btn')).toBeInTheDocument();
    expect(screen.getByTestId('profile-favorite-btn')).toBeInTheDocument();
    expect(screen.getByTestId('profile-logout-btn')).toBeInTheDocument();
  });

  it('Testa se ao clicar em Done Recipes, o usuário é redirecionado para a devida página', async () => {
    render(
      <Router history={ history }>
        <Profile />
      </Router>,
    );

    act(() => {
      userEvent.click(screen.getByTestId('profile-done-btn'));
    });
    expect(history.location.pathname).toBe('/done-recipes');
  });

  it('Testa se ao clicar em Favorite Recipes, o usuário é redirecionado para a devida página', async () => {
    render(
      <Router history={ history }>
        <Profile />
      </Router>,
    );

    act(() => {
      userEvent.click(screen.getByTestId('profile-favorite-btn'));
    });
    expect(history.location.pathname).toBe('/favorite-recipes');
  });

  it('Testa se ao clicar em Logout, o usuário é redirecionado para a devida página', async () => {
    render(
      <Router history={ history }>
        <Profile />
      </Router>,
    );
    act(() => {
      userEvent.click(screen.getByTestId('profile-logout-btn'));
    });
    expect(history.location.pathname).toBe('/');
  });
});
