import { useState } from "react"
import { Search } from "../search"
import { Link } from "react-router-dom"

export const Navbar = () => {
  const [isSearching, setIsSearching] = useState(false)
  return (
    <header>
      <nav className="relative z-2 bg-mainColor border-0">
        <div className="relative max-w-full flex items-center mx-auto py-3 px-4">
          {/* <Sidebar /> */}
          <Link to="/" className="w-[calc(1536px/21)] h-[calc(1024px/21)] overflow-hidden mx-1">
            <img src="/booky.png" alt="Logo" className="scale-250 mt-1" />
          </Link>
          <Search isSearching={isSearching} setIsSearching={setIsSearching} />
        </div>
      </nav>
    </header>
  )
}
