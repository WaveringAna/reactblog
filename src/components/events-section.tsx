import { Card, CardContent } from "~/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import type { Event } from "~/types"

interface EventsSectionProps {
  events: Event[]
}

export function EventsSection({ events }: EventsSectionProps) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-8">EVENTS</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Link key={event.id} href={event.link}>
              <Card>
                <CardContent className="p-0">
                  <div className="relative h-48">
                    <Image
                      src={event.imageUrl || "/placeholder.svg"}
                      alt={event.location}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">{new Date(event.date).toLocaleDateString()}</span>
                      <span className="text-sm text-gray-600">{event.location}</span>
                    </div>
                    <h3 className="font-semibold mb-2">{event.title}</h3>
                    <p className="text-sm text-gray-600">{event.description}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <div className="text-right mt-4">
          <Link href="/events" className="text-sm font-medium">
            Events »
          </Link>
        </div>
      </div>
    </section>
  )
}

