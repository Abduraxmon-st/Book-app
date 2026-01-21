import { Autoplay } from 'swiper/modules';
import { MainCard } from '../card'
import { Swiper, SwiperSlide } from 'swiper/react';

export const HeaderCarousel = () => {
  return (
    <div className="w-full h-max absolute top-0 onLoadAnimation mt-10">
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
        {[...Array(6)].map((_, index) => (
          <SwiperSlide key={index}>
            <MainCard />
          </SwiperSlide>
        ))}
      </Swiper>
    </div >
  )
}
