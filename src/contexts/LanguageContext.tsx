'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Definindo os idiomas suportados
export type Language = 'pt' | 'en' | 'es';

// Interface para o contexto
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Criando o contexto com um valor padrão
const LanguageContext = createContext<LanguageContextType>({
  language: 'pt',
  setLanguage: () => {},
  t: (key: string) => key,
});

// Hook personalizado para usar o contexto
export const useLanguage = () => useContext(LanguageContext);

// Traduções
const translations: Record<Language, Record<string, string>> = {
  pt: {
    // Textos da interface geral
    'site.title': 'Nomeador - Gerador de Nomes',
    'site.description': 'Gerador de nomes para pets, jogos, bebês e muito mais!',

    // Menu e navegação
    'nav.home': 'Início',
    'nav.pets': 'Pets',
    'nav.games': 'Jogos',
    'nav.babies': 'Bebês',
    'nav.random': 'Aleatórios',
    'nav.favorites': 'Favoritos',

    // Subtítulos dos cards
    'card.pets.subtitle': 'Nomes criativos para seu animal de estimação',
    'card.games.subtitle': 'Apelidos e tags para jogadores',
    'card.babies.subtitle': 'Inspiração para nomes de bebês',
    'card.random.subtitle': 'Nomes únicos para qualquer finalidade',

    // Botões e ações
    'button.generate': 'Gerar Nome',
    'button.generating': 'Gerando...',
    'button.generate.another': 'Gerar outro nome',
    'button.copy': 'Copiar',
    'button.copied': 'Copiado!',
    'button.share': 'Compartilhar',
    'button.favorite': 'Adicionar aos favoritos',
    'button.unfavorite': 'Remover dos favoritos',
    'button.clear': 'Limpar todos',

    // Página aleatória
    'random.title': 'Nomes Aleatórios',
    'random.description': 'Crie nomes incomuns e interessantes para qualquer finalidade',
    'random.style': 'Estilo do Nome',
    'random.compound': 'Composto',
    'random.fantasy': 'Fantasia',
    'random.action': 'Ação',
    'random.syllables': 'Sílabas',
    'random.elements': 'Elementos',
    'random.mythology': 'Mitologia',
    'random.colors': 'Cores',
    'random.media': 'Mídia',
    'random.numbers': 'Números',
    'random.length': 'Comprimento',
    'random.short': 'Curto',
    'random.medium': 'Médio',
    'random.long': 'Longo',
    'random.previous': 'Nomes anteriores:',
    'random.suggested': 'Nome sugerido:',

    // Página de favoritos
    'favorites.empty': 'Você ainda não adicionou nenhum nome aos favoritos.',
    'favorites.explore': 'Explorar nomes',
    'favorites.saved': 'Salvo em',

    // Rodapé
    'footer.rights': 'Todos os direitos reservados.',

    // Compartilhamento
    'share.title': 'Compartilhar "{name}"',
    'share.message': 'O que acham do nome {name} para meu {category}?',
    'share.copy': 'Copiar mensagem',
    'share.copied': 'Mensagem copiada!',
    'share.whatsapp': 'Compartilhar no WhatsApp',
    'share.telegram': 'Compartilhar no Telegram',
    'share.facebook': 'Compartilhar no Facebook',
    'share.twitter': 'Compartilhar no X',
    'share.email': 'Enviar por email',
    'share.email.subject': 'Sugestão de nome para {category}'
  },
  en: {
    // General interface texts
    'site.title': 'Nominator - Name Generator',
    'site.description': 'Generate names for pets, games, babies and more!',

    // Menu and navigation
    'nav.home': 'Home',
    'nav.pets': 'Pets',
    'nav.games': 'Games',
    'nav.babies': 'Babies',
    'nav.random': 'Random',
    'nav.favorites': 'Favorites',
    
    // Card subtitles
    'card.pets.subtitle': 'Creative names for your pet',
    'card.games.subtitle': 'Nicknames and tags for gamers',
    'card.babies.subtitle': 'Inspiration for baby names',
    'card.random.subtitle': 'Unique names for any purpose',

    // Buttons and actions
    'button.generate': 'Generate Name',
    'button.generating': 'Generating...',
    'button.generate.another': 'Generate another name',
    'button.copy': 'Copy',
    'button.copied': 'Copied!',
    'button.share': 'Share',
    'button.favorite': 'Add to favorites',
    'button.unfavorite': 'Remove from favorites',
    'button.clear': 'Clear all',

    // Random page
    'random.title': 'Random Names',
    'random.description': 'Create unusual and interesting names for any purpose',
    'random.style': 'Name Style',
    'random.compound': 'Compound',
    'random.fantasy': 'Fantasy',
    'random.action': 'Action',
    'random.syllables': 'Syllables',
    'random.elements': 'Elements',
    'random.mythology': 'Mythology',
    'random.colors': 'Colors',
    'random.media': 'Media',
    'random.numbers': 'Numbers',
    'random.length': 'Length',
    'random.short': 'Short',
    'random.medium': 'Medium',
    'random.long': 'Long',
    'random.previous': 'Previous names:',
    'random.suggested': 'Suggested name:',

    // Favorites page
    'favorites.empty': 'You haven\'t added any names to favorites yet.',
    'favorites.explore': 'Explore names',
    'favorites.saved': 'Saved on',

    // Footer
    'footer.rights': 'All rights reserved.',

    // Sharing
    'share.title': 'Share "{name}"',
    'share.message': 'What do you think of the name {name} for my {category}?',
    'share.copy': 'Copy message',
    'share.copied': 'Message copied!',
    'share.whatsapp': 'Share on WhatsApp',
    'share.telegram': 'Share on Telegram',
    'share.facebook': 'Share on Facebook',
    'share.twitter': 'Share on X',
    'share.email': 'Send by email',
    'share.email.subject': 'Name suggestion for {category}'
  },
  es: {
    // Textos de interfaz general
    'site.title': 'Generador de Nombres',
    'site.description': '¡Genera nombres para mascotas, juegos, bebés y más!',

    // Menú y navegación
    'nav.home': 'Inicio',
    'nav.pets': 'Mascotas',
    'nav.games': 'Juegos',
    'nav.babies': 'Bebés',
    'nav.random': 'Aleatorios',
    'nav.favorites': 'Favoritos',
    
    // Subtítulos de tarjetas
    'card.pets.subtitle': 'Nombres creativos para tu mascota',
    'card.games.subtitle': 'Apodos y tags para jugadores',
    'card.babies.subtitle': 'Inspiración para nombres de bebés',
    'card.random.subtitle': 'Nombres únicos para cualquier propósito',

    // Botones y acciones
    'button.generate': 'Generar Nombre',
    'button.generating': 'Generando...',
    'button.generate.another': 'Generar otro nombre',
    'button.copy': 'Copiar',
    'button.copied': '¡Copiado!',
    'button.share': 'Compartir',
    'button.favorite': 'Añadir a favoritos',
    'button.unfavorite': 'Quitar de favoritos',
    'button.clear': 'Borrar todos',

    // Página aleatoria
    'random.title': 'Nombres Aleatorios',
    'random.description': 'Crea nombres inusuales e interesantes para cualquier propósito',
    'random.style': 'Estilo de Nombre',
    'random.compound': 'Compuesto',
    'random.fantasy': 'Fantasía',
    'random.action': 'Acción',
    'random.syllables': 'Sílabas',
    'random.elements': 'Elementos',
    'random.mythology': 'Mitología',
    'random.colors': 'Colores',
    'random.media': 'Medios',
    'random.numbers': 'Números',
    'random.length': 'Longitud',
    'random.short': 'Corto',
    'random.medium': 'Medio',
    'random.long': 'Largo',
    'random.previous': 'Nombres anteriores:',
    'random.suggested': 'Nombre sugerido:',

    // Página de favoritos
    'favorites.empty': 'Todavía no has añadido ningún nombre a favoritos.',
    'favorites.explore': 'Explorar nombres',
    'favorites.saved': 'Guardado el',

    // Pie de página
    'footer.rights': 'Todos los derechos reservados.',

    // Compartir
    'share.title': 'Compartir "{name}"',
    'share.message': '¿Qué piensas del nombre {name} para mi {category}?',
    'share.copy': 'Copiar mensaje',
    'share.copied': '¡Mensaje copiado!',
    'share.whatsapp': 'Compartir en WhatsApp',
    'share.telegram': 'Compartir en Telegram',
    'share.facebook': 'Compartir en Facebook',
    'share.twitter': 'Compartir en X',
    'share.email': 'Enviar por correo',
    'share.email.subject': 'Sugerencia de nombre para {category}'
  },
};

