/* Imagen Open Graph dinámica (redes sociales / previsualización de enlaces) */
/* Autor: Ing. J Sebastian Vargas S */

import { ImageResponse } from 'next/og'

export const alt = 'VARSAL Systems — Soluciones tecnológicas empresariales'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(150deg, #0B1120 0%, #172554 55%, #1E3A8A 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            width: 64,
            height: 8,
            borderRadius: 4,
            background: 'linear-gradient(90deg, #2563EB, #7C3AED)',
            marginBottom: 40,
          }}
        />
        <div style={{ display: 'flex', fontSize: 84, fontWeight: 800, color: '#FFFFFF', letterSpacing: -2 }}>
          VARSAL
          <span style={{ color: '#60A5FA', marginLeft: 20 }}>Systems</span>
        </div>
        <div style={{ fontSize: 36, color: 'rgba(255,255,255,0.75)', marginTop: 24, maxWidth: 900, lineHeight: 1.3 }}>
          Software a medida, cloud y automatización para impulsar su empresa.
        </div>
        <div style={{ display: 'flex', fontSize: 28, color: 'rgba(255,255,255,0.55)', marginTop: 48 }}>
          varsalsystems.com
        </div>
      </div>
    ),
    { ...size }
  )
}
