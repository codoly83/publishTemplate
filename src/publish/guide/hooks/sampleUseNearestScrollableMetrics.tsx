import { useNearestScrollableMetrics } from "@/hooks/useNearestScrollableMetrics";
import { useRef } from "react";
import { GuideBox } from "@/publish/guide/GuideBox";

export function HooksSampleNearestScrollableMetricsPanel() {
  const nearestScrollAnchorRef = useRef<HTMLDivElement>(null);
  const { scrollElement: nearestScrollElement, metrics: nearestScrollMetrics } =
    useNearestScrollableMetrics(nearestScrollAnchorRef);

  return (
    <GuideBox
      title="useNearestScrollableMetrics"
      description="ref가 가리키는 노드에서 부모 방향으로 올라가며 처음 만나는 스크롤 가능한 요소를 찾고, 그 요소의 scrollTop·scrollHeight·clientHeight·진행률 등을 구독해 반환합니다. ScrollSpy 샘플과 동일한 훅입니다."
      code={`
import { useRef } from "react";
import { useNearestScrollableMetrics } from "@/hooks/useNearestScrollableMetrics";

const anchorRef = useRef<HTMLDivElement>(null);
const { scrollElement, metrics } = useNearestScrollableMetrics(anchorRef);

<div className="h-52 overflow-y-auto rounded-lg border p-3">
  <div ref={anchorRef} className="sr-only" aria-hidden />
  {lines.map((line) => (
    <p key={line}>{line}</p>
  ))}
</div>
{metrics && (
  <dl>
    <dt>scrollTop</dt>
    <dd>{Math.round(metrics.scrollTop)}px</dd>
    <dt>scrollYProgress</dt>
    <dd>{metrics.scrollYProgress.toFixed(3)}</dd>
  </dl>
)}
      `}
    >
      <div className="flex flex-col gap-3">
        <p className="text-sm text-font-g">
          아래 박스 안을 스크롤하면 감지된 컨테이너의 수치가 갱신됩니다.
        </p>
        <div
          className="rounded-lg border border-line bg-base flex flex-col overflow-hidden"
          style={{ height: 220 }}
        >
          <div className="min-h-0 flex-1 overflow-y-auto p-3 text-sm text-font-g">
            <div
              ref={nearestScrollAnchorRef}
              className="sr-only"
              aria-hidden
            />
            {Array.from({ length: 28 }, (_, i) => (
              <p key={i} className="mb-2">
                스크롤 테스트 — useNearestScrollableMetrics 줄 {i + 1}
              </p>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-line bg-surface/50 p-3 text-xs">
          <p className="text-font-b mb-2 font-semibold">감지된 스크롤 요소</p>
          {nearestScrollElement ? (
            <p className="text-font-b/80 mb-2 font-mono break-all">
              &lt;{nearestScrollElement.tagName.toLowerCase()}
              {nearestScrollElement.className
                ? ` .${String(nearestScrollElement.className).split(" ").filter(Boolean).slice(0, 3).join(".")}`
                : ""}
              &gt;
            </p>
          ) : (
            <p className="text-font-b/70 mb-2">없음</p>
          )}
          {nearestScrollMetrics ? (
            <dl className="text-font-b/90 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 font-mono">
              <dt>scrollTop</dt>
              <dd>{Math.round(nearestScrollMetrics.scrollTop)}px</dd>
              <dt>clientHeight</dt>
              <dd>{Math.round(nearestScrollMetrics.clientHeight)}px</dd>
              <dt>scrollHeight</dt>
              <dd>{Math.round(nearestScrollMetrics.scrollHeight)}px</dd>
              <dt>maxScrollTop</dt>
              <dd>{Math.round(nearestScrollMetrics.maxScrollTop)}px</dd>
              <dt>scrollYProgress</dt>
              <dd>{nearestScrollMetrics.scrollYProgress.toFixed(3)}</dd>
            </dl>
          ) : null}
        </div>
      </div>
    </GuideBox>
  );
}
