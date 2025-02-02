import Image from "next/image"
import type { Author } from "~/types"

interface HeroProps {
  author: Author
}

export function Hero({ author }: HeroProps) {
  return (
    <div className="relative h-[50vh] md:h-[60vh] lg:h-[40vh]">
      <Image
        src={author.heroImage || "/placeholder.svg"}
        alt="Hero image"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />
      <div className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 30L60 30M30 30L30 60M30 30L0 30M30 30L30 0' stroke='%23ffffff' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px'
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <blockquote className="max-w-3xl text-center">
          <p className="occult-text text-3xl md:text-4xl lg:text-5xl text-white">
            {author.quote}
          </p>
        </blockquote>
      </div>
    </div>
  )
}
