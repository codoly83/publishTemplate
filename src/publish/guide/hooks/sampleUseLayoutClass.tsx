import { Button } from "@/components/ui";
import { useLayoutClass } from "@/hooks/useLayoutClass";
import { Link } from "react-router-dom";
import { GuideBox } from "@/publish/guide/GuideBox";

export function HooksSampleLayoutClassPanel() {
  return (
    <GuideBox
      title="useLayoutClass"
      description="PageLayoutBasic 하위(Outlet 페이지)에서 레이아웃 루트 DOM에 클래스를 붙였다가 라우트 이탈 시 제거합니다. 이 가이드 경로에는 셸 컨텍스트가 없어 동작하지 않으며, 실제 동작은 레이아웃 베이직 샘플에서 확인하세요."
      code={`
import { useLayoutClass } from "@/hooks/useLayoutClass";

function SampleHooksPage() {
  /* 이 가이드 경로는 PageLayoutBasic 밖 → shell 없음 → no-op */
  useLayoutClass("sample-hooks-layout-class-noop");
  return (/* ... */);
}

/* PageLayoutBasic Outlet 안의 페이지에서는 예: */
function SomeOutletPage() {
  useLayoutClass("type2");
  return <article>...</article>;
}
      `}
    >
      <p className="text-sm text-font-g mb-3">
        위 페이지에서는 훅을 호출만 해 두었습니다(루트 없음 → no-op).
      </p>
      <Button variant="outline" size="md" asChild>
        <Link to="/guide/layout-basic">Layout Basic 샘플로 이동</Link>
      </Button>
    </GuideBox>
  );
}

function SampleUseLayoutClass() {
  useLayoutClass("sample-hooks-layout-class-noop");

  return (
    <div className="guide-layout">
      <h1 className="guide-title">useLayoutClass</h1>
      <div className="guide-content">
        <HooksSampleLayoutClassPanel />
      </div>
    </div>
  );
}

export { SampleUseLayoutClass };
export default SampleUseLayoutClass;
