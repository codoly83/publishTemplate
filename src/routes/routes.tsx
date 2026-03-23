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
export const routes = [
  {
    path: "/",
    element: <RootLayout />,
    children: [{ index: true, element: <Navigate to="/guide" replace /> }],
  },

  {
    path: "/guide",
    element: <Guide />,
    children: [
      { index: true, element: <PublishingList /> },
      { path: "accordion", element: <SampleAccordionPage /> },
      { path: "collapsible", element: <SampleCollapsiblePage /> },
      { path: "button", element: <SampleButtonPage /> },
      { path: "alert-dialog", element: <SampleAlertDialogPage /> },
      { path: "modal", element: <SampleModalPage /> },
      { path: "checkbox", element: <SampleCheckboxPage /> },
      { path: "chip", element: <SampleChipPage /> },
      { path: "datepicker", element: <SampleDatePickerPage /> },
      { path: "icon", element: <SampleIconPage /> },
      { path: "input", element: <SampleInputPage /> },
      { path: "textarea", element: <SampleTextareaPage /> },
      { path: "radio", element: <SampleRadioPage /> },
      { path: "select", element: <SampleSelectPage /> },
      { path: "switch", element: <SampleSwitchPage /> },
      { path: "slider", element: <SampleSliderPage /> },
      { path: "tabs", element: <SampleTabsPage /> },
      { path: "table", element: <SampleTablePage /> },
      { path: "scrollarea", element: <SampleScrollAreaPage /> },
      { path: "pagination", element: <SamplePaginationPage /> },
      { path: "pagechangepanel", element: <SamplePageChangePanelPage /> },
      { path: "portal", element: <SamplePortalPage /> },
      { path: "font", element: <SampleFontPage /> },
      { path: "hooks", element: <SampleHooksPage /> },
      { path: "tooltip", element: <SampleTooltipPage /> },
      { path: "toast", element: <SampleToastPage /> },
      { path: "popover", element: <SamplePopoverPage /> },
      { path: "skeleton", element: <SampleSkeletonPage /> },
    ],
  },

  {
    path: "/guide",
    element: <DefaultLayout />,
    children: [{ path: "layout", element: <SampleLayout /> }],
  },
  {
    path: "/guide/layout-basic",
    element: <PageLayoutBasic />,
    children: [{ index: true, element: <SampleLayoutBasicPage /> }],
  },
];
