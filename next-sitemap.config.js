/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.nomeador.com',
  generateRobotsTxt: true, // Gerar robots.txt
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://www.nomeador.com/sitemap-0.xml', // Sitemap adicional
    ],
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/api/*'] },
    ],
  },
  outDir: 'public',
  exclude: ['/404', '/500', '/api/*'],
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000, // Tamanho máximo do sitemap
  transform: async (config, path) => {
    let priority = 0.7;
    let changefreq = 'weekly';
    let alternateRefs = [];

    // Configurações específicas por caminho
    if (path === '/') {
      // Página inicial - máxima prioridade
      priority = 1.0;
      changefreq = 'daily';
      alternateRefs = [
        { href: 'https://www.nomeador.com/en', hreflang: 'en' },
        { href: 'https://www.nomeador.com', hreflang: 'pt-BR' },
        { href: 'https://www.nomeador.com', hreflang: 'x-default' },
      ];
    } 
    // Páginas principais de categorias
    else if (path === '/pets' || path === '/jogos' || path === '/bebes' || path === '/aleatorios') {
      priority = 0.9;
      changefreq = 'daily';
      
      // Adicionar versões localizadas
      const pathBase = path;
      alternateRefs = [
        { href: `https://www.nomeador.com/en${pathBase}`, hreflang: 'en' },
        { href: `https://www.nomeador.com${pathBase}`, hreflang: 'pt-BR' },
      ];
    } 
    // Página de favoritos
    else if (path === '/favoritos') {
      priority = 0.8;
      changefreq = 'weekly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: alternateRefs,
    };
  },
  additionalPaths: async (config) => {
    const result = [];
    
    // Adicionar versões em inglês das páginas principais
    const mainPages = ['/pets', '/jogos', '/bebes', '/aleatorios', '/favoritos'];
    
    for (const page of mainPages) {
      result.push({
        loc: `/en${page}`,
        changefreq: 'daily',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      });
    }
    
    return result;
  },
}; 