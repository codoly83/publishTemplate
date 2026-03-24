import * as React from "react";
import { Slider } from "@/components/ui";
import { GuideBox } from "@/publish/guide/GuideBox";

function SampleSliderPage() {
  const [controlled, setControlled] = React.useState([40]);

  return (
    <div className="guide-layout">
      <h1 className="guide-title">Slider Samples</h1>
      <div className="guide-content">
        <GuideBox
          title="기본 Slider"
          description="단일 슬라이더 기본값과 min/max 범위입니다."
          code={`
<div className="w-full max-w-md px-2">
  <Slider defaultValue={[50]} max={100} step={1} aria-label="기본 슬라이더" />
</div>
          `}
        >
          <div className="w-full max-w-md px-2">
            <Slider
              defaultValue={[50]}
              max={100}
              step={1}
              aria-label="기본 슬라이더"
            />
          </div>
        </GuideBox>

        <GuideBox
          title="크기 (size)"
          description="sm / md / lg 세 가지 트랙·썸 크기를 비교합니다."
          code={`
<div className="flex w-full max-w-md flex-col gap-8 px-2">
  <Slider size="sm" defaultValue={[30]} aria-label="small slider" />
  <Slider size="md" defaultValue={[50]} aria-label="medium slider" />
  <Slider size="lg" defaultValue={[70]} aria-label="large slider" />
</div>
          `}
        >
          <div className="flex w-full max-w-md flex-col gap-8 px-2">
            <Slider size="sm" defaultValue={[30]} aria-label="small slider" />
            <Slider size="md" defaultValue={[50]} aria-label="medium slider" />
            <Slider size="lg" defaultValue={[70]} aria-label="large slider" />
          </div>
        </GuideBox>

        <GuideBox
          title="범위 (Range)"
          description="두 개의 thumb로 구간을 조절합니다."
          code={`
<div className="w-full max-w-md px-2">
  <Slider
    defaultValue={[25, 75]}
    max={100}
    step={1}
    minStepsBetweenThumbs={1}
    aria-label="범위 슬라이더"
  />
</div>
          `}
        >
          <div className="w-full max-w-md px-2">
            <Slider
              defaultValue={[25, 75]}
              max={100}
              step={1}
              minStepsBetweenThumbs={1}
              aria-label="범위 슬라이더"
            />
          </div>
        </GuideBox>

        <GuideBox
          title="세로 방향 (orientation)"
          description='orientation="vertical" 과 고정 높이 컨테이너가 필요합니다.'
          code={`
<div className="flex h-48 items-center justify-center gap-8">
  <Slider
    orientation="vertical"
    defaultValue={[40]}
    max={100}
    className="min-h-44"
    aria-label="세로 슬라이더"
  />
</div>
          `}
        >
          <div className="flex h-48 items-center justify-center gap-8">
            <Slider
              orientation="vertical"
              defaultValue={[40]}
              max={100}
              className="min-h-44"
              aria-label="세로 슬라이더"
            />
          </div>
        </GuideBox>

        <GuideBox
          title="제어 상태 (controlled)"
          description="value와 onValueChange로 외부에서 값을 관리합니다."
          code={`
const [controlled, setControlled] = useState([40]);

<div className="flex w-full max-w-md flex-col gap-2 px-2">
  <Slider
    value={controlled}
    onValueChange={setControlled}
    max={100}
    step={1}
    aria-label="제어 슬라이더"
  />
  <span className="text-sm font-medium text-font-b">
    값: {controlled[0]}
  </span>
</div>
          `}
        >
          <div className="flex w-full max-w-md flex-col gap-2 px-2">
            <Slider
              value={controlled}
              onValueChange={setControlled}
              max={100}
              step={1}
              aria-label="제어 슬라이더"
            />
            <span className="text-sm font-medium text-font-b">
              값: {controlled[0]}
            </span>
          </div>
        </GuideBox>

        <GuideBox
          title="비활성 (disabled)"
          description="disabled 시 트랙·썸이 비활성 스타일로 표시됩니다."
          code={`
<div className="w-full max-w-md px-2">
  <Slider
    defaultValue={[60]}
    disabled
    aria-label="비활성 슬라이더"
  />
</div>
          `}
        >
          <div className="w-full max-w-md px-2">
            <Slider defaultValue={[60]} disabled aria-label="비활성 슬라이더" />
          </div>
        </GuideBox>
      </div>
    </div>
  );
}

export default SampleSliderPage;
