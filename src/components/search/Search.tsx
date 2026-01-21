import { useEffect, useRef, useState } from "react"
import { SearchIcon } from "../../assets/icons"
interface SearchProps {
  isSearching: boolean
  setIsSearching: (value: boolean) => void
}
export const Search = ({ isSearching, setIsSearching }: SearchProps) => {
  const [istyped, setIsTyped] = useState("")
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsSearching(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("touchstart", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("touchstart", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (!isSearching) {
      setIsTyped("")
    }
  }, [isSearching])
  return (
    <div ref={wrapperRef}>
      <div className={`absolute bottom-3 right-4 flex justify-end rounded-2xl pl-0 pr-0 translate-x-0 ${isSearching ? "w-[calc(100%-2rem)] bg-white pl-3 pr-2.5 h-13.5" : ""} transition-all duration-400 ease-in-out w-7.5 h-7.5`}>
        {isSearching && (
          <input
            value={istyped}
            onFocus={() => setIsSearching(true)}
            onChange={(e) => setIsTyped(e.target.value)}
            type="text"
            className={`w-full h-full outline-0 text-descColor text-lg pl-2 mr-2`} />
        )}
        <button onClick={() => setIsSearching(!isSearching)}>
          <SearchIcon
            className={`size-7.5 ${isSearching ? "text-descColor" : "text-white"} transition-colors duration-400`} />
        </button>
      </div>

      {isSearching && (
        <div className={`absolute top-full right-4 w-[calc(100%-2rem)] h-13.5 rounded-2xl bg-white shadow-lg transition-all duration-400 ease-in-out text-descColor ${istyped.length > 0 ? "h-max overflow-x-hidden overflow-y-auto opacity-100 p-4" : "h-[0%] overflow-hidden opacity-0 p-0"}`}>
          {istyped}
        </div>
      )}
    </div>
  )
}
