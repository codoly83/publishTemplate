import {
  Icon,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  useTabActive,
} from "@/components/ui";
import { GuideBox } from "./GuideBox";

function ActiveAwareCard({ label }: { label: string }) {
  const isActive = useTabActive();
  return (
    <div
      className="rounded-md p-4 transition-all"
      style={{
        background: isActive
          ? "var(--color-primary, #3b82f6)"
          : "var(--color-base, #f1f5f9)",
        color: isActive ? "#fff" : "inherit",
      }}
    >
      <div className="text-sm font-semibold mb-1">{label}</div>
      <div className="text-xs opacity-75">
        isActive: <code>{String(isActive)}</code>
      </div>
    </div>
  );
}

function SampleTabsPage() {
  return (
    <div className="guide-layout">
      <h1 className="guide-title">Tabs Samples</h1>
      <div className="guide-content">
        <GuideBox
          title="Horizontal · variant: default"
          description="가장 기본적인 가로 탭 구성입니다."
          code={`
  <Tabs defaultValue="tab1">
    <TabsList>
      <TabsTrigger value="tab1">Tab 1</TabsTrigger>
      <TabsTrigger value="tab2">Tab 2</TabsTrigger>
      <TabsTrigger value="tab3">Tab 3</TabsTrigger>
    </TabsList>
    <TabsContent value="tab1">Tab 1 내용</TabsContent>
  </Tabs>
          `}
        >
          <Tabs defaultValue="tab1">
            <TabsList>
              <TabsTrigger value="tab1">Tab 1</TabsTrigger>
              <TabsTrigger value="tab2">Tab 2</TabsTrigger>
              <TabsTrigger value="tab3">Tab 3</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1">
              <div className="rounded-md bg-base">
                Horizontal / default · Tab 1 내용
              </div>
            </TabsContent>
            <TabsContent value="tab2">
              <div className="rounded-md bg-base">
                Horizontal / default · Tab 2 내용
              </div>
            </TabsContent>
            <TabsContent value="tab3">
              <div className="rounded-md bg-base">
                Horizontal / default · Tab 3 내용
              </div>
            </TabsContent>
          </Tabs>
        </GuideBox>

        <GuideBox
          title="Horizontal · variant: default · size: sm · type: line"
          description="line 타입과 작은 사이즈를 함께 적용한 가로 탭 예시입니다."
          code={`
  <Tabs defaultValue="tab1" size="sm" type="line">
    <TabsList>
      <TabsTrigger value="tab1">Tab 1</TabsTrigger>
      <TabsTrigger value="tab2">Tab 2</TabsTrigger>
      <TabsTrigger value="tab3">Tab 3</TabsTrigger>
    </TabsList>
  </Tabs>
          `}
        >
          <Tabs defaultValue="tab1" size="sm" type="line">
            <TabsList>
              <TabsTrigger value="tab1">Tab 1</TabsTrigger>
              <TabsTrigger value="tab2">Tab 2</TabsTrigger>
              <TabsTrigger value="tab3">Tab 3</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1">
              <div className="rounded-md bg-base">
                Horizontal / default · Tab 1 내용
              </div>
            </TabsContent>
            <TabsContent value="tab2">
              <div className="rounded-md bg-base">
                Horizontal / default · Tab 2 내용
              </div>
            </TabsContent>
            <TabsContent value="tab3">
              <div className="rounded-md bg-base">
                Horizontal / default · Tab 3 내용
              </div>
            </TabsContent>
          </Tabs>
        </GuideBox>

        <GuideBox
          title="Horizontal · variant: btn"
          description="아이콘과 카운트를 포함한 버튼형 탭 메뉴 샘플입니다."
          code={`
  <Tabs defaultValue="tab1" variant="btn">
    <TabsList>
      <TabsTrigger value="tab1">
        <Icon name="waiting-on" className="icon" />
        <span className="text">Tab 1</span>
        <span className="value">88</span>
      </TabsTrigger>
    </TabsList>
  </Tabs>
          `}
        >
          <Tabs defaultValue="tab1" variant="btn">
            <TabsList>
              <TabsTrigger value="tab1">
                <Icon name="waiting-on" className="icon" />
                <span className="text">Tab 1</span>
                <span className="value">88</span>
              </TabsTrigger>
              <TabsTrigger value="tab2">
                <Icon name="identification-on" className="icon" />
                <span className="text">Tab 2</span>
                <span className="value">88</span>
              </TabsTrigger>
              <TabsTrigger value="tab3">
                <Icon name="calculator-on" className="icon" />
                <span className="text">Tab 3</span>
                <span className="value">88</span>
              </TabsTrigger>
              <TabsTrigger value="tab4">
                <Icon name="check-mark" className="icon" />
                <span className="text">Tab 4</span>
                <span className="value">88</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="tab1">
              <div className="rounded-md bg-base">
                Horizontal / btn · Tab 1 내용
              </div>
            </TabsContent>
            <TabsContent value="tab2">
              <div className="rounded-md bg-base">
                Horizontal / btn · Tab 2 내용
              </div>
            </TabsContent>
            <TabsContent value="tab3">
              <div className="rounded-md bg-base">
                Horizontal / btn · Tab 3 내용
              </div>
            </TabsContent>
          </Tabs>
        </GuideBox>

        <GuideBox
          title="Vertical · variant: default"
          description="세로 방향으로 배치한 기본 탭 사용 예시입니다."
          code={`
  <Tabs
    defaultValue="tab1"
    orientation="vertical"
    className="flex-row gap-6"
  >
    <TabsList>
      <TabsTrigger value="tab1">Tab 1</TabsTrigger>
      <TabsTrigger value="tab2">Tab 2</TabsTrigger>
    </TabsList>
  </Tabs>
          `}
        >
          <Tabs
            defaultValue="tab1"
            orientation="vertical"
            className="flex-row gap-6"
          >
            <TabsList>
              <TabsTrigger value="tab1">Tab 1</TabsTrigger>
              <TabsTrigger value="tab2">Tab 2</TabsTrigger>
              <TabsTrigger value="tab3">Tab 3</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1">
              <div className="rounded-md bg-base w-64">
                Vertical / default · Tab 1 내용
              </div>
            </TabsContent>
            <TabsContent value="tab2">
              <div className="rounded-md bg-base w-64">
                Vertical / default · Tab 2 내용
              </div>
            </TabsContent>
            <TabsContent value="tab3">
              <div className="rounded-md bg-base w-64">
                Vertical / default · Tab 3 내용
              </div>
            </TabsContent>
          </Tabs>
        </GuideBox>

        <GuideBox
          title="Vertical · variant: btn"
          description="세로 방향과 버튼형 variant를 함께 적용한 구성입니다."
          code={`
  <Tabs
    defaultValue="tab1"
    orientation="vertical"
    className="flex-row gap-6"
    variant="btn"
  >
    <TabsList>
      <TabsTrigger value="tab1">Tab 1</TabsTrigger>
      <TabsTrigger value="tab2">Tab 2</TabsTrigger>
    </TabsList>
  </Tabs>
          `}
        >
          <Tabs
            defaultValue="tab1"
            orientation="vertical"
            className="flex-row gap-6"
            variant="btn"
          >
            <TabsList>
              <TabsTrigger value="tab1">Tab 1</TabsTrigger>
              <TabsTrigger value="tab2">Tab 2</TabsTrigger>
              <TabsTrigger value="tab3">Tab 3</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1">
              <div className="rounded-md bg-base w-64">
                Vertical / btn · Tab 1 내용
              </div>
            </TabsContent>
            <TabsContent value="tab2">
              <div className="rounded-md bg-base w-64">
                Vertical / btn · Tab 2 내용
              </div>
            </TabsContent>
            <TabsContent value="tab3">
              <div className="rounded-md bg-base w-64">
                Vertical / btn · Tab 3 내용
              </div>
            </TabsContent>
          </Tabs>
        </GuideBox>
        <GuideBox
          title="useTabActive 훅"
          description="TabsContent 내부 컴포넌트에서 useTabActive()를 호출하면 해당 탭이 현재 활성화됐는지 boolean으로 알 수 있습니다."
          code={`
function ActiveAwareCard({ label }: { label: string }) {
  const isActive = useTabActive();
  return (
    <div style={{ background: isActive ? "blue" : "gray" }}>
      {label} — isActive: {String(isActive)}
    </div>
  );
}

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
    <TabsTrigger value="tab3">Tab 3</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">
    <ActiveAwareCard label="Tab 1 카드" />
  </TabsContent>
  <TabsContent value="tab2">
    <ActiveAwareCard label="Tab 2 카드" />
  </TabsContent>
  <TabsContent value="tab3">
    <ActiveAwareCard label="Tab 3 카드" />
  </TabsContent>
</Tabs>
          `}
        >
          <Tabs defaultValue="tab1">
            <TabsList>
              <TabsTrigger value="tab1">Tab 1</TabsTrigger>
              <TabsTrigger value="tab2">Tab 2</TabsTrigger>
              <TabsTrigger value="tab3">Tab 3</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1">
              <ActiveAwareCard label="Tab 1 카드" />
            </TabsContent>
            <TabsContent value="tab2">
              <ActiveAwareCard label="Tab 2 카드" />
            </TabsContent>
            <TabsContent value="tab3">
              <ActiveAwareCard label="Tab 3 카드" />
            </TabsContent>
          </Tabs>
        </GuideBox>
      </div>
    </div>
  );
}

export { SampleTabsPage };
export default SampleTabsPage;
