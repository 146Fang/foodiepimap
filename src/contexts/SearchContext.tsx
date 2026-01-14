'use client';

import React, { createContext, useContext, useState } from 'react';

interface SearchContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

// 確保這裡只有一個 export const SearchContext
export const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children, onSearch }: { children: React.ReactNode; onSearch: (term: string) => void }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSetSearchTerm = (term: string) => {
    setSearchTerm(term);
    onSearch(term);
  };

  return (
    <SearchContext.Provider value={{ searchTerm, setSetSearchTerm: handleSetSearchTerm } as any}>
      {children}
    </SearchContext.Provider>
  );
}

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
