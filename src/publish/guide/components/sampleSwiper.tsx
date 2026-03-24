import { GuideBox } from "@/publish/guide/GuideBox";
import {
  Autoplay,
  Keyboard,
  Navigation,
  Scrollbar,
  Swiper,
  SwiperPagination,
  SwiperSlide,
  type SwiperInstance,
} from "@/components/ui";
import { Play, Square } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const slides = [
  { id: "s1", title: "Slide 1", desc: "기본 슬라이드입니다." },
  { id: "s2", title: "Slide 2", desc: "Navigation/Pagination 예시" },
  { id: "s3", title: "Slide 3", desc: "Scrollbar를 함께 사용합니다." },
  { id: "s4", title: "Slide 4", desc: "loop + modules 조합 데모" },
];

const productSlides = [
  { id: "p1", name: "데이터 시각화", color: "bg-blue-100 text-blue-800" },
  {
    id: "p2",
    name: "워크플로우 자동화",
    color: "bg-violet-100 text-violet-800",
  },
  { id: "p3", name: "협업 대시보드", color: "bg-emerald-100 text-emerald-800" },
  { id: "p4", name: "리포트 빌더", color: "bg-amber-100 text-amber-800" },
  { id: "p5", name: "실시간 모니터링", color: "bg-rose-100 text-rose-800" },
];

const variableHeightSlides = [
  {
    id: "vh1",
    title: "짧은 콘텐츠",
    lines: [
      "콘텐츠 길이가 짧은 슬라이드입니다.",
      "다음 슬라이드로 이동하면 컨테이너 높이가 바뀝니다.",
    ],
  },
  {
    id: "vh2",
    title: "중간 길이 콘텐츠",
    lines: [
      "슬라이드별 카드 높이가 일정하지 않은 경우를 가정합니다.",
      "가변형 텍스트, 이미지 로딩, 조건부 UI 노출로 높이가 달라질 수 있습니다.",
      "autoHeight를 사용하면 현재 활성 슬라이드 높이에 맞춰 wrapper 높이가 조절됩니다.",
      "전환 시 레이아웃 점프를 줄이는 데 효과적입니다.",
    ],
  },
  {
    id: "vh3",
    title: "긴 콘텐츠",
    lines: [
      "긴 설명이 들어가는 슬라이드 예시입니다.",
      "상품 상세 설명, 공지사항, FAQ 등 텍스트가 많은 콘텐츠에서 자주 발생합니다.",
      "고정 높이 없이도 현재 슬라이드 기준으로 높이를 맞출 수 있습니다.",
      "필요하면 transition 속도와 함께 사용해 더 자연스러운 전환을 만들 수 있습니다.",
      "레이아웃 특성상 부모 영역은 overflow hidden으로 감싸는 것을 권장합니다.",
      "반응형 환경에서도 콘텐츠 길이 변화에 안정적으로 대응합니다.",
    ],
  },
];

const peekSlides = [
  {
    id: "pk1",
    title: "Peek Slide 1",
    desc: "인접 슬라이드가 살짝 노출됩니다.",
  },
  {
    id: "pk2",
    title: "Peek Slide 2",
    desc: "`slidesPerView`를 소수로 두고 centeredSlides를 켭니다.",
  },
  {
    id: "pk3",
    title: "Peek Slide 3",
    desc: "이전/다음 버튼 클릭 또는 드래그로 확인하세요.",
  },
  {
    id: "pk4",
    title: "Peek Slide 4",
    desc: "공간(spaceBetween)도 함께 조절합니다.",
  },
  {
    id: "pk5",
    title: "Peek Slide 5",
    desc: "loop 모드에서도 동일하게 동작합니다.",
  },
];

