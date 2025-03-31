'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useFavorites } from '@/contexts/FavoritesContext';

export default function Header() {
  const { favorites } = useFavorites();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  return (
    <header className="bg-[#111827] shadow-md border-b border-[#1e293b]">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-400">
          Nomeador
        </Link>
        
        <div className="flex items-center space-x-4">
          <Link 
            href="/favoritos" 
            className="flex items-center text-gray-300 hover:text-blue-400"
          >
            <Heart className="h-5 w-5 mr-1" />
            <span className="hidden sm:inline">Favoritos</span>
            {mounted && favorites.length > 0 && (
              <span className="ml-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {favorites.length > 99 ? '99+' : favorites.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
} 