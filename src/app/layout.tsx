import type { Metadata } from "next"
import { Source_Sans_3 } from 'next/font/google'
import "~/styles/globals.css"
import { Header } from "~/components/header"
import { Footer } from "~/components/footer"
import { getAuthor, getSocialLinks } from "~/lib/services/data-service"
import React from 'react'; // Added import for React

import { ClerkProvider } from "@clerk/nextjs"

const sourceSansPro = Source_Sans_3({
  weight: ['400', '600'],
  subsets: ['latin'],
  variable: '--font-source'
})

export const metadata: Metadata = {
  title: "Author Portfolio",
  description: "Portfolio and blog for authors",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const authors = await getAuthor()
  let author = authors[0]
  if (!author) {
    author = {
      id: '0',
      name: '',
      bio: '',
      avatar: '',
      quote: '',
      heroImage: '',
    }
  }
  const socialLinks = await getSocialLinks()

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={sourceSansPro.className}>
          <Header author={author} socialLinks={socialLinks} />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  )
}
