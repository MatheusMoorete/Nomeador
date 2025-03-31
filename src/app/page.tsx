'use client';

import Link from "next/link";
import { PawPrint, Gamepad2, Baby, Shuffle } from 'lucide-react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
  const { t } = useLanguage();
  
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="flex-grow flex flex-col items-center justify-center w-full max-w-4xl px-4 mx-auto py-8 text-center">
        <h1 className="text-5xl sm:text-6xl font-bold text-blue-600 dark:text-blue-400 mb-4">
          Nomeador
        </h1>
        <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-12">
          {t('site.description')}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
          <Link 
            href="/pets" 
            className="bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700 text-blue-600 dark:text-blue-400 font-semibold py-6 px-4 rounded-xl shadow-md transition-all transform hover:scale-105 flex flex-col items-center justify-center"
          >
            <PawPrint className="h-10 w-10 mb-2" />
            <span>{t('nav.pets')}</span>
          </Link>
          
          <Link 
            href="/jogos" 
            className="bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700 text-blue-600 dark:text-blue-400 font-semibold py-6 px-4 rounded-xl shadow-md transition-all transform hover:scale-105 flex flex-col items-center justify-center"
          >
            <Gamepad2 className="h-10 w-10 mb-2" />
            <span>{t('nav.games')}</span>
          </Link>
          
          <Link 
            href="/bebes" 
            className="bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700 text-blue-600 dark:text-blue-400 font-semibold py-6 px-4 rounded-xl shadow-md transition-all transform hover:scale-105 flex flex-col items-center justify-center"
          >
            <Baby className="h-10 w-10 mb-2" />
            <span>{t('nav.babies')}</span>
          </Link>
          
          <Link 
            href="/aleatorios" 
            className="bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700 text-blue-600 dark:text-blue-400 font-semibold py-6 px-4 rounded-xl shadow-md transition-all transform hover:scale-105 flex flex-col items-center justify-center"
          >
            <Shuffle className="h-10 w-10 mb-2" />
            <span>{t('nav.random')}</span>
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
