/* Botón de copiar al portapapeles con feedback visual inmediato */
/* Autor: Ing. J Sebastian Vargas S */

'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function CopyButton({
  value,
  label,
  className,
}: {
  value: string
  label?: string
  className?: string
}) {
  const [copied, setCopied] = useState(false)

  const copy = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // Silencioso: si el navegador bloquea el portapapeles, no interrumpimos el flujo.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        'inline-flex items-center justify-center w-6 h-6 rounded-md text-faint hover:text-accent hover:bg-accent/10 transition-colors cursor-pointer shrink-0',
        className
      )}
      aria-label={label ? `Copiar ${label}` : 'Copiar'}
      title={label ? `Copiar ${label}` : 'Copiar'}
    >
      {copied ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  )
}
