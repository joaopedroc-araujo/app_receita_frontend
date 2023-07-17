import React from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RecipeInProgress from '../components/RecipeInProgress';

const styleConfig = 'line-through solid rgb(0, 0, 0)';

describe('Testes do da página RecipeInProgress', () => {
  // Mock do fetch para simular a resposta da requisição
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({
      meals: [
        {
          strMeal: 'Mocked Recipe',
          strCategory: 'Mocked Category',
          strInstructions: 'Mocked Instructions',
          strMealThumb: 'mockedThumb.jpg',
          strIngredient1: 'Ingredient 1',
          strMeasure1: 'Measure 1',
        },
      ],
    }),
  }));

  test('should fetch and render the recipe data', async () => {
    const { getByTestId } = render(<RecipeInProgress />);
    const recipeTitle = await waitFor(() => getByTestId('recipe-title'));
    const recipeCategory = getByTestId('recipe-category');
    const recipeInstructions = getByTestId('instructions');
    const recipePhoto = getByTestId('recipe-photo');
    const ingredientsList = getByTestId('ingredients-list');

    expect(recipeTitle.textContent).toBe('Mocked Recipe');
    expect(recipeCategory.textContent).toBe('Mocked Category');
    expect(recipeInstructions.textContent).toBe('Mocked Instructions');
    expect(recipePhoto.src).toContain('mockedThumb.jpg');
    expect(ingredientsList.children.length).toBe(1);
  });

  test('Verifica se o titulo da receita é exibido na pagina.', () => {
    const { getByTestId } = render(<RecipeInProgress />);
    const recipeTitle = getByTestId('recipe-title');
    expect(recipeTitle).toBeInTheDocument();
  });

  test('Verifica se o ingrediente é riscado ao marcar o checkbox.', () => {
    const { getByTestId } = render(<RecipeInProgress />);
    const ingredientCheckbox = getByTestId('0-ingredient-step');
    userEvent.click(ingredientCheckbox);
    expect(ingredientCheckbox.style.textDecoration).toBe(styleConfig);
  });

  test('should render the recipe instructions', () => {
    const { getByTestId } = render(<RecipeInProgress />);
    const instructions = getByTestId('instructions');
    expect(instructions).toBeInTheDocument();
  });

  test('Verifica se o icone de favorito muda ao clicar.', () => {
    const { getByTestId } = render(<RecipeInProgress />);
    const favoriteButton = getByTestId('favorite-btn');
    userEvent.click(favoriteButton);
    expect(favoriteButton.firstChild.src).toContain('blackHeartIcon.svg');
    userEvent.click(favoriteButton);
    expect(favoriteButton.firstChild.src).toContain('whiteHeartIcon.svg');
  });

  test('should toggle the favorite state when the favorite button is clicked', () => {
    const { getByTestId } = render(<RecipeInProgress />);
    const favoriteButton = getByTestId('favorite-btn');

    userEvent.click(favoriteButton);
    expect(favoriteButton.firstChild.src).toContain('blackHeartIcon.svg');

    userEvent.click(favoriteButton);
    expect(favoriteButton.firstChild.src).toContain('whiteHeartIcon.svg');
  });

  test('should mark an ingredient as completed when the checkbox is clicked', () => {
    const { getByTestId } = render(<RecipeInProgress />);
    const ingredientCheckbox = getByTestId('0-ingredient-step');

    userEvent.click(ingredientCheckbox);
    expect(ingredientCheckbox.parentNode.style.textDecoration).toBe(styleConfig);

    userEvent.click(ingredientCheckbox);
    expect(ingredientCheckbox.parentNode.style.textDecoration).not.toBe(styleConfig);
  });

  // Add more test cases for other functionality and components as needed

  it('Verifica se é exibido o botão de finalizar receita.', () => {
    const { getByTestId } = render(<RecipeInProgress />);
    const finishRecipeButton = getByTestId('finish-recipe-btn');
    expect(finishRecipeButton).toBeInTheDocument();
  });
});
