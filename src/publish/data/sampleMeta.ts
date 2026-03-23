export interface PublishSampleItem {
  id: string;
  title: string;
  path: string;
  description: string;
}

/** 가이드 사이드바 섹션 구분 */
export type GuideNavSectionId = "layout" | "functional" | "components";

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
  { id: "functional", label: "기능성 컴포넌트" },
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
];

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
    id: "hooks",
    title: "Hooks",
    path: "/guide/hooks",
    description:
      "src/hooks의 useRemainingHeight, useHtmlRootClass(<html>), useHtmlTag(head·body), useLayoutClass 등 공용 훅 사용 예시를 한 페이지에서 확인합니다.",
    section: "functional",
  },
  ...guideNavComponentItems,
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
  guideNavComponentItems.map(toPublishSampleItem);
