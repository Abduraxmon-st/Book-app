import { useEffect, useRef, useState } from "react";
import useStore from "../../context/store";
import { book } from "../../data/books";

export const BookDetailSheet = () => {
  const bookDet = book
  const bookImage = book?.image ? book.image : "/cover_book.png";
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const { bookId, resetBookId } = useStore()
  const [offsetY, setOffsetY] = useState(0);
  const startY = useRef<number | null>(null);
  const isDragging = useRef(false);
  const [isAnimating, setIsAnimating] = useState(true);
  const contentRef = useRef<HTMLDivElement | null>(null);

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

  if (bookDet) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }
  return (
    <div ref={wrapperRef}
      style={{ transform: `translate(0, ${offsetY}px)` }}
      className={`fixed left-0 top-0 inset-0 bg-white text-mainColor z-50 p-4 pt-0! ${!!bookId ? 'translate-y-18 shadow-[0px_-4px_31px_0px_#00000070]' : 'translate-y-[110%] shadow-[0px_0px_0px_0px_#00000000]'} ${isAnimating ? "transition-transform duration-300 ease-out" : ""} rounded-4xl`}>
      {/* <button onClick={() => resetBookId()}
        className="p-1.5 bg-mainColor text-white rounded-full">
        <ArrowRightIcon className="size-7 rotate-180" />
      </button> */}
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
        className="overflow-x-auto w-full h-full">

        <img src={bookImage} alt={bookDet?.title} className="w-[80%] mx-auto mt-2 rounded-2xl" />
        <div className="h-screen"></div>
      </div>
    </div>
  )
}
