'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#111827] py-6 shadow-inner border-t border-[#1e293b]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} Nomeador. {t('footer.rights')}
            </p>
          </div>
          
          <nav className="flex space-x-4">
            <Link href="/pets" className="text-gray-400 hover:text-blue-400 text-sm">
              {t('nav.pets')}
            </Link>
            <Link href="/jogos" className="text-gray-400 hover:text-blue-400 text-sm">
              {t('nav.games')}
            </Link>
            <Link href="/bebes" className="text-gray-400 hover:text-blue-400 text-sm">
              {t('nav.babies')}
            </Link>
            <Link href="/aleatorios" className="text-gray-400 hover:text-blue-400 text-sm">
              {t('nav.random')}
            </Link>
            <Link href="/favoritos" className="text-gray-400 hover:text-blue-400 text-sm">
              {t('nav.favorites')}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
} 