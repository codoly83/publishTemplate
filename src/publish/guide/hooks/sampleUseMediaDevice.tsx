import { Button } from "@/components/ui";
import {
  type MediaDeviceBreakpoint,
  useMediaDevice,
} from "@/hooks/useMediaDevice";
import useMediaDeviceSource from "@/hooks/useMediaDevice.ts?raw";
import { useState } from "react";
import { GuideBox } from "@/publish/guide/GuideBox";

const USE_MEDIA_DEVICE_GUIDE_CODE = `${useMediaDeviceSource.trim()}

// --- 사용 예시 ---
import { useMediaDevice } from "@/hooks/useMediaDevice";
import { useState } from "react";

/** 특정 라우트·페이지에서만 항상 mobile로 분기하고 싶을 때 */
function MobilePreviewPage() {
  const { isMobile, breakpoint, width } = useMediaDevice({
    forceBreakpoint: "mobile",
  });
  return null;
}

/** 데모: 토글로 강제 구간 확인 */
function ForceBreakpointDemo() {
  const [mode, setMode] = useState<"off" | MediaDeviceBreakpoint>("off");
  const device = useMediaDevice(
    mode === "off" ? {} : { forceBreakpoint: mode },
  );
  return null;
}
`;

export function HooksSampleMediaDevicePanel() {
  const mediaDeviceActual = useMediaDevice();
  const [mediaDeviceForceMode, setMediaDeviceForceMode] = useState<
    "off" | MediaDeviceBreakpoint
  >("off");
  const mediaDevice = useMediaDevice(
    mediaDeviceForceMode === "off"
      ? {}
      : { forceBreakpoint: mediaDeviceForceMode },
  );

  return (
    <GuideBox
      title="useMediaDevice"
      description={
        <>
          <p>
            뷰포트 너비로 mobile(768px 미만) / tablet(768~1023px) /
            desktop(1024px 이상)를 구분합니다. window resize·
            visualViewport·orientationchange 시 갱신됩니다. 터치·포인터·
            호버는 미디어 특성으로 접근 환경 힌트를 줍니다.
          </p>
          <p className="mt-2">
            <code className="text-font-b">forceBreakpoint</code>로 특정
            페이지에서 실제 창 크기와 관계없이 브레이크포인트만 고정할 수
            있습니다. 고정 시{" "}
            <code className="text-font-b">width</code>는 해당 구간을
            나타내는 대표 너비로 바뀌고,{" "}
            <code className="text-font-b">height</code>는 실제 뷰포트
            높이를 유지합니다.
          </p>
        </>
      }
      code={USE_MEDIA_DEVICE_GUIDE_CODE}
    >
      <div className="flex flex-col gap-4">
        <div className="rounded-lg border border-line bg-base p-3">
          <p className="mb-2 text-xs font-semibold text-font-b">
            브레이크포인트 강제 (페이지별 미리보기 등)
          </p>
          <p className="mb-3 text-xs text-font-g">
            아래에서 mobile / tablet / desktop을 고르면, 창을 넓혀도 훅은
            선택한 구간만 반환합니다. 끄면 실제 뷰포트 기준으로 돌아갑니다.
          </p>
          <div className="flex flex-wrap gap-2">
            {(
              [
                ["off", "강제 없음"],
                ["mobile", "mobile"],
                ["tablet", "tablet"],
                ["desktop", "desktop"],
              ] as const
            ).map(([value, label]) => {
              const active = mediaDeviceForceMode === value;
              return (
                <Button
                  key={value}
                  type="button"
                  size="sm"
                  variant={active ? "default" : "outline"}
                  onClick={() =>
                    setMediaDeviceForceMode(value === "off" ? "off" : value)
                  }
                >
                  {label}
                </Button>
              );
            })}
          </div>
        </div>

        <div className="rounded-lg border border-line bg-surface/50 p-4 text-sm">
          <p className="mb-3 text-font-g text-xs">
            실제 뷰포트(
            <code className="text-font-b">innerWidth</code> 기준)와 훅 옵션
            반영값을 함께 둡니다. 브레이크포인트 기본값은{" "}
            <code className="text-font-b">768</code> /{" "}
            <code className="text-font-b">1024</code> px 입니다.
          </p>
          <dl className="mb-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 font-mono text-xs text-font-b">
            <dt className="text-font-g">실제 뷰포트 width × height</dt>
            <dd>
              {Math.round(mediaDeviceActual.width)} ×{" "}
              {Math.round(mediaDeviceActual.height)}
            </dd>
            <dt className="text-font-g">실제 breakpoint</dt>
            <dd>{mediaDeviceActual.breakpoint}</dd>
          </dl>
          <p className="mb-2 text-xs font-semibold text-font-b">
            useMediaDevice(강제 옵션 반영)
          </p>
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 font-mono text-xs text-font-b">
            <dt className="text-font-g">width × height</dt>
            <dd>
              {Math.round(mediaDevice.width)} ×{" "}
              {Math.round(mediaDevice.height)}
            </dd>
            <dt className="text-font-g">breakpoint</dt>
            <dd>{mediaDevice.breakpoint}</dd>
            <dt className="text-font-g">isMobile / isTablet / isDesktop</dt>
            <dd>
              {String(mediaDevice.isMobile)} / {String(mediaDevice.isTablet)} /{" "}
              {String(mediaDevice.isDesktop)}
            </dd>
            <dt className="text-font-g">hasTouch</dt>
            <dd>{String(mediaDevice.hasTouch)}</dd>
            <dt className="text-font-g">prefersCoarsePointer</dt>
            <dd>{String(mediaDevice.prefersCoarsePointer)}</dd>
            <dt className="text-font-g">canHover</dt>
            <dd>{String(mediaDevice.canHover)}</dd>
          </dl>
        </div>
      </div>
    </GuideBox>
  );
}
