'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { THEME_STORAGE_KEY, type Theme } from '@/lib/theme'
import { cn } from '@/lib/utils'

interface ThemeToggleProps {
  className?: string
  /** Sobre hero oscuro (foto) sin scroll: usar vidrio translúcido en vez de clay. */
  onDark?: boolean
}

export default function ThemeToggle({ className, onDark = false }: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Se agenda como microtarea para no disparar setState de forma síncrona
    // en el cuerpo del efecto (evita el warning de cascading renders).
    queueMicrotask(() => {
      const current = document.documentElement.getAttribute('data-theme') as Theme | null
      setTheme(current === 'dark' ? 'dark' : 'light')
      setMounted(true)
    })
  }, [])

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next)
    } catch {
      /* almacenamiento no disponible: se mantiene solo en memoria */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
      title={theme === 'dark' ? 'Tema claro' : 'Tema oscuro'}
      className={cn(
        'inline-flex items-center justify-center w-9 h-9 transition-colors duration-150 cursor-pointer',
        onDark
          ? 'rounded-md border border-white/25 text-white/85 hover:bg-white/10 hover:text-white'
          : 'clay-btn-ghost text-subtle hover:text-foreground',
        className
      )}
    >
      {mounted && theme === 'dark' ? (
        <Sun className="w-[17px] h-[17px]" strokeWidth={1.75} />
      ) : (
        <Moon className="w-[17px] h-[17px]" strokeWidth={1.75} />
      )}
    </button>
  )
}
