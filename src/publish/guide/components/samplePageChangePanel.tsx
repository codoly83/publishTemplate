import { PageChangePanel } from "@/components/ui";
import { useState } from "react";
import { GuideBox } from "@/publish/guide/GuideBox";

const LAYOUT_OPTIONS = [
  { value: "default", label: "기본 레이아웃" },
  { value: "twoCol", label: "좌우 2분할" },
  { value: "twoCol2", label: "상하 2분할" },
  { value: "threeCol", label: "3분할" },
];

const THEME_OPTIONS = [
  { value: "light", label: "라이트" },
  { value: "dark", label: "다크" },
  { value: "system", label: "시스템" },
];

function SamplePageChangePanelPage() {
  const [layout, setLayout] = useState("default");
  const [layout2, setLayout2] = useState("default");
  const [theme, setTheme] = useState("light");

  return (
    <div className="guide-layout">
      <h1 className="guide-title">PageChangePanel Samples</h1>
      <div className="guide-content">
        <GuideBox
          title="Select 1개"
          description="selects 배열에 항목 1개를 전달합니다. 패널을 드래그해서 자유롭게 이동할 수 있습니다."
          code={`
  const LAYOUT_OPTIONS = [
    { value: "default", label: "기본 레이아웃" },
    { value: "twoCol",  label: "좌우 2분할" },
    { value: "twoCol2", label: "상하 2분할" },
    { value: "threeCol",label: "3분할" },
  ];
  const [layout, setLayout] = useState("default");
  
  <PageChangePanel
    selects={[
      {
        label: "레이아웃",
        value: layout,
        onChange: setLayout,
        options: LAYOUT_OPTIONS,
      },
    ]}
  />        `}
        >
          <p className="text-sm text-slate-500">
            선택된 레이아웃:{" "}
            <strong className="text-slate-800">{layout}</strong>
          </p>
          <PageChangePanel
            selects={[
              {
                label: "레이아웃",
                value: layout,
                onChange: setLayout,
                options: LAYOUT_OPTIONS,
              },
            ]}
            initialPos={{ x: 260, y: 160 }}
          />
        </GuideBox>

        <GuideBox
          title="Select 2개 (별도 값·라벨·옵션)"
          description="selects 배열에 2개를 전달하면 구분선으로 나뉜 두 개의 Select가 렌더링됩니다."
          code={`
  <PageChangePanel
    selects={[
      {
        label: "레이아웃",
        value: layout,
        onChange: setLayout,
        options: LAYOUT_OPTIONS,
      },
      {
        label: "테마",
        value: theme,
        onChange: setTheme,
        options: THEME_OPTIONS,
      },
    ]}
  />
          `}
        >
          <p className="text-sm text-slate-500">
            레이아웃: <strong className="text-slate-800">{layout2}</strong>
            {"  /  "}
            테마: <strong className="text-slate-800">{theme}</strong>
          </p>
          <PageChangePanel
            selects={[
              {
                label: "레이아웃",
                value: layout2,
                onChange: setLayout2,
                options: LAYOUT_OPTIONS,
              },
              {
                label: "테마",
                value: theme,
                onChange: setTheme,
                options: THEME_OPTIONS,
              },
            ]}
            initialPos={{ x: 260, y: 420 }}
          />
        </GuideBox>
      </div>
    </div>
  );
}

export { SamplePageChangePanelPage };
export default SamplePageChangePanelPage;
