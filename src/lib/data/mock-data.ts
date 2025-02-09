import type { Book, SocialLink, Author, BlogPost } from "~/types"

export const authors: Author[] = [{
  id: "1",
  name: "Aaman Lamba",
  bio: "Distinguished author and historian",
  avatar: "/placeholder.svg",
  quote: "",
  heroImage:
    "/placeholder.svg",
}]

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

export const books: Book[] = [
  {
    id: "1",
    title: "AI Superpowers",
    imageUrl: "/placeholder.svg",
    link: "#",
    description: "China, Silicon Valley, and the New World Order",
    publishDate: "2018-09-25",
    content: "This is a book about stuff.",
    author: "Aaman Lamba"
  },
  // generate more mock books here
  {
    id: "2",
    title: "Homo Deus",
    imageUrl: "/placeholder.svg",
    link: "#",
    description: "A Brief History of Tomorrow",
    publishDate: "2016-09-08",
    content: "This is a book about stuff.",
    author: "Aaman Lamba"
  },
  {
    id: "3",
    title: "21 Lessons",
    imageUrl: "/placeholder.svg",
    link: "#",
    description: "21 Lessons for the 21st Century",
    publishDate: "2018-08-30",
    content: "This is a book about stuff.",
    author: "Aaman Lamba"
  },
  {
    id: "4",
    title: "Money",
    imageUrl: "/placeholder.svg",
    link: "#",
    description: "The Story of Human Finance",
    publishDate: "2021-06-15",
    content: "This is a book about stuff.",
    author: "Aaman Lamba"
  }
]

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Future of AI: Friend or Foe?",
    excerpt:
      "As artificial intelligence continues to evolve at an unprecedented pace, we must ask ourselves: are we creating a utopian assistant or an existential threat?",
    content: "This is a blog about stuff.",
    date: "2024-01-20",
    imageUrl: "/placeholder.svg",
    slug: "future-of-ai",
    author: "Aaman Lamba",
    html: '<div class="bn-block-group" data-node-type="blockGroup"><div class="bn-block-outer" data-node-type="blockOuter"><div class="bn-block" data-node-type="blockContainer"><div class="bn-block-content" data-content-type="paragraph"><p class="bn-inline-content">This is a blog about stuff.</p></div></div></div></div>',
  },
  {
    id: "2",
    title: "Redefining Human Nature in the Digital Age",
    excerpt:
      "With the lines between physical and digital realities blurring, how do we maintain our humanity in an increasingly virtual world?",
    content: "This is a blog about stuff.",
    date: "2024-01-15",
    imageUrl: "/placeholder.svg",
    slug: "human-nature-digital-age",
    author: "Aaman Lamba",
    html: '<div class="bn-block-group" data-node-type="blockGroup"><div class="bn-block-outer" data-node-type="blockOuter"><div class="bn-block" data-node-type="blockContainer"><div class="bn-block-content" data-content-type="paragraph"><p class="bn-inline-content">This is a blog about stuff.</p></div></div></div></div>',
  },
  {
    id: "3",
    title: "The Myth of Free Will in the Age of Algorithms",
    excerpt:
      "As big data and machine learning shape our choices, is the concept of free will becoming obsolete? Let's explore the ethical implications.",
    content: "This is a blog about stuff.",
    date: "2024-01-10",
    imageUrl: "/placeholder.svg",
    slug: "free-will-algorithms",
    author: "Aaman Lamba",
    html: '<div class="bn-block-group" data-node-type="blockGroup"><div class="bn-block-outer" data-node-type="blockOuter"><div class="bn-block" data-node-type="blockContainer"><div class="bn-block-content" data-content-type="paragraph"><p class="bn-inline-content">This is a blog about stuff.</p></div></div></div></div>',
  },
  {
    id: "4",
    title: "Biotechnology: Rewriting the Book of Life",
    excerpt:
      "From CRISPR to synthetic biology, we're on the brink of redefining what it means to be human. Are we ready for the consequences?",
    content: "This is a blog about stuff.",
    date: "2024-01-05",
    imageUrl: "/placeholder.svg",
    slug: "biotechnology-rewriting-life",
    author: "Aaman Lamba",
    html: '<div class="bn-block-group" data-node-type="blockGroup"><div class="bn-block-outer" data-node-type="blockOuter"><div class="bn-block" data-node-type="blockContainer"><div class="bn-block-content" data-content-type="paragraph"><p class="bn-inline-content">This is a blog about stuff.</p></div></div></div></div>',
  },
]
