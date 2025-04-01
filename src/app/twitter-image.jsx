import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Nomeador - Gerador de Nomes';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: 'linear-gradient(135deg, #0f172a, #3b82f6)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          textAlign: 'center',
          color: 'white',
          padding: 32,
        }}
      >
        <div style={{ 
          position: 'absolute', 
          bottom: 40, 
          right: 40, 
          fontSize: 24, 
          opacity: 0.8 
        }}>
          @nomeador
        </div>
        <div style={{ fontSize: 72, fontWeight: 'bold', marginBottom: 16 }}>
          Nomeador
        </div>
        <div style={{ fontSize: 36, marginBottom: 24, maxWidth: '80%' }}>
          Gerador de nomes inteligente
        </div>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 16,
          fontSize: 28,
          opacity: 0.9,
        }}>
          <div>Pets • Jogos • Bebês • Aleatórios</div>
        </div>
      </div>
    ),
  );
} 