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

    document.body.style.overflow = "hidden";
  };

  // Touching
  const handleMove = (y: number) => {
    if (!isDragging.current || startY.current === null) return;

    const diff = y - startY.current;

    if (diff > 0) {
      setOffsetY(diff);
    }
  };


  // End Touch 
  const handleEnd = () => {
    if (offsetY > 200) {
      resetBookId(); // ⬇️ pastga swipe → yopiladi
    }

    setOffsetY(0);
    isDragging.current = false;
    startY.current = null;
    document.body.style.overflow = "";
  };


  if (bookDet) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }
  return (
    <div ref={wrapperRef}
      style={{ transform: `translate(0, ${offsetY}px)` }}
      onTouchStart={(e) => handleStart(e.touches[0].clientY)}
      onTouchMove={(e) => handleMove(e.touches[0].clientY)}
      onTouchEnd={handleEnd}
      className={`touch-none fixed left-0 top-0 inset-0 bg-white text-mainColor z-50 p-4 ${!!bookId ? 'translate-y-18' : 'translate-y-full'} transition-transform duration-300 ease-in-out rounded-4xl shadow-[0px_-4px_31px_0px_#00000070]`}>
      {/* <button onClick={() => resetBookId()}
        className="p-1.5 bg-mainColor text-white rounded-full">
        <ArrowRightIcon className="size-7 rotate-180" />
      </button> */}
      <div className="w-15 h-2 mx-auto bg-descColor/50 rounded-full" />
      <img src={bookImage} alt={bookDet?.title} className="w-[80%] mx-auto mt-6 rounded-2xl" />
    </div>
  )
}
