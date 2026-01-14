'use client';

import React, { createContext, useContext, useState } from 'react';

interface SearchContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

// 我們把變數名字改掉，避開「SearchContext」這個關鍵字
export const MySearchDataStore = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children, onSearch }: { children: React.ReactNode; onSearch: (term: string) => void }) {
  const [searchTerm, setSearchTerm] = useState('');

  const updateSearch = (term: string) => {
    setSearchTerm(term);
    onSearch(term);
  };

  return (
    <MySearchDataStore.Provider value={{ searchTerm, setSearchTerm: updateSearch }}>
      {children}
    </MySearchDataStore.Provider>
  );
}

export const useSearch = () => {
  const context = useContext(MySearchDataStore);
  if (!context) throw new Error('useSearch must be used within a SearchProvider');
  return context;
};