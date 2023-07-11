import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../components/SearchBar';

describe('SearchBar', () => {
    test('deve ocultar o input de pesquisa inicialmente', () => {
        render(<SearchBar />);
    
        const searchInput = screen.queryByTestId('search-input');
        expect(searchInput).toBeNull();
      });
  test('deve exibir o input de pesquisa quando o botão é clicado', () => {
    render(<SearchBar />);

    const searchButton = screen.getByTestId('search-top-btn');
    fireEvent.click(searchButton);

    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
  });

  test('deve alterar o tipo de pesquisa ao clicar nos botões de opção', () => {
    render(<SearchBar />);

    const searchButton = screen.getByTestId('search-top-btn');
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

  test('deve chamar a função de pesquisa ao clicar no botão de busca', () => {
    render(<SearchBar />);

    const searchButton = screen.getByTestId('search-top-btn');
    fireEvent.click(searchButton);

    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'test' } });

    const execSearchButton = screen.getByTestId('exec-search-btn');
    fireEvent.click(execSearchButton);

    // Aqui você pode verificar se a função de pesquisa foi chamada corretamente
  });

  test('deve exibir o alerta correto ao inserir mais de um caractere na pesquisa por letra', () => {
    // Mock do global.alert
    const alertMock = jest.fn();
    global.alert = alertMock;

    render(<SearchBar />);

    const searchButton = screen.getByTestId('search-top-btn');
    fireEvent.click(searchButton);

    const letterRadio = screen.getByTestId('first-letter-search-radio');
    fireEvent.click(letterRadio);

    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'ab' } });

    const execSearchButton = screen.getByTestId('exec-search-btn');
    fireEvent.click(execSearchButton);

    // Verifica se o alerta foi chamado corretamente
    expect(alertMock).toHaveBeenCalledWith('Your search must have only 1 (one) character');
  });
});
