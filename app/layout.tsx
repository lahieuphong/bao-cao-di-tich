import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Báo cáo tiến độ di tích',
  description: 'Landing page báo cáo các di tích đã push lên website',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <body
        style={{
          fontFamily:
            '"SF Pro Display","SF Pro Text",-apple-system,BlinkMacSystemFont,"Helvetica Neue",Helvetica,Arial,sans-serif',
        }}
      >
        {children}
      </body>
    </html>
  )
}