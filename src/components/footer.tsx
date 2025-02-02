import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
          <div className="mb-4 md:mb-0">© {new Date().getFullYear()} Author Name. All rights reserved.</div>
          <div className="flex space-x-4">
            <Link href="/privacy">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

