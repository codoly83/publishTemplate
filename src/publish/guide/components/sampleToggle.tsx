import { Switch } from "@/components/ui";
import { useState } from "react";
import { GuideBox } from "@/publish/guide/GuideBox";

function SampleSwitchPage() {
  const [enabled, setEnabled] = useState(true);
  const [smallEnabled, setSmallEnabled] = useState(false);

  return (
    <div className="guide-layout">
      <h1 className="guide-title">Switch Samples</h1>
      <div className="guide-content">
        <GuideBox
          title="Basic toggle"
          description="기본 크기, small 크기, disabled 상태를 한 번에 비교합니다."
          code={`
<div className="flex flex-wrap items-center gap-4">
  <Switch defaultChecked aria-label="default checked toggle" />
  <Switch aria-label="default unchecked toggle" />
  <Switch
    size="sm"
    defaultChecked
    aria-label="small checked toggle"
  />
  <Switch disabled aria-label="disabled toggle" />
</div>
          `}
        >
          <div className="flex flex-wrap items-center gap-4">
            <Switch defaultChecked aria-label="default checked toggle" />
            <Switch aria-label="default unchecked toggle" />
            <Switch
              size="sm"
              defaultChecked
              aria-label="small checked toggle"
            />
            <Switch disabled aria-label="disabled toggle" />
          </div>
        </GuideBox>

        <GuideBox
          title="Controlled state"
          description="폼 제어처럼 상태를 외부에서 관리하는 예시입니다."
          code={`
const [enabled, setEnabled] = useState(true);
const [smallEnabled, setSmallEnabled] = useState(false);

<div className="flex flex-col gap-4">
  <div className="flex items-center gap-3">
    <Switch
      checked={enabled}
      onCheckedChange={setEnabled}
      aria-label="controlled toggle"
    />
    <span className="text-sm font-medium text-font-b">
      {enabled ? "enabled" : "disabled"}
    </span>
  </div>
  <div className="flex items-center gap-3">
    <Switch
      size="sm"
      checked={smallEnabled}
      onCheckedChange={setSmallEnabled}
      aria-label="small controlled toggle"
    />
    <span className="text-sm font-medium text-font-b">
      {smallEnabled ? "small on" : "small off"}
    </span>
  </div>
</div>
          `}
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Switch
                checked={enabled}
                onCheckedChange={setEnabled}
                aria-label="controlled toggle"
              />
              <span className="text-sm font-medium text-font-b">
                {enabled ? "enabled" : "disabled"}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Switch
                size="sm"
                checked={smallEnabled}
                onCheckedChange={setSmallEnabled}
                aria-label="small controlled toggle"
              />
              <span className="text-sm font-medium text-font-b">
                {smallEnabled ? "small on" : "small off"}
              </span>
            </div>
          </div>
        </GuideBox>

        <GuideBox
          title="Custom labels"
          description="기본 ON/OFF 대신 상황에 맞는 문구를 props로 전달할 수 있습니다."
          code={`
<div className="flex flex-col gap-4">
  <div className="flex items-center gap-3">
    <Switch
      defaultChecked
      onLabel="사용"
      offLabel="미사용"
      aria-label="usage label toggle"
      className="w-20"
    />
    <span className="text-sm font-medium text-font-b">사용 여부</span>
  </div>
  <div className="flex items-center gap-3">
    <Switch
      onLabel="공개"
      offLabel="비공개"
      aria-label="visibility label toggle"
      className="w-20"
    />
    <span className="text-sm font-medium text-font-b">공개 설정</span>
  </div>
  <div className="flex items-center gap-3">
    <Switch
      defaultChecked
      onLabel="YES"
      offLabel="NO"
      aria-label="english label toggle"
      className="w-20"
    />
    <span className="text-sm font-medium text-font-b">영문 라벨</span>
  </div>
</div>
          `}
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Switch
                defaultChecked
                onLabel="사용"
                offLabel="미사용"
                aria-label="usage label toggle"
                className="w-20"
              />
              <span className="text-sm font-medium text-font-b">사용 여부</span>
            </div>

            <div className="flex items-center gap-3">
              <Switch
                onLabel="공개"
                offLabel="비공개"
                aria-label="visibility label toggle"
                className="w-20"
              />
              <span className="text-sm font-medium text-font-b">공개 설정</span>
            </div>

            <div className="flex items-center gap-3">
              <Switch
                defaultChecked
                onLabel="YES"
                offLabel="NO"
                aria-label="english label toggle"
                className="w-20"
              />
              <span className="text-sm font-medium text-font-b">영문 라벨</span>
            </div>
          </div>
        </GuideBox>
      </div>
    </div>
  );
}

export { SampleSwitchPage };
export default SampleSwitchPage;
