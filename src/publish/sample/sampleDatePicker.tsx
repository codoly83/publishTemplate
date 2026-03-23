import {
  DatePicker,
  DateRangePicker,
  DateRangePickerTwoPickers,
  type DateRange,
} from "@/components/ui";
import * as React from "react";
import { GuideBox } from "./GuideBox";

function SampleDatePickerPage() {
  const [selectedDate, setSelectedDate] = React.useState<Date>();
  const [selectedRange, setSelectedRange] = React.useState<DateRange>();

  return (
    <div className="guide-layout">
      <h1 className="guide-title">DatePicker Samples</h1>

      {/* ── DatePicker ─────────────────────────────────────────────────── */}
      <div className="guide-content">
        <GuideBox
          title="Basic date picker"
          description="기본 placeholder, 기본값, 비활성화 상태를 한 번에 확인합니다."
          code={`
  <DatePicker placeholder="YYYY.MM.DD" />
  <DatePicker defaultValue={new Date(2026, 2, 7)} />
  <DatePicker disabled defaultValue={new Date(2026, 2, 15)} />
  <DatePicker defaultValue={new Date(2026, 2, 15)} aria-invalid="true" />
          `}
        >
          <div className="grid max-w-3xl gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <div className="text-sm text-font-g">placeholder</div>
              <DatePicker placeholder="YYYY.MM.DD" />
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-sm text-font-g">default value</div>
              <DatePicker defaultValue={new Date(2026, 2, 7)} />
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-sm text-font-g">disabled</div>
              <DatePicker disabled defaultValue={new Date(2026, 2, 15)} />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-sm text-font-g">error</div>
              <DatePicker
                defaultValue={new Date(2026, 2, 15)}
                aria-invalid="true"
              />
            </div>
          </div>
        </GuideBox>

        <GuideBox
          title="Basic date picker (btnType)"
          description="btnType"
          code={`
  <DatePicker variant="btnType" placeholder="YYYY.MM.DD" />
  <DatePicker variant="btnType" defaultValue={new Date(2026, 2, 7)} />
  <DatePicker variant="btnType" disabled defaultValue={new Date(2026, 2, 15)} />
  <DatePicker variant="btnType" defaultValue={new Date(2026, 2, 15)} aria-invalid="true" />`}
        >
          <div className="grid max-w-3xl gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <div className="text-sm text-font-g">placeholder</div>
              <DatePicker variant="btnType" placeholder="YYYY.MM.DD" />
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-sm text-font-g">default value</div>
              <DatePicker
                variant="btnType"
                defaultValue={new Date(2026, 2, 7)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-sm text-font-g">disabled</div>
              <DatePicker
                variant="btnType"
                disabled
                defaultValue={new Date(2026, 2, 15)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-sm text-font-g">error</div>
              <DatePicker
                variant="btnType"
                defaultValue={new Date(2026, 2, 15)}
                aria-invalid="true"
              />
            </div>
          </div>
        </GuideBox>

        <GuideBox
          title="resetEnabled"
          description="선택된 날짜가 있을 때만 트리거 우측에 리셋 버튼이 표시됩니다."
          code={`
<div className="grid max-w-3xl gap-4 md:grid-cols-2">
  <div className="flex flex-col gap-2">
    <div className="text-sm text-font-g">default (value exists)</div>
    <DatePicker resetEnabled defaultValue={new Date(2026, 2, 7)} />
  </div>
  <div className="flex flex-col gap-2">
    <div className="text-sm text-font-g">default (empty)</div>
    <DatePicker resetEnabled placeholder="YYYY.MM.DD" />
  </div>
  <div className="flex flex-col gap-2">
    <div className="text-sm text-font-g">btnType (value exists)</div>
    <DatePicker variant="btnType" resetEnabled defaultValue={new Date(2026, 2, 15)} />
  </div>
  <div className="flex flex-col gap-2">
    <div className="text-sm text-font-g">btnType (empty)</div>
    <DatePicker variant="btnType" resetEnabled placeholder="YYYY.MM.DD" />
  </div>
</div>
          `}
        >
          <div className="grid max-w-3xl gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <div className="text-sm text-font-g">default (value exists)</div>
              <DatePicker
                resetEnabled
                defaultValue={new Date(2026, 2, 7)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-sm text-font-g">default (empty)</div>
              <DatePicker resetEnabled placeholder="YYYY.MM.DD" />
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-sm text-font-g">btnType (value exists)</div>
              <DatePicker
                variant="btnType"
                resetEnabled
                defaultValue={new Date(2026, 2, 15)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-sm text-font-g">btnType (empty)</div>
              <DatePicker variant="btnType" resetEnabled placeholder="YYYY.MM.DD" />
            </div>
          </div>
        </GuideBox>

        <GuideBox
          title="Controlled value"
          description="외부 state와 연결해서 선택값을 제어하는 형태입니다."
          code={`
  const [selectedDate, setSelectedDate] = React.useState<Date>();
  
  <DatePicker value={selectedDate} onValueChange={setSelectedDate} />
          `}
        >
          <div className="grid max-w-3xl gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <div className="text-sm text-font-g">controlled</div>
              <DatePicker
                value={selectedDate}
                onValueChange={setSelectedDate}
                placeholder="결재일을 선택하세요"
              />
            </div>

            <div className="rounded-xl border  bg-box p-4">
              <div className="text-sm font-medium text-slate-700">
                selected value
              </div>
              <div className="mt-2 text-sm text-font-g">
                {selectedDate
                  ? selectedDate.toLocaleDateString("ko-KR")
                  : "선택된 날짜가 없습니다."}
              </div>
            </div>
          </div>
        </GuideBox>

        <GuideBox
          title="Calendar options"
          description="특정 기간만 선택 가능하도록 `calendarProps`를 넘기는 예시입니다."
          code={`
  <DatePicker
    defaultValue={new Date(2026, 2, 10)}
    calendarProps={{
      fromDate: new Date(2026, 2, 1),
      toDate: new Date(2026, 2, 31),
    }}
  />
          `}
        >
          <div className="grid max-w-3xl gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <div className="text-sm text-font-g">range limited</div>
              <DatePicker
                defaultValue={new Date(2026, 2, 10)}
                placeholder="3월 내 날짜만 선택"
                calendarProps={{
                  fromDate: new Date(2026, 2, 1),
                  toDate: new Date(2026, 2, 31),
                }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-sm text-font-g">custom format</div>
              <DatePicker
                defaultValue={new Date(2026, 2, 21)}
                formatString="yyyy년 MM월 dd일"
              />
            </div>
          </div>
        </GuideBox>

        <GuideBox
          title="Disabled dates — DatePicker"
          description={`calendarProps.disabled 에 Matcher를 전달해 특정 날짜를 비활성화합니다.
  • { before: date } — 해당 날짜 이전 전체 비활성화
  • { after: date } — 해당 날짜 이후 전체 비활성화
  • 배열로 조합하면 특정 구간만 활성화
  • 함수로 요일·날짜 조건 지정 가능`}
          code={`
  const today = new Date();
  const rangeStart = new Date(2026, 2, 10);
  const rangeEnd   = new Date(2026, 2, 20);
  
  // 오늘 이전 날짜 비활성화 (오늘 포함 이후만 선택 가능)
  <DatePicker calendarProps={{ disabled: { before: today } }} />
  
  // 특정 구간만 선택 가능 (3/10 ~ 3/20)
  <DatePicker
    calendarProps={{ disabled: [{ before: rangeStart }, { after: rangeEnd }] }}
  />
  
  // 주말(토·일) 비활성화
  <DatePicker
    calendarProps={{
      disabled: (date: Date) => date.getDay() === 0 || date.getDay() === 6,
    }}
  />
          `}
        >
          <div className="grid max-w-3xl gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <div className="text-sm text-font-g">오늘 이전 비활성화</div>
              <DatePicker
                placeholder="오늘 이후만 선택"
                calendarProps={{ disabled: { before: new Date() } }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-sm text-font-g">3/10 ~ 3/20 구간만 선택</div>
              <DatePicker
                placeholder="3/10 ~ 3/20만 선택"
                calendarProps={{
                  disabled: [
                    { before: new Date(2026, 2, 10) },
                    { after: new Date(2026, 2, 20) },
                  ],
                }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-sm text-font-g">주말(토·일) 비활성화</div>
              <DatePicker
                placeholder="평일만 선택"
                calendarProps={{
                  disabled: (date: Date) =>
                    date.getDay() === 0 || date.getDay() === 6,
                }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-sm text-font-g">특정 날짜들 비활성화</div>
              <DatePicker
                placeholder="3/5·3/15·3/25 불가"
                calendarProps={{
                  disabled: [
                    new Date(2026, 2, 5),
                    new Date(2026, 2, 15),
                    new Date(2026, 2, 25),
                  ],
                }}
              />
            </div>
          </div>
        </GuideBox>

        {/* ── DateRangePicker ────────────────────────────────────────────── */}

        <div className="border-t  pt-2">
          <h2 className="text-lg font-semibold text-slate-800">
            DateRangePicker Samples
          </h2>
        </div>

        <GuideBox
          title="Basic range picker"
          description="기간 선택 피커의 기본 상태입니다. 시작일을 먼저 클릭한 뒤 종료일을 클릭하면 범위가 완성됩니다."
          code={`
  <DateRangePicker placeholder="기간을 선택하세요" />
  <DateRangePicker
    defaultValue={{ from: new Date(2026, 2, 5), to: new Date(2026, 2, 20) }}
  />
  <DateRangePicker disabled defaultValue={{ from: new Date(2026, 2, 1), to: new Date(2026, 2, 31) }} />
          `}
        >
          <div className="grid max-w-3xl gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <div className="text-sm text-font-g">placeholder</div>
              <DateRangePicker placeholder="기간을 선택하세요" />
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-sm text-font-g">default value</div>
              <DateRangePicker
                defaultValue={{
                  from: new Date(2026, 2, 5),
                  to: new Date(2026, 2, 20),
                }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-sm text-font-g">disabled</div>
              <DateRangePicker
                disabled
                defaultValue={{
                  from: new Date(2026, 2, 1),
                  to: new Date(2026, 2, 31),
                }}
              />
            </div>
          </div>
        </GuideBox>

        <GuideBox
          title="Controlled range"
          description="외부 state와 연결해서 선택된 기간을 제어하는 형태입니다."
          code={`
  const [selectedRange, setSelectedRange] = React.useState<DateRange>();
  
  <DateRangePicker value={selectedRange} onValueChange={setSelectedRange} />
          `}
        >
          <div className="grid max-w-3xl gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <div className="text-sm text-font-g">controlled</div>
              <DateRangePicker
                value={selectedRange}
                onValueChange={setSelectedRange}
                placeholder="조회 기간을 선택하세요"
              />
            </div>

            <div className="rounded-xl border  bg-box p-4">
              <div className="text-sm font-medium text-slate-700">
                selected range
              </div>
              <div className="mt-2 space-y-1 text-sm text-font-g">
                <div>
                  <span className="font-medium">from: </span>
                  {selectedRange?.from
                    ? selectedRange.from.toLocaleDateString("ko-KR")
                    : "—"}
                </div>
                <div>
                  <span className="font-medium">to: </span>
                  {selectedRange?.to
                    ? selectedRange.to.toLocaleDateString("ko-KR")
                    : "—"}
                </div>
              </div>
            </div>
          </div>
        </GuideBox>

        <GuideBox
          title="Range by 2 DatePickers"
          description="시작일/종료일을 DatePicker 2개로 구성해 선택합니다."
          code={`
  <DateRangePickerTwoPickers
    defaultValue={{ from: new Date(2026, 2, 5), to: new Date(2026, 2, 20) }}
  />
  <DateRangePickerTwoPickers startPlaceholder="시작일" endPlaceholder="종료일" />
          `}
        >
          <div className="grid max-w-3xl gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <div className="text-sm text-font-g">start/end (default)</div>
              <DateRangePickerTwoPickers
                defaultValue={{
                  from: new Date(2026, 2, 5),
                  to: new Date(2026, 2, 20),
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-sm text-font-g">start/end (empty)</div>
              <DateRangePickerTwoPickers
                startPlaceholder="시작일"
                endPlaceholder="종료일"
              />
            </div>
          </div>
        </GuideBox>

        <GuideBox
          title="Range with calendar options"
          description="선택 가능한 날짜 범위를 제한하거나 커스텀 포맷을 적용합니다."
          code={`
  // 선택 가능 기간 제한
  <DateRangePicker
    placeholder="이번달만 선택 가능"
    calendarProps={{
      disabled: [{ before: new Date(2026, 2, 1) }, { after: new Date(2026, 2, 31) }],
    }}
  />
  
  // 커스텀 날짜 포맷
  <DateRangePicker
    defaultValue={{ from: new Date(2026, 2, 1), to: new Date(2026, 2, 15) }}
    formatString="MM/dd"
  />
          `}
        >
          <div className="grid max-w-3xl gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <div className="text-sm text-font-g">range limited (3월만)</div>
              <DateRangePicker
                placeholder="3월 내 기간만 선택"
                calendarProps={{
                  disabled: [
                    { before: new Date(2026, 2, 1) },
                    { after: new Date(2026, 2, 31) },
                  ],
                }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-sm text-font-g">custom format (MM/dd)</div>
              <DateRangePicker
                defaultValue={{
                  from: new Date(2026, 2, 1),
                  to: new Date(2026, 2, 15),
                }}
                formatString="MM/dd"
              />
            </div>
          </div>
        </GuideBox>

        <GuideBox
          title="Disabled dates — DateRangePicker"
          description={`DateRangePicker에서도 동일한 disabled Matcher를 사용해 선택 불가 날짜를 지정합니다.
  비활성화된 날짜는 범위 선택 시작·끝으로 지정할 수 없습니다.`}
          code={`
  const today = new Date();
  
  // 오늘 이전 비활성화
  <DateRangePicker calendarProps={{ disabled: { before: today } }} />
  
  // 특정 구간만 선택 가능 (3/10 ~ 3/20)
  <DateRangePicker
    calendarProps={{
      disabled: [{ before: new Date(2026, 2, 10) }, { after: new Date(2026, 2, 20) }],
    }}
  />
  
  // 주말 비활성화
  <DateRangePicker
    calendarProps={{
      disabled: (date: Date) => date.getDay() === 0 || date.getDay() === 6,
    }}
  />
          `}
        >
          <div className="grid max-w-3xl gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <div className="text-sm text-font-g">오늘 이전 비활성화</div>
              <DateRangePicker
                placeholder="오늘 이후 기간만 선택"
                calendarProps={{ disabled: { before: new Date() } }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-sm text-font-g">3/10 ~ 3/20 구간만 선택</div>
              <DateRangePicker
                placeholder="3/10 ~ 3/20 사이만"
                calendarProps={{
                  disabled: [
                    { before: new Date(2026, 2, 10) },
                    { after: new Date(2026, 2, 20) },
                  ],
                }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-sm text-font-g">주말(토·일) 비활성화</div>
              <DateRangePicker
                placeholder="평일 기간만 선택"
                calendarProps={{
                  disabled: (date: Date) =>
                    date.getDay() === 0 || date.getDay() === 6,
                }}
              />
            </div>
          </div>
        </GuideBox>
      </div>
    </div>
  );
}

export { SampleDatePickerPage };
export default SampleDatePickerPage;
