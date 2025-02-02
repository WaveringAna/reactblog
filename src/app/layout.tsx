import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "~/styles/globals.css"
import { Header } from "~/components/header"
import { Footer } from "~/components/footer"
import { getAuthor, getSocialLinks } from "~/lib/services/data-service"
import React from 'react'; // Added import for React

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Author Portfolio",
  description: "Portfolio and blog for authors",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const author = await getAuthor()
  const socialLinks = await getSocialLinks()

  return (
    <html lang="en">
      <body className={inter.className}>
        <Header author={author} socialLinks={socialLinks} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
