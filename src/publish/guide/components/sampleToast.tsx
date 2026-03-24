import * as React from "react";
import { Button, Toast, toast } from "@/components/ui";
import type { ToastProps } from "@/components/ui";
import { GuideBox } from "./GuideBox";

const TOASTER_POSITIONS: NonNullable<ToastProps["position"]>[] = [
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
];

function SampleToastPage() {
  const [toasterPosition, setToasterPosition] = React.useState<
    NonNullable<ToastProps["position"]>
  >("bottom-right");

  return (
    <div className="guide-layout">
      <Toast position={toasterPosition} />
      <h1 className="guide-title">Toast Samples</h1>
      <div className="guide-content">
        <GuideBox
          title="기본 toast (sonner)"
          description="앱 루트에 Toast를 한 번 마운트하고, toast()로 메시지를 띄웁니다. 이 페이지는 샘플용으로 하단에 Toast를 포함합니다."
          code={`
import { Toast, toast } from "@/components/ui";

// 레이아웃 루트 등 한 곳에
<Toast />

// 이벤트에서
toast("저장되었습니다.");
toast.success("성공");
toast.error("오류가 발생했습니다.");
          `}
        >
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => toast("기본 메시지입니다.")}
            >
              Default
            </Button>
            <Button
              type="button"
              onClick={() => toast.success("처리가 완료되었습니다.")}
            >
              Success
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                toast.info("참고용 안내 문구입니다.", { duration: 4000 })
              }
            >
              Info
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => toast.warning("확인이 필요합니다.")}
            >
              Warning
            </Button>
            <Button
              type="button"
              variant="outline"
              color="gray"
              onClick={() => toast.error("요청을 처리하지 못했습니다.")}
            >
              Error
            </Button>
          </div>
        </GuideBox>

        <GuideBox
          title="Toaster 기본 position"
          description='<Toast position={...} /> 로 토스트 컨테이너의 기본 위치를 정합니다. 아래에서 위치를 바꾼 뒤 「이 위치로 표시」를 눌러 확인하세요.'
          code={`
const [toasterPosition, setToasterPosition] = useState("bottom-right");

<Toast position={toasterPosition} />

// position을 생략한 toast()는 위 Toaster 위치를 따릅니다.
toast("기본 위치에 표시됩니다.");
          `}
        >
          <div className="flex max-w-3xl flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              {TOASTER_POSITIONS.map((pos) => (
                <Button
                  key={pos}
                  type="button"
                  size="sm"
                  variant={toasterPosition === pos ? "default" : "outline"}
                  onClick={() => setToasterPosition(pos)}
                >
                  {pos}
                </Button>
              ))}
            </div>
            <div>
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  toast.success(`Toaster 기본 위치: ${toasterPosition}`)
                }
              >
                이 위치로 표시
              </Button>
            </div>
          </div>
        </GuideBox>

        <GuideBox
          title="toast()별 position"
          description='개별 호출에 { position: "top-left" } 등을 넘기면 Toaster 기본값과 관계없이 해당 모서리·중앙에만 표시됩니다.'
          code={`
toast("우측 상단", { position: "top-right" });
toast.info("하단 중앙", { position: "bottom-center" });
          `}
        >
          <div className="grid max-w-4xl grid-cols-2 gap-2 sm:grid-cols-3">
            {TOASTER_POSITIONS.map((pos) => (
              <Button
                key={`per-${pos}`}
                type="button"
                size="sm"
                variant="outline"
                onClick={() =>
                  toast(`position: ${pos}`, {
                    position: pos,
                    duration: 3500,
                  })
                }
              >
                {pos}
              </Button>
            ))}
          </div>
        </GuideBox>

        <GuideBox
          title="Promise · 로딩"
          description="toast.promise로 비동기 작업 진행 상태를 표시합니다."
          code={`
toast.promise(
  new Promise((resolve) => setTimeout(() => resolve("done"), 2000)),
  {
    loading: "저장 중…",
    success: "저장됨",
    error: "실패",
  }
);
          `}
        >
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              toast.promise(
                new Promise<string>((resolve) =>
                  setTimeout(() => resolve("done"), 2000),
                ),
                {
                  loading: "저장 중…",
                  success: "저장되었습니다.",
                  error: "저장에 실패했습니다.",
                },
              )
            }
          >
            Promise toast
          </Button>
        </GuideBox>
      </div>
    </div>
  );
}

export { SampleToastPage };
export default SampleToastPage;
