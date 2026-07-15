/* Fondo decorativo del hero — íconos de desarrollo flotando con movimiento sutil */
/* Autor: Ing. J Sebastian Vargas S */

'use client'

import { motion } from 'framer-motion'
import {
  Code2,
  Terminal,
  GitBranch,
  Braces,
  Database,
  Cpu,
  Boxes,
  Binary,
  Webhook,
  FileCode2,
} from 'lucide-react'

const icons = [
  { Icon: Code2, top: '8%', left: '32%', size: 26, rotate: -12, tone: 'accent', duration: 7.5, delay: 0 },
  { Icon: Terminal, top: '16%', left: '76%', size: 22, rotate: 8, tone: 'faint', duration: 8.5, delay: 0.6 },
  { Icon: GitBranch, top: '58%', left: '4%', size: 24, rotate: 10, tone: 'faint', duration: 7, delay: 1.1 },
  { Icon: Braces, top: '26%', left: '90%', size: 28, rotate: -8, tone: 'accent', duration: 9, delay: 0.3 },
  { Icon: Database, top: '76%', left: '58%', size: 22, rotate: 6, tone: 'faint', duration: 8, delay: 1.4 },
  { Icon: Cpu, top: '5%', left: '58%', size: 20, rotate: -6, tone: 'faint', duration: 7.8, delay: 0.9 },
  { Icon: Boxes, top: '84%', left: '18%', size: 24, rotate: 14, tone: 'accent', duration: 8.2, delay: 0.2 },
  { Icon: Binary, top: '44%', left: '96%', size: 22, rotate: -10, tone: 'faint', duration: 7.2, delay: 1.7 },
  { Icon: Webhook, top: '90%', left: '84%', size: 20, rotate: 5, tone: 'faint', duration: 9.2, delay: 0.5 },
  { Icon: FileCode2, top: '18%', left: '2%', size: 24, rotate: 9, tone: 'accent', duration: 8.6, delay: 1.2 },
] as const

const toneClass = {
  accent: 'text-accent',
  faint: 'text-faint',
}

export default function HeroTechBackdrop() {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ maskImage: 'linear-gradient(to bottom, black, transparent 82%)' }}
      aria-hidden="true"
    >
      {icons.map((item, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ top: item.top, left: item.left }}
          initial={{ opacity: 0, rotate: item.rotate }}
          animate={{ opacity: [0, 1, 1, 1], y: [0, -10, 0, -10], rotate: item.rotate }}
          transition={{
            opacity: { duration: 1, delay: item.delay },
            y: { duration: item.duration, delay: item.delay, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <item.Icon
            className={toneClass[item.tone]}
            style={{ width: item.size, height: item.size, opacity: item.tone === 'accent' ? 0.22 : 0.16 }}
            strokeWidth={1.5}
          />
        </motion.div>
      ))}
    </div>
  )
}
