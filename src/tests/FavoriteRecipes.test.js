import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';

describe('Testando página de Favorite Recipes', () => {
  const history = createMemoryHistory();
  const path = '/favorite-recipes';
  const nameTestid0 = '0-horizontal-name';
  const nameTestid1 = '1-horizontal-name';
  const shareBtnTestid = '0-horizontal-share-btn';
  const favoriteBtnTestid = '0-horizontal-favorite-btn';
  const favoriteBtnTestid1 = '1-horizontal-favorite-btn';

  beforeEach(() => {
    global.localStorage.setItem('favoriteRecipes', JSON.stringify([
      {
        id: '15997',
        alcoholicOrNot: 'Optional alcohol',
        category: 'Ordinary Drink',
        image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
        name: 'GG',
        nationality: '',
        type: 'drink',
      },
      {
        id: '53065',
        alcoholicOrNot: '',
        category: 'Seafood',
        image: 'https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg',
        name: 'Sushi',
        nationality: 'Japanese',
        type: 'meal',
      },
    ]));
  });

  it('Testa se a página de receitas favoritas é renderizada com uma receita de bebida e uma de comida', () => {
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    act(() => {
      history.push(path);
    });
    expect(JSON.parse(localStorage.getItem('favoriteRecipes'))[0]).toHaveProperty('id', '15997');
    expect(JSON.parse(localStorage.getItem('favoriteRecipes'))[1]).toHaveProperty('id', '53065');
  });

  it('Testa se a receita de bebida possui as informações corretas', () => {
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    act(() => {
      history.push(path);
    });
    expect(screen.getByTestId(nameTestid0)).toBeInTheDocument();
    expect(screen.getByTestId(nameTestid0)).toHaveTextContent('GG');
    expect(screen.getByTestId('0-horizontal-top-text')).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-top-text')).toHaveTextContent('Optional alcohol - Ordinary Drink');
    expect(screen.getByTestId('0-horizontal-image')).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-image')).toHaveAttribute('src', 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg');
    expect(screen.getByTestId(shareBtnTestid)).toBeInTheDocument();
    expect(screen.getByTestId(favoriteBtnTestid)).toBeInTheDocument();
  });

  it('Testa se a receita de comida possui as informações corretas', () => {
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    act(() => {
      history.push(path);
    });
    expect(screen.getByTestId(nameTestid1)).toBeInTheDocument();
    expect(screen.getByTestId(nameTestid1)).toHaveTextContent('Sushi');
    expect(screen.getByTestId('1-horizontal-top-text')).toBeInTheDocument();
    expect(screen.getByTestId('1-horizontal-top-text')).toHaveTextContent('Japanese - Seafood');
    expect(screen.getByTestId('1-horizontal-image')).toBeInTheDocument();
    expect(screen.getByTestId('1-horizontal-image')).toHaveAttribute('src', 'https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg');
    expect(screen.getByTestId('1-horizontal-share-btn')).toBeInTheDocument();
    expect(screen.getByTestId(favoriteBtnTestid1)).toBeInTheDocument();
  });

  it('Testa os botões de filtro', async () => {
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    act(() => {
      history.push(path);
    });
    expect(screen.getByTestId('filter-by-all-btn')).toBeInTheDocument();
    expect(screen.getByTestId('filter-by-meal-btn')).toBeInTheDocument();
    expect(screen.getByTestId('filter-by-drink-btn')).toBeInTheDocument();
  });

  it('Testa se ao clicar no botão de compartilhar, o link da receita é copiado', async () => {
    navigator.clipboard = {
      writeText: jest.fn(),
    };
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    act(() => {
      history.push(path);
    });
    const shareBtn = await screen.findByTestId(shareBtnTestid);
    expect(shareBtn).toBeInTheDocument();
    act(() => {
      userEvent.click(shareBtn);
    });
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost/drinks/15997');
  });

  it('Testa se ao clicar no botão de compartilhar, a mensagem "Link copiado!" é exibida', async () => {
    navigator.clipboard = {
      writeText: jest.fn(),
    };
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    act(() => {
      history.push(path);
    });
    const shareButton = await screen.findByTestId(shareBtnTestid);
    act(() => {
      userEvent.click(shareButton);
    });
    expect(screen.getAllByText(/Link copied/i)).toHaveLength(2);
  });

  it('Testa a receita é removida da tela e do localstorage ao clicar no botão de desfavoritar, até o ponto de zerar a lista de receitas favoritas', async () => {
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    act(() => {
      history.push(path);
    });
    const favoriteBtn1 = await screen.findByTestId(favoriteBtnTestid);
    const favoriteBtn2 = await screen.findByTestId(favoriteBtnTestid1);
    act(() => {
      userEvent.click(favoriteBtn1);
    });
    // console.log(JSON.parse(localStorage.getItem('favoriteRecipes'))[0]);
    expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toHaveLength(1);

    expect(screen.queryByTestId(nameTestid1)).not.toBeInTheDocument();
    expect(screen.queryByTestId(favoriteBtnTestid1)).not.toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toHaveLength(1);
    act(() => {
      userEvent.click(favoriteBtn2);
    });
    expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toHaveLength(0);
    expect(screen.queryByTestId(nameTestid0)).not.toBeInTheDocument();
  });
});
