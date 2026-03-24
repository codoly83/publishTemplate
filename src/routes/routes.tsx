// Route definitions are exported for reuse in tests (MemoryRouter) and app router.
import { RootLayout } from "../components/layout/RootLayout";
import { Navigate } from "react-router-dom";

// Publish Sample Pages
import { DefaultLayout } from "@/components/layout/DefaultLayout";
import { PageLayoutBasic } from "@/components/layout/pageLayoutBasic/";
import Guide from "@/publish/guide/Guide";
import PublishingList from "@/publish/guide/PublishingList";
import SampleAccordionPage from "@/publish/guide/components/sampleAccordion";
import SampleCollapsiblePage from "@/publish/guide/components/sampleCollapsible";
import SampleCheckboxPage from "@/publish/guide/components/sampleCheckbox";
import SampleChipPage from "@/publish/guide/components/sampleChip";
import SampleDatePickerPage from "@/publish/guide/components/sampleDatePicker";
import SampleModalPage from "@/publish/guide/components/sampleModal";
import SampleIconPage from "@/publish/guide/components/SampleIcon";
import SampleInputPage from "@/publish/guide/components/sampleInput";
import SampleInputStepperPage from "@/publish/guide/components/sampleInputStepper";
import SampleLoadingPage from "@/publish/guide/components/sampleLoading";
import SampleTextareaPage from "@/publish/guide/components/sampleTextarea";
import SampleLayout from "@/publish/guide/layout/sampleLayout";
import SampleLayoutBasicPage from "@/publish/guide/layout/sampleLayoutBasic";
import SamplePageChangePanelPage from "@/publish/guide/components/samplePageChangePanel";
import SamplePaginationPage from "@/publish/guide/components/samplePagination";
import SampleRadioPage from "@/publish/guide/components/sampleRadio";
import SampleScrollAreaPage from "@/publish/guide/components/sampleScrollArea";
import SampleSelectPage from "@/publish/guide/components/sampleSelect";
import SampleSwitchPage from "@/publish/guide/components/sampleToggle";
import SampleButtonPage from "@/publish/guide/components/sampleButton";
import SampleTablePage from "@/publish/guide/components/sampleTable";
import SampleTabsPage from "@/publish/guide/components/sampleTabs";
import SampleAlertDialogPage from "@/publish/guide/components/sampleAlertDialog";
import SamplePortalPage from "@/publish/guide/components/samplePortal";
import SampleFontPage from "@/publish/guide/components/SampleFont";
import SampleUseHtmlRootClass from "@/publish/guide/hooks/sampleUseHtmlRootClass";
import SampleUseHtmlTag from "@/publish/guide/hooks/sampleUseHtmlTag";
import SampleUseLayoutClass from "@/publish/guide/hooks/sampleUseLayoutClass";
import SampleUseMediaDevice from "@/publish/guide/hooks/sampleUseMediaDevice";
import SampleUseNearestScrollableMetrics from "@/publish/guide/hooks/sampleUseNearestScrollableMetrics";
import SampleUseRemainingHeight from "@/publish/guide/hooks/sampleUseRemainingHeight";
import SampleUseScrollSpy from "@/publish/guide/hooks/sampleUseScrollSpy";
import SampleTooltipPage from "@/publish/guide/components/sampleTooltip";
import SampleSliderPage from "@/publish/guide/components/sampleSlider";
import SampleToastPage from "@/publish/guide/components/sampleToast";
import SamplePopoverPage from "@/publish/guide/components/samplePopover";
import SampleSkeletonPage from "@/publish/guide/components/sampleSkeleton";
import SampleSortableListPage from "@/publish/guide/components/sampleSortableList";
import SamplePageScrollSpy from "@/publish/guide/pageFeatures/samplePageScrollSpy";
import SampleScrollTopButtonPage from "@/publish/guide/pageFeatures/sampleScrollTopButton";
import SampleSwiperPage from "@/publish/guide/components/sampleSwiper";
import SampleTextListPage from "@/publish/guide/components/sampleTextList";
import SampleTreeViewPage from "@/publish/guide/components/sampleTreeView";
import { publishGuideNavItems } from "@/publish/guide/sampleMeta";
import { RouteTitleSync } from "./RouteTitleSync";

