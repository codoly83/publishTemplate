import {
  Button,
  PageChangePanel,
  Portal,
  ScrollArea,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  useTabActive,
} from "@/components/ui";
import { useRemainingHeight } from "@/hooks/useRemainingHeight";
import { useState } from "react";
const LAYOUT_OPTIONS = [
  { value: "default", label: "기본 레이아웃" },
  { value: "twoCol", label: "좌우 2분할" },
  { value: "twoCol2", label: "상하 2분할" },
  { value: "threeCol", label: "3분할" },
];
type LayoutType = (typeof LAYOUT_OPTIONS)[number]["value"];
function ActiveAwareCard1({ label, align }: { label: string; align?: string }) {
  const isActive = useTabActive();
  return (
    <div className="mt-4">
      <div>
        {Array.from({ length: 50 }, (_, i) => (
          <div key={i}>
            {label}
            {i} — tab1: {String(isActive)}
            <br />
            <br />
            <br />
          </div>
        ))}
      </div>
      <Portal container={"#floating-button-area"} enabled={isActive}>
        <div className={`floating-button-area ${align}`}>
          <Button>Button</Button>
        </div>
      </Portal>
    </div>
  );
}
function ActiveAwareCard2({ label }: { label: string }) {
  const isActive = useTabActive();
  return (
    <div className="mt-4">
      <div>
        {Array.from({ length: 50 }, (_, i) => (
          <div key={i}>
            {label}
            {i} — tab1: {String(isActive)}
            <br />
            <br />
            <br />
          </div>
        ))}
      </div>
    </div>
  );
}
function ActiveAwareCard3({ label }: { label: string }) {
  const isActive = useTabActive();
  return (
    <div className="mt-4">
      <div>
        {Array.from({ length: 50 }, (_, i) => (
          <div key={i}>
            {label}
            {i} — tab1: {String(isActive)}
            <br />
            <br />
            <br />
          </div>
        ))}
      </div>
    </div>
  );
}
function SampleTabContent({ align }: { align?: string }) {
  return (
    <Tabs defaultValue="tab1" type="line">
      <TabsList className="sticky! top-0 z-10 bg-base">
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <ActiveAwareCard1 label="Tab 1 카드" align={align} />
      </TabsContent>
      <TabsContent value="tab2">
        <ActiveAwareCard2 label="Tab 2 카드" />
      </TabsContent>
      <TabsContent value="tab3">
        <ActiveAwareCard3 label="Tab 3 카드" />
      </TabsContent>
    </Tabs>
  );
}
function SampleLayout() {
  const [layout, setLayout] = useState<LayoutType>("default");

  const { topRef: ColTopRef, remainingHeight: ColMainHeight } =
    useRemainingHeight({ gap: 40, useViewport: true });

  return (
    <>
      <PageChangePanel
        selects={[
          {
            label: "레이아웃",
            value: layout,
            onChange: setLayout,
            options: LAYOUT_OPTIONS,
          },
        ]}
      />

      <div className={`contentWrapper layout-${layout}`}>
        {layout === "default" && (
          <div className="contentBoxSection">
            <div className="contentBox flex-1">
              <ScrollArea className="contentBoxScrollArea">
                <Tabs defaultValue="tab1" type="line">
                  <TabsList className="sticky! top-0 z-10 bg-base">
                    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                    <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                  </TabsList>
                  <TabsContent value="tab1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <div key={i}>
                        asdasdasd
                        {i} — asdasdasdas
                        <br />
                        <br />
                        <br />
                      </div>
                    ))}
                    <Portal container={"#floating-button-area"} enabled={true}>
                      <div className={`floating-button-area`}>
                        <Button>Button</Button>
                      </div>
                    </Portal>
                    <SampleTabContent align="justify-center" />
                  </TabsContent>
                  <TabsContent value="tab2">
                    <ActiveAwareCard2 label="Tab 2 카드" />
                  </TabsContent>
                  <TabsContent value="tab3">
                    <ActiveAwareCard3 label="Tab 3 카드" />
                  </TabsContent>
                </Tabs>
              </ScrollArea>
              <div id="floating-button-area"></div>
            </div>
          </div>
        )}
        {layout === "twoCol" && (
          <div className="contentBoxSection">
            <div className="contentBox flex-1">
              <ScrollArea className="contentBoxScrollArea">
                <SampleTabContent />
              </ScrollArea>
              <div id="floating-button-area"></div>
            </div>
            <div className="contentBox flex-none w-90">우측 패널</div>
          </div>
        )}

        {layout === "twoCol2" && (
          <>
            <div
              ref={ColTopRef}
              className="contentBox contentBoxTop flex-none w-full h-16"
            >
              상단 영역
            </div>
            <div
              className="contentBoxSection contentBoxMain"
              style={{ height: ColMainHeight }}
            >
              <div className="contentBox flex-1">
                <ScrollArea className="contentBoxScrollArea">
                  <SampleTabContent />
                </ScrollArea>
                <div id="floating-button-area"></div>
              </div>
            </div>
          </>
        )}

        {layout === "threeCol" && (
          <>
            <div
              ref={ColTopRef}
              className="contentBox contentBoxTop flex-none w-full h-16"
            >
              상단 영역
            </div>
            <div
              className="contentBoxSection contentBoxMain"
              style={{ height: ColMainHeight }}
            >
              <div className="contentBox flex-1">
                <ScrollArea className="contentBoxScrollArea">
                  <SampleTabContent />
                </ScrollArea>
                <div id="floating-button-area"></div>
              </div>
              <div className="contentBox w-148">사이드 패널</div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export { SampleLayout };
export default SampleLayout;
