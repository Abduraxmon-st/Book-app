import { formatRating } from "../../hooks/useFormatRating"
import type { Book } from "../../types"

export const Searchcard = ({ book }: { book: Book }) => {
  return (
    <div key={book.id} className="flex gap-4 border-b border-descColor/20 pb-3 last:border-b-0 last:pb-0">
      <img className="w-11 h-15 rounded-md" src={book.image} alt={book.title} />
      <div className="flex flex-col justify-between w-full">
        <p className="line-clamp-1 text-lg font-medium">{book.title}</p>
        <p className="text-sm line-clamp-1 font-medium">{book.authors.map((author) => author.name).join(", ")}</p>
        <p className="text-sm font-medium text-end">rating: <span className="text-base">{formatRating(book.rating?.average || 0)}</span></p>
      </div>
    </div>
  )
}
