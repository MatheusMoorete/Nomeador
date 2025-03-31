'use client';

import { useState, useEffect, useRef } from 'react';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  // Fechamento do menu ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Lista de idiomas disponíveis
  const languages: Record<Language, string> = {
    pt: 'Português',
    en: 'English',
    es: 'Español'
  };
  
  // Bandeiras dos países (usando emojis de bandeiras)
  const flags: Record<Language, string> = {
    pt: '🇧🇷',
    en: '🇺🇸',
    es: '🇪🇸'
  };
  
  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-gray-300 hover:text-blue-400 p-1 rounded-md transition-all duration-150"
        aria-label="Selecionar idioma"
      >
        <Globe className="w-5 h-5 mr-1" />
        <span className="hidden sm:inline-flex items-center">
          <span className="mx-1">{flags[language]}</span>
          <span className="text-sm">{languages[language]}</span>
        </span>
        <span className="sm:hidden inline-block ml-1">{flags[language]}</span>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 bg-[#1e293b] shadow-lg rounded-md overflow-hidden z-50 border border-[#2d3748] animate-fadeIn">
          <div className="py-1">
            {Object.entries(languages).map(([code, name]) => (
              <button
                key={code}
                className={`flex items-center w-full px-4 py-2 text-sm text-left ${
                  language === code
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-[#374151]'
                }`}
                onClick={() => {
                  setLanguage(code as Language);
                  setIsOpen(false);
                }}
              >
                <span className="mr-2">{flags[code as Language]}</span>
                {name}
              </button>
            ))}
          </div>
        </div>
      )}
      
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.15s ease-out forwards;
        }
      `}</style>
    </div>
  );
} 