'use client';

import { useState, useContext } from 'react';
import { Search } from 'lucide-react';
import { useLocale } from '@/contexts/LocaleContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Logo } from './Logo';
import { AppSearchContext } from '@/contexts/AppSearch';

export function Header({ onSearch }: { onSearch?: (term: string) => void }) {
  const { t } = useLocale();
  const [searchTerm, setSearchTerm] = useState('');
  // 核心修正：統一使用 AppSearchContext
  const searchContext = useContext(AppSearchContext);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalOnSearch = onSearch || searchContext?.onSearch;
    if (finalOnSearch && searchTerm.trim()) {
      finalOnSearch(searchTerm.trim());
    } else if (searchContext) {
      searchContext.setSearchTerm(searchTerm.trim());
    }
  };

  return (
    <header className="w-full bg-gradient-to-r from-purple-600 to-blue-900 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col gap-4">
          {/* 顶部：Logo 和语言切换 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Logo color="orange" size={40} />
              <h1 className="text-xl font-bold text-white">
                {t('app.name')}
              </h1>
            </div>
            <LanguageSwitcher />
          </div>

          {/* 搜索框 */}
          <form onSubmit={handleSubmit} className="w-full">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t('search.placeholder') || 'Search restaurants by name or address...'}
                className="w-full px-4 py-2 pl-10 pr-4 bg-white/20 backdrop-blur-lg border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
            </div>
          </form>
        </div>
      </div>
    </header>
  );
}