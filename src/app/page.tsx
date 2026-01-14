'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header'; 
import { AppSearchProvider } from '@/contexts/AppSearch'; 
import { RestaurantMap } from '@/components/RestaurantMap'; 
import { getAllRestaurants, searchRestaurants, Restaurant } from '@/services/restaurantService';

export default function Home() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  // 1. 修復初始化數據加載
  useEffect(() => {
    const loadData = async () => {
      const data = await getAllRestaurants();
      setRestaurants(data);
    };
    loadData();
  }, []);

  // 2. 修復搜尋邏輯（這就是你剛才報錯的第 25 行）
  const handleSearch = async (term: string) => {
    // 必須先 await 拿到結果，再進行 setRestaurants
    const results = await searchRestaurants(term);
    setRestaurants(results);
  };

  return (
    <AppSearchProvider onSearch={handleSearch}>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 relative">
          <RestaurantMap restaurants={restaurants} />
        </main>
      </div>
    </AppSearchProvider>
  );
}