/* Página de acceso al panel /admin */
/* Autor: Ing. J Sebastian Vargas S */

import { redirect } from 'next/navigation'
import { isAuthenticated } from '@/lib/admin-auth'
import LoginForm from '@/components/admin/LoginForm'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Acceso · Panel VARSAL',
  robots: { index: false, follow: false },
}

export default async function AdminLoginPage() {
  if (await isAuthenticated()) {
    redirect('/admin')
  }

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-10 bg-bg">
      {/* Spotlight enfocado detrás de la tarjeta, no blobs genéricos */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(38% 42% at 50% 32%, color-mix(in oklab, var(--vs-accent) 13%, transparent) 0%, transparent 72%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 grid-texture opacity-40"
        style={{ maskImage: 'radial-gradient(42% 46% at 50% 32%, black, transparent 78%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        <LoginForm />
      </div>

      <p className="relative z-10 mt-9 text-[11px] text-faint">
        © {new Date().getFullYear()} VARSAL Systems. Todos los derechos reservados.
      </p>
    </main>
  )
}
