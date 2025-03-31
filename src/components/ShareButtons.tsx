'use client';

import { Share2, Copy, Check, Mail, Facebook, Send, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ShareButtonsProps {
  nome: string;
  categoria: string;
}

export default function ShareButtons({ nome, categoria }: ShareButtonsProps) {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  // Fecha o menu quando clica fora dele
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const mensagem = t('share.message').replace('{name}', nome).replace('{category}', categoria);
  const urlSite = 'https://nomeador.com';
  const mensagemCompleta = `${mensagem} ${urlSite}`;
  
  const copiarLink = () => {
    navigator.clipboard.writeText(mensagemCompleta);
    setCopiado(true);
    
    setTimeout(() => {
      setCopiado(false);
    }, 2000);
    
    setIsMenuOpen(false);
  };
  
  // Componente SVG para o WhatsApp
  const WhatsAppIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" height="20" width="20">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 1C5.935 1 1 5.935 1 12s4.935 11 11 11 11-4.935 11-11S18.065 1 12 1zm6.095 15.368c-.424 1.193-1.425 2.062-2.658 2.34-1.163.261-2.539.157-3.935-.41-1.654-.667-3.254-1.722-4.568-3.035-1.118-1.118-2.058-2.529-2.617-4.025-.466-1.242-.555-2.613-.224-3.888.334-1.285 1.127-2.43 2.289-3.010C7.052 4.113 7.9 4.042 8.453 4.5c.44.359.535.888.588 1.408.06.57.173 1.18.305 1.74a.88.88 0 01-.147.805l-.761.913c-.135.162-.179.363-.128.554.63 2.33 2.268 4.006 4.485 4.817.219.08.454.046.622-.085l.891-.702c.2-.158.441-.193.67-.105.582.224 1.208.43 1.867.602.351.092.714.145 1.059.145.443 0 .868-.131 1.22-.37.353-.24.618-.579.78-.964a.953.953 0 00-.071-.96c-.207-.373-.486-.74-.784-1.089-.149-.17-.212-.38-.192-.592.03-.317.121-.733.161-1.143.044-.463.003-.936-.422-1.192-.427-.256-1.094-.172-1.615.031a8.872 8.872 0 00-1.372.699c-.163.103-.362.115-.553.032a13.734 13.734 0 00-5.628-1.197c-.238 0-.457.13-.571.339l-.497.86c-.068.118-.06.264.018.375.078.11.217.176.359.176 1.642.002 3.236.447 4.66 1.273.167.097.373.08.521-.043.151-.127.304-.252.462-.371.255-.19.62-.207.887-.05.102.06.205.175.187.44-.023.313-.111.707-.138.983-.031.316.065.614.28.839.287.301.553.623.759.962.058.095.123.182.194.266.071.083.111.186.11.293a.338.338 0 01-.277.33" />
    </svg>
  );

  const shareLinks = [
    {
      name: 'WhatsApp',
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(mensagemCompleta)}`,
      color: 'bg-green-500 hover:bg-green-600',
      hoverColor: 'hover:bg-green-600',
      borderColor: 'border-green-600',
      label: t('share.whatsapp'),
      icon: <WhatsAppIcon />
    },
    {
      name: 'Telegram',
      url: `https://t.me/share/url?url=${encodeURIComponent(urlSite)}&text=${encodeURIComponent(mensagem)}`,
      color: 'bg-blue-500 hover:bg-blue-600',
      hoverColor: 'hover:bg-blue-600',
      borderColor: 'border-blue-600',
      label: t('share.telegram'),
      icon: <Send className="h-5 w-5" />
    },
    {
      name: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlSite)}&quote=${encodeURIComponent(mensagem)}`,
      color: 'bg-[#3b5998] hover:bg-[#2d4373]',
      hoverColor: 'hover:bg-[#2d4373]',
      borderColor: 'border-[#3b5998]',
      label: t('share.facebook'),
      icon: <Facebook className="h-5 w-5" />
    },
    {
      name: 'X / Twitter',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(mensagemCompleta)}`,
      color: 'bg-black hover:bg-gray-800',
      hoverColor: 'hover:bg-gray-800',
      borderColor: 'border-gray-800',
      label: t('share.twitter'),
      icon: <X className="h-5 w-5" />
    },
    {
      name: 'Email',
      url: `mailto:?subject=${t('share.email.subject').replace('{category}', categoria)}&body=${encodeURIComponent(mensagemCompleta)}`,
      color: 'bg-gray-600 hover:bg-gray-700',
      hoverColor: 'hover:bg-gray-700',
      borderColor: 'border-gray-600',
      label: t('share.email'),
      icon: <Mail className="h-5 w-5" />
    },
  ];

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="p-2 text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-110"
        aria-label={t('button.share')}
        title={t('button.share')}
      >
        <Share2 className="h-5 w-5" />
      </button>
      
      {isMenuOpen && (
        <div 
          ref={menuRef}
          className="absolute right-0 mt-3 w-64 bg-[#1e293b]/95 backdrop-blur-sm rounded-xl shadow-xl z-50 overflow-hidden border border-[#2d3748] animate-fadeIn"
          style={{
            animation: 'fadeIn 0.2s ease-out',
            transformOrigin: 'top right'
          }}
        >
          <div className="p-2">
            <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2 px-2">
              {t('share.title').replace('{name}', nome)}
            </h3>
            
            <div className="grid grid-cols-5 gap-2 mb-3">
              {shareLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-300 hover:scale-105 ${link.hoverColor} text-white border border-transparent ${link.borderColor} opacity-90 hover:opacity-100`}
                  onClick={() => setIsMenuOpen(false)}
                  title={link.label}
                >
                  <div className="p-2 rounded-full">
                    {link.icon}
                  </div>
                </a>
              ))}
            </div>
            
            <div className="border-t border-[#2d3748] pt-2">
              <button
                onClick={copiarLink}
                className={`flex items-center w-full px-4 py-2 text-sm rounded-lg text-white transition-all duration-300 ${
                  copiado 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-purple-600 hover:bg-purple-700'
                }`}
              >
                {copiado ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    <span>{t('share.copied')}</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    <span>{t('share.copy')}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}