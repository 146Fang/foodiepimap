'use client';
import React, { createContext, useContext, useState } from 'react';

interface AppSearchContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onSearch?: (term: string) => void;
}

export const AppSearchContext = createContext<AppSearchContextType | undefined>(undefined);

export function AppSearchProvider({ 
  children, 
  onSearch 
}: { 
  children: React.ReactNode; 
  onSearch: (term: string) => void;
}) {
  const [searchTerm, setSearchTerm] = useState('');

  const updateSearch = (term: string) => {
    setSearchTerm(term);
    if (onSearch) {
      onSearch(term);
    }
  };

  return (
    <AppSearchContext.Provider value={{ searchTerm, setSearchTerm: updateSearch, onSearch }}>
      {children}
    </AppSearchContext.Provider>
  );
}

export const useAppSearch = () => {
  const context = useContext(AppSearchContext);
  if (!context) throw new Error('useAppSearch must be used within AppSearchProvider');
  return context;
};