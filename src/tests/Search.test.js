import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../components/SearchBar';

describe('SearchBar', () => {
  const searchInputVerify = 'search-input';
  const searchTopButton = 'search-top-btn';
  test('deve ocultar o input de pesquisa inicialmente', () => {
    render(<SearchBar />);

    const searchInput = screen.queryByTestId(searchInputVerify);
    expect(searchInput).toBeNull();
  });
  test('Verifica o input de pesquisa quando o botão é clicado', () => {
    render(<SearchBar />);

    const searchButton = screen.getByTestId(searchTopButton);
    fireEvent.click(searchButton);

    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
  });

  test('Verifica o tipo de pesquisa ao clicar nos botões de opção', () => {
    render(<SearchBar />);

    const searchButton = screen.getByTestId(searchTopButton);
    fireEvent.click(searchButton);

    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const nameRadio = screen.getByTestId('name-search-radio');
    const letterRadio = screen.getByTestId('first-letter-search-radio');

    fireEvent.click(ingredientRadio);
    expect(ingredientRadio.checked).toBe(true);

    fireEvent.click(nameRadio);
    expect(nameRadio.checked).toBe(true);

    fireEvent.click(letterRadio);
    expect(letterRadio.checked).toBe(true);
  });

  test('Verifica a função de pesquisa ao clicar no botão de busca', () => {
    render(<SearchBar />);

    const searchButton = screen.getByTestId(searchTopButton);
    fireEvent.click(searchButton);

    const searchInput = screen.getByTestId(searchInputVerify);
    fireEvent.change(searchInput, { target: { value: 'test' } });

    const execSearchButton = screen.getByTestId('exec-search-btn');
    fireEvent.click(execSearchButton);
  });

  test('Verifica o alerta  ao inserir mais de um caractere na pesquisa por letra', () => {
    const alertMock = jest.fn();
    global.alert = alertMock;

    render(<SearchBar />);

    const searchButton = screen.getByTestId(searchTopButton);
    fireEvent.click(searchButton);

    const letterRadio = screen.getByTestId('first-letter-search-radio');
    fireEvent.click(letterRadio);

    const searchInput = screen.getByTestId(searchInputVerify);
    fireEvent.change(searchInput, { target: { value: 'ab' } });

    const execSearchButton = screen.getByTestId('exec-search-btn');
    fireEvent.click(execSearchButton);
    expect(alertMock).toHaveBeenCalledWith('Your search must have only 1 (one) character');
  });
});