function SampleSwiperPage() {
  const [controlledIndex, setControlledIndex] = useState(0);
  const [controlledSwiper, setControlledSwiper] =
    useState<SwiperInstance | null>(null);
  const externalPrevRef = useRef<HTMLButtonElement | null>(null);
  const externalNextRef = useRef<HTMLButtonElement | null>(null);
  const externalPaginationRef = useRef<HTMLDivElement | null>(null);
  const [externalControlsSwiper, setExternalControlsSwiper] =
    useState<SwiperInstance | null>(null);
  const [autoplayExternalSwiper, setAutoplayExternalSwiper] =
    useState<SwiperInstance | null>(null);
  const [autoplayExternalRunning, setAutoplayExternalRunning] = useState(true);

  useEffect(() => {
    const swiper = externalControlsSwiper;
    if (!swiper) return;

    if (externalPrevRef.current || externalNextRef.current) {
      const navigationObj =
        swiper.params.navigation && typeof swiper.params.navigation === "object"
          ? swiper.params.navigation
          : {};
      // eslint-disable-next-line react-hooks/immutability
      swiper.params.navigation = {
        ...navigationObj,
        prevEl: externalPrevRef.current,
        nextEl: externalNextRef.current,
      };

      swiper.navigation?.init?.();
      swiper.navigation?.update?.();
    }

    if (externalPaginationRef.current) {
      const paginationObj =
        swiper.params.pagination && typeof swiper.params.pagination === "object"
          ? swiper.params.pagination
          : {};
      swiper.params.pagination = {
        ...paginationObj,
        el: externalPaginationRef.current,
      };

      swiper.pagination?.init?.();
      swiper.pagination?.render?.();
      swiper.pagination?.update?.();
    }
  }, [externalControlsSwiper]);

  return (
    <div className="guide-layout">
      <h1 className="guide-title">Swiper</h1>
      <div className="guide-content">
        <GuideBox
          title="기본형 (Navigation / Pagination / Scrollbar)"
          description="가장 자주 쓰는 기본 조합입니다. 버튼 이동, 페이지네이션 클릭, 드래그 스크롤이 동시에 동작합니다."
          code={`
import {
  Navigation,
  Scrollbar,
  Swiper,
  SwiperPagination,
  SwiperSlide,
} from "@/components/ui";

<Swiper
  modules={[Navigation, SwiperPagination, Scrollbar]}
  navigation
  pagination={{ clickable: true }}
  scrollbar={{ draggable: true }}
  loop
  spaceBetween={16}
  slidesPerView={1}
>
  <SwiperSlide>Slide 1</SwiperSlide>
  <SwiperSlide>Slide 2</SwiperSlide>
</Swiper>
          `}
        >
          <div className="w-full min-w-0 overflow-hidden">
            <Swiper
              modules={[Navigation, SwiperPagination, Scrollbar]}
              navigation
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              loop
              spaceBetween={16}
              slidesPerView={1}
              className="w-full min-w-0 rounded-lg border border-line02 bg-base p-2"
            >
              {slides.map((slide) => (
                <SwiperSlide key={slide.id}>
                  <div className="bg-container flex h-56 flex-col items-center justify-center rounded-md border border-line02 p-6 text-center">
                    <h2 className="text-font-b mb-2 text-xl font-bold">
                      {slide.title}
                    </h2>
                    <p className="text-font-g text-sm">{slide.desc}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </GuideBox>

        <GuideBox
          title="자동 재생 (Autoplay)"
          description={
            <>
              `Autoplay` 모듈과 `autoplay` 옵션으로 일정 간격 자동 전환을
              켭니다. `disableOnInteraction: false`면 사용자가 슬라이드를 만진
              뒤에도 자동 재생이 이어지고, `pauseOnMouseEnter`로 호버 시 잠시
              멈출 수 있습니다.
            </>
          }
          code={`
import {
  Autoplay,
  Navigation,
  Swiper,
  SwiperPagination,
  SwiperSlide,
} from "@/components/ui";

<Swiper
  modules={[Autoplay, Navigation, SwiperPagination]}
  loop
  autoplay={{
    delay: 2800,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  }}
  navigation
  pagination={{ clickable: true }}
  spaceBetween={16}
  slidesPerView={1}
>
  {slides.map((slide) => (
    <SwiperSlide key={slide.id}>...</SwiperSlide>
  ))}
</Swiper>
          `}
        >
          <div className="w-full min-w-0 overflow-hidden">
            <Swiper
              modules={[Autoplay, Navigation, SwiperPagination]}
              loop
              autoplay={{
                delay: 2800,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              navigation
              pagination={{ clickable: true }}
              spaceBetween={16}
              slidesPerView={1}
              className="w-full min-w-0 rounded-lg border border-line02 bg-base p-2"
            >
              {slides.map((slide) => (
                <SwiperSlide key={`${slide.id}-autoplay`}>
                  <div className="bg-container flex h-48 flex-col items-center justify-center rounded-md border border-line02 p-6 text-center">
                    <p className="text-font-g mb-1 text-xs font-medium uppercase tracking-wide">
                      Autoplay
                    </p>
                    <h2 className="text-font-b mb-2 text-xl font-bold">
                      {slide.title}
                    </h2>
                    <p className="text-font-g text-sm">{slide.desc}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </GuideBox>

        <GuideBox
          title="외부 버튼으로 Autoplay 토글 (재생 / 정지 아이콘)"
          description={
            <>
              한 버튼으로 토글합니다. 재생 중에는 정지(Square), 정지 중에는
              재생(Play) 아이콘이 보이며, `autoplay.stop()` /
              `autoplay.start()`와 `onAutoplayStart`·`onAutoplayStop`으로 상태를
              맞춥니다.
            </>
          }
          code={`
import { useState } from "react";
import { Play, Square } from "lucide-react";
import {
  Autoplay,
  Navigation,
  Swiper,
  SwiperPagination,
  SwiperSlide,
  type SwiperInstance,
} from "@/components/ui";

const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
const [autoplayRunning, setAutoplayRunning] = useState(true);

<button
  type="button"
  aria-label={autoplayRunning ? "자동재생 정지" : "자동재생 시작"}
  onClick={() => {
    if (!swiper?.autoplay) return;
    if (autoplayRunning) swiper.autoplay.stop();
    else swiper.autoplay.start();
  }}
>
  {autoplayRunning ? <Square /> : <Play />}
</button>

<Swiper
  modules={[Autoplay, Navigation, SwiperPagination]}
  loop
  autoplay={{ delay: 3000, disableOnInteraction: false }}
  navigation
  pagination={{ clickable: true }}
  onSwiper={setSwiper}
  onAutoplayStart={() => setAutoplayRunning(true)}
  onAutoplayStop={() => setAutoplayRunning(false)}
>
  ...
</Swiper>
          `}
        >
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="text-font-b inline-flex h-10 w-10 items-center justify-center rounded-md border border-line02 bg-container hover:bg-base"
              aria-label={
                autoplayExternalRunning ? "자동재생 정지" : "자동재생 시작"
              }
              onClick={() => {
                const ap = autoplayExternalSwiper?.autoplay;
                if (!ap) return;
                if (autoplayExternalRunning) ap.stop();
                else ap.start();
              }}
            >
              {autoplayExternalRunning ? (
                <Square className="h-5 w-5" aria-hidden />
              ) : (
                <Play className="h-5 w-5" aria-hidden />
              )}
            </button>
            <span className="text-font-g text-sm">
              {autoplayExternalRunning
                ? "재생 중 — 정지하려면 버튼"
                : "정지됨 — 재생하려면 버튼"}
            </span>
          </div>
          <div className="w-full min-w-0 overflow-hidden">
            <Swiper
              modules={[Autoplay, Navigation, SwiperPagination]}
              loop
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              navigation
              pagination={{ clickable: true }}
              spaceBetween={16}
              slidesPerView={1}
              onSwiper={(instance) => {
                setAutoplayExternalSwiper(instance);
                setAutoplayExternalRunning(instance.autoplay?.running ?? false);
              }}
              onAutoplayStart={() => setAutoplayExternalRunning(true)}
              onAutoplayStop={() => setAutoplayExternalRunning(false)}
              className="w-full min-w-0 rounded-lg border border-line02 bg-base p-2"
            >
              {slides.map((slide) => (
                <SwiperSlide key={`${slide.id}-autoplay-toggle`}>
                  <div className="bg-container flex h-44 flex-col items-center justify-center rounded-md border border-line02 p-6 text-center">
                    <p className="text-font-g mb-1 text-xs font-medium uppercase tracking-wide">
                      Autoplay 외부 제어
                    </p>
                    <h2 className="text-font-b mb-2 text-xl font-bold">
                      {slide.title}
                    </h2>
                    <p className="text-font-g text-sm">{slide.desc}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </GuideBox>

        <GuideBox
          title="반응형 + 자동 재생 + 키보드 이동"
          description={
            <>
              화면 크기에 따라 `slidesPerView`를 변경하고, 자동 재생과 키보드
              좌/우 이동을 함께 사용합니다.
            </>
          }
          code={`
import {
  Autoplay,
  Keyboard,
  Swiper,
  SwiperPagination,
  SwiperSlide,
} from "@/components/ui";

<Swiper
  modules={[Autoplay, SwiperPagination, Keyboard]}
  autoplay={{ delay: 2200, disableOnInteraction: false }}
  pagination={{ clickable: true }}
  keyboard={{ enabled: true }}
  breakpoints={{
    0: { slidesPerView: 1, spaceBetween: 12 },
    768: { slidesPerView: 2, spaceBetween: 16 },
    1200: { slidesPerView: 3, spaceBetween: 20 },
  }}
>
  {productSlides.map((item) => (
    <SwiperSlide key={item.id}>...</SwiperSlide>
  ))}
</Swiper>
          `}
        >
          <div className="w-full min-w-0 overflow-hidden">
            <Swiper
              modules={[Autoplay, SwiperPagination, Keyboard]}
              autoplay={{ delay: 2200, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              keyboard={{ enabled: true }}
              breakpoints={{
                0: { slidesPerView: 1, spaceBetween: 12 },
                768: { slidesPerView: 2, spaceBetween: 16 },
                1200: { slidesPerView: 3, spaceBetween: 20 },
              }}
              className="w-full min-w-0 rounded-lg border border-line02 bg-base p-2"
            >
              {productSlides.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="flex h-44 flex-col justify-between rounded-md border border-line02 bg-container p-4">
                    <span
                      className={`inline-flex w-fit rounded-full px-2 py-1 text-xs font-semibold ${item.color}`}
                    >
                      PRODUCT
                    </span>
                    <p className="text-font-b text-lg font-semibold">
                      {item.name}
                    </p>
                    <p className="text-font-g text-sm">
                      반응형 카드 슬라이드 + autoplay + keyboard 예시
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </GuideBox>

        <GuideBox
          title="외부 컨트롤 + 현재 인덱스 표시 (제어형)"
          description="Swiper 인스턴스를 받아 외부 버튼으로 이동을 제어하고, 현재 활성 슬라이드 인덱스를 별도로 표시합니다."
          code={`
import { useState } from "react";
import {
  Swiper,
  SwiperPagination,
  SwiperSlide,
  type SwiperInstance,
} from "@/components/ui";

const [controlledIndex, setControlledIndex] = useState(0);
const [controlledSwiper, setControlledSwiper] =
  useState<SwiperInstance | null>(null);

<button onClick={() => controlledSwiper?.slidePrev()}>이전</button>
<button onClick={() => controlledSwiper?.slideNext()}>다음</button>
<button onClick={() => controlledSwiper?.slideTo(0)}>첫 슬라이드</button>

<Swiper
  modules={[SwiperPagination]}
  pagination={{ clickable: true }}
  onSwiper={setControlledSwiper}
  onSlideChange={(swiper) => setControlledIndex(swiper.realIndex)}
>
  ...
</Swiper>
          `}
        >
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="rounded-md border border-line02 px-3 py-1.5 text-sm font-medium"
              onClick={() => controlledSwiper?.slidePrev()}
            >
              이전
            </button>
            <button
              type="button"
              className="rounded-md border border-line02 px-3 py-1.5 text-sm font-medium"
              onClick={() => controlledSwiper?.slideNext()}
            >
              다음
            </button>
            <button
              type="button"
              className="rounded-md border border-line02 px-3 py-1.5 text-sm font-medium"
              onClick={() => controlledSwiper?.slideTo(0)}
            >
              첫 슬라이드
            </button>
            <span className="text-font-g ml-2 text-sm">
              현재 인덱스: {controlledIndex + 1} / {slides.length}
            </span>
          </div>

          <div className="w-full min-w-0 overflow-hidden">
            <Swiper
              modules={[SwiperPagination]}
              onSwiper={setControlledSwiper}
              onSlideChange={(swiper) => setControlledIndex(swiper.realIndex)}
              pagination={{ clickable: true }}
              spaceBetween={16}
              slidesPerView={1}
              className="w-full min-w-0 rounded-lg border border-line02 bg-base p-2"
            >
              {slides.map((slide, index) => (
                <SwiperSlide key={`${slide.id}-controlled`}>
                  <div className="bg-container flex h-44 items-center justify-center rounded-md border border-line02 p-6 text-center">
                    <div>
                      <p className="text-font-g text-xs">#{index + 1}</p>
                      <h3 className="text-font-b text-xl font-bold">
                        {slide.title}
                      </h3>
                      <p className="text-font-g text-sm">{slide.desc}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </GuideBox>

        <GuideBox
          title="이전/다음 + Pagination 별도 영역 배치"
          description="네비게이션 버튼과 Pagination을 슬라이더 하단의 별도 컨트롤 바에 배치하는 패턴입니다."
          code={`
import { useRef, useState } from "react";
import {
  Navigation,
  Swiper,
  SwiperPagination,
  SwiperSlide,
  type SwiperInstance,
} from "@/components/ui";

const prevRef = useRef<HTMLButtonElement | null>(null);
const nextRef = useRef<HTMLButtonElement | null>(null);
const paginationRef = useRef<HTMLDivElement | null>(null);
const [externalSwiper, setExternalSwiper] =
  useState<SwiperInstance | null>(null);

<Swiper
  modules={[Navigation, SwiperPagination]}
  navigation
  pagination={{ clickable: true }}
  onSwiper={setExternalSwiper}
  onBeforeInit={(swiper) => {
    const navigation = swiper.params.navigation;
    const pagination = swiper.params.pagination;
    if (navigation && typeof navigation !== "boolean") {
      navigation.prevEl = prevRef.current;
      navigation.nextEl = nextRef.current;
    }
    if (pagination && typeof pagination !== "boolean") {
      pagination.el = paginationRef.current;
    }
  }}
  onInit={(swiper) => {
    swiper.navigation.init();
    swiper.navigation.update();
    swiper.pagination.init();
    swiper.pagination.render();
    swiper.pagination.update();
  }}
>
  ...
</Swiper>

<div className="controls">
  <button ref={prevRef}>이전</button>
  <div ref={paginationRef} />
  <button ref={nextRef}>다음</button>
</div>
          `}
        >
          <div className="w-full min-w-0 overflow-hidden">
            <Swiper
              modules={[Navigation, SwiperPagination]}
              onSwiper={(swiper) => setExternalControlsSwiper(swiper)}
              onBeforeInit={(swiper) => {
                const navigation = swiper.params.navigation;
                const pagination = swiper.params.pagination;

                // React Swiper에서 `navigation` prop을 boolean으로 넘기면
                // swiper.params.navigation 자체가 boolean일 수 있습니다.
                // 이 경우에도 prevEl/nextEl을 객체로 덮어써서 외부 DOM에 바인딩합니다.
                if (externalPrevRef.current || externalNextRef.current) {
                  const navigationObj =
                    navigation && typeof navigation === "object"
                      ? navigation
                      : {};
                  swiper.params.navigation = {
                    ...navigationObj,
                    prevEl: externalPrevRef.current,
                    nextEl: externalNextRef.current,
                  };
                }

                if (externalPaginationRef.current) {
                  const paginationObj =
                    pagination && typeof pagination === "object"
                      ? pagination
                      : {};
                  swiper.params.pagination = {
                    ...paginationObj,
                    el: externalPaginationRef.current,
                  };
                }
              }}
              onInit={(swiper) => {
                swiper.navigation.init();
                swiper.navigation.update();
                swiper.pagination.init();
                swiper.pagination.render();
                swiper.pagination.update();
              }}
              spaceBetween={16}
              slidesPerView={1}
              className="w-full min-w-0 rounded-lg border border-line02 bg-base p-2"
            >
              {slides.map((slide) => (
                <SwiperSlide key={`${slide.id}-external-controls`}>
                  <div className="bg-container flex h-44 flex-col items-center justify-center rounded-md border border-line02 p-6 text-center">
                    <h3 className="text-font-b text-xl font-bold">
                      {slide.title}
                    </h3>
                    <p className="text-font-g text-sm">{slide.desc}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="mt-3 flex items-center justify-between gap-2 rounded-md border border-line02 bg-container p-2">
            <button
              ref={externalPrevRef}
              type="button"
              className="rounded-md border border-line02 px-3 py-1.5 text-sm font-medium"
            >
              이전
            </button>
            <div
              ref={externalPaginationRef}
              className="[&_.swiper-pagination-bullet]:mx-1 [&_.swiper-pagination-bullet]:h-2 [&_.swiper-pagination-bullet]:w-2 [&_.swiper-pagination-bullet-active]:bg-font-b"
            />
            <button
              ref={externalNextRef}
              type="button"
              className="rounded-md border border-line02 px-3 py-1.5 text-sm font-medium"
            >
              다음
            </button>
          </div>
        </GuideBox>

        <GuideBox
          title="슬라이드별 높이 상이 + 자동 높이 조절"
          description="슬라이드마다 콘텐츠 높이가 달라도 `autoHeight`를 켜면 활성 슬라이드 높이에 맞춰 컨테이너가 자연스럽게 조절됩니다."
          code={`
import {
  Navigation,
  Swiper,
  SwiperPagination,
  SwiperSlide,
} from "@/components/ui";

<Swiper
  modules={[Navigation, SwiperPagination]}
  navigation
  pagination={{ clickable: true }}
  autoHeight
  spaceBetween={16}
  slidesPerView={1}
>
  {variableHeightSlides.map((slide) => (
    <SwiperSlide key={slide.id}>...</SwiperSlide>
  ))}
</Swiper>
          `}
        >
          <div className="w-full min-w-0 overflow-hidden">
            <Swiper
              modules={[Navigation, SwiperPagination]}
              navigation
              pagination={{ clickable: true }}
              autoHeight
              spaceBetween={16}
              slidesPerView={1}
              className="w-full min-w-0 rounded-lg border border-line02 bg-base p-2"
            >
              {variableHeightSlides.map((slide) => (
                <SwiperSlide key={slide.id}>
                  <div className="rounded-md border border-line02 bg-container p-5">
                    <h3 className="text-font-b mb-3 text-lg font-semibold">
                      {slide.title}
                    </h3>
                    <div className="space-y-2">
                      {slide.lines.map((line, index) => (
                        <p
                          key={`${slide.id}-${index}`}
                          className="text-font-g text-sm"
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </GuideBox>

        <GuideBox
          title="인접 슬라이드 미묘 노출(피크/Peek)"
          description="이전/다음 슬라이드가 살짝 보이는 느낌의 UX를 만들기 위해 `slidesPerView`를 소수로 두고 `centeredSlides`를 사용합니다."
          code={`
import {
  Navigation,
  Swiper,
  SwiperPagination,
  SwiperSlide,
} from "@/components/ui";

<Swiper
  modules={[Navigation, SwiperPagination]}
  navigation
  pagination={{ clickable: true }}
  loop
  centeredSlides
  grabCursor
  slidesPerView={1.2}
  spaceBetween={16}
>
  ...
</Swiper>
          `}
        >
          <div className="w-full min-w-0 overflow-hidden">
            <Swiper
              modules={[Navigation, SwiperPagination]}
              navigation
              pagination={{ clickable: true }}
              loop
              centeredSlides
              grabCursor
              slidesPerView={1.2}
              spaceBetween={16}
              className="w-full min-w-0 rounded-lg border border-line02 bg-base p-2"
            >
              {peekSlides.map((slide) => (
                <SwiperSlide key={slide.id}>
                  <div className="rounded-md border border-line02 bg-container p-5">
                    <h3 className="text-font-b text-lg font-semibold">
                      {slide.title}
                    </h3>
                    <p className="mt-2 text-font-g text-sm">{slide.desc}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </GuideBox>

        <GuideBox
          title="우측만 미묘 노출(Peek Only Right)"
          description="`centeredSlides`를 끄고 `slidesPerView`를 소수로 두면, 현재 슬라이드를 좌측 기준으로 배치해서 우측 다음 슬라이드만 살짝 보이게 만들 수 있습니다."
          code={`
import {
  Navigation,
  Swiper,
  SwiperPagination,
  SwiperSlide,
} from "@/components/ui";

<Swiper
  modules={[Navigation, SwiperPagination]}
  navigation
  pagination={{ clickable: true }}
  loop
  grabCursor
  slidesPerView={1.2}
  spaceBetween={16}
>
  ...
</Swiper>
          `}
        >
          <div className="w-full min-w-0 overflow-hidden">
            <Swiper
              modules={[Navigation, SwiperPagination]}
              navigation
              pagination={{ clickable: true }}
              loop
              grabCursor
              slidesPerView={1.2}
              spaceBetween={16}
              className="w-full min-w-0 rounded-lg border border-line02 bg-base p-2"
            >
              {peekSlides.map((slide) => (
                <SwiperSlide key={`${slide.id}-right-peek`}>
                  <div className="rounded-md border border-line02 bg-container p-5">
                    <h3 className="text-font-b text-lg font-semibold">
                      {slide.title}
                    </h3>
                    <p className="mt-2 text-font-g text-sm">{slide.desc}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </GuideBox>
      </div>
    </div>
  );
}

export default SampleSwiperPage;