// Provedor do contexto
interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  // Inicializa com o idioma do navegador ou português como padrão
  const [language, setLanguageState] = useState<Language>('pt');

  useEffect(() => {
    // Verifica o idioma salvo no localStorage
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['pt', 'en', 'es'].includes(savedLanguage)) {
      setLanguageState(savedLanguage);
    } else {
      // Detecta o idioma do navegador
      const browserLang = navigator.language.split('-')[0] as Language;
      // Se o idioma do navegador for suportado, usa ele
      if (['pt', 'en', 'es'].includes(browserLang)) {
        setLanguageState(browserLang);
      }
      // Caso contrário, mantém o português como padrão
    }
  }, []);

  // Função para mudar o idioma e salvar no localStorage
  const setLanguage = (lang: Language) => {
    // Verifica se o idioma realmente mudou para evitar recargas desnecessárias
    if (language !== lang) {
      setLanguageState(lang);
      localStorage.setItem('language', lang);
      
      // Trigger a re-render on all components that use translations
      // by invoking a state change in the parent component
      if (typeof window !== 'undefined') {
        // Podemos usar um pequeno timeout para garantir que o localStorage seja atualizado
        setTimeout(() => {
          // Em vez de recarregar a página, vamos fazer uma mudança de estado que propague
          setLanguageState(() => {
            // Mantém o mesmo valor, mas força uma re-renderização
            return lang;
          });
        }, 50);
      }
    }
  };

  // Função de tradução
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
} 