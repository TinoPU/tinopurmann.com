import "./globals.css";
import type { Metadata } from 'next'
import { Montserrat } from "next/font/google"


export const metadata: Metadata = {
    title: 'Tino Purmann',
    description: 'Collection of my projects and thoughts',
}

const montserrat = Montserrat({
    subsets: ['latin'],
    variable: '--font-montserrat',
})



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
