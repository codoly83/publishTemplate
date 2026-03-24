import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { getGuideSampleSource } from "./guideSampleSourceIndex";
import {
  GUIDE_NAV_SECTIONS,
  type PublishGuideNavItem,
} from "./sampleMeta";

type SearchHit = {
  item: PublishGuideNavItem;
  sectionLabel: string;
  score: number;
  /** 샘플 TSX 안에서 잡힌 문맥 (있을 때만) */
  snippet?: string;
};

function sectionLabelById(id: PublishGuideNavItem["section"]): string {
  return GUIDE_NAV_SECTIONS.find((s) => s.id === id)?.label ?? id;
}

function normalizeForMatch(s: string): string {
  return s.trim().toLowerCase();
}

function scoreHit(
  item: PublishGuideNavItem,
  qNorm: string,
  metaHaystack: string,
  sourceMatch: boolean,
): number {
  let score = 0;
  const title = item.title;
  const titleN = normalizeForMatch(title);
  const descN = normalizeForMatch(item.description);
  const idN = normalizeForMatch(item.id);

  if (titleN === qNorm) score += 200;
  else if (titleN.startsWith(qNorm)) score += 120;
  else if (titleN.includes(qNorm)) score += 90;

  if (descN.includes(qNorm)) score += 55;
  if (idN.includes(qNorm)) score += 40;
  if (metaHaystack.includes(qNorm)) score += 25;

  if (sourceMatch) {
    score += 35;
    const metaOnly =
      titleN.includes(qNorm) ||
      descN.includes(qNorm) ||
      idN.includes(qNorm);
    if (!metaOnly) score += 50;
  }

  return score;
}

function snippetAround(source: string, query: string, maxLen: number): string {
  const q = query.trim();
  if (!q || !source) return "";
  const lower = source.toLowerCase();
  const idx = lower.indexOf(q.toLowerCase());
  if (idx === -1) return "";
  const pad = 48;
  const start = Math.max(0, idx - pad);
  const end = Math.min(source.length, idx + q.length + pad);
  let s = source.slice(start, end).replace(/\s+/g, " ").trim();
  if (start > 0) s = `…${s}`;
  if (end < source.length) s = `${s}…`;
  return s.length > maxLen ? `${s.slice(0, maxLen - 1)}…` : s;
}

function filterAndSortHits(
  items: PublishGuideNavItem[],
  query: string,
): SearchHit[] {
  const q = query.trim();
  if (!q) return [];

  const qNorm = normalizeForMatch(q);
  const hits: SearchHit[] = [];

  for (const item of items) {
    const sectionLabel = sectionLabelById(item.section);
    const metaHaystack = normalizeForMatch(
      `${item.title} ${item.description} ${item.id} ${sectionLabel}`,
    );
    const source = getGuideSampleSource(item.path);
    const sourceNorm = normalizeForMatch(source);
    const fullHaystack = `${metaHaystack} ${sourceNorm}`;
    if (!fullHaystack.includes(qNorm)) continue;

    const sourceMatch = sourceNorm.includes(qNorm);
    const snippet = sourceMatch ? snippetAround(source, q, 140) : undefined;

    hits.push({
      item,
      sectionLabel,
      score: scoreHit(item, qNorm, metaHaystack, sourceMatch),
      snippet,
    });
  }

  hits.sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title));
  return hits.slice(0, 12);
}

/** 페이지 DOM에 나타날 가능성이 높은 문자열로 Text Fragment 대상을 고릅니다. */
function pickTextFragment(query: string, item: PublishGuideNavItem): string {
  const q = query.trim();
  const desc = item.description;
  const title = item.title;
  const source = getGuideSampleSource(item.path);

  const trySlice = (s: string, max: number) =>
    s.length <= max ? s : s.slice(0, max);

  if (q.length >= 2 && source) {
    const li = source.toLowerCase().indexOf(q.toLowerCase());
    if (li !== -1) {
      return trySlice(source.slice(li, li + Math.max(q.length, 2)), 72);
    }
  }

  if (q.length >= 2 && desc.includes(q)) {
    return trySlice(q, 72);
  }

  const lowerDesc = desc.toLowerCase();
  const lowerQ = q.toLowerCase();
  if (q.length >= 2 && lowerDesc.includes(lowerQ)) {
    const idx = lowerDesc.indexOf(lowerQ);
    return trySlice(desc.slice(idx, idx + q.length), 72);
  }

  if (q.length >= 2 && title.toLowerCase().includes(lowerQ)) {
    const idx = title.toLowerCase().indexOf(lowerQ);
    return trySlice(title.slice(idx, idx + q.length), 72);
  }

  return trySlice(title, 48);
}

