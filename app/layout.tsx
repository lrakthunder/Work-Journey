import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'WorkJourney - Job Application Tracker',
  description: 'Track your job applications and career journey',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
