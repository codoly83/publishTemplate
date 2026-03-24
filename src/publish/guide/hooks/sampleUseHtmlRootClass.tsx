import { Button } from "@/components/ui";
import { useHtmlRootClass } from "@/hooks/useHtmlRootClass";
import { useState } from "react";
import { GuideBox } from "@/publish/guide/GuideBox";

export function HooksSampleHtmlRootClassPanel() {
  const [injectHtmlClass, setInjectHtmlClass] = useState(false);

  useHtmlRootClass("publish-template-html-root-demo", {
    enabled: injectHtmlClass,
  });

  return (
    <GuideBox
      title="useHtmlRootClass"
      description="<html> 루트에 클래스를 붙였다가 언마운트 시 제거합니다. 테마·페이지 전역 상태 표시용 클래스 주입에 사용합니다."
      code={`
import { useState } from "react";
import { useHtmlRootClass } from "@/hooks/useHtmlRootClass";

const [injectHtmlClass, setInjectHtmlClass] = useState(false);

useHtmlRootClass("publish-template-html-root-demo", {
  enabled: injectHtmlClass,
});
      `}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-3">
          <Button
            variant={injectHtmlClass ? "default" : "outline"}
            size="sm"
            type="button"
            onClick={() => setInjectHtmlClass((v) => !v)}
          >
            &lt;html&gt;에 class {injectHtmlClass ? "제거" : "추가"}
          </Button>
        </div>
        <p className="text-sm text-font-g">
          ON이면 뷰포트 가장자리에 파란 outline이 보이고,{" "}
          <code className="text-font-b">publish-template-html-root-demo</code>
          클래스가 붙습니다.
        </p>
      </div>
    </GuideBox>
  );
}

function SampleUseHtmlRootClass() {
  return (
    <div className="guide-layout">
      <h1 className="guide-title">useHtmlRootClass</h1>
      <div className="guide-content">
        <HooksSampleHtmlRootClassPanel />
      </div>
    </div>
  );
}
export { SampleUseHtmlRootClass };
export default SampleUseHtmlRootClass;
