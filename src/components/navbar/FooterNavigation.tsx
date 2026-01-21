import { Link, useLocation } from "react-router-dom"
import { navItems } from "../../data/navigation"
import { useEffect, useRef, useState } from "react";
//83%
//251%
export const FooterNavigation = () => {
  const location = useLocation()
  const [activeItem, setActiveItem] = useState(0)
  const [translateX, setTranslateX] = useState(160)
  const [isMoving, setIsMoving] = useState(false)

  const ulRef = useRef<HTMLUListElement | null>(null)

  useEffect(() => {
    const index = navItems.findIndex(
      (item) => item.path === location.pathname
    )

    if (index !== -1) {
      setActiveItem(index)
    }
  }, [location.pathname])

  useEffect(() => {
    if (!ulRef?.current) return
    const ulWidth = ulRef.current.offsetWidth
    const itemWidth = ulWidth / navItems.length

    // item markaziga olib borish
    const x =
      activeItem * itemWidth +
      itemWidth / 2 -
      28 // dumaloq radius (size-14 = 56px / 2)

    setTranslateX(x)
  }, [activeItem])

  useEffect(() => {
    setIsMoving(true)

    const timeout = setTimeout(() => {
      setIsMoving(false)
    }, 300) // transition bilan bir xil

    return () => clearTimeout(timeout)
  }, [translateX])
  const moved = isMoving ? '0.85' : '1'
  return (
    <div className="fixed z-2 bottom-0 left-0 w-screen bg-white py-4">

      <div
        style={{
          transform: `translateX(${translateX}px) scale(${moved})`,
          transition: 'transform 0.3s ease-in-out'
        }}
        className="absolute -top-2 size-14 rounded-full bg-mainColor outline-8" />

      <ul ref={ulRef} className="flex items-center justify-around w-full">
        {navItems?.map(({ path, icon: Icon }, index) => (
          <li key={path} className="relative z-2 inline-block">
            <Link
              to={path}
              className={`flex flex-col items-center text-descColor hover:text-mainColor transition-[transform, colors] duration-300 transform ${activeItem === index ? 'text-white -translate-y-2.5' : 'translate-y-0'}`}>
              <Icon className="size-7.5 mb-1" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
