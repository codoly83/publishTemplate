import type { PublishGuideNavItem } from "./sampleMeta";
import { publishGuideNavItems } from "./sampleMeta";

/**
 * 샘플 페이지 TSX 원문(빌드 시 번들) — 메타가 아닌 실제 파일 안의 문구까지 검색에 사용합니다.
 */
const rawSampleModules = import.meta.glob(
  [
    "./components/sample*.tsx",
    "./components/Sample*.tsx",
    "./hooks/sample*.tsx",
    "./pageFeatures/sample*.tsx",
    "./layout/sample*.tsx",
  ],
  { eager: true, as: "raw" },
) as Record<string, string>;

/** id(camelCase 또는 소문자) → 컴포넌트 파일명의 Pascal 부분 (sample 제외) */
function idToPascalForFilename(id: string): string {
  const fixes: Record<string, string> = {
    scrollarea: "ScrollArea",
    datepicker: "DatePicker",
    pagechangepanel: "PageChangePanel",
  };
  if (fixes[id]) return fixes[id];
  return id[0]!.toUpperCase() + id.slice(1);
}

function idToSampleBasenames(item: PublishGuideNavItem): string[] {
  if (item.section === "layout") {
    if (item.id === "layout") return ["sampleLayout"];
    if (item.id === "layout-basic") return ["sampleLayoutBasic"];
  }
  if (item.section === "pageFeatures") {
    if (item.id === "pageScrollSpy") return ["samplePageScrollSpy"];
    if (item.id === "scrollTopButton") return ["sampleScrollTopButton"];
  }
  if (item.section === "hooks") {
    const rest = item.id.replace(/^hook-/, "");
    return [`sample${rest[0]!.toUpperCase()}${rest.slice(1)}`];
  }
  const pascal = idToPascalForFilename(item.id);
  return [`sample${pascal}`, `Sample${pascal}`];
}

function subdirForItem(item: PublishGuideNavItem): string {
  if (item.section === "layout") return "layout";
  if (item.section === "pageFeatures") return "pageFeatures";
  if (item.section === "hooks") return "hooks";
  return "components";
}

function resolveRawSource(item: PublishGuideNavItem): string {
  const dir = subdirForItem(item);
  for (const base of idToSampleBasenames(item)) {
    const key = `./${dir}/${base}.tsx`;
    const src = rawSampleModules[key];
    if (typeof src === "string") return src;
  }
  return "";
}

/** 가이드 path → 해당 샘플 TSX 전체 문자열 (없으면 빈 문자열) */
export const guideSampleSourceByPath: Record<string, string> =
  publishGuideNavItems.reduce<Record<string, string>>((acc, item) => {
    acc[item.path] = resolveRawSource(item);
    return acc;
  }, {});

export function getGuideSampleSource(path: string): string {
  return guideSampleSourceByPath[path] ?? "";
}
