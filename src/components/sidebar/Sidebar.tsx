import { useState } from "react";
import { CloseIcon, SidebarIcon } from "../../assets/icons"
import { Link } from "react-router-dom";
import { HomeIcon, CategoryIcon, FavouriteIcon, SettingsIcon } from "../../assets/icons";
import type { NavItem } from "../../types";
const navItems = [
  { name: "Home", path: "/", icon: HomeIcon },
  { name: "Categories", path: "/categories", icon: CategoryIcon },
  { name: "Favourites", path: "/favourites", icon: FavouriteIcon },
  { name: "Settings", path: "/settings", icon: SettingsIcon }
];
export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  if (isOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }
  return (
    <div className="flex items-center">
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed z-2 transform ${isOpen ? "size-full top-0 left-0 bg-black/10 opacity-100 translate-x-0" : "opacity-0 -translate-x-full"} transition-opacity duration-200 ease-in-out`} />

      <div className={`fixed z-3 top-0 left-0 h-full w-[85%] py-10 pl-5 pr-4 bg-white transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out shadow-2xl`}>

        <div className="flex items-center justify-between">
          <p className="text-mainColor text-xl font-medium">Book app</p>
          <button onClick={() => setIsOpen(false)}>
            <CloseIcon className="size-7.5 text-mainColor" />
          </button>
        </div>

        <ul className="mt-10 grid grid-cols-1">
          {navItems.map(({ name, path, icon: Icon }: NavItem) => (
            <li key={path}>
              <Link onClick={() => setIsOpen(false)} to={path} className="text-descColor text-lg font-medium hover:text-mainColor transition-colors duration-100">
                <div className="flex items-center gap-3 py-3">
                  <Icon className="size-7.5" />
                  <p className="-mb-px">{name}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <button onClick={() => setIsOpen(true)}>
        <SidebarIcon className="size-7.5 text-white" />
      </button>
    </div>
  )
}
