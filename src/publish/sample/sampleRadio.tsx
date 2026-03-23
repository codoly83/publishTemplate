import { Radio, RadioGroup } from "@/components/ui";
import { useState } from "react";
import { GuideBox } from "./GuideBox";

function SampleRadioPage() {
  const [value, setValue] = useState("reviewing");

  return (
    <div className="guide-layout">
      <h1 className="guide-title">Radio Samples</h1>
      <div className="guide-content">
        <GuideBox
          title="Basic radio"
          description="기본 선택, 비활성화, 커스텀 라벨 구조를 한 번에 비교합니다."
          code={`
<RadioGroup
  defaultValue="checked"
  className="grid max-w-3xl gap-4 md:grid-cols-2"
>
  <Radio value="default" label="default" />
  <Radio value="checked" label="checked" />
  <Radio value="disabled" disabled label="disabled" />
  <Radio value="checked-disabled" disabled label="checked disabled" />
  <Radio value="custom">
    <Radio.item />
    <Radio.label>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-font-b">custom label</span>
        <span className="text-xs text-font-gray">
          children으로 라벨과 설명을 함께 렌더링
        </span>
      </div>
    </Radio.label>
  </Radio>
</RadioGroup>
          `}
        >
          <RadioGroup
            defaultValue="checked"
            className="grid max-w-3xl gap-4 md:grid-cols-2"
          >
            <Radio value="default" label="default" />

            <Radio value="checked" label="checked" />

            <Radio value="disabled" disabled label="disabled" />

            <Radio value="checked-disabled" disabled label="checked disabled" />

            <Radio value="custom">
              <Radio.item />
              <Radio.label>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-font-b">
                    custom label
                  </span>
                  <span className="text-xs text-font-gray">
                    children으로 라벨과 설명을 함께 렌더링
                  </span>
                </div>
              </Radio.label>
            </Radio>
          </RadioGroup>
        </GuideBox>

        <GuideBox
          title="State"
          description="제어 컴포넌트와 invalid 표시처럼 실제 폼에서 자주 쓰는 상태 예시입니다."
          code={`
const [value, setValue] = useState("reviewing");

<RadioGroup
  value={value}
  onValueChange={setValue}
  className="grid max-w-3xl gap-4 md:grid-cols-2"
>
  <Radio value="pending" label="pending" />
  <Radio
    value="reviewing"
    label={value === "reviewing" ? "selected" : "reviewing"}
  />
  <Radio value="approved" label="approved" />
  <Radio value="invalid" aria-invalid="true" label="invalid" />
</RadioGroup>
          `}
        >
          <RadioGroup
            value={value}
            onValueChange={setValue}
            className="grid max-w-3xl gap-4 md:grid-cols-2"
          >
            <Radio value="pending" label="pending" />

            <Radio
              value="reviewing"
              label={value === "reviewing" ? "selected" : "reviewing"}
            />

            <Radio value="approved" label="approved" />

            <Radio value="invalid" aria-invalid="true" label="invalid" />
          </RadioGroup>
        </GuideBox>
      </div>
    </div>
  );
}

export { SampleRadioPage };
export default SampleRadioPage;
