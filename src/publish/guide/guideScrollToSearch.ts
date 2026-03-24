/** GuideSearch에서 navigate state로 넘기는 키 */
export const GUIDE_SEARCH_SCROLL_STATE_KEY = "guideSearchScrollTo" as const;

/** 새 탭 열기 시 sessionStorage 키 */
export const GUIDE_SEARCH_SCROLL_STORAGE_KEY = "guide:search-scroll-v1";

function pickScrollElement(textNode: Text, container: HTMLElement): HTMLElement {
  let el: HTMLElement | null = textNode.parentElement;
  let fallback = el ?? container;
  while (el && el !== container) {
    const tag = el.tagName;
    if (tag === "SECTION" || tag === "H1" || tag === "H2" || tag === "H3") {
      return el;
    }
    fallback = el;
    el = el.parentElement;
  }
  return fallback;
}

/** `.guide-content` 안에서 needle이 포함된 첫 텍스트 노드로 스크롤합니다. */
export function scrollGuideContentToMatch(
  container: HTMLElement,
  needle: string,
): boolean {
  const n = needle.trim();
  if (!n) return false;
  const lower = n.toLowerCase();
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null);
  let node: Node | null;
  while ((node = walker.nextNode())) {
    const text = node.textContent ?? "";
    if (!text.trim()) continue;
    if (!text.toLowerCase().includes(lower)) continue;
    const textNode = node as Text;
    const target = pickScrollElement(textNode, container);
    target.scrollIntoView({ block: "center", behavior: "smooth", inline: "nearest" });
    return true;
  }
  return false;
}
