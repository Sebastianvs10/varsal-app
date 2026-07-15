/* Encabezado editorial de sección — índice mono + regla + etiqueta (firma visual VARSAL) */
/* Autor: Ing. J Sebastian Vargas S */

import { cn } from '@/lib/utils'

interface SectionEyebrowProps {
  index: string
  label: string
  className?: string
  tone?: 'default' | 'inverted'
}

export default function SectionEyebrow({ index, label, className, tone = 'default' }: SectionEyebrowProps) {
  return (
    <div className={cn('inline-flex items-center gap-3 mb-5', className)}>
      <span
        className={cn(
          'index-number text-2xl leading-none',
          tone === 'inverted' && 'text-white/25'
        )}
        style={tone === 'inverted' ? { WebkitTextStroke: '1px rgba(255,255,255,0.35)', color: 'transparent' } : undefined}
      >
        {index}
      </span>
      <span className={cn('h-px w-8', tone === 'inverted' ? 'bg-white/30' : 'bg-line-strong')} />
      <span
        className={cn(
          'font-mono text-xs uppercase tracking-[0.18em]',
          tone === 'inverted' ? 'text-white/70' : 'text-subtle'
        )}
      >
        {label}
      </span>
    </div>
  )
}
