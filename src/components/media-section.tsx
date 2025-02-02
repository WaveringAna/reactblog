import { Card, CardContent } from "~/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import type { MediaItem } from "~/types"

interface MediaSectionProps {
  items: MediaItem[]
}

export function MediaSection({ items }: MediaSectionProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-8">MEDIA</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <Link key={item.id} href={item.link}>
              <Card>
                <CardContent className="p-0">
                  <div className="relative h-48">
                    <Image src={item.imageUrl || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.source}</p>
                    <p className="text-sm text-gray-400">{new Date(item.date).toLocaleDateString()}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <div className="text-right mt-4">
          <Link href="/media" className="text-sm font-medium">
            Media »
          </Link>
        </div>
      </div>
    </section>
  )
}

