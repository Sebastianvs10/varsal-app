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
    <main className="min-h-screen flex items-center justify-center px-4 py-16 bg-bg-alt">
      <LoginForm />
    </main>
  )
}
