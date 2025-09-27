import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation, Pagination } from 'swiper/modules';
import Slider from './Slider';

const Banner = () => {
  return (
    <div className='my-4'>
      <Swiper
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Navigation]}
        navigation={true}
      >
        <SwiperSlide><Slider image="https://images.pexels.com/photos/6116877/pexels-photo-6116877.jpeg" title="Fresh Finds, Just In!" desc="Discover the latest trends and must-have products, handpicked for your style."></Slider></SwiperSlide>
        <SwiperSlide><Slider image="https://images.pexels.com/photos/6116892/pexels-photo-6116892.jpeg" title="Big Savings, Limited Time" desc="Grab your favorites at unbeatable prices before the season ends."></Slider></SwiperSlide>
        <SwiperSlide><Slider image="https://images.pexels.com/photos/5926462/pexels-photo-5926462.jpeg" title="Luxury You Deserve" desc="Experience top-quality products designed to elevate your everyday life."></Slider></SwiperSlide>
      </Swiper>
    </div>
  )
}

export default Banner