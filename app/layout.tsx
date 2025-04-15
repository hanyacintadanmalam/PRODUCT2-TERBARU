import type { Metadata } from 'next'
import './styles/globals.css'
import AuthProviderWrapper from './context/AuthProviderWrapper'

export const metadata: Metadata = {
  title: 'Spotify Gift Card',
  description: 'A special gift for a special person',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProviderWrapper>
          {children}
        </AuthProviderWrapper>
      </body>
    </html>
  )
} 