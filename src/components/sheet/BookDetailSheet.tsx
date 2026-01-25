import { useEffect, useRef, useState } from "react";
import useStore from "../../context/store";
import { formatRating, useGetBookDetail } from "../../hooks";
import type { Author } from "../../types";

export const BookDetailSheet = () => {
  const { bookId, resetBookId } = useStore()
  const { data: book, isLoading } = useGetBookDetail({ id: bookId || null })
  const bookImage = book?.image ? book.image : "/cover_book.png";
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const [offsetY, setOffsetY] = useState(0);
  const startY = useRef<number | null>(null);
  const isDragging = useRef(false);
  const [isAnimating, setIsAnimating] = useState(true);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const authorsLength = book?.authors?.length
  const formattedRating = formatRating(book?.rating?.average || 0)
  // close outside
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        resetBookId()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("touchstart", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("touchstart", handleClickOutside)
    }
  }, [])

  // Swipe down to close
  // Start Touch
  const handleStart = (y: number) => {
    startY.current = y;
    isDragging.current = true;
    setIsAnimating(false)
  };

  // Touching
  const handleMove = (y: number) => {
    if (!isDragging.current || startY.current === null) return;

    const diff = y - startY.current;
    const scrollTop = contentRef.current?.scrollTop ?? 0;

    // 👇 faqat content tepasida bo‘lsa
    if (scrollTop === 0 && diff > 0) {
      setOffsetY(diff);
    }
  };

  // End Touch 
  const handleEnd = () => {
    setIsAnimating(true)
    if (offsetY > 200) {
      resetBookId(); // ⬇️ pastga swipe → yopiladi
    }

    setOffsetY(0);
    isDragging.current = false;
    startY.current = null;
  };
  // sheet full open to scroll top
  const handleContentScroll = () => {
    if (!contentRef.current) return;

    if (contentRef.current.scrollTop > 0) {
      setOffsetY(-72);
    } else if (contentRef.current.scrollTop === 0) {
      setOffsetY(0)
    }
  };

  if (bookId) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

  if (isLoading) {
    return
  }

  if (!isLoading) {
    return (
      <div ref={wrapperRef}
        style={{ transform: `translate(0, ${offsetY}px)` }}
        className={`fixed left-0 top-0 inset-0 bg-white text-mainColor z-50 p-4 pt-0! ${!!bookId ? 'translate-y-18 shadow-[0px_-4px_31px_0px_#00000070]' : 'translate-y-[110%] shadow-[0px_0px_0px_0px_#00000000]'} ${isAnimating ? "transition-transform duration-300 ease-out" : ""} rounded-t-4xl`}>
        <div
          onTouchStart={(e) => handleStart(e.touches[0].clientY)}
          onTouchMove={(e) => handleMove(e.touches[0].clientY)}
          onTouchEnd={handleEnd}
          className="py-4 flex justify-center">
          <div className="w-15 h-2 bg-descColor/50 rounded-full"></div>
        </div>
        <div
          ref={contentRef}
          onScroll={handleContentScroll}
          style={{ scrollbarWidth: "none" }}
          className="overflow-x-auto w-full h-full pb-10">

          <img src={bookImage} alt={book?.title} className="w-[80%] mx-auto mt-2 rounded-2xl" />
          <p className="text-[22px] font-semibold mt-10">{book?.title}</p>
          <div className="flex items-end gap-1 text-lg font-medium text-descColor mt-4">
            <p>Authors</p>
            <div className="border-t border-descColor/70 border-dashed w-full mb-2" />
            <div>
              {book?.authors.map((author: Author, index) => (
                <div key={author.id} className="w-max">{author.name}{authorsLength === index + 1 ? "." : ","}</div>
              ))}
            </div>
          </div>
          <div className="flex items-end gap-1 text-lg font-medium text-descColor mt-2">
            <span>Rating</span>
            <div className="border-t border-descColor/70 border-dashed w-full mb-2" />
            <div className="flex items-center gap-2">
              {/* <RatingStars rating={7.5} /> */}
              <span>{formattedRating}</span>
            </div>
          </div>

          <div className="bg-descColor/7 p-4 mt-5 rounded-2xl text-descColor">
            <p className="text-xl font-medium">About the book:</p>
            <p className="mt-3">{book?.description}</p>
          </div>
        </div>
      </div>
    )
  }
}
