'use client';

import { useState, useCallback, memo } from 'react';
import { Copy, Check } from 'lucide-react';
import AdBanner from './AdBanner';
import FavoriteButton from './FavoriteButton';
import ShareButtons from './ShareButtons';
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface NomeDisplayProps {
  nome: string;
  caracteristica?: string;
  corDestaque?: string;
  tamanho?: 'sm' | 'md' | 'lg';
  textoBotaoGerar?: string;
  onGerarNovo?: () => void;
  mostrarAnuncio?: boolean;
  categoria: 'pets' | 'jogos' | 'bebes' | 'aleatorios';
}

// Componente de anúncio memoizado para evitar re-renderizações desnecessárias
const MemoizedAdBanner = memo(AdBanner);

export default function NomeDisplay({
  nome,
  caracteristica,
  corDestaque = 'text-blue-400',
  tamanho = 'lg',
  textoBotaoGerar = 'Gerar outro',
  onGerarNovo,
  mostrarAnuncio = true,
  categoria
}: NomeDisplayProps) {
  const { t } = useLanguage();
  const [copiado, setCopiado] = useState(false);

  const tamanhoClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  const categoriaNomes = {
    pets: t('nav.pets').toLowerCase(),
    jogos: t('nav.games').toLowerCase(),
    bebes: t('nav.babies').toLowerCase(),
    aleatorios: t('random.title').toLowerCase()
  };

  const copiarParaClipboard = useCallback(() => {
    navigator.clipboard.writeText(nome);
    setCopiado(true);
    
    // Reseta o estado após 2 segundos
    setTimeout(() => {
      setCopiado(false);
    }, 2000);
  }, [nome]);

  const handleGerarNovo = useCallback(() => {
    if (onGerarNovo) {
      onGerarNovo();
    }
  }, [onGerarNovo]);

  // Função para destacar o nome na característica
  const renderizarCaracteristica = () => {
    if (!caracteristica) return null;
    
    // Divida as linhas em caso de quebras de linha
    const linhas = caracteristica.split('\n');
    
    return (
      <div className="text-gray-300 text-sm mt-4 mb-2 italic space-y-2">
        {linhas.map((linha, i) => {
          // Se a linha contém o nome, destacá-lo
          if (linha.includes(nome)) {
            const partes = linha.split(nome);
            return (
              <p key={i}>
                {partes.map((parte, index) => (
                  <React.Fragment key={index}>
                    {parte}
                    {index < partes.length - 1 && (
                      <span className={`font-semibold ${corDestaque}`}>{nome}</span>
                    )}
                  </React.Fragment>
                ))}
              </p>
            );
          }
          
          // Se for uma linha começando com "Significado:", destacar
          else if (linha.startsWith('Significado:')) {
            return (
              <p key={i} className="font-normal">
                <span className="font-medium">Significado:</span> 
                {linha.substring(12)}
              </p>
            );
          }
          
          // Caso contrário, exibe a linha normalmente
          return <p key={i}>{linha}</p>;
        })}
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full bg-[#1e293b] rounded-xl shadow-md p-6 text-center">
        <h2 className="text-gray-300 mb-2">
          {t('random.suggested')}
        </h2>
        <div className="relative flex justify-center items-center">
          <p className={`font-bold mb-2 ${tamanhoClasses[tamanho]} ${corDestaque} font-mono tracking-wide`}>
            {nome}
          </p>
          <div className="absolute right-0 flex items-center gap-2">
            <FavoriteButton name={nome} category={categoria} />
            <ShareButtons nome={nome} categoria={categoriaNomes[categoria]} />
            <button 
              onClick={copiarParaClipboard}
              className="p-2 text-gray-400 hover:text-gray-200 transition-colors"
              aria-label={t('button.copy')}
              title={t('button.copy')}
            >
              {copiado ? (
                <Check className="h-5 w-5 text-green-500" />
              ) : (
                <Copy className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Exibir a característica logo abaixo do nome */}
        {renderizarCaracteristica()}
        
        {onGerarNovo && (
          <button 
            className={`text-sm ${corDestaque} hover:underline`}
            onClick={handleGerarNovo}
          >
            {textoBotaoGerar}
          </button>
        )}
      </div>

      {/* Bloco de Anúncios */}
      {mostrarAnuncio && (
        <div className="ad-container">
          <MemoizedAdBanner adSlot={`${categoria}-slot`} />
        </div>
      )}
    </div>
  );
} 