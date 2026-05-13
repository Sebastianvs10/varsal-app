import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'blue' | 'cyan' | 'success' | 'warning'
  className?: string
}

const variants = {
  default: 'bg-white/10 text-white/80 border-white/10',
  blue: 'bg-blue-500/15 text-blue-300 border-blue-500/20',
  cyan: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/20',
  success: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/20',
  warning: 'bg-amber-500/15 text-amber-300 border-amber-500/20',
}

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border',
        'uppercase tracking-wider',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
