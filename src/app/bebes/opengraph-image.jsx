import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Nomeador - Gerador de Nomes para Bebês';
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
          background: 'linear-gradient(to right, #0f172a, #3b82f6)',
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
        <div style={{ fontSize: 64, fontWeight: 'bold', marginBottom: 16 }}>
          Nomeador
        </div>
        <div style={{ fontSize: 48, marginBottom: 24 }}>
          Gerador de Nomes para Bebês
        </div>
        <div style={{ 
          fontSize: 28, 
          maxWidth: '80%',
          color: 'rgba(255, 255, 255, 0.8)'
        }}>
          Encontre o nome perfeito para seu bebê com significados e origens
        </div>
      </div>
    ),
  );
} 