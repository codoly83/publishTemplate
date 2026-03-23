import * as React from "react";
import {
  Icon,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
  Textarea,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import { GuideBox } from "./GuideBox";

const SUGGESTED_MAX = 500;

function SampleTextareaPage() {
  const [basicCount, setBasicCount] = React.useState("");
  const [groupCount, setGroupCount] = React.useState("");

  const basicLen = basicCount.length;
  const groupLen = groupCount.length;

  const nearLimit = (len: number, max: number) => len >= max * 0.9;

  return (
    <div className="guide-layout">
      <h1 className="guide-title">Textarea Samples</h1>
      <div className="guide-content">
        <GuideBox
          title="기본 Textarea"
          description="단독 Textarea 컴포넌트로 여러 줄 입력을 받는 기본 예시입니다."
          code={`
<Textarea
  placeholder="내용을 입력하세요"
  rows={4}
  aria-label="기본 텍스트 영역"
/>
          `}
        >
          <div className="max-w-2xl">
            <Textarea
              placeholder="내용을 입력하세요"
              rows={4}
              aria-label="기본 텍스트 영역"
            />
          </div>
        </GuideBox>

        <GuideBox
          title="최대 글자 수 제안 · 카운터"
          description="권장 최대 글자 수를 안내하고, 현재 입력 글자 수를 실시간으로 보여 줍니다. maxLength로 초과 입력을 막을 수 있습니다."
          code={`
const MAX = 500;
const [value, setValue] = useState("");
const len = value.length;

<div className="flex max-w-2xl flex-col gap-2">
  <Textarea
    value={value}
    onChange={(e) => setValue(e.target.value)}
    maxLength={MAX}
    rows={5}
    placeholder="최대 500자까지 입력할 수 있습니다."
    aria-describedby="textarea-hint textarea-count"
  />
  <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
    <span id="textarea-hint" className="text-font-g">
      제목·본문 요약 등은 최대 {MAX}자를 넘기지 않도록 해 주세요.
    </span>
    <span
      id="textarea-count"
      className={len >= MAX * 0.9 ? "font-medium text-red" : "text-font-g"}
      aria-live="polite"
    >
      {len} / {MAX}
    </span>
  </div>
</div>
          `}
        >
          <div className="flex max-w-2xl flex-col gap-2">
            <Textarea
              value={basicCount}
              onChange={(e) => setBasicCount(e.target.value)}
              maxLength={SUGGESTED_MAX}
              rows={5}
              placeholder="최대 500자까지 입력할 수 있습니다."
              aria-describedby="textarea-hint textarea-count"
            />
            <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
              <span id="textarea-hint" className="text-font-g">
                제목·본문 요약 등은 최대 {SUGGESTED_MAX}자를 넘기지 않도록 해 주세요.
              </span>
              <span
                id="textarea-count"
                className={cn(
                  nearLimit(basicLen, SUGGESTED_MAX)
                    ? "font-medium text-red"
                    : "text-font-g",
                )}
                aria-live="polite"
              >
                {basicLen} / {SUGGESTED_MAX}
              </span>
            </div>
          </div>
        </GuideBox>

        <GuideBox
          title="Input group · Textarea"
          description="Textarea와 상·하단 가이드·액션을 InputGroup으로 묶는 패턴입니다."
          code={`
<div className="grid max-w-4xl gap-4 md:grid-cols-2">
  <div className="flex flex-col gap-2">
    <div className="text-sm text-font-g">with top guide</div>
    <InputGroup>
      <InputGroupAddon align="block-start">
        <InputGroupText>상세 설명</InputGroupText>
      </InputGroupAddon>
      <InputGroupTextarea placeholder="계약 관련 요청사항을 입력하세요" />
    </InputGroup>
  </div>
  <div className="flex flex-col gap-2">
    <div className="text-sm text-font-g">with bottom action</div>
    <InputGroup>
      <InputGroupTextarea placeholder="첨부파일과 함께 메모를 남겨보세요" />
      <InputGroupAddon align="block-end">
        <InputGroupText>
          <Icon name="attachment" />
          첨부 2건
        </InputGroupText>
        <InputGroupButton
          variant="outline"
          size="sm"
          shape="square"
          color="gray"
        >
          업로드
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  </div>
</div>
          `}
        >
          <div className="grid max-w-4xl gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <div className="text-sm text-font-g">with top guide</div>
              <InputGroup>
                <InputGroupAddon align="block-start">
                  <InputGroupText>상세 설명</InputGroupText>
                </InputGroupAddon>
                <InputGroupTextarea placeholder="계약 관련 요청사항을 입력하세요" />
              </InputGroup>
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-sm text-font-g">with bottom action</div>
              <InputGroup>
                <InputGroupTextarea placeholder="첨부파일과 함께 메모를 남겨보세요" />
                <InputGroupAddon align="block-end">
                  <InputGroupText>
                    <Icon name="attachment" />
                    첨부 2건
                  </InputGroupText>
                  <InputGroupButton
                    variant="outline"
                    size="sm"
                    shape="square"
                    color="gray"
                  >
                    업로드
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </div>
          </div>
        </GuideBox>

        <GuideBox
          title="Input group + 하단 글자 수"
          description="block-end 영역에 최대 글자 안내와 카운터를 함께 두는 폼 패턴입니다."
          code={`
const MAX = 300;
const [value, setValue] = useState("");
const len = value.length;

<InputGroup>
  <InputGroupAddon align="block-start">
    <InputGroupText>메모</InputGroupText>
  </InputGroupAddon>
  <InputGroupTextarea
    value={value}
    onChange={(e) => setValue(e.target.value)}
    maxLength={MAX}
    rows={4}
    placeholder="최대 300자"
    aria-describedby="group-count"
  />
  <InputGroupAddon align="block-end">
    <InputGroupText className="flex w-full flex-wrap justify-between gap-2">
      <span className="text-font-g">내부 공유용 (최대 {MAX}자)</span>
      <span
        id="group-count"
        className={len >= MAX * 0.9 ? "font-medium text-red" : ""}
      >
        {len} / {MAX}
      </span>
    </InputGroupText>
  </InputGroupAddon>
</InputGroup>
          `}
        >
          <div className="max-w-2xl">
            <InputGroup>
              <InputGroupAddon align="block-start">
                <InputGroupText>메모</InputGroupText>
              </InputGroupAddon>
              <InputGroupTextarea
                value={groupCount}
                onChange={(e) => setGroupCount(e.target.value)}
                maxLength={300}
                rows={4}
                placeholder="최대 300자"
                aria-describedby="group-count"
              />
              <InputGroupAddon align="block-end">
                <InputGroupText className="flex w-full flex-wrap justify-between gap-2">
                  <span className="text-font-g">
                    내부 공유용 (최대 300자 권장)
                  </span>
                  <span
                    id="group-count"
                    className={cn(
                      nearLimit(groupLen, 300) ? "font-medium text-red" : "",
                    )}
                    aria-live="polite"
                  >
                    {groupLen} / 300
                  </span>
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </div>
        </GuideBox>
      </div>
    </div>
  );
}

export { SampleTextareaPage };
export default SampleTextareaPage;
