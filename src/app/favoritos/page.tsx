'use client';

import { useState, useEffect } from 'react';
import { useFavorites } from '@/contexts/FavoritesContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Trash2, Copy, Check, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import AdBanner from '@/components/AdBanner';
import { useLanguage } from '@/contexts/LanguageContext';

export default function FavoritosPage() {
  const { favorites, removeFavorite, clearFavorites } = useFavorites();
  const { t } = useLanguage();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">
            {t('nav.favorites')}...
          </h1>
        </main>
        <Footer />
      </div>
    );
  }

  const handleCopy = (name: string, id: string) => {
    navigator.clipboard.writeText(name);
    setCopiedId(id);
    
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  // Usar o sistema de traduções para os labels das categorias
  const CATEGORY_LABELS = {
    pets: t('nav.pets'),
    jogos: t('nav.games'),
    bebes: t('nav.babies'),
    aleatorios: t('random.title')
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link 
            href="/" 
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> {t('nav.home')}
          </Link>
        </div>
        
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            {t('nav.favorites')}
          </h1>
          
          {favorites.length > 0 && (
            <button
              onClick={clearFavorites}
              className="text-sm px-3 py-1 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white dark:hover:bg-red-600 transition-colors"
            >
              {t('button.clear')}
            </button>
          )}
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {t('favorites.empty')}
            </p>
            <Link 
              href="/" 
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              {t('favorites.explore')}
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {favorites.map((favorite) => (
              <div 
                key={favorite.id} 
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="px-2 py-1 text-xs rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                    {CATEGORY_LABELS[favorite.category]}
                  </span>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => handleCopy(favorite.name, favorite.id)}
                      className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      title={t('button.copy')}
                    >
                      {copiedId === favorite.id ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                    <button
                      onClick={() => removeFavorite(favorite.id)}
                      className="p-1 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                      title={t('button.unfavorite')}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <p className="text-xl font-bold text-center py-3 text-gray-800 dark:text-gray-100">
                  {favorite.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 text-right">
                  {t('favorites.saved')}: {new Date(favorite.timestamp).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-8">
          <AdBanner adSlot="favoritos-footer" />
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 