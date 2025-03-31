'use client';

import { useState } from 'react';
import { useFavorites } from '@/contexts/FavoritesContext';
import { Heart } from 'lucide-react';

interface FavoriteButtonProps {
  name: string;
  category: 'pets' | 'jogos' | 'bebes' | 'aleatorios';
}

export default function FavoriteButton({ name, category }: FavoriteButtonProps) {
  const { addFavorite, removeFavorite, isFavorite, favorites } = useFavorites();
  const [isAnimating, setIsAnimating] = useState(false);
  const isFav = isFavorite(name);

  const handleClick = () => {
    if (isFav) {
      // Encontrar o ID para remover
      const favoriteToRemove = favorites.find(
        (fav) => fav.name.toLowerCase() === name.toLowerCase()
      );
      
      if (favoriteToRemove) {
        removeFavorite(favoriteToRemove.id);
      }
    } else {
      addFavorite(name, category);
    }

    // Animate the heart
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center justify-center transition-all duration-300 ${
        isAnimating ? 'scale-125' : 'scale-100'
      }`}
      aria-label={isFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      title={isFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
    >
      <Heart
        className={`w-6 h-6 ${
          isFav 
            ? 'fill-rose-500 text-rose-500'
            : 'fill-transparent text-gray-400 hover:text-rose-500'
        }`}
      />
    </button>
  );
} 