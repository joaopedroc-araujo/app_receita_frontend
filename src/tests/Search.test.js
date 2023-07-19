import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';

import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

describe('SearchBar', () => {
  const input = 'search-input';
  const topButton = 'search-top-btn';
  const exe = 'exec-search-btn';
  const firstLetter = 'first-letter-search-radio';
  const thumb1 = 'thumb1.jpg';
  const thumb2 = 'thumb2.jpg';
  const nameSearch = 'name-search-radio';
  const recipe = '0-recipe-card';
  test('Deve chamar a função de pesquisa ao clicar no botão de busca', () => {
    render(
      <Router history={ createMemoryHistory() }>
        <SearchBar />
      </Router>,
    );

    const searchButton = screen.getByTestId(topButton);
    fireEvent.click(searchButton);

    const searchInput = screen.getByTestId(input);
    fireEvent.change(searchInput, { target: { value: 'test' } });

    const execSearchButton = screen.getByTestId(exe);
    fireEvent.click(execSearchButton);
  });

  test('Deve exibir o alerta correto ao inserir mais de um caractere na pesquisa por letra', () => {
    const alertMock = jest.fn();
    global.alert = alertMock;

    render(
      <Router history={ createMemoryHistory() }>
        <SearchBar />
      </Router>,
    );

    const searchButton = screen.getByTestId(topButton);
    fireEvent.click(searchButton);

    const letterRadio = screen.getByTestId(firstLetter);
    fireEvent.click(letterRadio);

    const searchInput = screen.getByTestId(input);
    fireEvent.change(searchInput, { target: { value: 'ab' } });

    const execSearchButton = screen.getByTestId(exe);
    fireEvent.click(execSearchButton);
    expect(alertMock).toHaveBeenCalledWith('Your search must have only 1 (one) character');
  });
  test('Deve chamar a API corretamente e atualizar o estado das bebidas', async () => {
    const mockData = {
      drinks: [
        { idDrink: '1', strDrink: 'Drink 1', strDrinkThumb: thumb1 },
        { idDrink: '2', strDrink: 'Drink 2', strDrinkThumb: thumb2 },
      ],
    };
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    const history = createMemoryHistory();
    history.push('/drinks');

    render(
      <Router history={ history }>
        <SearchBar />
      </Router>,
    );

    const searchButton = screen.getByTestId(topButton);
    fireEvent.click(searchButton);

    const nameRadio = screen.getByTestId(nameSearch);
    fireEvent.click(nameRadio);

    const searchInput = screen.getByTestId(input);
    fireEvent.change(searchInput, { target: { value: 'margarita' } });

    const execSearchButton = screen.getByTestId(exe);
    fireEvent.click(execSearchButton);

    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita');

    await screen.findByTestId(recipe);
    const drinkCards = screen.getAllByTestId(/(\d+)-recipe-card/);
    expect(drinkCards.length).toBe(2);
  });

  test('Deve redirecionar para a página de detalhes se apenas uma bebida for encontrada', async () => {
    const mockData = {
      drinks: [
        { idDrink: '1', strDrink: 'Drink 1', strDrinkThumb: thumb1 },
      ],
    };
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    const history = createMemoryHistory();
    history.push('/drinks');

    render(
      <Router history={ history }>
        <SearchBar />
      </Router>,
    );

    const searchButton = screen.getByTestId(topButton);
    fireEvent.click(searchButton);

    const nameRadio = screen.getByTestId(nameSearch);
    fireEvent.click(nameRadio);

    const searchInput = screen.getByTestId(input);
    fireEvent.change(searchInput, { target: { value: 'margarita' } });

    const execSearchButton = screen.getByTestId(exe);
    fireEvent.click(execSearchButton);

    await screen.findByTestId(recipe);

    expect(history.location.pathname).toBe('/drinks/1');
  });

  test('Testando o alerta ao inserir mais de um caractere na pesquisa por letra', async () => {
    const alertMock = jest.fn();
    global.alert = alertMock;

    const history = createMemoryHistory();
    history.push('/drinks');

    render(
      <Router history={ history }>
        <SearchBar />
      </Router>,
    );

    const searchButton = screen.getByTestId(topButton);
    fireEvent.click(searchButton);

    const letterRadio = screen.getByTestId(firstLetter);
    fireEvent.click(letterRadio);

    const searchInput = screen.getByTestId(input);
    fireEvent.change(searchInput, { target: { value: 'ab' } });

    const execSearchButton = screen.getByTestId(exe);
    fireEvent.click(execSearchButton);

    expect(alertMock).toHaveBeenCalledWith('Your search must have only 1 (one) character');
  });

  test('Teste de direcionamento para a página de detalhes se apenas uma bebida for encontrada', async () => {
    const mockData = {
      drinks: [
        { idDrink: '1', strDrink: 'Drink 1', strDrinkThumb: thumb1 },
      ],
    };
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    const history = createMemoryHistory();
    history.push('/drinks');

    render(
      <Router history={ history }>
        <SearchBar />
      </Router>,
    );

    const searchButton = screen.getByTestId(topButton);
    fireEvent.click(searchButton);

    const letterRadio = screen.getByTestId(firstLetter);
    fireEvent.click(letterRadio);

    const searchInput = screen.getByTestId(input);
    fireEvent.change(searchInput, { target: { value: 'a' } });

    const execSearchButton = screen.getByTestId('exec-search-btn');
    fireEvent.click(execSearchButton);

    await screen.findByTestId(recipe);

    expect(history.location.pathname).toBe('/drinks/1');
  });

  test('Deve chamar a API corretamente e atualizar o estado das refeições (buscando pelo ingrediente)', async () => {
    const mockData = {
      meals: [
        { idMeal: '1', strMeal: 'Meal 1', strMealThumb: thumb1 },
        { idMeal: '2', strMeal: 'Meal 2', strMealThumb: thumb2 },
      ],
    };
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    const history = createMemoryHistory();
    history.push('/meals');

    render(
      <Router history={ history }>
        <SearchBar />
      </Router>,
    );

    const searchButton = screen.getByTestId(topButton);
    fireEvent.click(searchButton);

    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    fireEvent.click(ingredientRadio);

    const searchInput = screen.getByTestId(input);
    fireEvent.change(searchInput, { target: { value: 'chicken' } });

    const execSearchButton = screen.getByTestId(exe);
    fireEvent.click(execSearchButton);

    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken');

    await screen.findByTestId(recipe);
    const mealCards = screen.getAllByTestId(/(\d+)-recipe-card/);
    expect(mealCards.length).toBe(2);
  });
  test('deve atualizar o estado das refeições corretamente ao receber uma resposta da API', async () => {
    const mockData = {
      meals: [
        { idMeal: '1', strMeal: 'Meal 1', strMealThumb: thumb1 },
        { idMeal: '2', strMeal: 'Meal 2', strMealThumb: thumb2 },
      ],
    };
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    const history = createMemoryHistory();
    history.push('/meals');

    render(
      <Router history={ history }>
        <SearchBar />
      </Router>,
    );

    const searchButton = screen.getByTestId(topButton);
    fireEvent.click(searchButton);

    const searchInput = screen.getByTestId(input);
    fireEvent.change(searchInput, { target: { value: 'chicken' } });

    const execSearchButton = screen.getByTestId(exe);
    fireEvent.click(execSearchButton);

    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken');

    await screen.findByTestId(recipe);
    const mealCards = screen.getAllByTestId(/(\d+)-recipe-card/);
    expect(mealCards.length).toBe(2);
  });

  test('Deve chamar a API corretamente e atualizar o estado das refeições(Buscando pela letra)', async () => {
    const mockData = {
      meals: [
        { idMeal: '1', strMeal: 'Meal 1', strMealThumb: thumb1 },
        { idMeal: '2', strMeal: 'Meal 2', strMealThumb: thumb2 },
      ],
    };
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    const history = createMemoryHistory();
    history.push('/meals');

    render(
      <Router history={ history }>
        <SearchBar />
      </Router>,
    );

    const searchButton = screen.getByTestId(topButton);
    fireEvent.click(searchButton);

    const letterRadio = screen.getByTestId(firstLetter);
    fireEvent.click(letterRadio);

    const searchInput = screen.getByTestId(input);
    fireEvent.change(searchInput, { target: { value: 'a' } });

    const execSearchButton = screen.getByTestId(exe);
    fireEvent.click(execSearchButton);

    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=a');

    await screen.findByTestId(recipe);
    const mealCards = screen.getAllByTestId(/(\d+)-recipe-card/);
    expect(mealCards.length).toBe(2);
  });

  test('Deve redirecionar para a página de detalhes correta se apenas uma refeição for encontrada', async () => {
    const mockData = {
      meals: [
        { idMeal: '1', strMeal: 'Meal 1', strMealThumb: thumb1 },
      ],
    };
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    const history = createMemoryHistory();
    history.push('/meals');

    render(
      <Router history={ history }>
        <SearchBar />
      </Router>,
    );

    const searchButton = screen.getByTestId('search-top-btn');
    fireEvent.click(searchButton);

    const letterRadio = screen.getByTestId(firstLetter);
    fireEvent.click(letterRadio);

    const searchInput = screen.getByTestId(input);
    fireEvent.change(searchInput, { target: { value: 'a' } });

    const execSearchButton = screen.getByTestId(exe);
    fireEvent.click(execSearchButton);

    await screen.findByTestId(recipe);

    expect(history.location.pathname).toBe('/meals/1');
  });

  test('Deve redirecionar para a página de detalhes correta se apenas uma bebida for encontrada', async () => {
    const mockData = {
      drinks: [
        { idDrink: '1', strDrink: 'Drink 1', strDrinkThumb: thumb1 },
      ],
    };
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    const history = createMemoryHistory();
    history.push('/drinks');

    render(
      <Router history={ history }>
        <SearchBar />
      </Router>,
    );

    const searchButton = screen.getByTestId(topButton);
    fireEvent.click(searchButton);

    const searchInput = screen.getByTestId(input);
    fireEvent.change(searchInput, { target: { value: 'ingredient' } });

    const execSearchButton = screen.getByTestId(exe);
    fireEvent.click(execSearchButton);

    await screen.findByTestId(recipe);

    expect(history.location.pathname).toBe('/drinks/1');
  });

  test('Deve chamar a função correta de acordo com o tipo de pesquisa selecionado', async () => {
    const mockFunctions = {
      performMealSearch: jest.fn(),
      performFoodNameSearch: jest.fn(),
      performFoodLetterSearch: jest.fn(),
    };

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ meals: [] }),
    });

    const history = createMemoryHistory();
    history.push('/meals');

    render(
      <Router history={ history }>
        <SearchBar />
      </Router>,
    );

    const searchButton = screen.getByTestId(topButton);
    fireEvent.click(searchButton);

    const nameRadio = screen.getByTestId(nameSearch);
    fireEvent.click(nameRadio);

    const searchInput = screen.getByTestId(input);
    fireEvent.change(searchInput, { target: { value: 'ingredient' } });

    const execSearchButton = screen.getByTestId(exe);
    fireEvent.click(execSearchButton);

    expect(mockFunctions.performMealSearch).not.toHaveBeenCalled();
    expect(mockFunctions.performFoodLetterSearch).not.toHaveBeenCalled();
  });

  test('Deve exibir o alerta correto quando nenhuma receita for encontrada', async () => {
    window.alert = jest.fn();
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ drinks: null }),
    });

    const history = createMemoryHistory();
    history.push('/drinks');

    render(
      <Router history={ history }>
        <SearchBar />
      </Router>,
    );
    const searchButton = screen.getByTestId(topButton);
    fireEvent.click(searchButton);

    const ingredientSearch = screen.getByLabelText(/ingredient/i);
    fireEvent.click(ingredientSearch);

    const execSearchButton = screen.getByTestId(exe);
    fireEvent.click(execSearchButton);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledTimes(2);
      expect(window.alert).toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.');
    });
  });

  test('Deve chamar a API corretamente e atualizar o estado das bebidas', async () => {
    const mockData = {
      drinks: [
        { idDrink: '1', strDrink: 'Drink 1', strDrinkThumb: thumb1 },
        { idDrink: '2', strDrink: 'Drink 2', strDrinkThumb: thumb2 },
      ],
    };
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    const history = createMemoryHistory();
    history.push('/drinks');

    render(
      <Router history={ history }>
        <SearchBar />
      </Router>,
    );

    const searchButton = screen.getByTestId(topButton);
    fireEvent.click(searchButton);

    const letterRadio = screen.getByTestId(firstLetter);
    fireEvent.click(letterRadio);

    const searchInput = screen.getByTestId(input);
    fireEvent.change(searchInput, { target: { value: 'a' } });

    const execSearchButton = screen.getByTestId(exe);
    fireEvent.click(execSearchButton);

    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a');

    await screen.findByTestId(recipe);
    const drinkCards = screen.getAllByTestId(/(\d+)-recipe-card/);
    expect(drinkCards.length).toBe(2);
  });
  test('Verifica o redirecionamento da página para a página de comida (nova implementação)', async () => {
    const mockData = {
      meals: [
        { idMeal: '1', strMeal: 'Meal 1', strMealThumb: thumb1 },
      ],
    };
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    const history = createMemoryHistory();
    history.push('/meals');

    render(
      <Router history={ history }>
        <SearchBar />
      </Router>,
    );

    const searchButton = screen.getByTestId(topButton);
    fireEvent.click(searchButton);

    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'pizza' } });

    const execSearchButton = screen.getByTestId(exe);
    fireEvent.click(execSearchButton);

    await screen.findByTestId(recipe);

    expect(history.location.pathname).toBe('/meals/1');
    const singleMealResponse = {
      meals: [{ idMeal: '2', strMeal: 'Meal 2', strMealThumb: 'thumb2.jpg' }],
    };
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(singleMealResponse),
    });

    const inputSome = 'someInputValue';
    await act(async () => {
      fireEvent.change(searchInput, { target: { value: inputSome } });
      fireEvent.click(execSearchButton);
    });

    expect(history.location.pathname).toBe('/meals/2');
  });
});
