import { AppSidebar } from '@ipa/components/app-sidebar'
import { Header } from '@ipa/components/header'
import { SidebarInset, SidebarProvider } from '@ipa/components/ui/sidebar'
import { auth } from '@ipa/lib/auth'
import { prisma } from '@ipa/lib/prisma'
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

  let hasPermissionToAddOrganization = false
  if (session?.user) {
    try {
      const userOnDb = await prisma.user.findUnique({
        where: {
          id: session.user.id,
        },
      })

      if (userOnDb?.role === 'ADMIN') {
        hasPermissionToAddOrganization = true
      }
    } catch {
      hasPermissionToAddOrganization = false
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar
        hasPermissionToAddOrganization={hasPermissionToAddOrganization}
      />

      <SidebarInset>
        <Header />
        <main className="flex flex-col gap-4 grow justify-center items-center">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
