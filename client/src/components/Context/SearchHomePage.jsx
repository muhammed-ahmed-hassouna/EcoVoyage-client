import React, { createContext, useContext, useState, useEffect } from 'react';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [searchResult, setSearchResult] = useState([]);


  const searchContextValue = {
    searchResult,
    setSearchResult,
  };

  return (
    <SearchContext.Provider value={searchContextValue}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearching = () => {
  return useContext(SearchContext);
};