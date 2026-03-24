import * as React from "react";
import { Button, Skeleton } from "@/components/ui";
import { GuideBox } from "./GuideBox";

/** 로딩/본문 전환 시 카드 높이가 크게 변하지 않도록 행 높이를 맞춤 */
function SkeletonFourSecondDemo() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const id = window.setTimeout(() => setLoading(false), 4000);
    return () => window.clearTimeout(id);
  }, [loading]);

  return (
    <div className="w-full max-w-md rounded-xl border border-line02 bg-base p-4">
      <p className="mb-3 min-h-10 text-sm leading-snug text-font-g">
        {loading
          ? "4초 후 스켈레톤이 사라지고 본문이 표시됩니다."
          : "로딩이 끝났습니다."}
      </p>

      <div className="flex min-h-[188px] flex-col gap-3">
        {loading ? (
          <>
            <Skeleton className="h-7 w-2/3 shrink-0" rounded="md" />
            <div className="flex min-h-18 flex-col justify-center gap-2">
              <Skeleton className="h-4 w-full shrink-0" />
              <Skeleton className="h-4 w-5/6 shrink-0" />
            </div>
            <div className="mt-auto flex h-9 shrink-0 items-center gap-2">
              <Skeleton className="h-9 w-20 shrink-0" rounded="full" />
              <Skeleton className="h-9 w-20 shrink-0" rounded="md" />
            </div>
          </>
        ) : (
          <>
            <p className="h-7 shrink-0 font-semibold leading-7 text-font-b">
              제목이 여기에 표시됩니다
            </p>
            <div className="flex min-h-18 flex-col justify-center gap-2 text-sm">
              <p className="leading-snug text-font-b">
                데이터를 불러온 뒤에는 스켈레톤 대신 실제 콘텐츠로 바꿉니다.
              </p>
              <p className="leading-snug text-font-g">
                레이아웃은 위 스켈레톤과 같은 행 높이를 유지합니다.
              </p>
            </div>
            <div className="mt-auto flex h-9 shrink-0 items-center gap-2">
              <Button
                type="button"
                size="sm"
                className="h-9 min-w-20 shrink-0 px-4"
                onClick={() => setLoading(true)}
              >
                다시 로딩
              </Button>
              <span className="inline-block h-9 w-20 shrink-0" aria-hidden />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function SampleSkeletonPage() {
  return (
    <div className="guide-layout">
      <h1 className="guide-title">Skeleton Samples</h1>
      <div className="guide-content">
        <GuideBox
          title="기본 Skeleton"
          description="펄스 애니메이션과 variant·rounded로 톤·모서리를 조절합니다."
          code={`
import { Skeleton } from "@/components/ui";

<Skeleton className="h-4 w-full" />
<Skeleton className="h-10 w-10" rounded="full" />
<Skeleton variant="muted" className="h-4 w-3/4" />
          `}
        >
          <div className="flex w-full max-w-md flex-col gap-3">
            <Skeleton className="h-4 w-full shrink-0" />
            <Skeleton className="h-4 w-3/4 shrink-0" />
            <div className="flex min-h-10 items-center gap-3">
              <Skeleton className="h-10 w-10 shrink-0" rounded="full" />
              <div className="flex min-h-10 min-w-0 flex-1 flex-col justify-center gap-2">
                <Skeleton className="h-4 w-full shrink-0" />
                <Skeleton className="h-3 w-2/3 shrink-0" rounded="sm" />
              </div>
            </div>
            <Skeleton
              variant="muted"
              className="h-4 w-3/4 shrink-0"
              rounded="md"
            />
          </div>
        </GuideBox>

        <GuideBox
          title="4초 후 스켈레톤 제거"
          description="setTimeout(4000)으로 로딩을 끄고, 스켈레톤과 본문의 행·최소 높이를 맞춰 레이아웃이 덜 흔들리게 했습니다."
          code={`
const [loading, setLoading] = useState(true);

useEffect(() => {
  const id = window.setTimeout(() => setLoading(false), 4000);
  return () => window.clearTimeout(id);
}, []);

<div className="flex min-h-[188px] flex-col gap-3">
  {loading ? (
    <>
      <Skeleton className="h-7 w-2/3 shrink-0" rounded="md" />
      <div className="flex min-h-18 flex-col justify-center gap-2">
        <Skeleton className="h-4 w-full shrink-0" />
        <Skeleton className="h-4 w-5/6 shrink-0" />
      </div>
      <div className="mt-auto flex h-9 shrink-0 items-center gap-2">
        <Skeleton className="h-9 w-20 shrink-0" rounded="full" />
        <Skeleton className="h-9 w-20 shrink-0" rounded="md" />
      </div>
    </>
  ) : (
    <>
      <p className="h-7 shrink-0 font-semibold leading-7 text-font-b">
        제목이 여기에 표시됩니다
      </p>
      <div className="flex min-h-18 flex-col justify-center gap-2 text-sm">
        <p className="leading-snug text-font-b">
          데이터를 불러온 뒤에는 스켈레톤 대신 실제 콘텐츠로 바꿉니다.
        </p>
        <p className="leading-snug text-font-g">
          레이아웃은 위 스켈레톤과 같은 행 높이를 유지합니다.
        </p>
      </div>
      <div className="mt-auto flex h-9 shrink-0 items-center gap-2">
        <Button
          type="button"
          size="sm"
          className="h-9 min-w-20 shrink-0 px-4"
          onClick={() => setLoading(true)}
        >
          다시 로딩
        </Button>
        <span className="inline-block h-9 w-20 shrink-0" aria-hidden />
      </div>
    </>
  )}
</div>
          `}
        >
          <SkeletonFourSecondDemo />
        </GuideBox>

        <GuideBox
          title="카드형 레이아웃"
          description="아바타·텍스트·이미지 영역을 고정 높이·min-w-0으로 잡아 넘침을 줄입니다."
          code={`
<div className="flex max-w-md flex-col gap-4 rounded-xl border p-4">
  <div className="flex gap-3">
    <Skeleton className="h-12 w-12 shrink-0" rounded="lg" />
    <div className="flex min-w-0 flex-1 flex-col gap-2">
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-3 w-full" />
    </div>
  </div>
  <Skeleton className="h-32 w-full shrink-0" rounded="lg" />
</div>
          `}
        >
          <div className="flex w-full max-w-md flex-col gap-4 rounded-xl border border-line02 bg-base p-4">
            <div className="flex items-start gap-3">
              <Skeleton className="h-12 w-12 shrink-0" rounded="lg" />
              <div className="flex min-h-13 min-w-0 flex-1 flex-col justify-center gap-2">
                <Skeleton className="h-4 w-1/3 max-w-full shrink-0" />
                <Skeleton className="h-3 w-full shrink-0" />
                <Skeleton className="h-3 w-2/3 shrink-0" />
              </div>
            </div>
            <Skeleton className="h-32 w-full shrink-0" rounded="lg" />
          </div>
        </GuideBox>
      </div>
    </div>
  );
}

export { SampleSkeletonPage };
export default SampleSkeletonPage;
