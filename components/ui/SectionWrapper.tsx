'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionWrapperProps {
  children: React.ReactNode
  className?: string
  id?: string
  glow?: boolean
}

export default function SectionWrapper({
  children,
  className,
  id,
  glow = false,
}: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
      className={cn(
        'relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden',
        glow && 'section-glow',
        className
      )}
    >
      {children}
    </motion.section>
  )
}
