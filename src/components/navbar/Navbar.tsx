import { useState } from "react"
import { Search } from "../search"

export const Navbar = () => {
  const [isSearching, setIsSearching] = useState(false)
  return (
    <header>
      <nav className="relative z-2 bg-mainColor border-0">
        <div className="relative max-w-full flex items-center mx-auto pt-10 px-4 pb-3">
          {/* <Sidebar /> */}
          <p className="text-lg font-medium text-white">Book App</p>
          <Search isSearching={isSearching} setIsSearching={setIsSearching} />
        </div>
      </nav>
    </header>
  )
}
