import type { Event, Book, Theme, SocialLink, Author, BlogPost } from "~/types"

export const author: Author = {
  name: "Aaman Lamba",
  bio: "Distinguished author and historian",
  avatar: "/placeholder.svg",
  quote: "",
  heroImage:
    "/placeholder.svg",
}

export const socialLinks: SocialLink[] = [
  {
    id: "1",
    platform: "Facebook",
    url: "https://facebook.com",
    icon: "facebook",
  },
  {
    id: "2",
    platform: "Twitter",
    url: "https://twitter.com",
    icon: "twitter",
  },
  {
    id: "3",
    platform: "Bluesky",
    url: "https://bluesky.com",
    icon: "bluesky",
  },
  {
    id: "4",
    platform: "Email",
    url: "mailto:contact@example.com",
    icon: "mail",
  },
]

export const events: Event[] = [
  {
    id: "1",
    date: "2025-05-28",
    location: "Riga, Latvia",
    title: "AI & the Future of Humanity",
    description: "Public broadcast from the Riga Event",
    imageUrl: "/placeholder.svg",
    link: "#",
  },
  {
    id: "2",
    date: "2025-05-29",
    location: "Tallinn, Estonia",
    title: "AI & the Future of Humanity",
    description: "Public broadcast from the United Arena",
    imageUrl: "/placeholder.svg",
    link: "#",
  },
  {
    id: "3",
    date: "2025-11-06",
    location: "São Paulo, Brazil",
    title: "HSM+ 2025",
    description: "Keynote speaker at the 25th edition of HSM+ annual conference",
    imageUrl: "/placeholder.svg",
    link: "#",
  },
]

export const books: Book[] = [
  {
    id: "1",
    title: "AI Superpowers",
    imageUrl: "/placeholder.svg",
    link: "#",
    description: "China, Silicon Valley, and the New World Order",
    publishDate: "2018-09-25",
  },
  // generate more mock books here
  {
    id: "2",
    title: "Homo Deus",
    imageUrl: "/placeholder.svg",
    link: "#",
    description: "A Brief History of Tomorrow",
    publishDate: "2016-09-08",
  },
  {
    id: "3",
    title: "21 Lessons",
    imageUrl: "/placeholder.svg",
    link: "#",
    description: "21 Lessons for the 21st Century",
    publishDate: "2018-08-30",
  },
  {
    id: "4",
    title: "Money",
    imageUrl: "/placeholder.svg",
    link: "#",
    description: "The Story of Human Finance",
    publishDate: "2021-06-15",
  }
]

export const themes: Theme[] = [
  {
    id: "1",
    title: "Power & Imagination",
    imageUrl: "/placeholder.svg",
    link: "#",
    description: "Exploring human creativity and authority",
  },
  {
    id: "2",
    title: "Science & Religion",
    imageUrl: "/placeholder.svg",
    link: "#",
    description: "The intersection of faith and reason",
  },
  {
    id: "3",
    title: "Ecology",
    imageUrl: "/placeholder.svg",
    link: "#",
    description: "Human impact on the environment",
  },
  {
    id: "4",
    title: "Money & Politics",
    imageUrl: "/placeholder.svg",
    link: "#",
    description: "Economic and political systems",
  },
  {
    id: "5",
    title: "Future",
    imageUrl: "/placeholder.svg",
    link: "#",
    description: "Predictions and possibilities",
  },
  {
    id: "6",
    title: "Happiness",
    imageUrl: "/placeholder.svg",
    link: "#",
    description: "The pursuit of well-being",
  },
]


export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Future of AI: Friend or Foe?",
    excerpt:
      "As artificial intelligence continues to evolve at an unprecedented pace, we must ask ourselves: are we creating a utopian assistant or an existential threat?",
    date: "2024-01-20",
    imageUrl: "/placeholder.svg",
    slug: "future-of-ai",
    author: "Author Name",
  },
  {
    id: "2",
    title: "Redefining Human Nature in the Digital Age",
    excerpt:
      "With the lines between physical and digital realities blurring, how do we maintain our humanity in an increasingly virtual world?",
    date: "2024-01-15",
    imageUrl: "/placeholder.svg",
    slug: "human-nature-digital-age",
    author: "Author Name",
  },
  {
    id: "3",
    title: "The Myth of Free Will in the Age of Algorithms",
    excerpt:
      "As big data and machine learning shape our choices, is the concept of free will becoming obsolete? Let's explore the ethical implications.",
    date: "2024-01-10",
    imageUrl: "/placeholder.svg",
    slug: "free-will-algorithms",
    author: "Author Name",
  },
  {
    id: "4",
    title: "Biotechnology: Rewriting the Book of Life",
    excerpt:
      "From CRISPR to synthetic biology, we're on the brink of redefining what it means to be human. Are we ready for the consequences?",
    date: "2024-01-05",
    imageUrl: "/placeholder.svg",
    slug: "biotechnology-rewriting-life",
    author: "Author Name",
  },
]
