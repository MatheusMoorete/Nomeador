'use client';

import { useState, useCallback, memo } from 'react';
import { Copy, Check } from 'lucide-react';
import AdBanner from './AdBanner';
import FavoriteButton from './FavoriteButton';
import ShareButtons from './ShareButtons';

interface NomeDisplayProps {
  nome: string;
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
  corDestaque = 'text-blue-400',
  tamanho = 'lg',
  textoBotaoGerar = 'Gerar outro',
  onGerarNovo,
  mostrarAnuncio = true,
  categoria
}: NomeDisplayProps) {
  const [copiado, setCopiado] = useState(false);

  const tamanhoClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  const categoriaNomes = {
    pets: 'pet',
    jogos: 'jogo',
    bebes: 'bebê',
    aleatorios: 'uso geral'
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

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full bg-[#1e293b] rounded-xl shadow-md p-6 text-center">
        <h2 className="text-gray-300 mb-2">
          Nome sugerido:
        </h2>
        <div className="relative flex justify-center items-center">
          <p className={`font-bold mb-4 ${tamanhoClasses[tamanho]} ${corDestaque} font-mono tracking-wide`}>
            {nome}
          </p>
          <div className="absolute right-0 flex items-center gap-2">
            <FavoriteButton name={nome} category={categoria} />
            <ShareButtons nome={nome} categoria={categoriaNomes[categoria]} />
            <button 
              onClick={copiarParaClipboard}
              className="p-2 text-gray-400 hover:text-gray-200 transition-colors"
              aria-label="Copiar nome"
              title="Copiar para a área de transferência"
            >
              {copiado ? (
                <Check className="h-5 w-5 text-green-500" />
              ) : (
                <Copy className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
        
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