function buildScrollHash(query: string, item: PublishGuideNavItem): string {
  const text = pickTextFragment(query, item);
  if (text.length < 2) return "";
  return `#:~:text=${encodeURIComponent(text)}`;
}

function GuideSearch({ items }: { items: PublishGuideNavItem[] }) {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [activeIndex, setActiveIndex] = React.useState(0);
  const rootRef = React.useRef<HTMLDivElement>(null);

  const hits = React.useMemo(
    () => filterAndSortHits(items, query),
    [items, query],
  );

  React.useEffect(() => {
    setActiveIndex(0);
  }, [query, hits.length]);

  React.useEffect(() => {
    function onDocMouseDown(e: MouseEvent) {
      const el = rootRef.current;
      if (!el || !open) return;
      if (e.target instanceof Node && !el.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, [open]);

  const goTo = React.useCallback(
    (item: PublishGuideNavItem, searchQuery: string) => {
      const hash = buildScrollHash(searchQuery, item);
      if (item.openInNewTab) {
        const url = `${window.location.origin}${item.path}${hash}`;
        window.open(url, "_blank", "noopener,noreferrer");
      } else {
        navigate({ pathname: item.path, hash: hash || undefined });
      }
      setOpen(false);
      setQuery("");
    },
    [navigate],
  );

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp") && hits.length) {
      setOpen(true);
      return;
    }
    if (!hits.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % hits.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + hits.length) % hits.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const hit = hits[activeIndex];
      if (hit) goTo(hit.item, query);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div ref={rootRef} className="relative w-full max-w-md min-w-[240px]">
      <InputGroup className="w-full">
        <InputGroupAddon align="inline-start" className="pl-2">
          <Search className="size-4 text-font-g" aria-hidden />
        </InputGroupAddon>
        <InputGroupInput
          type="search"
          autoComplete="off"
          placeholder="샘플 페이지·메타 검색…"
          aria-label="가이드 샘플 검색"
          aria-expanded={open}
          aria-controls="guide-search-results"
          aria-autocomplete="list"
          aria-haspopup="listbox"
          role="combobox"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => {
            if (query.trim()) setOpen(true);
          }}
          onKeyDown={onKeyDown}
        />
      </InputGroup>

      {open && query.trim() ? (
        <div
          id="guide-search-results"
          role="listbox"
          className="absolute left-0 right-0 top-full z-50 mt-1 max-h-72 overflow-y-auto rounded-xl border border-line02 bg-base py-1 shadow-lg"
        >
          {hits.length === 0 ? (
            <div className="px-3 py-2 text-sm text-font-g">
              검색 결과가 없습니다.
            </div>
          ) : (
            hits.map((hit, index) => (
              <button
                key={hit.item.id}
                type="button"
                role="option"
                aria-selected={index === activeIndex}
                className={[
                  "flex w-full flex-col gap-0.5 px-3 py-2 text-left text-sm",
                  index === activeIndex ? "bg-container" : "hover:bg-container/80",
                ].join(" ")}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => goTo(hit.item, query)}
              >
                <span className="font-medium text-font-b">{hit.item.title}</span>
                <span className="text-xs text-font-g">{hit.sectionLabel}</span>
                <span className="line-clamp-2 text-xs text-font-g/90">
                  {hit.snippet ?? hit.item.description}
                </span>
              </button>
            ))
          )}
        </div>
      ) : null}
    </div>
  );
}

export { GuideSearch };
