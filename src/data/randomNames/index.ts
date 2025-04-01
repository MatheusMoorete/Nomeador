import { Language } from '@/contexts/LanguageContext';
import { ptData } from './pt';
import { enData } from './en';
import { esData } from './es';

// Tipo para os dados de nome aleatório
export type RandomNameData = typeof ptData;

// Mapeamento de idiomas para dados
const dataByLanguage: Record<Language, RandomNameData> = {
  pt: ptData,
  en: enData,
  es: esData
};

// Função para obter os dados com base no idioma
export function getRandomNameData(language: Language): RandomNameData {
  return dataByLanguage[language] || ptData; // Retorna português como fallback
}

// Exportação direta para compatibilidade com código existente
export const substantivos = ptData.substantivos;
export const adjetivos = ptData.adjetivos;
export const verbos = ptData.verbos;
export const sufixosCriativos = ptData.sufixos;
export const prefixosCriativos = ptData.prefixos;
export const silabas = ptData.silabas;
export const elementosNatureza = ptData.elementosNatureza;
export const mitologiaEntidades = ptData.mitologiaEntidades;
export const cores = ptData.cores;
export const numerosFantasia = ptData.numeros; 