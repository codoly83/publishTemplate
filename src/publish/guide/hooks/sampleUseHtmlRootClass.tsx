import { Button } from "@/components/ui";
import { useHtmlRootClass } from "@/hooks/useHtmlRootClass";
import { useHtmlTag } from "@/hooks/useHtmlTag";
import { useState } from "react";
import { GuideBox } from "@/publish/guide/GuideBox";

export function HooksSampleHtmlRootTagPanel() {
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
          가 head에 생깁니다. style ON이면 아래 박스에 인셋 테두리가 보입니다.
        </p>
        <div className="hooks-html-tag-demo-target rounded-lg border border-line p-4 text-sm text-font-b bg-surface">
          style 훅이 켜지면 이 영역에 하이라이트가 적용됩니다.
        </div>
      </div>
    </GuideBox>
  );
}
