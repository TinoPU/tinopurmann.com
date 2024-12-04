import "./globals.css";
import type { Metadata } from 'next'
import { Montserrat } from "next/font/google"
import SwipeProvider from "@/components/SwipeProvider/SwipeProvider";
import {Suspense} from "react";
import Loading from "@/app/loading";


export const metadata: Metadata = {
    title: 'Tino Purmann',
    description: 'Collection of my projects and thoughts',
    openGraph: {images: [{url: 'https://tinopurmann.com/assets/TPpreview.png'}]},
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
      <SwipeProvider>
          <Suspense fallback={<Loading />}>
          {children}
          </Suspense>
      </SwipeProvider>
      </body>
    </html>
  );
}
