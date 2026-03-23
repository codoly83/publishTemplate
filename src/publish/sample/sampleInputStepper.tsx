import { InputStepper } from "@/components/ui";
import { GuideBox } from "./GuideBox";

function SampleInputStepperPage() {
  return (
    <div className="guide-layout">
      <h1 className="guide-title">InputStepper Samples</h1>
      <div className="guide-content">
        <GuideBox
          title="숫자 · + / −"
          description="InputGroup과 동일한 테두리·포커스 스타일로 좌우 버튼으로 숫자를 증감합니다."
          code={`
<div className="grid max-w-3xl gap-6 md:grid-cols-2">
  <div className="flex flex-col gap-2">
    <div className="text-sm text-font-g">기본 (step 1)</div>
    <InputStepper defaultValue="0" min={0} max={10} />
  </div>
  <div className="flex flex-col gap-2">
    <div className="text-sm text-font-g">step 0.5, min/max</div>
    <InputStepper defaultValue="1" step={0.5} min={0} max={5} />
  </div>
</div>
          `}
        >
          <div className="grid max-w-3xl gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <div className="text-sm text-font-g">기본 (step 1)</div>
              <InputStepper defaultValue="0" min={0} max={10} />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-sm text-font-g">step 0.5, min/max</div>
              <InputStepper defaultValue="1" step={0.5} min={0} max={5} />
            </div>
          </div>
        </GuideBox>

        <GuideBox
          title="숫자 · &lt; &gt; (chevron)"
          description="stepperVariant=&quot;chevron&quot;일 때 날짜 피커와 같은 좌우 화살표 아이콘을 씁니다."
          code={`
<div className="grid max-w-3xl gap-6 md:grid-cols-2">
  <div className="flex flex-col gap-2">
    <div className="text-sm text-font-g">chevron</div>
    <InputStepper
      stepperVariant="chevron"
      defaultValue="5"
      min={1}
      max={99}
    />
  </div>
</div>
          `}
        >
          <div className="grid max-w-3xl gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <div className="text-sm text-font-g">chevron</div>
              <InputStepper
                stepperVariant="chevron"
                defaultValue="5"
                min={1}
                max={99}
              />
            </div>
          </div>
        </GuideBox>

        <GuideBox
          title="날짜 · + / − 및 chevron"
          description="mode=&quot;date&quot;는 type=date 입력과 동일하며, step은 일(day) 단위입니다."
          code={`
<div className="grid max-w-3xl gap-6 md:grid-cols-2">
  <div className="flex flex-col gap-2">
    <div className="text-sm text-font-g">date · plusMinus</div>
    <InputStepper
      mode="date"
      defaultValue="2025-06-15"
      min="2025-01-01"
      max="2025-12-31"
      step={1}
    />
  </div>
  <div className="flex flex-col gap-2">
    <div className="text-sm text-font-g">date · 7일 단위</div>
    <InputStepper
      mode="date"
      stepperVariant="chevron"
      defaultValue="2025-06-01"
      min="2025-01-01"
      max="2025-12-31"
      step={7}
    />
  </div>
</div>
          `}
        >
          <div className="grid max-w-3xl gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <div className="text-sm text-font-g">date · plusMinus</div>
              <InputStepper
                mode="date"
                defaultValue="2025-06-15"
                min="2025-01-01"
                max="2025-12-31"
                step={1}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-sm text-font-g">date · 7일 단위</div>
              <InputStepper
                mode="date"
                stepperVariant="chevron"
                defaultValue="2025-06-01"
                min="2025-01-01"
                max="2025-12-31"
                step={7}
              />
            </div>
          </div>
        </GuideBox>

        <GuideBox
          title="상태: disabled · readOnly · error"
          description="disabled는 전체 비활성, readOnly는 직접 입력만 막고 스테퍼 버튼도 비활성화됩니다. error는 aria-invalid로 테두리 강조(Input과 동일)입니다."
          code={`
<section className="flex max-w-5xl flex-col gap-8">
  <div>
    <div className="mb-3 text-sm font-medium text-font-b">숫자</div>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <div className="flex flex-col gap-2">
        <div className="text-sm text-font-g">기본</div>
        <InputStepper defaultValue="4" min={0} max={10} />
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-sm text-font-g">disabled</div>
        <InputStepper defaultValue="3" min={0} max={10} disabled />
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-sm text-font-g">readOnly</div>
        <InputStepper defaultValue="7" min={0} max={10} readOnly />
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-sm text-font-g">error (aria-invalid)</div>
        <InputStepper defaultValue="-1" min={0} max={10} aria-invalid />
      </div>
    </div>
  </div>
  <div>
    <div className="mb-3 text-sm font-medium text-font-b">날짜</div>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <div className="flex flex-col gap-2">
        <div className="text-sm text-font-g">기본</div>
        <InputStepper
          mode="date"
          defaultValue="2025-06-15"
          min="2025-01-01"
          max="2025-12-31"
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-sm text-font-g">disabled</div>
        <InputStepper
          mode="date"
          defaultValue="2025-03-01"
          min="2025-01-01"
          max="2025-12-31"
          disabled
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-sm text-font-g">readOnly</div>
        <InputStepper
          mode="date"
          defaultValue="2025-08-20"
          min="2025-01-01"
          max="2025-12-31"
          readOnly
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-sm text-font-g">error (aria-invalid)</div>
        <InputStepper
          mode="date"
          defaultValue="2024-06-01"
          min="2025-01-01"
          max="2025-12-31"
          aria-invalid
        />
      </div>
    </div>
  </div>
</section>
          `}
        >
          <section className="flex max-w-5xl flex-col gap-8">
            <div>
              <div className="mb-3 text-sm font-medium text-font-b">숫자</div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div className="flex flex-col gap-2">
                  <div className="text-sm text-font-g">기본</div>
                  <InputStepper defaultValue="4" min={0} max={10} />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-sm text-font-g">disabled</div>
                  <InputStepper defaultValue="3" min={0} max={10} disabled />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-sm text-font-g">readOnly</div>
                  <InputStepper defaultValue="7" min={0} max={10} readOnly />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-sm text-font-g">error (aria-invalid)</div>
                  <InputStepper
                    defaultValue="-1"
                    min={0}
                    max={10}
                    aria-invalid
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="mb-3 text-sm font-medium text-font-b">날짜</div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div className="flex flex-col gap-2">
                  <div className="text-sm text-font-g">기본</div>
                  <InputStepper
                    mode="date"
                    defaultValue="2025-06-15"
                    min="2025-01-01"
                    max="2025-12-31"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-sm text-font-g">disabled</div>
                  <InputStepper
                    mode="date"
                    defaultValue="2025-03-01"
                    min="2025-01-01"
                    max="2025-12-31"
                    disabled
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-sm text-font-g">readOnly</div>
                  <InputStepper
                    mode="date"
                    defaultValue="2025-08-20"
                    min="2025-01-01"
                    max="2025-12-31"
                    readOnly
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-sm text-font-g">error (aria-invalid)</div>
                  <InputStepper
                    mode="date"
                    defaultValue="2024-06-01"
                    min="2025-01-01"
                    max="2025-12-31"
                    aria-invalid
                  />
                </div>
              </div>
            </div>
          </section>
        </GuideBox>
      </div>
    </div>
  );
}

export { SampleInputStepperPage };
export default SampleInputStepperPage;
