import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function PaginationSwiper({ totalPages, currentPage, OnPage }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination-swiper-container">
      <Swiper
        modules={[Navigation]}
        navigation
        slidesPerView={5}
        // spaceBetween={5}
        className="pagination-swiper"
      >
        {pages.map((pageNum) => (
          <SwiperSlide key={pageNum} className="pagination-slide">
            <button
              onClick={() => OnPage(pageNum)}
              className={`pagination-button ${
                pageNum === currentPage ? "active" : ""
              }`}
            >
              {pageNum}
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
