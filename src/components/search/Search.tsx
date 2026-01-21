import { useEffect, useRef, useState } from "react"
import { LoadingIcon, SearchIcon } from "../../assets/icons"
import { CloseAnimateIcon } from "../../assets/icons/CloseAnimateIcon"
import { useDebounce } from "use-debounce"
import { useGetSearchBooks } from "../../hooks"
import type { Book } from "../../types"
import { formatRating } from "../../hooks/useFormatRating"
interface SearchProps {
  isSearching: boolean
  setIsSearching: (value: boolean) => void
}
export const Search = ({ isSearching, setIsSearching }: SearchProps) => {
  const [istyped, setIsTyped] = useState("")
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const [debouncedSearch, { isPending, flush }] = useDebounce(istyped, 400);
  const debouncedLoading = isPending()
  const { data: books, isLoading } = useGetSearchBooks({ query: debouncedSearch });
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsSearching(false)
        setIsTyped("")
        flush();
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("touchstart", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("touchstart", handleClickOutside)
    }
  }, [])

  if (istyped.length > 0) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

  return (
    <div ref={wrapperRef}>
      <div className={`absolute bottom-3 right-4 flex justify-end rounded-2xl pl-0 pr-0 translate-x-0 ${isSearching ? "w-[calc(100%-2rem)] bg-white pl-3 pr-2.5 h-13.5" : ""} transition-all duration-400 ease-in-out w-7.5 h-7.5`}>
        {isSearching && (
          <input
            value={istyped}
            onFocus={() => setIsSearching(true)}
            onChange={(e) => setIsTyped(e.target.value)}
            type="text"
            placeholder="Search..."
            className={`w-full h-full outline-0 text-descColor text-lg pl-2 mr-2`} />
        )}
        <button
          onClick={() => {
            setIsSearching(!isSearching)
            if (!isSearching) {
              setIsTyped("")
              flush();
            }
          }}>
          {debouncedLoading || isLoading ?
            <LoadingIcon className="size-7 text-descColor/80 mr-1" />
            : istyped.length > 0 ? (
              <CloseAnimateIcon
                className={"size-7.5 text-descColor"} />
            ) : (
              <SearchIcon
                className={`size-7.5 ${isSearching ? "text-descColor" : "text-white"} transition-colors duration-400`} />
            )}
        </button>
      </div>

      {isSearching && (
        <div className={`absolute top-full right-4 grid gap-5 w-[calc(100%-2rem)] h-13.5 max-h-[calc(100vh-11rem)] rounded-2xl bg-white shadow-lg transition-all duration-400 ease-in-out text-descColor ${istyped.length > 0 ? "h-max overflow-x-hidden overflow-y-auto opacity-100 p-4" : "h-[0%] overflow-hidden opacity-0 p-0"}`}>
          {
            debouncedLoading || isLoading ? (
              <div className="w-full h-15 bg-descColor/10 animate-pulse rounded-md" />
            ) :
              books && books?.length > 0 ? (
                books.flat().map((book: Book) => (
                  <div key={book.id} className="flex gap-4 border-b border-descColor/20 pb-3 last:border-b-0 last:pb-0">
                    <img className="w-11 h-15 rounded-md" src={book.image} alt={book.title} />
                    <div className="flex flex-col justify-between w-full">
                      <p className="line-clamp-1 text-lg font-medium">{book.title}</p>
                      <p className="text-sm line-clamp-1 font-medium">{book.authors.map((author) => author.name).join(", ")}</p>
                      <p className="text-sm font-medium text-end">rating: <span className="text-base">{formatRating(book.rating?.average || 0)}</span></p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-descColor/70">No results found</p>
              )}
        </div>
      )}
    </div>
  )
}
