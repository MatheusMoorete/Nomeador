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
          position: 'relative',
        }}
      >
        <div style={{ 
          position: 'absolute', 
          top: 40, 
          right: 40, 
          fontSize: 24, 
          opacity: 0.8,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          padding: '8px 16px',
          borderRadius: 8,
        }}>
          nomeador.com
        </div>
        <div style={{ fontSize: 72, fontWeight: 'bold', marginBottom: 16 }}>
          Nomeador
        </div>
        <div style={{ fontSize: 36, marginBottom: 32, maxWidth: '80%' }}>
          Gerador de nomes para pets, jogos, bebês e muito mais!
        </div>
        <div style={{ 
          display: 'flex', 
          gap: 20,
          marginTop: 20,
        }}>
          <div style={{ 
            padding: '12px 16px', 
            borderRadius: 8, 
            border: '2px solid rgba(255, 255, 255, 0.3)',
            fontSize: 24,
          }}>
            Pets
          </div>
          <div style={{ 
            padding: '12px 16px', 
            borderRadius: 8, 
            border: '2px solid rgba(255, 255, 255, 0.3)',
            fontSize: 24,
          }}>
            Jogos
          </div>
          <div style={{ 
            padding: '12px 16px', 
            borderRadius: 8, 
            border: '2px solid rgba(255, 255, 255, 0.3)',
            fontSize: 24,
          }}>
            Bebês
          </div>
          <div style={{ 
            padding: '12px 16px', 
            borderRadius: 8, 
            border: '2px solid rgba(255, 255, 255, 0.3)',
            fontSize: 24,
          }}>
            Aleatórios
          </div>
        </div>
      </div>
    ),
  );
} 