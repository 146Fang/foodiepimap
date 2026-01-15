'use client';

import { useState, useEffect } from 'react';
import { RestaurantMap } from '@/components/RestaurantMap';
import { getAllRestaurants, searchRestaurants, Restaurant } from '@/services/restaurantService';
import { useAppSearch } from '@/contexts/AppSearch';

export default function Home() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { searchTerm } = useAppSearch();

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const data = await getAllRestaurants();
        setRestaurants(data);
      } catch (error) {
        console.error('Failed to load restaurants:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // 当搜索词变化时，执行搜索
  useEffect(() => {
    if (searchTerm.trim()) {
      const performSearch = async () => {
        try {
          const results = await searchRestaurants(searchTerm);
          setRestaurants(results);
        } catch (error) {
          console.error('Search failed:', error);
        }
      };
      performSearch();
    } else {
      // 清空搜索时，重新加载所有餐厅
      const loadAll = async () => {
        try {
          const data = await getAllRestaurants();
          setRestaurants(data);
        } catch (error) {
          console.error('Failed to load restaurants:', error);
        }
      };
      loadAll();
    }
  }, [searchTerm]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="text-white">Loading map...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-[calc(100vh-200px)] relative">
      <RestaurantMap restaurants={restaurants} />
    </div>
  );
}
