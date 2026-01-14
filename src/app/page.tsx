'use client';

import React from 'react';
import Header from '@/components/Header';
import { AppSearchProvider } from '@/contexts/AppSearch'; // 確保這裡只有一行
import RestaurantMap from '@/components/RestaurantMap';
import { Restaurant } from '@/services/restaurantService';
import { getAllRestaurants, searchRestaurants } from '@/services/restaurantService';

export default function Home() {
  const [restaurants, setRestaurants] = React.useState<Restaurant[]>([]);

  React.useEffect(() => {
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
// 注意：確保這後面沒有任何東西了！