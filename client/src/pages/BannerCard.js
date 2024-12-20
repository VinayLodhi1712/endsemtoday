import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards, Navigation, Pagination } from "swiper/modules";
import "./BannerCard.css";

function BannerCard() {
  return (
    <div className="banner">
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards,  Pagination]}
       
        pagination={{ clickable: true }}
        className="swiper-container"
      >
        <SwiperSlide className="slide" />
        <SwiperSlide className="slide" />
        <SwiperSlide className="slide" />
        <SwiperSlide className="slide" />
        <SwiperSlide className="slide" />
        <SwiperSlide className="slide" />
        <SwiperSlide className="slide" />
        <SwiperSlide className="slide" />
      </Swiper>
    </div>
  );
}

export default BannerCard;
