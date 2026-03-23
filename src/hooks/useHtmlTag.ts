import { useEffect } from "react";

export type HtmlDocumentMountParent = "head" | "body";

export interface UseHtmlTagOptions {
  /** DOM 태그 이름 (예: meta, link, style, script) */
  tag: string;
  /** 삽입 위치. 기본 head */
  parent?: HtmlDocumentMountParent;
  /** `setAttribute`로 설정할 속성. `true`는 불리언 속성(값 없음), `false`·`undefined`는 생략 */
  attrs?: Record<string, string | boolean | undefined>;
  /** 텍스트 자식 (style·script 본문 등) */
  textContent?: string;
  /** false이면 노드를 만들지 않습니다 */
  enabled?: boolean;
}

function attrsSignature(attrs: Record<string, string | boolean | undefined> | undefined) {
  if (!attrs) return "";
  const keys = Object.keys(attrs).sort();
  return keys.map((k) => `${k}:${String(attrs[k])}`).join("|");
}

/**
 * `document.head` 또는 `document.body`에 DOM 노드를 붙였다가,
 * 컴포넌트 언마운트(또는 `enabled`가 false)일 때 제거합니다.
 *
 * 페이지별 meta·link·인라인 style 등 HTML 문서 트리에만 넣을 수 있는 것에 쓰입니다.
 */
function useHtmlTag(options: UseHtmlTagOptions) {
  const {
    tag,
    parent = "head",
    attrs,
    textContent,
    enabled = true,
  } = options;

  const attrKey = attrsSignature(attrs);

  useEffect(() => {
    if (!enabled) return;

    const el = document.createElement(tag);
    if (attrs) {
      for (const [key, value] of Object.entries(attrs)) {
        if (value === undefined || value === false) continue;
        if (value === true) el.setAttribute(key, "");
        else el.setAttribute(key, value);
      }
    }
    if (textContent !== undefined) {
      el.textContent = textContent;
    }

    const mountParent = parent === "body" ? document.body : document.head;
    mountParent.appendChild(el);

    return () => {
      el.remove();
    };
  }, [tag, parent, textContent, enabled, attrKey]);
}

export { useHtmlTag };
export default useHtmlTag;
