"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Libre_Baskerville } from 'next/font/google'
import { Button } from "~/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet"
import { Mail, Menu } from "lucide-react"
import { SiBluesky as Bluesky, SiFacebook as Facebook, SiInstagram as Instagram } from "@icons-pack/react-simple-icons"
import { Twitter } from "lucide-react"
import type { Author, SocialLink } from "~/types"

interface HeaderProps {
  author: Author
  socialLinks: SocialLink[]
}

const libreBaskerville = Libre_Baskerville({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-libre'
})

export function Header({ author, socialLinks }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)

  const socialIcons = {
    bluesky: Bluesky,
    facebook: Facebook,
    twitter: Twitter,
    instagram: Instagram,
    mail: Mail,
  }

  const navItems = [
    { href: "/about", label: "About" },
    { href: "/books", label: "Books" },
    { href: "/blog", label: "Blog" },
  ]

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-4">
            <Image
              src={author.avatar || "/placeholder.svg"}
              alt={author.name}
              width={60}
              height={60}
              className="rounded-full border-2 border-primary"
            />
            <div>
              <h1 className="text-2xl font-serif font-bold text-gray-900">
                {author.name}
              </h1>
              <p className="text-sm text-gray-600">
                Occultist Author
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-600 hover:text-primary font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}

