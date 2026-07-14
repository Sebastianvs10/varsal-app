/* Panel /admin — verificación de sesión y configuración en servidor */
/* Autor: Ing. J Sebastian Vargas S */

import { redirect } from 'next/navigation'
import { AlertTriangle } from 'lucide-react'
import { isAdminConfigured, isAuthenticated } from '@/lib/admin-auth'
import { isDatabaseConfigured } from '@/lib/db'
import AdminDashboard from '@/components/admin/AdminDashboard'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Panel · VARSAL Systems',
  robots: { index: false, follow: false },
}

function SetupNotice({ missing }: { missing: string[] }) {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-16 bg-bg-alt">
      <div className="vs-panel rounded-xl p-8 max-w-md text-center">
        <span className="w-12 h-12 rounded-xl bg-warning/12 border border-warning/25 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-6 h-6 text-warning" />
        </span>
        <h1 className="text-xl font-bold text-foreground mb-2">Configuración pendiente</h1>
        <p className="text-sm text-subtle mb-4">
          Para usar el panel defina estas variables de entorno en <code className="font-mono text-accent">.env.local</code>:
        </p>
        <ul className="text-left text-sm text-foreground space-y-1.5">
          {missing.map((m) => (
            <li key={m} className="font-mono text-xs bg-surface-2 border border-line rounded px-2.5 py-1.5">{m}</li>
          ))}
        </ul>
      </div>
    </main>
  )
}

export default async function AdminPage() {
  const missing: string[] = []
  if (!isDatabaseConfigured()) missing.push('DATABASE_URL')
  if (!isAdminConfigured()) {
    if (!process.env.ADMIN_PASSWORD) missing.push('ADMIN_PASSWORD')
    if (!process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_SESSION_SECRET.length < 16) {
      missing.push('ADMIN_SESSION_SECRET (mín. 16 caracteres)')
    }
  }

  if (missing.length > 0) {
    return <SetupNotice missing={missing} />
  }

  if (!(await isAuthenticated())) {
    redirect('/admin/login')
  }

  return <AdminDashboard />
}
