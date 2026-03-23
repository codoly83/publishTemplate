import { Button } from "@/components/ui";
import { useHtmlRootClass } from "@/hooks/useHtmlRootClass";
import { useHtmlTag } from "@/hooks/useHtmlTag";
import { useLayoutClass } from "@/hooks/useLayoutClass";
import { useRemainingHeight } from "@/hooks/useRemainingHeight";
import { useState } from "react";
import { Link } from "react-router-dom";
import { GuideBox } from "./GuideBox";

/** `src/hooks` 훅들을 한 페이지에서 확인합니다. */
function SampleHooksPage() {
  /* PageLayoutBasic 바깥에서는 shell이 없어 no-op — 샘플 페이지에서 훅 import·호출만 유지 */
  useLayoutClass("sample-hooks-layout-class-noop");

  const [tallHeader, setTallHeader] = useState(false);

  const {
    containerRef: remainingContainerRef,
    topRef: remainingTopRef,
    remainingHeight,
  } = useRemainingHeight({ gap: 16 });

  const { topRef: viewportTopRef, remainingHeight: viewportRemainingHeight } =
    useRemainingHeight({ gap: 24, useViewport: true });

  const [injectHeadMeta, setInjectHeadMeta] = useState(false);
  const [injectHeadStyle, setInjectHeadStyle] = useState(false);
  const [injectHtmlClass, setInjectHtmlClass] = useState(false);

  useHtmlRootClass("publish-template-html-root-demo", {
    enabled: injectHtmlClass,
  });

  useHtmlTag({
    tag: "meta",
    attrs: {
      name: "publish-template-hooks-demo",
      content: "useHtmlTag sample — meta in document.head",
    },
    enabled: injectHeadMeta,
  });

  useHtmlTag({
    tag: "style",
    parent: "head",
    attrs: { "data-publish-template": "hooks-demo-style" },
    textContent: `.hooks-html-tag-demo-target { box-shadow: inset 0 0 0 2px var(--color-primary, #3b82f6); border-radius: 8px; }`,
    enabled: injectHeadStyle,
  });

  return (
    <div className="guide-layout">
      <h1 className="guide-title">Hooks</h1>
      <div className="guide-content">
        <GuideBox
          title="useRemainingHeight — 컨테이너 기준"
          description="부모 박스 높이에서 상단 영역과 gap을 뺀 나머지를 px로 돌려줍니다. 상단 높이를 바꿔도 ResizeObserver로 다시 계산됩니다."
          code={`
import { useState } from "react";
import { useRemainingHeight } from "@/hooks/useRemainingHeight";

const [tallHeader, setTallHeader] = useState(false);

const {
  containerRef: remainingContainerRef,
  topRef: remainingTopRef,
  remainingHeight,
} = useRemainingHeight({ gap: 16 });

<button type="button" onClick={() => setTallHeader((v) => !v)}>
  상단 영역 높이 토글
</button>
<div
  ref={remainingContainerRef}
  className="rounded-lg border border-line overflow-hidden flex flex-col bg-base"
  style={{ height: 320 }}
>
  <div
    ref={remainingTopRef}
    className="shrink-0 border-b border-line px-3 flex items-center text-sm text-font-b bg-surface"
    style={{ height: tallHeader ? 72 : 40 }}
  >
    상단 (remainingHeight: {Math.round(remainingHeight)}px)
  </div>
  <div
    className="min-h-0 overflow-auto p-3 text-sm text-font-g"
    style={{ height: remainingHeight }}
  >
    {/* 스크롤 본문 */}
  </div>
</div>
          `}
        >
          <div className="flex flex-col gap-4">
            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={() => setTallHeader((v) => !v)}
            >
              상단 영역 높이 토글
            </Button>
            <div
              ref={remainingContainerRef}
              className="rounded-lg border border-line overflow-hidden flex flex-col bg-base"
              style={{ height: 320 }}
            >
              <div
                ref={remainingTopRef}
                className="shrink-0 border-b border-line px-3 flex items-center text-sm text-font-b bg-surface"
                style={{ height: tallHeader ? 72 : 40 }}
              >
                상단 (remainingHeight: {Math.round(remainingHeight)}px)
              </div>
              <div
                className="min-h-0 overflow-auto p-3 text-sm text-font-g"
                style={{ height: remainingHeight }}
              >
                {Array.from({ length: 40 }, (_, i) => (
                  <p key={i} className="mb-2">
                    스크롤 테스트 줄 {i + 1}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </GuideBox>

        <GuideBox
          title="useRemainingHeight — 뷰포트(100vh) 기준"
          description="useViewport: true이면 기준 높이가 window.innerHeight입니다. 레이아웃 샘플의 상하 분할·메인 영역 높이에 쓰인 패턴과 동일합니다."
          code={`
import { useRemainingHeight } from "@/hooks/useRemainingHeight";

const {
  topRef: viewportTopRef,
  remainingHeight: viewportRemainingHeight,
} = useRemainingHeight({ gap: 24, useViewport: true });

<div className="rounded-lg border border-line overflow-hidden flex flex-col bg-base">
  <div
    ref={viewportTopRef}
    className="shrink-0 border-b border-line px-3 py-3 text-sm text-font-b bg-surface"
  >
    뷰포트 기준 상단 (remainingHeight: {Math.round(viewportRemainingHeight)}px)
  </div>
  <div
    className="min-h-0 overflow-auto p-3 text-sm text-font-g"
    style={{ height: viewportRemainingHeight }}
  >
    {/* 메인 스크롤 영역 */}
  </div>
</div>
          `}
        >
          <div className="rounded-lg border border-line overflow-hidden flex flex-col bg-base">
            <div
              ref={viewportTopRef}
              className="shrink-0 border-b border-line px-3 py-3 text-sm text-font-b bg-surface"
            >
              뷰포트 기준 상단 (remainingHeight:{" "}
              {Math.round(viewportRemainingHeight)}px)
            </div>
            <div
              className="min-h-0 overflow-auto p-3 text-sm text-font-g"
              style={{ height: viewportRemainingHeight }}
            >
              {Array.from({ length: 30 }, (_, i) => (
                <p key={i} className="mb-2">
                  창 높이에 맞춰 본문 영역 높이가 잡힙니다. {i + 1}
                </p>
              ))}
            </div>
          </div>
        </GuideBox>

        <GuideBox
          title="useHtmlRootClass / useHtmlTag"
          description="<html> 루트에 클래스를 붙이거나, head·body에 meta·link·style 노드를 붙이는 훅입니다. 언마운트 시 정리됩니다. Elements에서 html·head를 열어 확인할 수 있습니다."
          code={`
import { useState } from "react";
import { useHtmlRootClass } from "@/hooks/useHtmlRootClass";
import { useHtmlTag } from "@/hooks/useHtmlTag";

const [injectHeadMeta, setInjectHeadMeta] = useState(false);
const [injectHeadStyle, setInjectHeadStyle] = useState(false);
const [injectHtmlClass, setInjectHtmlClass] = useState(false);

useHtmlRootClass("publish-template-html-root-demo", {
  enabled: injectHtmlClass,
});

useHtmlTag({
  tag: "meta",
  attrs: {
    name: "publish-template-hooks-demo",
    content: "useHtmlTag sample — meta in document.head",
  },
  enabled: injectHeadMeta,
});

useHtmlTag({
  tag: "style",
  parent: "head",
  attrs: { "data-publish-template": "hooks-demo-style" },
  textContent:
    ".hooks-html-tag-demo-target { box-shadow: inset 0 0 0 2px var(--color-primary, #3b82f6); border-radius: 8px; }",
  enabled: injectHeadStyle,
});

// 버튼: setInjectHtmlClass / setInjectHeadMeta / setInjectHeadStyle 로 위 상태 토글
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
              <Button
                variant={injectHeadMeta ? "default" : "outline"}
                size="sm"
                type="button"
                onClick={() => setInjectHeadMeta((v) => !v)}
              >
                head에 meta {injectHeadMeta ? "제거" : "추가"}
              </Button>
              <Button
                variant={injectHeadStyle ? "default" : "outline"}
                size="sm"
                type="button"
                onClick={() => setInjectHeadStyle((v) => !v)}
              >
                head에 style {injectHeadStyle ? "제거" : "추가"}
              </Button>
            </div>
            <p className="text-sm text-font-g">
              &lt;html&gt; class ON이면 뷰포트 가장자리에 파란 outline이 보이고,{" "}
              <code className="text-font-b">
                publish-template-html-root-demo
              </code>{" "}
              클래스가 붙습니다. meta ON일 때{" "}
              <code className="text-font-b">
                meta[name=publish-template-hooks-demo]
              </code>
              가 head에 생깁니다. style ON이면 아래 박스에 인셋 테두리가
              보입니다.
            </p>
            <div className="hooks-html-tag-demo-target rounded-lg border border-line p-4 text-sm text-font-b bg-surface">
              style 훅이 켜지면 이 영역에 하이라이트가 적용됩니다.
            </div>
          </div>
        </GuideBox>

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
      </div>
    </div>
  );
}

export { SampleHooksPage };
export default SampleHooksPage;
