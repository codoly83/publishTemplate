import { useLayoutClass } from "@/hooks/useLayoutClass";
import { Navigation, Swiper, SwiperPagination, SwiperSlide } from "@/components/ui";

const slides = [
  { id: "s1", title: "메인 배너 1", desc: "홈 화면용 Swiper 샘플 슬라이드입니다." },
  { id: "s2", title: "메인 배너 2", desc: "Navigation, Pagination 조합 예시입니다." },
  { id: "s3", title: "메인 배너 3", desc: "실제 배너 데이터로 쉽게 교체할 수 있습니다." },
];

function Home() {
  useLayoutClass("type2");

  return (
    <main style={{ display: "grid", gap: 20, padding: 16 }}>
      <section>
        <h1 style={{ margin: "0 0 8px", fontSize: 24, fontWeight: 700 }}>Home</h1>
        <p style={{ margin: 0, fontSize: 14, color: "var(--font-g)" }}>
          메인 영역에 Swiper 슬라이드 샘플을 적용한 페이지입니다.
        </p>
      </section>

      <section style={{ minWidth: 0 }}>
        <Swiper
          modules={[Navigation, SwiperPagination]}
          navigation
          pagination={{ clickable: true }}
          loop
          spaceBetween={16}
          slidesPerView={1}
          style={{
            border: "1px solid var(--line02)",
            borderRadius: 12,
            background: "var(--base)",
            padding: 8,
          }}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <article
                style={{
                  minHeight: 220,
                  border: "1px solid var(--line02)",
                  borderRadius: 8,
                  background: "var(--container)",
                  display: "grid",
                  placeItems: "center",
                  textAlign: "center",
                  padding: 20,
                }}
              >
                <div>
                  <p style={{ margin: "0 0 8px", fontSize: 12, color: "var(--font-g)" }}>
                    MAIN SWIPER SAMPLE
                  </p>
                  <h2 style={{ margin: "0 0 8px", fontSize: 22 }}>{slide.title}</h2>
                  <p style={{ margin: 0, fontSize: 14, color: "var(--font-g)" }}>
                    {slide.desc}
                  </p>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </main>
  );
}

export { Home };
export default Home;
