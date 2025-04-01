'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import PageTransition from '@/components/PageTransition';

export default function NotFound() {
  const { t } = useLanguage();
  
  // Relatório de erro para analytics (opcional)
  useEffect(() => {
    // Aqui poderia enviar logs para análise de erros
    console.error('Página não encontrada acessada');
  }, []);

  return (
    <PageTransition>
      <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
        <Header />
        
        <main className="flex-grow flex flex-col items-center justify-center px-4 py-12">
          <div className="max-w-md w-full text-center">
            <h1 className="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
              {t('error.pageNotFound')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              {t('error.pageNotFoundDesc')}
            </p>
            
            <Link 
              href="/" 
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              {t('button.backToHome')}
            </Link>

            <div className="mt-12 grid grid-cols-2 gap-4">
              <Link 
                href="/pets" 
                className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-lg shadow-sm text-sm"
              >
                {t('nav.pets')}
              </Link>
              <Link 
                href="/jogos" 
                className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-lg shadow-sm text-sm"
              >
                {t('nav.games')}
              </Link>
              <Link 
                href="/bebes" 
                className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-lg shadow-sm text-sm"
              >
                {t('nav.babies')}
              </Link>
              <Link 
                href="/aleatorios" 
                className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-lg shadow-sm text-sm"
              >
                {t('nav.random')}
              </Link>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </PageTransition>
  );
} 