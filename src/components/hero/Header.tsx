import { useEffect, useState } from "react"
import { HeaderCarousel } from "../carousel"

export const Hero = () => {
  const [showCarousel, setShowCarousel] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCarousel(true)
    }, 1000) // 1 sekund

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative">
      <div className="headerCircleContainer">
        <div className="headerLoading" />
      </div>
      {showCarousel && <HeaderCarousel />}
    </div>
  )
}
