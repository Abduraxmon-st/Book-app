import { HeaderCarousel } from "../carousel"

export const Header = () => {
  return (
    <header className="relative">
      <div className="headerCircleContainer">
        <div className="headerLoading" />
      </div>
      <HeaderCarousel />
    </header>
  )
}
