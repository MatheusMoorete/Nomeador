'use client';

import Link from "next/link";
import { PawPrint, Gamepad2, Baby, Shuffle, Star, Search, ArrowRight } from 'lucide-react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import PageTransition from '@/components/PageTransition';

export default function Home() {
  const { t, language } = useLanguage();
  
  // Obter o nome do site com base no idioma
  const getSiteName = () => {
    return language === 'en' ? 'Nominator' : 'Nomeador';
  };
  
  return (
    <PageTransition>
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      
        <main className="flex-grow flex flex-col items-center w-full max-w-5xl px-4 mx-auto py-8">
          <section className="text-center mb-12">
        <h1 className="text-5xl sm:text-6xl font-bold text-blue-600 dark:text-blue-400 mb-4">
              {getSiteName()}
        </h1>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              {t('site.description')}
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
                100% Gratuito
              </span>
              <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium">
                Sem cadastro
              </span>
              <span className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full text-sm font-medium">
                Com IA
              </span>
              <span className="bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 px-3 py-1 rounded-full text-sm font-medium">
                Online
              </span>
            </div>
          </section>
          
          <section className="w-full max-w-3xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full mb-12">
          <Link 
            href="/pets" 
                className="bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700 text-blue-600 dark:text-blue-400 font-semibold py-8 px-4 rounded-xl shadow-md transition-all transform hover:scale-105 flex flex-col items-center justify-center h-40"
                aria-label="Ir para gerador de nomes para pets"
          >
                <PawPrint className="h-10 w-10 mb-2" aria-hidden="true" />
                <span className="text-lg font-bold">{t('nav.pets')}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 px-2 text-center">{t('card.pets.subtitle')}</span>
          </Link>
          
          <Link 
            href="/jogos" 
                className="bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700 text-blue-600 dark:text-blue-400 font-semibold py-8 px-4 rounded-xl shadow-md transition-all transform hover:scale-105 flex flex-col items-center justify-center h-40"
                aria-label="Ir para gerador de nomes para jogos"
          >
                <Gamepad2 className="h-10 w-10 mb-2" aria-hidden="true" />
                <span className="text-lg font-bold">{t('nav.games')}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 px-2 text-center">{t('card.games.subtitle')}</span>
          </Link>
          
          <Link 
            href="/bebes" 
                className="bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700 text-blue-600 dark:text-blue-400 font-semibold py-8 px-4 rounded-xl shadow-md transition-all transform hover:scale-105 flex flex-col items-center justify-center h-40"
                aria-label="Ir para gerador de nomes para bebês"
          >
                <Baby className="h-10 w-10 mb-2" aria-hidden="true" />
                <span className="text-lg font-bold">{t('nav.babies')}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 px-2 text-center">{t('card.babies.subtitle')}</span>
          </Link>
          
          <Link 
            href="/aleatorios" 
                className="bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700 text-blue-600 dark:text-blue-400 font-semibold py-8 px-4 rounded-xl shadow-md transition-all transform hover:scale-105 flex flex-col items-center justify-center h-40"
                aria-label="Ir para gerador de nomes aleatórios"
              >
                <Shuffle className="h-10 w-10 mb-2" aria-hidden="true" />
                <span className="text-lg font-bold">{t('nav.random')}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 px-2 text-center">{t('card.random.subtitle')}</span>
              </Link>
            </div>
          </section>
          
          <section className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-12">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              {language === 'en' 
                ? 'Why use Nominator?' 
                : language === 'es' 
                  ? '¿Por qué usar Nomeador?' 
                  : 'Por que usar o Nomeador?'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full mr-4">
                  <Star className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                    {language === 'en' 
                      ? 'Intelligent Name Generation' 
                      : language === 'es' 
                        ? 'Generación Inteligente de Nombres' 
                        : 'Geração Inteligente de Nomes'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {language === 'en' 
                      ? 'Uses AI to create unique, personalized names for any purpose.'
                      : language === 'es'
                        ? 'Utiliza inteligencia artificial para crear nombres únicos y personalizados para cualquier finalidad.'
                        : 'Utiliza inteligência artificial para criar nomes únicos e personalizados para qualquer finalidade.'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full mr-4">
                  <Search className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                    {language === 'en' 
                      ? 'Multiple Categories' 
                      : language === 'es' 
                        ? 'Múltiples Categorías' 
                        : 'Várias Categorias'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {language === 'en' 
                      ? 'Find the perfect name for pets, games, babies, or anything else.'
                      : language === 'es'
                        ? 'Encuentra el nombre perfecto para mascotas, juegos, bebés o cualquier otra finalidad.'
                        : 'Encontre o nome perfeito para pets, jogos, bebês ou qualquer outra finalidade.'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full mr-4">
                  <ArrowRight className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                    {language === 'en' 
                      ? 'Save Your Favorites' 
                      : language === 'es' 
                        ? 'Guarda tus Favoritos' 
                        : 'Salve seus Favoritos'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {language === 'en' 
                      ? 'Create a collection of your favorite names for future reference.'
                      : language === 'es'
                        ? 'Crea una colección de tus nombres favoritos para referencia futura.'
                        : 'Crie uma coleção dos seus nomes favoritos para referência futura.'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-amber-100 dark:bg-amber-900 p-3 rounded-full mr-4">
                  <Shuffle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                    {language === 'en' 
                      ? 'Works Offline Too' 
                      : language === 'es' 
                        ? 'Funciona Sin Conexión También' 
                        : 'Funciona Offline Também'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {language === 'en' 
                      ? 'Install as an app on your device and use it even without internet connection.'
                      : language === 'es'
                        ? 'Instálalo como una aplicación en tu dispositivo y úsalo incluso sin conexión a internet.'
                        : 'Instale como um aplicativo no seu celular ou computador e use mesmo sem conexão à internet.'}
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          <section className="w-full max-w-4xl mb-8">
            <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200 mb-4">
              {language === 'en' 
                ? 'Popular Searches' 
                : language === 'es' 
                  ? 'Búsquedas Populares' 
                  : 'Buscas Populares'}
            </h2>
            
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/pets" className="bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-lg text-sm transition-colors">
                Nomes para gatos
              </Link>
              <Link href="/pets" className="bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-lg text-sm transition-colors">
                Nomes para cachorros
              </Link>
              <Link href="/jogos" className="bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-lg text-sm transition-colors">
                Nicks para jogos
              </Link>
              <Link href="/bebes" className="bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-lg text-sm transition-colors">
                Nomes para bebês
              </Link>
              <Link href="/jogos" className="bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-lg text-sm transition-colors">
                Nomes para RPG
              </Link>
              <Link href="/aleatorios" className="bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-lg text-sm transition-colors">
                Nomes para empresas
          </Link>
        </div>
          </section>
          
          <section className="w-full max-w-4xl mb-12">
            <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200 mb-6">
              {language === 'en' 
                ? 'Frequently Asked Questions' 
                : language === 'es' 
                  ? 'Preguntas Frecuentes' 
                  : 'Perguntas Frequentes'}
            </h2>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {language === 'en' 
                      ? 'How does the name generator work?' 
                      : language === 'es' 
                        ? '¿Cómo funciona el generador de nombres?' 
                        : 'Como funciona o gerador de nomes?'}
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    {language === 'en' 
                      ? 'Our name generator uses artificial intelligence to create unique names. You can choose between online mode (using AI) or offline mode (using our pre-built name database).'
                      : language === 'es'
                        ? 'Nuestro generador de nombres utiliza inteligencia artificial para crear nombres únicos. Puedes elegir entre el modo en línea (usando IA) o el modo sin conexión (usando nuestra base de datos de nombres predefinida).'
                        : 'Nosso gerador de nomes utiliza inteligência artificial para criar nomes únicos. Você pode escolher entre o modo online (usando IA) ou o modo offline (usando nossa base de dados de nomes pré-construída).'}
                  </p>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {language === 'en' 
                      ? 'Is it completely free?' 
                      : language === 'es' 
                        ? '¿Es completamente gratuito?' 
                        : 'É completamente gratuito?'}
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    {language === 'en'
                      ? 'Yes, Nominator is 100% free to use. There are no hidden fees or premium features that require payment.'
                      : language === 'es'
                        ? 'Sí, Nomeador es 100% gratuito. No hay tarifas ocultas ni funciones premium que requieran pago.'
                        : 'Sim, o Nomeador é 100% gratuito para usar. Não há taxas ocultas ou recursos premium que exigem pagamento.'}
                  </p>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {language === 'en' 
                      ? 'Can I save names I like?' 
                      : language === 'es' 
                        ? '¿Puedo guardar los nombres que me gustan?' 
                        : 'Posso salvar nomes que eu gostar?'}
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    {language === 'en'
                      ? 'Absolutely! Click the heart icon next to any name you like to add it to your favorites. You can view and manage your saved names in the Favorites section.'
                      : language === 'es'
                        ? '¡Absolutamente! Haz clic en el icono de corazón junto a cualquier nombre que te guste para añadirlo a tus favoritos. Puedes ver y gestionar tus nombres guardados en la sección Favoritos.'
                        : 'Absolutamente! Clique no ícone de coração ao lado de qualquer nome que você gostar para adicioná-lo aos seus favoritos. Você pode visualizar e gerenciar seus nomes salvos na seção Favoritos.'}
                  </p>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {language === 'en' 
                      ? 'Does it work offline?' 
                      : language === 'es' 
                        ? '¿Funciona sin conexión?' 
                        : 'Funciona offline?'}
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    {language === 'en'
                      ? 'Yes! You can install Nominator as an app on your device and use it even when you don\'t have an internet connection.'
                      : language === 'es'
                        ? '¡Sí! Puedes instalar Nomeador como una aplicación en tu dispositivo y usarlo incluso cuando no tengas conexión a internet.'
                        : 'Sim! Você pode instalar o Nomeador como um aplicativo no seu celular ou computador e usá-lo mesmo quando estiver sem internet.'}
                  </p>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {language === 'en' 
                      ? 'Are the names unique?' 
                      : language === 'es' 
                        ? '¿Los nombres son únicos?' 
                        : 'Os nomes são únicos?'}
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    {language === 'en'
                      ? 'Our generator creates a mix of traditional and unique names. When using the AI mode, you\'ll get more creative and unique results tailored to your preferences.'
                      : language === 'es'
                        ? 'Nuestro generador crea una mezcla de nombres tradicionales y únicos. Al utilizar el modo IA, obtendrás resultados más creativos y exclusivos adaptados a tus preferencias.'
                        : 'Nosso gerador cria uma mistura de nomes tradicionais e únicos. Ao usar o modo IA, você obterá resultados mais criativos e exclusivos adaptados às suas preferências.'}
                  </p>
                </div>
              </div>
            </div>
          </section>
      </main>
      
      <Footer />
    </div>
    </PageTransition>
  );
}
