import { useState } from "react";
import { GuideBox } from "@/publish/guide/GuideBox";
import ArrowDownSvg from "@/assets/icons/arrow-down.svg?react";
import closeCircleSvgUrl from "@/assets/icons/close-circle.svg";

const COLOR_OPTIONS = [
  "#7A8599",
  "#2563EB",
  "#16A34A",
  "#DC2626",
  "#9333EA",
] as const;

function ColorPickerButtons({
  onChange,
}: {
  onChange: (color: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {COLOR_OPTIONS.map((color) => (
        <button
          key={color}
          type="button"
          className="h-8 w-8 rounded-full border border-line02"
          style={{ backgroundColor: color }}
          aria-label={`색상 ${color}`}
          onClick={() => onChange(color)}
        />
      ))}
    </div>
  );
}

function SampleSvgColorPage() {
  const [componentColor, setComponentColor] = useState("#2563EB");
  const [fileColor, setFileColor] = useState("#DC2626");
  const [mixinColor, setMixinColor] = useState("#16A34A");

  return (
    <div className="guide-layout">
      <h1 className="guide-title">SVG 색상 변경 샘플</h1>
      <div className="guide-content">
        <GuideBox
          title="SVG를 컴포넌트로 import (?react)"
          description="`?react`로 SVG를 컴포넌트로 불러온 뒤 `currentColor`로 path fill을 맞춰 색상을 제어합니다."
          code={`
import ArrowDownSvg from "@/assets/icons/arrow-down.svg?react";

<ArrowDownSvg
  className="**:fill-current"
  style={{ color: selectedColor }}
/>
          `}
        >
          <div className="flex items-center gap-4">
            <ArrowDownSvg
              width={48}
              height={48}
              className="**:fill-current"
              style={{ color: componentColor }}
            />
            <div className="text-sm text-font-b">현재 색상: {componentColor}</div>
          </div>
          <ColorPickerButtons onChange={setComponentColor} />
        </GuideBox>

        <GuideBox
          title="일반 SVG 파일 import 후 색상 변경"
          description="`img` 태그는 내부 path 색상을 직접 바꾸기 어려워서, 단색 SVG를 `mask-image`로 적용하고 `backgroundColor`로 색을 입히는 패턴입니다."
          code={`
import closeCircleSvgUrl from "@/assets/icons/close-circle.svg";

<div
  style={{
    backgroundColor: selectedColor,
    WebkitMaskImage: \`url(\${closeCircleSvgUrl})\`,
    maskImage: \`url(\${closeCircleSvgUrl})\`,
  }}
/>
          `}
        >
          <div className="flex items-center gap-4">
            <div
              className="h-12 w-12"
              style={{
                backgroundColor: fileColor,
                WebkitMaskImage: `url(${closeCircleSvgUrl})`,
                maskImage: `url(${closeCircleSvgUrl})`,
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskPosition: "center",
                WebkitMaskSize: "contain",
                maskSize: "contain",
              }}
            />
            <div className="text-sm text-font-b">현재 색상: {fileColor}</div>
          </div>
          <ColorPickerButtons onChange={setFileColor} />
        </GuideBox>

        <GuideBox
          title="SCSS mixin 방식 (재사용)"
          description="SCSS에서 아이콘 마스크 속성을 mixin으로 공통화하고, 3번째 인자(배경색)로 색상을 주입하는 패턴입니다."
          code={`
// src/assets/styles/_mixin.scss
@mixin svg-mask-icon($svg-url, $size: 48px, $bg-color: var(--svg-color, #7a8599)) {
  width: $size;
  height: $size;
  background-color: $bg-color;
  -webkit-mask-image: url($svg-url);
  mask-image: url($svg-url);
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  -webkit-mask-size: contain;
  mask-size: contain;
}

.mixinMaskIcon {
  @include svg-mask-icon("../icons/close-circle.svg", 48px, var(--svg-color, #7a8599));
}

// sampleSvgColor.tsx
<div
  className="mixinMaskIcon"
  style={{ ["--svg-color" as "--svg-color"]: selectedColor }}
/>
          `}
        >
          <div className="flex items-center gap-4">
            <div
              className="mixinMaskIcon"
              style={{ ["--svg-color" as "--svg-color"]: mixinColor }}
            />
            <div className="text-sm text-font-b">현재 색상: {mixinColor}</div>
          </div>
          <ColorPickerButtons onChange={setMixinColor} />
        </GuideBox>
      </div>
    </div>
  );
}

export default SampleSvgColorPage;
