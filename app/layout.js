import './globals.css'

export const metadata = {
  title: 'Stateshift - Nervous System Sonic Intelligence',
  description: 'AI-powered playlist generation based on your emotional state',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
