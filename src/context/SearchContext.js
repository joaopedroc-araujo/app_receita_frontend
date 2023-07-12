import React, { createContext, useContext } from 'react';
import useSearch from '../hooks/useSearch';

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const search = useSearch();
  return <SearchContext.Provider value={ search }>{children}</SearchContext.Provider>;
}

export const useSearchContext = () => useContext(SearchContext);
