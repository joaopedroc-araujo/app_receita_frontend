import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
// import useRecomendFetch from '../hooks/useRecomendFetch';
import clipboardCopy from 'clipboard-copy';
import RecipeDetails from '../pages/RecipeDetails';
import { drinkMock } from './mock/drinkMock';
import { mealMock } from './mock/mealMock';
import { LocalStorageMock } from './mock/localStorageMock';
import { favoritRecipesMock } from './mock/favoriteRecipesMock';

jest.mock('../hooks/useRecomendFetch');
jest.mock('clipboard-copy', () => jest.fn());
const copiedMessage = 'Link copied!';
const mealurl = '/meals/52768';

describe('Página RecipeDetails', () => {
  beforeEach(() => {
    global.localStorage = new LocalStorageMock();
  });

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

    history.push(mealurl);

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
    // console.log(history.location.pathname);
    expect(await screen.findByText('A1')).toBeInTheDocument();
    expect(history.location.pathname).toBe('/drinks/17222');
  });

  //   test('testa se a função fetchRecipe faz um fetch para a API correta quando isMeal é true', async () => {
  //     const history = createMemoryHistory();
  //     const id = '52768';
  //     const isMeal = true;

  //     global.fetch = jest.fn(() => Promise.resolve({
  //       json: () => Promise.resolve(mealMock[0]),
  //     }));

  //     await act(async () => {
  //       render(
  //         <Router history={ history }>
  //           <RecipeDetails />
  //         </Router>,
  //       );
  //     });

  //     history.push(`/meals/${id}`);
  //     const match = useRouteMatch('/meals/:id');
  //     console.log(match);
  //     await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

  //     expect(global.fetch).toHaveBeenCalledWith(
  //       `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
  //     );
  //     expect(history.location.pathname).toBe(`/meals/${id}`);
  //   });

  //   test('testa se a função fetchRecipe faz um fetch para a API correta quando isMeal é false', async () => {
  //     const history = createMemoryHistory();
  //     const id = '17222';
  //     const isMeal = false;

  //     global.fetch = jest.fn(() => Promise.resolve({
  //       json: () => Promise.resolve(drinkMock[0]),
  //     }));

  //     await act(async () => {
  //       render(
  //         <Router history={ history }>
  //           <RecipeDetails />
  //         </Router>,
  //       );
  //     });

  //     history.push(`/drinks/${id}`);
  //     await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

  //     expect(history.location.pathname).toBe(`/drinks/${id}`);
  //   });

  test('testa se o link é copiado quando o botão de compartilhar é clicado', async () => {
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
    history.push(mealurl);
    // expect(await screen.findByText('Apple rangipan Tart')).toBeInTheDocument();

    const shareFirstButton = screen.getByAltText('share icon');
    // console.log(shareFirstButton);
    act(() => {
      userEvent.click(shareFirstButton);
    });
    // console.log(history.location.pathname);
    waitFor(() => {
      expect(clipboardCopy).toHaveBeenCalledWith(
        `${window.location.origin}${mealurl}`,
      );
    });

    expect(screen.getByText(copiedMessage)).toBeInTheDocument();
  });

  test('should show "Recipe already done!" if the recipe is in doneRecipes', async () => {
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

    // const id = '52768';
    // const doneRecipes = [doneRecipesMock];
    // localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));

    history.push(mealurl);
    console.log(doneRecipes);
    expect(screen.getByText('Recipe already done!')).toBeInTheDocument();
  });

  test('should show "Continue Recipe" if the recipe is in inProgressRecipes', async () => {
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

    // const id = '12345';
    // const inProgressRecipes = { meals: { [id]: {} } };
    localStorage.setItem('inProgressRecipes', JSON.stringify(favoritRecipesMock));
    console.log(favoritRecipesMock);
    history.push(mealurl);

    const button = await screen.findByRole('button', { name: /Continue Recipe/i });
    expect(button).toBeInTheDocument();
  });
});
