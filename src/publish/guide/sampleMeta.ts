export interface PublishSampleItem {
  id: string;
  title: string;
  path: string;
  description: string;
}

/** 가이드 사이드바 섹션 구분 */
export type GuideNavSectionId =
  | "layout"
  | "pageFeatures"
  | "hooks"
  | "components";

/** 사이드바·메타 공통 항목 (레이아웃 / 훅 / 컴포넌트 한곳에서 관리) */
export interface PublishGuideNavItem extends PublishSampleItem {
  section: GuideNavSectionId;
  /** NavLink target="_blank" */
  openInNewTab?: boolean;
  /** 제목 옆 ExternalLink 아이콘 */
  showExternalIcon?: boolean;
  /** NavLink end */
  end?: boolean;
}

/** 섹션 순서·라벨 (Guide 사이드바와 동일 순서) */
export const GUIDE_NAV_SECTIONS: {
  id: GuideNavSectionId;
  label: string;
}[] = [
  { id: "layout", label: "layout 컴포넌트" },
  { id: "pageFeatures", label: "페이지 기능 샘플" },
  { id: "hooks", label: "hooks" },
  { id: "components", label: "components" },
];

const guideNavComponentItems: PublishGuideNavItem[] = [
  {
    id: "accordion",
    title: "Accordion",
    path: "/guide/accordion",
    description: "Accordion 컴포넌트의 다양한 사용 예시를 확인합니다.",
    section: "components",
  },
  {
    id: "alertDialog",
    title: "AlertDialog",
    path: "/guide/alert-dialog",
    description: "Alert, confirm",
    section: "components",
  },
  {
    id: "button",
    title: "Button",
    path: "/guide/button",
    description: "버튼의 variant, color, size, shape 조합을 확인합니다.",
    section: "components",
  },
  {
    id: "card",
    title: "Card",
    path: "/guide/card",
    description: "Card의 헤더, 액션, 본문, 푸터 조합을 확인합니다.",
    section: "components",
  },
  {
    id: "checkbox",
    title: "Checkbox",
    path: "/guide/checkbox",
    description: "체크박스의 기본 상태와 disabled, invalid 케이스를 봅니다.",
    section: "components",
  },
  {
    id: "chip",
    title: "Chip",
    path: "/guide/chip",
    description: "Chip 색상, variant, 아이콘 조합 샘플을 비교합니다.",
    section: "components",
  },
  {
    id: "collapsible",
    title: "Collapsible",
    path: "/guide/collapsible",
    description:
      "Collapsible·CollapsibleGroup(single/multiple) 접기/펼치기, 기본·제어·비활성 예시를 확인합니다.",
    section: "components",
  },
  {
    id: "datepicker",
    title: "DatePicker",
    path: "/guide/datepicker",
    description:
      "기본 날짜 선택, 제어형 상태, 선택 범위 제한 예시를 확인합니다.",
    section: "components",
  },
  {
    id: "font",
    title: "Font",
    path: "/guide/font",
    description: "Font 사이즈 두께 조합 샘플을 비교합니다.",
    section: "components",
  },
  {
    id: "icon",
    title: "Icon",
    path: "/guide/icon",
    description: "Icon 색상, 크기 조합 샘플을 비교합니다.",
    section: "components",
  },
  {
    id: "input",
    title: "Input",
    path: "/guide/input",
    description: "Input, InputGroup, 검색 패턴을 확인합니다.",
    section: "components",
  },
  {
    id: "inputStepper",
    title: "InputStepper",
    path: "/guide/input-stepper",
    description:
      "숫자·날짜 증감, +/− 또는 chevron 버튼이 붙은 InputGroup 스타일 스테퍼입니다.",
    section: "components",
  },
  {
    id: "loading",
    title: "Loading",
    path: "/guide/loading",
    description:
      "Loading 단일 컴포넌트에서 fullscreen props로 전체 화면(기본)/특정 영역 오버레이 로딩 패턴을 확인합니다.",
    section: "components",
  },
  {
    id: "modal",
    title: "Modal",
    path: "/guide/modal",
    description:
      "Small, Medium, Large, Full Screen 5가지 size 모달을 확인합니다.",
    section: "components",
  },
  {
    id: "pagechangepanel",
    title: "PageChangePanel",
    path: "/guide/pagechangepanel",
    description:
      "드래그 가능한 고정 레이아웃 변경 패널의 단일·다중 선택 모드를 확인합니다.",
    section: "components",
  },
  {
    id: "pagination",
    title: "Pagination",
    path: "/guide/pagination",
    description:
      "기본, Ellipsis, 제어 상태 페이지네이션 사용 예시를 확인합니다.",
    section: "components",
  },
  {
    id: "popover",
    title: "Popover",
    path: "/guide/popover",
    description:
      "Popover 기본(트리거 다음 DOM), 선택적 Portal container·placement·size를 확인합니다.",
    section: "components",
  },
  {
    id: "portal",
    title: "Portal",
    path: "/guide/portal",
    description:
      "body, #id, .class 셀렉터, usePortalContainer 훅 등 다양한 Portal 마운트 방식을 확인합니다.",
    section: "components",
  },
  {
    id: "radio",
    title: "Radio",
    path: "/guide/radio",
    description: "RadioGroup과 기본/상태/커스텀 라벨 사용 예시를 확인합니다.",
    section: "components",
  },
  {
    id: "scrollarea",
    title: "ScrollArea",
    path: "/guide/scrollarea",
    description:
      "수직, 수평, 양방향 스크롤 영역 컴포넌트 사용 예시를 확인합니다.",
    section: "components",
  },
  {
    id: "select",
    title: "Select",
    path: "/guide/select",
    description: "기본 Select, 그룹, 사이즈, btnType 예시를 살펴봅니다.",
    section: "components",
  },
  {
    id: "skeleton",
    title: "Skeleton",
    path: "/guide/skeleton",
    description:
      "로딩 플레이스홀더, variant·rounded, 4초 후 실제 콘텐츠로 전환 예시를 확인합니다.",
    section: "components",
  },
  {
    id: "sortableList",
    title: "SortableList",
    path: "/guide/sortable-list",
    description:
      "드래그 앤 드롭으로 목록 순서를 변경합니다. 마우스·터치(모바일)·키보드 모두 지원합니다.",
    section: "components",
  },
  {
    id: "slider",
    title: "Slider",
    path: "/guide/slider",
    description:
      "Slider 단일·범위 값, 크기(sm/md/lg), 세로 방향, 제어 상태 예시를 확인합니다.",
    section: "components",
  },
  {
    id: "switch",
    title: "Switch",
    path: "/guide/switch",
    description: "Switch 기본 크기, small 크기, 제어 상태를 비교합니다.",
    section: "components",
  },
  {
    id: "swiper",
    title: "Swiper",
    path: "/guide/swiper",
    description:
      "Swiper 기본 슬라이더 구성과 Navigation/Pagination/Scrollbar 모듈 사용법을 확인합니다.",
    section: "components",
  },
  {
    id: "table",
    title: "Table",
    path: "/guide/table",
    description: "표 형식의 데이터를 표시하고 관리하는 방법을 확인합니다.",
    section: "components",
  },
  {
    id: "tabs",
    title: "Tabs",
    path: "/guide/tabs",
    description: "가로/세로 Tabs와 default, btn variant 동작을 테스트합니다.",
    section: "components",
  },
  {
    id: "textarea",
    title: "Textarea",
    path: "/guide/textarea",
    description:
      "Textarea, InputGroup 조합, 최대 글자 수 안내·카운터 패턴을 확인합니다.",
    section: "components",
  },
  {
    id: "toast",
    title: "Toast",
    path: "/guide/toast",
    description:
      "Sonner 기반 Toast 컴포넌트와 toast() 호출, promise·로딩 패턴을 확인합니다.",
    section: "components",
  },
  {
    id: "tooltip",
    title: "Tooltip",
    path: "/guide/tooltip",
    description:
      "Tooltip 컴포넌트의 다양한 variant, size, delay 옵션을 확인합니다.",
    section: "components",
  },
  {
    id: "treeView",
    title: "TreeView",
    path: "/guide/tree-view",
    description: "커스텀 TreeView 컴포넌트를 확인합니다.",
    section: "components",
  },
  {
    id: "textList",
    title: "TextList",
    path: "/guide/text-list",
    description:
      "마커(•/★/■/1.2.3/①…) 타입을 `type`과 `items[]` 복합 패턴으로 제어하는 리스트 컴포넌트 샘플입니다.",
    section: "components",
  },
];

