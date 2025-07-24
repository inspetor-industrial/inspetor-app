'use client'

import { AppProgressProvider as ProgressProvider } from '@bprogress/next'
import { ThemeProvider } from '@ipa/components/theme-provider'
import { Toaster } from '@ipa/components/ui/sonner'
import { type ReactNode } from 'react'

import { Modals } from './modals'

type ProvidersProps = {
  children: ReactNode | ReactNode[]
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ProgressProvider
      color="#004059"
      height="6px"
      options={{
        showSpinner: false,
      }}
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
      <Toaster richColors />

      <Modals />
    </ProgressProvider>
  )
}
