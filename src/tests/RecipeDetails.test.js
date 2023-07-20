import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import useRecomendFetch from '../hooks/useRecomendFetch';
import RecipeDetails from '../pages/RecipeDetails';
import { drinkMock } from './mock/drinkMock';
import { mealMock } from './mock/mealMock';

jest.mock('../hooks/useRecomendFetch');

describe('Página RecipeDetails', () => {
  test('testa se a página vai para meals quando uma comida é escolhida', async () => {
    const history = createMemoryHistory();

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mealMock[0]),
    }));

    await act(async () => {
      render(
        <Router history={ history }>
          <RecipeDetails isMeal />
        </Router>,
      );
    });
    history.push('/meals/52768');

    // useRecomendFetch.mockReturnValue(drinkMock[0]);

    expect(await screen.findByText('Apple Frangipan Tart')).toBeInTheDocument();
    expect(history.location.pathname).toBe('/meals/52768');
  });

  test('testa se a página vai para drinks quando uma bebida é escolhida', async () => {
    const history = createMemoryHistory();

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(drinkMock[0]),
    }));

    await act(async () => {
      render(
        <Router history={ history }>
          <RecipeDetails isMeal />
        </Router>,
      );
    });

    history.push('/drinks/17222');
    // useRecomendFetch.mockReturnValue(mealMock[0]);
    console.log(history.location.pathname);
    expect(await screen.findByText('A1')).toBeInTheDocument();
    expect(history.location.pathname).toBe('/drinks/17222');
  });
});
