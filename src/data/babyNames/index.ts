import { Language } from '@/contexts/LanguageContext';
import { ptData } from './pt';
import { enData } from './en';
import { esData } from './es';

// Interface para um nome completo de bebê
export interface NomeCompleto {
  nome: string;
  significado: string;
  caracteristica: string;
}

// Interface para categorias de nomes de bebês
export interface BabyNameData {
  meninos: {
    brasileiro: NomeCompleto[];
    internacional: NomeCompleto[];
    classico: NomeCompleto[];
  };
  meninas: {
    brasileiro: NomeCompleto[];
    internacional: NomeCompleto[];
    classico: NomeCompleto[];
  };
  neutros: {
    brasileiro: NomeCompleto[];
    internacional: NomeCompleto[];
    moderno: NomeCompleto[];
  };
}

// Mapeamento de idiomas para dados
const dataByLanguage: Record<Language, BabyNameData> = {
  pt: ptData,
  en: enData,
  es: esData
};

// Função para obter os dados com base no idioma
export function getBabyNameData(language: Language): BabyNameData {
  return dataByLanguage[language] || ptData; // Retorna português como fallback
}

// Exportações diretas para compatibilidade com código existente
export const nomesMeninoCompletos = ptData.meninos;
export const nomesMeninaCompletas = ptData.meninas;
export const nomesNeutrosCompletos = ptData.neutros; 