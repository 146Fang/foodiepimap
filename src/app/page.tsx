'use client';

import React, { useState, useEffect } from 'react';
// 這裡必須加花括號 { }
import { Header } from '@/components/Header'; 
import { AppSearchProvider } from '@/contexts/AppSearch'; 
// RestaurantMap 通常也需要花括號，請一併修正
import { RestaurantMap } from '@/components/RestaurantMap'; 
import { getAllRestaurants, searchRestaurants, Restaurant } from '@/services/restaurantService';

export default function Home() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    setRestaurants(getAllRestaurants());
  }, []);

  const handleSearch = (term: string) => {
    setRestaurants(searchRestaurants(term));
  };

  return (
    <AppSearchProvider onSearch={handleSearch}>
      <main className="min-h-screen">
        <Header />
        <div className="p-4">
          <RestaurantMap restaurants={restaurants} />
        </div>
      </main>
    </AppSearchProvider>
  );
}