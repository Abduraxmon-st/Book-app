import { Autoplay } from 'swiper/modules';
import { MainCard } from '../card'
import { Swiper, SwiperSlide } from 'swiper/react';
import { useGetNewBooks } from '../../hooks/useNewBooks';
import type { Book } from '../../types';

export const HeaderCarousel = () => {
  const { data: newBooks, isLoading, isError } = useGetNewBooks();
  if (isError) {
    return <div className='text-center py-2 text-lg'>Error loading books</div>;
  } else return (
    <div>
      <p className='absolute top-4 left-6'>Recently added</p>
      <div className="w-full h-max absolute top-0 mt-10 onLoadAnimation">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={16}
          slidesPerView={2.2}
          centeredSlidesBounds={true}
          grabCursor={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          speed={500}
          centeredSlides={true}
          className="p-4! w-auto! header-swiper"
        >
          {newBooks?.flat().map((book: Book) => (
            <SwiperSlide key={book.id}>
              <MainCard book={book} loading={isLoading} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div >
    </div>
  )
}
