import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ReactQueryProvider from '@/components/providers/react-query-provider'
import Container from '@/components/ui/container'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ReactQueryProvider>
      <html lang="en">
        <body className={`bg-background ${inter.className}`}>
        <Container>
          {children}
        </Container>
        </body>
      </html>
    </ReactQueryProvider>

  )
}
