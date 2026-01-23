import { Swiper, SwiperSlide } from "swiper/react"
import { MainCard } from "../card"
import type { Book } from "../../types"
import { useGetPopularBooks } from "../../hooks"
import { ArrowRightIcon } from "../../assets/icons"

export const PopularSectionCarousel = () => {
  const { data: books, isLoading } = useGetPopularBooks();
  return (
    <Swiper
      spaceBetween={16}
      slidesPerView={2.4}
      grabCursor={true}
      className="p-0!"
    >
      {
        isLoading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <SwiperSlide key={index}>
              <MainCard book={undefined} loading={true} className="text-mainColor" />
            </SwiperSlide>
          ))
        ) : (
          <>
            {
              books?.flat().map((book: Book) => (
                <SwiperSlide key={book.id}>
                  <MainCard book={book} loading={isLoading} className="text-mainColor" />
                </SwiperSlide>
              ))
            }
            <SwiperSlide>
              <div className="text-lg flex flex-col items-center justify-center gap-4 text-center h-45 font-medium text-mainColor">
                <p>Click to see more...</p>
                <div className="bg-mainColor size-10 rounded-full flex justify-center items-center"><ArrowRightIcon className="size-7.5 text-white" /></div>
              </div>
            </SwiperSlide>
          </>
        )
      }
    </Swiper>
  )
}
