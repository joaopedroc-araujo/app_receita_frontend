import { screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import clipboardCopy from 'clipboard-copy';
import DoneRecipes from '../pages/DoneRecipes';
import { mockedRecipes } from './mock/mockRecipes';
import renderWithRouter from './utils/RenderWIthRouter';

jest.mock('clipboard-copy', () => jest.fn());

const copiedMessage = 'Link copied!';

describe('DoneRecipes component', () => {
  beforeEach(() => {
    localStorage.setItem(
      'doneRecipes',
      JSON.stringify(mockedRecipes),
    );
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('Teste se há filtros na tela', () => {
    renderWithRouter(<DoneRecipes />);
    const filterByAllBtn = screen.getByRole('button', { name: /All/i });
    const filterByMealBtn = screen.getByRole('button', { name: /Meal/i });
    const filterByDrinkBtn = screen.getByRole('button', { name: /Drink/i });

    expect(filterByAllBtn).toBeInTheDocument();
    expect(filterByMealBtn).toBeInTheDocument();
    expect(filterByDrinkBtn).toBeInTheDocument();
  });

  test('filtra por tipo de receita', async () => {
    await act(async () => renderWithRouter(<DoneRecipes />));
    // console.log(localStorage.getItem('doneRecipes'));
    const filterByMealBtn = screen.getByRole('button', { name: /Meal/i });
    userEvent.click(filterByMealBtn);

    expect(screen.getByText('Burek')).toBeInTheDocument();

    expect(screen.queryByText('GG')).not.toBeInTheDocument();

    const filterByDrinkBtn = screen.getByRole('button', { name: /Drink/i });
    userEvent.click(filterByDrinkBtn);

    expect(screen.queryByText('Burek')).not.toBeInTheDocument();
    expect(screen.getByText('GG')).toBeInTheDocument();

    const filterByAllBtn = screen.getByRole('button', { name: /All/i });

    userEvent.click(filterByAllBtn);

    expect(screen.getByText('Burek')).toBeInTheDocument();
    expect(screen.getByText('GG')).toBeInTheDocument();
  });

  test('testa botão de "share"', async () => {
    renderWithRouter(<DoneRecipes />);
    const shareFirstButton = screen.getAllByAltText('share')[0];

    userEvent.click(shareFirstButton);

    expect(clipboardCopy).toHaveBeenCalledWith(
      `${window.location.origin}/meals/53060`,
    );

    expect(screen.getByText(copiedMessage)).toBeInTheDocument();

    const shareSecondButton = screen.getAllByAltText('share')[1];
    userEvent.click(shareSecondButton);

    expect(clipboardCopy).toHaveBeenCalledWith(
      `${window.location.origin}/drinks/15997`,
    );

    await waitFor(
      () => expect(screen.queryByText(copiedMessage)).not.toBeInTheDocument(),
      { timeout: 5000 },
    );
  });

  test('testa se as tags são exibidas na tela', () => {
    renderWithRouter(<DoneRecipes />);

    expect(screen.getByTestId('2-UnHealthy-horizontal-tag')).toBeInTheDocument();
    expect(screen.getByTestId('2-Speciality-horizontal-tag')).toBeInTheDocument();
    expect(screen.getByTestId('2-HangoverFood-horizontal-tag')).toBeInTheDocument();
  });

  test('testa se renderiza a mensagem "No recipes yet" quando não tem receitas feitas', () => {
    localStorage.clear();
    renderWithRouter(<DoneRecipes />);

    expect(screen.getByText('No recipes yet')).toBeInTheDocument();
  });

  test('testa se não renderiza tags quando a receita não tem', () => {
    renderWithRouter(<DoneRecipes />);

    const filterByDrinkBtn = screen.getByRole('button', { name: /Drink/i });
    userEvent.click(filterByDrinkBtn);

    expect(screen.getByTestId('0-horizontal-name')).toHaveTextContent('GG');
    expect(screen.queryByTestId('0-horizontal-tag')).not.toBeInTheDocument();
  });
});
