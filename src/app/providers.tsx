'use client'
import { AppProgressProvider as ProgressProvider } from '@bprogress/next'
import { Toaster } from '@ipa/components/ui/sonner'
import { queryClient } from '@ipa/lib/react-query'
import { MantineProvider } from '@mantine/core'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
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
      <MantineProvider>
        <NuqsAdapter>
          <QueryClientProvider client={queryClient}>
            {children}

            <ReactQueryDevtools initialIsOpen={true} />
          </QueryClientProvider>
        </NuqsAdapter>
      </MantineProvider>

      <Toaster richColors />
      <Modals />
    </ProgressProvider>
  )
}
