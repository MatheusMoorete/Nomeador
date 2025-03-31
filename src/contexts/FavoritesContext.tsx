'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface Favorite {
  id: string;
  name: string;
  category: 'pets' | 'jogos' | 'bebes' | 'aleatorios';
  timestamp: number;
}

interface FavoritesContextType {
  favorites: Favorite[];
  addFavorite: (name: string, category: Favorite['category']) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (name: string) => boolean;
  clearFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
  isFavorite: () => false,
  clearFavorites: () => {},
});

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [mounted, setMounted] = useState(false);

  // Carrega favoritos do localStorage na inicialização
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites));
      } catch (error) {
        console.error('Erro ao carregar favoritos:', error);
      }
    }
    setMounted(true);
  }, []);

  // Atualiza localStorage quando favoritos mudam
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites, mounted]);

  const addFavorite = (name: string, category: Favorite['category']) => {
    if (isFavorite(name)) return;
    
    const newFavorite: Favorite = {
      id: `${category}-${name}-${Date.now()}`,
      name,
      category,
      timestamp: Date.now()
    };
    
    setFavorites(prev => [newFavorite, ...prev]);
  };

  const removeFavorite = (id: string) => {
    setFavorites(prev => prev.filter(fav => fav.id !== id));
  };

  const isFavorite = (name: string) => {
    return favorites.some(fav => fav.name.toLowerCase() === name.toLowerCase());
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    clearFavorites,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  return context;
} 