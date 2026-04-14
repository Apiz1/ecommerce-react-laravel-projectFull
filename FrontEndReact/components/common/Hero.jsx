import React from 'react'
import SliderOneImg from '../../assets/image/banner-1.jpg';
import SliderTwoImg from '../../assets/image/banner-2.jpg';
// Most important imports!
import { Swiper, SwiperSlide } from 'swiper/react';

const Hero = () => {
  return (
          <section className="section-1">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          loop={true}           // ← nice for continuous sliding
          // autoplay={{ delay: 4000, disableOnInteraction: false }} // optional
          // navigation  // uncomment if you want arrows
          // pagination={{ clickable: true }} // uncomment if you want dots
        >
          <SwiperSlide>
            <div
              className="content"
              style={{ backgroundImage: `url(${SliderOneImg})` }}
            ></div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              className="content"
              style={{ backgroundImage: `url(${SliderTwoImg})` }}
            ></div>
          </SwiperSlide>
        </Swiper>
      </section>
  )
}

export default Hero