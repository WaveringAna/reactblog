import Image from "next/image"
import type { Author } from "~/types"

interface HeroProps {
  author: Author
}

export function Hero({ author }: HeroProps) {
  return (
    <div className="relative h-[50vh] md:h-[60vh] lg:h-[40vh]">
      <Image src={author.heroImage || "/placeholder.svg"} alt="Hero image" fill className="object-cover" priority />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 flex items-center justify-center">
        <blockquote className="max-w-3xl text-center text-white">
          <p className="text-3xl md:text-4xl lg:text-5xl font-light">{author.quote}</p>
        </blockquote>
      </div>
    </div>
  )
}

