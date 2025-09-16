
import type { Metadata } from "next"
import { Libertinus_Serif, Poppins } from "next/font/google"
import "./globals.css"
import NextAuthProvider from "./sessionProvider"



const libertinusSerif = Libertinus_Serif({
  subsets: ['latin'],
  weight: ['400'], // adjust if more weights available
  variable: '--font-libertinus',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400'], // adjust if more weights available
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: "MiniBooth - The Photo Booth On Your Hand",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        className={`${libertinusSerif.variable} ${poppins.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