const titleByPath = publishGuideNavItems.reduce<Record<string, string>>(
  (acc, item) => {
    acc[item.path] = item.title;
    return acc;
  },
  {},
);

function getGuideChildTitle(path: string) {
  return titleByPath[`/guide/${path}`];
}
export const routes = [
  {
    path: "/",
    element: (
      <>
        <RouteTitleSync />
        <RootLayout />
      </>
    ),
    handle: { title: "Home" },
    children: [{ index: true, element: <Navigate to="/guide" replace /> }],
  },

  {
    path: "/guide",
    element: (
      <>
        <RouteTitleSync />
        <Guide />
      </>
    ),
    handle: { title: "Guide" },
    children: [
      { index: true, element: <PublishingList />, handle: { title: "List" } },
      {
        path: "accordion",
        element: <SampleAccordionPage />,
        handle: { title: getGuideChildTitle("accordion") },
      },
      {
        path: "collapsible",
        element: <SampleCollapsiblePage />,
        handle: { title: getGuideChildTitle("collapsible") },
      },
      {
        path: "button",
        element: <SampleButtonPage />,
        handle: { title: getGuideChildTitle("button") },
      },
      {
        path: "alert-dialog",
        element: <SampleAlertDialogPage />,
        handle: { title: getGuideChildTitle("alert-dialog") },
      },
      {
        path: "modal",
        element: <SampleModalPage />,
        handle: { title: getGuideChildTitle("modal") },
      },
      {
        path: "checkbox",
        element: <SampleCheckboxPage />,
        handle: { title: getGuideChildTitle("checkbox") },
      },
      {
        path: "chip",
        element: <SampleChipPage />,
        handle: { title: getGuideChildTitle("chip") },
      },
      {
        path: "datepicker",
        element: <SampleDatePickerPage />,
        handle: { title: getGuideChildTitle("datepicker") },
      },
      {
        path: "icon",
        element: <SampleIconPage />,
        handle: { title: getGuideChildTitle("icon") },
      },
      {
        path: "input",
        element: <SampleInputPage />,
        handle: { title: getGuideChildTitle("input") },
      },
      {
        path: "input-stepper",
        element: <SampleInputStepperPage />,
        handle: { title: getGuideChildTitle("input-stepper") },
      },
      {
        path: "loading",
        element: <SampleLoadingPage />,
        handle: { title: getGuideChildTitle("loading") },
      },
      {
        path: "textarea",
        element: <SampleTextareaPage />,
        handle: { title: getGuideChildTitle("textarea") },
      },
      {
        path: "radio",
        element: <SampleRadioPage />,
        handle: { title: getGuideChildTitle("radio") },
      },
      {
        path: "select",
        element: <SampleSelectPage />,
        handle: { title: getGuideChildTitle("select") },
      },
      {
        path: "switch",
        element: <SampleSwitchPage />,
        handle: { title: getGuideChildTitle("switch") },
      },
      {
        path: "slider",
        element: <SampleSliderPage />,
        handle: { title: getGuideChildTitle("slider") },
      },
      {
        path: "tabs",
        element: <SampleTabsPage />,
        handle: { title: getGuideChildTitle("tabs") },
      },
      {
        path: "table",
        element: <SampleTablePage />,
        handle: { title: getGuideChildTitle("table") },
      },
      {
        path: "scrollarea",
        element: <SampleScrollAreaPage />,
        handle: { title: getGuideChildTitle("scrollarea") },
      },
      {
        path: "pagination",
        element: <SamplePaginationPage />,
        handle: { title: getGuideChildTitle("pagination") },
      },
      {
        path: "pagechangepanel",
        element: <SamplePageChangePanelPage />,
        handle: { title: getGuideChildTitle("pagechangepanel") },
      },
      {
        path: "portal",
        element: <SamplePortalPage />,
        handle: { title: getGuideChildTitle("portal") },
      },
      {
        path: "font",
        element: <SampleFontPage />,
        handle: { title: getGuideChildTitle("font") },
      },
      {
        path: "hooks",
        element: <Navigate to="/guide/hooks/use-remaining-height" replace />,
      },
      {
        path: "hooks/use-remaining-height",
        element: <SampleUseRemainingHeight />,
        handle: {
          title: getGuideChildTitle("hooks/use-remaining-height"),
        },
      },
      {
        path: "hooks/use-nearest-scrollable-metrics",
        element: <SampleUseNearestScrollableMetrics />,
        handle: {
          title: getGuideChildTitle("hooks/use-nearest-scrollable-metrics"),
        },
      },
      {
        path: "hooks/use-scroll-spy",
        element: <SampleUseScrollSpy />,
        handle: { title: getGuideChildTitle("hooks/use-scroll-spy") },
      },
      {
        path: "hooks/use-media-device",
        element: <SampleUseMediaDevice />,
        handle: { title: getGuideChildTitle("hooks/use-media-device") },
      },
      {
        path: "hooks/use-html-root-class",
        element: <SampleUseHtmlRootClass />,
        handle: { title: getGuideChildTitle("hooks/use-html-root-class") },
      },
      {
        path: "hooks/use-html-tag",
        element: <SampleUseHtmlTag />,
        handle: { title: getGuideChildTitle("hooks/use-html-tag") },
      },
      {
        path: "hooks/use-layout-class",
        element: <SampleUseLayoutClass />,
        handle: { title: getGuideChildTitle("hooks/use-layout-class") },
      },
      {
        path: "tooltip",
        element: <SampleTooltipPage />,
        handle: { title: getGuideChildTitle("tooltip") },
      },
      {
        path: "toast",
        element: <SampleToastPage />,
        handle: { title: getGuideChildTitle("toast") },
      },
      {
        path: "popover",
        element: <SamplePopoverPage />,
        handle: { title: getGuideChildTitle("popover") },
      },
      {
        path: "skeleton",
        element: <SampleSkeletonPage />,
        handle: { title: getGuideChildTitle("skeleton") },
      },
      {
        path: "sortable-list",
        element: <SampleSortableListPage />,
        handle: { title: getGuideChildTitle("sortable-list") },
      },
      {
        path: "page-scroll-spy",
        element: <SamplePageScrollSpy />,
        handle: { title: getGuideChildTitle("page-scroll-spy") },
      },
      {
        path: "scroll-top-button",
        element: <SampleScrollTopButtonPage />,
        handle: { title: getGuideChildTitle("scroll-top-button") },
      },
      {
        path: "swiper",
        element: <SampleSwiperPage />,
        handle: { title: getGuideChildTitle("swiper") },
      },
      {
        path: "tree-view",
        element: <SampleTreeViewPage />,
        handle: { title: getGuideChildTitle("tree-view") },
      },
      {
        path: "text-list",
        element: <SampleTextListPage />,
        handle: { title: getGuideChildTitle("text-list") },
      },
    ],
  },

  {
    path: "/guide",
    element: (
      <>
        <RouteTitleSync />
        <DefaultLayout />
      </>
    ),
    handle: { title: "Guide" },
    children: [
      {
        path: "layout",
        element: <SampleLayout />,
        handle: { title: getGuideChildTitle("layout") },
      },
    ],
  },
  {
    path: "/guide/layout-basic",
    element: (
      <>
        <RouteTitleSync />
        <PageLayoutBasic />
      </>
    ),
    handle: { title: "Guide" },
    children: [
      {
        index: true,
        element: <SampleLayoutBasicPage />,
        handle: { title: titleByPath["/guide/layout-basic"] },
      },
    ],
  },
];
