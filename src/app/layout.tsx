import './globals.css'

import type { Metadata } from 'next'

import { Providers } from './providers'

export const metadata: Metadata = {
  title: {
    template: '%s | Inspetor Industrial',
    default: 'Inspetor Industrial',
    absolute: 'Inspetor Industrial',
  },
  description:
    'Este repositório contém o frontend da aplicação PDF Generation API, uma API projetada para gerar PDFs de forma eficiente. O frontend foi desenvolvido utilizando a mais recente versão do Next.js, aproveitando recursos modernos como Server Components, Server Actions e layouts dinâmicos.',
  keywords: [
    'PDF',
    'API',
    'Geração de PDF',
    'Next.js',
    'Server Components',
    'Server Actions',
    'Layouts Dinâmicos',
    'Frontend',
    'React',
    'Documentos',
    'Automação',
  ],
  authors: [
    {
      name: 'Pedro Augusto Barbosa Aparecido',
      url: 'https://github.com/pedroaba',
    },
  ],
  creator: 'Pedro Augusto Barbosa Aparecido',
  openGraph: {
    title: 'PDF Generation API',
    description:
      'Frontend moderno para a API de geração de PDFs, utilizando Next.js e recursos avançados para performance e escalabilidade.',
    siteName: 'PDF Generation API',
    images: [
      {
        url: '/application-background.png',
        width: 1200,
        height: 630,
        alt: 'PDF Generation API',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDF Generation API',
    description:
      'Frontend moderno para a API de geração de PDFs, utilizando Next.js e recursos avançados para performance e escalabilidade.',
    images: ['/application-background.png'],
    creator: '@seu_usuario',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
  category: 'technology',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="light">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
