// Route definitions are exported for reuse in tests (MemoryRouter) and app router.
import { RootLayout } from "../components/layout/RootLayout";
import { Navigate } from "react-router-dom";

// Publish Sample Pages
import { DefaultLayout } from "@/components/layout/DefaultLayout";
import { PageLayoutBasic } from "@/components/layout/pageLayoutBasic/";
import Guide from "@/publish/Guide";
import PublishingList from "@/publish/PublishingList";
import SampleAccordionPage from "@/publish/sample/sampleAccordion";
import SampleCollapsiblePage from "@/publish/sample/sampleCollapsible";
import SampleCheckboxPage from "@/publish/sample/sampleCheckbox";
import SampleChipPage from "@/publish/sample/sampleChip";
import SampleDatePickerPage from "@/publish/sample/sampleDatePicker";
import SampleModalPage from "@/publish/sample/sampleModal";
import SampleIconPage from "@/publish/sample/SampleIcon";
import SampleInputPage from "@/publish/sample/sampleInput";
import SampleInputStepperPage from "@/publish/sample/sampleInputStepper";
import SampleLoadingPage from "@/publish/sample/sampleLoading";
import SampleTextareaPage from "@/publish/sample/sampleTextarea";
import SampleLayout from "@/publish/sample/sampleLayout";
import SampleLayoutBasicPage from "@/publish/sample/sampleLayoutBasic";
import SamplePageChangePanelPage from "@/publish/sample/samplePageChangePanel";
import SamplePaginationPage from "@/publish/sample/samplePagination";
import SampleRadioPage from "@/publish/sample/sampleRadio";
import SampleScrollAreaPage from "@/publish/sample/sampleScrollArea";
import SampleSelectPage from "@/publish/sample/sampleSelect";
import SampleSwitchPage from "@/publish/sample/sampleToggle";
import SampleButtonPage from "../publish/sample/sampleButton";
import SampleTablePage from "../publish/sample/sampleTable";
import SampleTabsPage from "../publish/sample/sampleTabs";
import SampleAlertDialogPage from "@/publish/sample/sampleAlertDialog";
import SamplePortalPage from "@/publish/sample/samplePortal";
import SampleFontPage from "@/publish/sample/SampleFont";
import SampleHooksPage from "@/publish/sample/sampleHooks";
import SampleTooltipPage from "@/publish/sample/sampleTooltip";
import SampleSliderPage from "@/publish/sample/sampleSlider";
import SampleToastPage from "@/publish/sample/sampleToast";
import SamplePopoverPage from "@/publish/sample/samplePopover";
import SampleSkeletonPage from "@/publish/sample/sampleSkeleton";
import SampleSortableListPage from "@/publish/sample/sampleSortableList";
import SamplePageScrollSpy from "@/publish/sample/samplePageScrollSpy";
import SampleScrollTopButtonPage from "@/publish/sample/sampleScrollTopButton";
import SampleSwiperPage from "@/publish/sample/sampleSwiper";
import SampleTextListPage from "@/publish/sample/sampleTextList";
import SampleTreeViewPage from "@/publish/sample/sampleTreeView";
import { publishGuideNavItems } from "@/publish/data/sampleMeta";
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
        element: <SampleHooksPage />,
        handle: { title: getGuideChildTitle("hooks") },
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
