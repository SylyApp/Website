import { Inter } from 'next/font/google'
import './globals.css'
import  Providers  from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Syly',
  description: 'Syly - reactions from friends on memes',
  icons: {
    icon: "/favicon.png", 
    apple: "/favicon.png", 
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>{children}</body>
      </Providers>
    </html>
  )
}