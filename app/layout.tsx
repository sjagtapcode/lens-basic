import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import { LensProvider } from '@/components/lens-provider'
import { Web3ModalProvider } from '@/components/web3modal-provider'
import { Nav } from '@/components/nav'
import * as React from "react"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Lens OP',
  description: 'Checkout Profiles and Posts',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className='m-auto max-w-[1440px]'>
      <body className={inter.className}>
        <Web3ModalProvider>
          <LensProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Nav />
              {children}
            </ThemeProvider>
          </LensProvider>
        </Web3ModalProvider>
      </body>
    </html>
  )
}
