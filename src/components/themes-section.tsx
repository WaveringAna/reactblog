import Image from "next/image"
import Link from "next/link"
import type { Theme } from "~/types"

interface ThemesSectionProps {
  themes: Theme[]
}

export function ThemesSection({ themes }: ThemesSectionProps) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-8">THEMES FROM BOOKS</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {themes.map((theme) => (
            <Link key={theme.id} href={theme.link} className="group">
              <div className="relative aspect-square rounded-full overflow-hidden transition-transform duration-300 group-hover:scale-105">
                <Image src={theme.imageUrl || "/placeholder.svg"} alt={theme.title} fill className="object-cover" />
              </div>
              <h3 className="text-center text-sm mt-2">{theme.title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

