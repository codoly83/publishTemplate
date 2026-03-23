import { Checkbox, CheckboxGroup } from "@/components/ui";
import { useState } from "react";
import { GuideBox } from "./GuideBox";

function SampleCheckboxPage() {
  const [selectedValues, setSelectedValues] = useState(["reviewing"]);

  return (
    <div className="guide-layout">
      <h1 className="guide-title">Checkbox Samples</h1>
      <div className="guide-content">
        <GuideBox
          title="Basic checkbox"
          description="기본 체크박스의 on/off, disabled 상태를 한 번에 비교합니다."
          code={`
<CheckboxGroup
  defaultValue={["checked", "checked-disabled", "custom"]}
  className="grid max-w-3xl gap-4 md:grid-cols-2"
>
  <Checkbox value="default" label="default" />
  <Checkbox value="checked" label="checked" />
  <Checkbox value="disabled" disabled label="disabled" />
  <Checkbox value="checked-disabled" disabled label="checked disabled" />
  <Checkbox value="custom">
    <Checkbox.item />
    <Checkbox.label>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-font-b">custom label</span>
        <span className="text-xs text-font-gray">
          children으로 라벨과 설명을 함께 렌더링
        </span>
      </div>
    </Checkbox.label>
  </Checkbox>
</CheckboxGroup>
        `}
        >
          <CheckboxGroup
            defaultValue={["checked", "checked-disabled", "custom"]}
            className="grid max-w-3xl gap-4 md:grid-cols-2"
          >
            <Checkbox value="default" label="default" />
            <Checkbox value="checked" label="checked" />
            <Checkbox value="disabled" disabled label="disabled" />
            <Checkbox
              value="checked-disabled"
              disabled
              label="checked disabled"
            />
            <Checkbox value="custom">
              <Checkbox.item />
              <Checkbox.label>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-font-b">
                    custom label
                  </span>
                  <span className="text-xs text-font-gray">
                    children으로 라벨과 설명을 함께 렌더링
                  </span>
                </div>
              </Checkbox.label>
            </Checkbox>
          </CheckboxGroup>
        </GuideBox>

        <GuideBox
          title="State"
          description="제어 컴포넌트와 invalid 표시처럼 실제 폼에서 자주 쓰는 상태 예시입니다."
          code={`
const [selectedValues, setSelectedValues] = useState(["reviewing"]);

<CheckboxGroup
  value={selectedValues}
  onValueChange={setSelectedValues}
  className="grid max-w-3xl gap-4 md:grid-cols-2"
>
  <Checkbox value="pending" label="pending" />
  <Checkbox
    value="reviewing"
    label={selectedValues.includes("reviewing") ? "checked" : "unchecked"}
  />
  <Checkbox value="approved" label="approved" />
  <Checkbox value="invalid" aria-invalid="true" label="invalid" />
</CheckboxGroup>
        `}
        >
          <CheckboxGroup
            value={selectedValues}
            onValueChange={setSelectedValues}
            className="grid max-w-3xl gap-4 md:grid-cols-2"
          >
            <Checkbox value="pending" label="pending" />

            <Checkbox
              value="reviewing"
              label={
                selectedValues.includes("reviewing") ? "checked" : "unchecked"
              }
            />
            <Checkbox value="approved" label="approved" />
            <Checkbox value="invalid" aria-invalid="true" label="invalid" />
          </CheckboxGroup>
        </GuideBox>

        <GuideBox
          title="Variants"
          description="spec은 아이콘 전용, btn은 버튼형 체크 UI로 사용할 수 있습니다."
          code={`
<div className="flex flex-wrap items-center gap-4">
  <Checkbox variant="spec" defaultChecked />
  <Checkbox variant="spec" />
  <Checkbox variant="spec" disabled />
  <Checkbox variant="spec" defaultChecked disabled />
  <Checkbox variant="btn" defaultChecked label="적용" />
  <Checkbox variant="btn" label="미적용" />
  <Checkbox variant="btn" disabled label="비활성" />
  <Checkbox variant="btn" defaultChecked disabled label="적용" />
</div>
        `}
        >
          <div className="flex flex-wrap items-center gap-4">
            <Checkbox variant="spec" defaultChecked />
            <Checkbox variant="spec" />
            <Checkbox variant="spec" disabled />
            <Checkbox variant="spec" defaultChecked disabled />
            <Checkbox variant="btn" defaultChecked label="적용" />
            <Checkbox variant="btn" label="미적용" />
            <Checkbox variant="btn" disabled label="비활성" />
            <Checkbox variant="btn" defaultChecked disabled label="적용" />
          </div>
        </GuideBox>
      </div>
    </div>
  );
}

export { SampleCheckboxPage };
export default SampleCheckboxPage;
