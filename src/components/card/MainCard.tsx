import useStore from "../../context/store";
import type { Book } from "../../types";
import { HeaderSkelet } from "../skelet";

type MainCardProps = {
  key?: number;
  className?: string;
  book?: Book;
  loading?: boolean;
};
export const MainCard = ({ key, className, book, loading }: MainCardProps) => {
  const bookImage = book?.image ? book.image : "/cover_book.png";
  const { setBookId } = useStore()
  if (loading) {
    return <HeaderSkelet key={key} className={className} />;
  } else return (
    <div key={key} className={`w-full overflow-hidden ${className}`}>
      <div onClick={() => setBookId(book?.id || null)} className="border border-descColor/50 rounded-[7px]">
        <img src={bookImage} alt={book?.title} className="object-cover rounded-md w-full h-45 bg-descColor" />
      </div>
      <p className="text-sm text-center line-clamp-1 mt-1 font-medium">{book?.title}</p>
      <p className="text-xs text-center line-clamp-1 mt-1">{book?.authors.map((author) => author.name).join(", ")}</p>
    </div>
  )
}
