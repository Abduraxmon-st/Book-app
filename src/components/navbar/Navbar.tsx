import { Search } from "../search"
import { Sidebar } from "../sidebar"

export const Navbar = () => {
  return (
    <nav className="relative z-2 bg-mainColor border-0">
      <div className="max-w-97.5 flex items-center justify-between mx-auto pt-10 px-4 pb-3 -mb-px">
        <Sidebar />
        <p className="text-lg font-medium text-white">Book App</p>
        <Search />
      </div>
    </nav>
  )
}
