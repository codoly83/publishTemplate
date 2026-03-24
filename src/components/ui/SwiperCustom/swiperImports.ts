/**
 * Swiper(swiper) 패키지 직접 참조는 이 파일에만 둡니다.
 * UI 레이어는 SwiperCustom.tsx에서 조합합니다.
 */
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export { Swiper as SwiperRoot, SwiperSlide as SwiperSlideRoot } from "swiper/react";
export type {
  SwiperProps,
  SwiperRef,
  SwiperSlideProps,
} from "swiper/react";
export { useSwiper, useSwiperSlide } from "swiper/react";
export type { Swiper as SwiperInstance } from "swiper";

export {
  Autoplay,
  Keyboard,
  Navigation,
  Pagination as SwiperPagination,
  Scrollbar,
} from "swiper/modules";