const guideNavComponentItemsByABC = [...guideNavComponentItems].sort((a, b) =>
  a.title.localeCompare(b.title, "en", { sensitivity: "base" }),
);

/** 가이드 사이드바 전체 (레이아웃·훅·컴포넌트) */
export const publishGuideNavItems: PublishGuideNavItem[] = [
  {
    id: "layout",
    title: "Layout",
    path: "/guide/layout",
    description: "DefaultLayout 기반 레이아웃·콘텐츠 영역 샘플입니다.",
    section: "layout",
    openInNewTab: true,
    showExternalIcon: true,
    end: true,
  },
  {
    id: "layout-basic",
    title: "Layout 기본형",
    path: "/guide/layout-basic",
    description: "PageLayoutBasic 셸·Outlet·푸터 고정 패턴 샘플입니다.",
    section: "layout",
    openInNewTab: true,
    showExternalIcon: true,
    end: true,
  },
  {
    id: "pageScrollSpy",
    title: "ScrollSpy 네비",
    path: "/guide/page-scroll-spy",
    description:
      "스크롤 시 섹션에 맞춰 메뉴가 활성화되고, 메뉴 클릭 시 해당 영역으로 이동합니다. 메뉴는 sticky입니다.",
    section: "pageFeatures",
  },
  {
    id: "scrollTopButton",
    title: "Scroll Top Button",
    path: "/guide/scroll-top-button",
    description:
      "일정 스크롤 이상 노출형, 위로 스크롤 시에만 노출형 Top 버튼 UX 패턴을 비교합니다.",
    section: "pageFeatures",
  },
  {
    id: "pageSvgColor",
    title: "SVG 색상 변경",
    path: "/guide/svg-color",
    description:
      "SVG를 컴포넌트로 불러오는 방식과 일반 파일 URL로 불러온 뒤 색상을 바꾸는 방식을 비교합니다.",
    section: "pageFeatures",
  },
  {
    id: "hook-useRemainingHeight",
    title: "useRemainingHeight",
    path: "/guide/hooks/use-remaining-height",
    description:
      "컨테이너 기준과 뷰포트(100vh) 기준 케이스를 한 페이지에서 비교합니다.",
    section: "hooks",
  },
  {
    id: "hook-useNearestScrollableMetrics",
    title: "useNearestScrollableMetrics",
    path: "/guide/hooks/use-nearest-scrollable-metrics",
    description:
      "ref 기준으로 가장 가까운 스크롤 컨테이너의 scrollTop·진행률 등을 구독합니다.",
    section: "hooks",
  },
  {
    id: "hook-useScrollSpy",
    title: "useScrollSpy",
    path: "/guide/hooks/use-scroll-spy",
    description: "스크롤 컨테이너 안에서 현재 보이는 섹션 id를 계산합니다.",
    section: "hooks",
  },
  {
    id: "hook-useMediaDevice",
    title: "useMediaDevice",
    path: "/guide/hooks/use-media-device",
    description:
      "뷰포트·브레이크포인트(mobile/tablet/desktop), 터치·포인터 힌트. forceBreakpoint 옵션 포함.",
    section: "hooks",
  },
  {
    id: "hook-useHtmlRootClass",
    title: "useHtmlRootClass",
    path: "/guide/hooks/use-html-root-class",
    description: "<html> 루트에 클래스를 붙였다가 언마운트 시 제거합니다.",
    section: "hooks",
  },
  {
    id: "hook-useHtmlTag",
    title: "useHtmlTag",
    path: "/guide/hooks/use-html-tag",
    description:
      "head·body에 meta·style·script·link 태그를 주입하고 정리합니다.",
    section: "hooks",
  },
  {
    id: "hook-useLayoutClass",
    title: "useLayoutClass",
    path: "/guide/hooks/use-layout-class",
    description:
      "PageLayoutBasic 레이아웃 루트에 클래스를 붙였다가 이탈 시 제거합니다.",
    section: "hooks",
  },
  ...guideNavComponentItemsByABC,
];

function toPublishSampleItem(item: PublishGuideNavItem): PublishSampleItem {
  return {
    id: item.id,
    title: item.title,
    path: item.path,
    description: item.description,
  };
}

/** components 섹션만 (기존 publishSampleItems 호환) */
export const publishSampleItems: PublishSampleItem[] =
  guideNavComponentItemsByABC.map(toPublishSampleItem);
