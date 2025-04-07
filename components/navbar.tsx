import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <header className="bg-red-600 text-white">
      <div className="container mx-auto px-4 py-3 flex flex-wrap justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Engineer On Site Database
        </Link>
        <nav>
          <ul className="flex flex-wrap gap-2 sm:gap-4">
            <li>
              <Link href="/">
                <Button variant="ghost" className="text-white hover:text-white hover:bg-red-700">
                  Simple Search
                </Button>
              </Link>
            </li>
            <li>
              <Link href="/advanced-search">
                <Button variant="ghost" className="text-white hover:text-white hover:bg-red-700">
                  Advanced Search
                </Button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

