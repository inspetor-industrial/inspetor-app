import { AuthBg } from '@ipa/assets/auth-bg'
import { type ReactNode } from 'react'

type AuthLayoutProps = {
  children: ReactNode
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="grid min-h-screen grid-cols-2 grid-rows-[1fr,auto]">
      {children}
      <div className="relative">
        <AuthBg
          fill
          className="absolute inset-0 -z-10 grayscale-100 brightness-50"
        />
      </div>
    </div>
  )
}
