import './globals.css'
import { Inter } from 'next/font/google'
import React from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { Navbar } from './components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'NeuroServe',
  description: 'A Next.js + FastAPI ML Application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-900 min-h-screen`}>
        <ThemeProvider>
          <Navbar />
          <div className="pt-16">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}