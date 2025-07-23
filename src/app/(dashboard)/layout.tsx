import { auth } from '@ipa/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { type ReactNode } from 'react'

type DashboardLayoutProps = {
  children: ReactNode | ReactNode[]
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect('/auth/sign-in')
  }

  return children
}
