"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
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
    { href: "/events", label: "Events" },
    { href: "/blog", label: "Blog" },
  ]

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src={author.avatar || "/placeholder.svg"}
            alt={author.name}
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="text-xl font-semibold">{author.name}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-4">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-gray-600 hover:text-gray-900">
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Social Links */}
        <div className="hidden md:flex items-center space-x-4">
          {socialLinks.map((link) => {
            const Icon = socialIcons[link.icon as keyof typeof socialIcons]
            return (
              <Link key={link.id} href={link.url} className="text-gray-600 hover:text-gray-900">
                <Icon className="h-5 w-5" />
              </Link>
            )
          })}
          <Button variant="outline" size="sm">
            EN
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col space-y-4 mt-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-600 hover:text-gray-900"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="flex space-x-4 mt-8">
              {socialLinks.map((link) => {
                const Icon = socialIcons[link.icon as keyof typeof socialIcons]
                return (
                  <Link
                    key={link.id}
                    href={link.url}
                    className="text-gray-600 hover:text-gray-900"
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                )
              })}
            </div>
            <Button variant="outline" size="sm" className="mt-4">
              EN
            </Button>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

