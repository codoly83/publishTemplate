import { Button } from "@/components/ui";
import { useHtmlTag } from "@/hooks/useHtmlTag";
import { useState } from "react";
import { GuideBox } from "@/publish/guide/GuideBox";

export function HooksSampleHtmlTagPanel() {
  const [injectHeadMeta, setInjectHeadMeta] = useState(false);
  const [injectHeadStyle, setInjectHeadStyle] = useState(false);

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
      title="useHtmlTag"
      description="head·body에 meta·style·script·link 같은 태그를 주입하고, 언마운트 시 정리합니다."
      code={`
import { useState } from "react";
import { useHtmlTag } from "@/hooks/useHtmlTag";

const [injectHeadMeta, setInjectHeadMeta] = useState(false);
const [injectHeadStyle, setInjectHeadStyle] = useState(false);

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
      `}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-3">
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
          meta ON일 때{" "}
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

function SampleUseHtmlTag() {
  return (
    <div className="guide-layout">
      <h1 className="guide-title">useHtmlTag</h1>
      <div className="guide-content">
        <HooksSampleHtmlTagPanel />
      </div>
    </div>
  );
}

export { SampleUseHtmlTag };
export default SampleUseHtmlTag;
