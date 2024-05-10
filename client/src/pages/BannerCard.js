import React, { useRef, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';


import 'swiper/css';
import 'swiper/css/effect-cards';

import './BannerCard.css';

import { EffectCards } from 'swiper/modules';

function BannerCard() {
  return (
    <div className='banner'>
        <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards]}
        className=" newclass2 newclass3"
      >
        <SwiperSlide></SwiperSlide>
        <SwiperSlide></SwiperSlide>
        <SwiperSlide></SwiperSlide>
        <SwiperSlide></SwiperSlide>
        <SwiperSlide></SwiperSlide>
        <SwiperSlide></SwiperSlide>
        <SwiperSlide></SwiperSlide>
        <SwiperSlide></SwiperSlide>
        <SwiperSlide></SwiperSlide>
      </Swiper>
    </div>
  )
}

export default BannerCard;