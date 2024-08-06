import type { Metadata } from 'next'

import { Open_Sans } from 'next/font/google'
import './globals.css'

import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { ModalProvider } from '@/components/providers/modal-provider'

import { cn } from '@/lib/utils'
import { Suspense } from 'react'
import Loading from '@/components/loading'
import { SocketProvider } from '@/components/providers/socket-provider'
import { QueryProvider } from '@/components/providers/query-provider'

const font = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Txtngs',
  description: 'A better discord',
  icons:{
    icon:['/public/favicon.ico'],
    apple:['/public/favicon.ico'],
    shortcut:['/public/favicon.ico']
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider afterSignOutUrl={'/'}>
      <html lang='en' suppressHydrationWarning>
        <body className={cn(font.className, 'bg-zinc-200 dark:bg-[#25252d]')}>
          <ThemeProvider
            attribute='class'
            defaultTheme='dark'
            enableSystem={true}
            storageKey='discord-theme'
            disableTransitionOnChange
          >
            <SocketProvider>
              <ModalProvider />
              <QueryProvider>
                <Suspense fallback={<Loading />}>{children}</Suspense>
              </QueryProvider>
            </SocketProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
