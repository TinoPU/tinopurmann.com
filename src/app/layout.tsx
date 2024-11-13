import "./globals.css";
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Tino Purmann',
    description: 'Collection of my projects and thoughts',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
