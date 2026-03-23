import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectSimple,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { GuideBox } from "./GuideBox";

const statusOptions = [
  { value: "pending", label: "대기" },
  { value: "reviewing", label: "심사중" },
  { value: "approved", label: "승인" },
  { value: "rejected", label: "반려" },
];

function SampleSelectPage() {
  return (
    <div className="guide-layout">
      <h1 className="guide-title">Select Samples</h1>

      <div className="guide-content">
        <GuideBox
          title="Basic select"
          description="기본값, placeholder, disabled, invalid 등 폼 기본 패턴을 확인합니다."
          code={`
<div className="grid max-w-3xl gap-4 md:grid-cols-2">
  <div className="flex flex-col gap-2">
    <div className="text-sm text-font-g">default</div>
    <Select defaultValue="reviewing">
      <SelectTrigger>
        <SelectValue placeholder="상태를 선택하세요" />
      </SelectTrigger>
      <SelectContent>
        {statusOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
  <div className="flex flex-col gap-2">
    <div className="text-sm text-font-g">placeholder</div>
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="담당자를 선택하세요" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="hong">홍길동</SelectItem>
        <SelectItem value="kim">김영희</SelectItem>
        <SelectItem value="lee">이민수</SelectItem>
        <SelectItem value="disabled" disabled>disabled</SelectItem>
      </SelectContent>
    </Select>
  </div>
  <div className="flex flex-col gap-2">
    <div className="text-sm text-font-g">disabled</div>
    <Select defaultValue="approved" disabled>
      <SelectTrigger>
        <SelectValue placeholder="선택 불가" />
      </SelectTrigger>
      <SelectContent>
        {statusOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
  <div className="flex flex-col gap-2">
    <div className="text-sm text-font-g">invalid</div>
    <Select>
      <SelectTrigger aria-invalid="true">
        <SelectValue placeholder="필수 값을 선택하세요" />
      </SelectTrigger>
      <SelectContent>
        {statusOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
</div>
        `}
        >
          <div className="grid max-w-3xl gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <div className="text-sm text-font-g">default</div>
              <Select defaultValue="reviewing">
                <SelectTrigger>
                  <SelectValue placeholder="상태를 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-sm text-font-g">placeholder</div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="담당자를 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hong">홍길동</SelectItem>
                  <SelectItem value="kim">김영희</SelectItem>
                  <SelectItem value="lee">이민수</SelectItem>
                  <SelectItem value="disabled" disabled>
                    disabled
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-sm text-font-g">disabled</div>
              <Select defaultValue="approved" disabled>
                <SelectTrigger>
                  <SelectValue placeholder="선택 불가" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-sm text-font-g">invalid</div>
              <Select>
                <SelectTrigger aria-invalid="true">
                  <SelectValue placeholder="필수 값을 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </GuideBox>

        <GuideBox
          title="resetEnabled"
          description="선택 값이 있을 때만 트리거 우측에 리셋 버튼을 표시합니다."
          code={`
<div className="grid max-w-3xl gap-4 md:grid-cols-2">
  <div className="flex flex-col gap-2">
    <div className="text-sm text-font-g">value exists</div>
    <Select resetEnabled defaultValue="reviewing">
      <SelectTrigger>
        <SelectValue placeholder="상태를 선택하세요" />
      </SelectTrigger>
      <SelectContent>
        {statusOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>

  <div className="flex flex-col gap-2">
    <div className="text-sm text-font-g">empty (reset hidden)</div>
    <Select resetEnabled>
      <SelectTrigger>
        <SelectValue placeholder="상태를 선택하세요" />
      </SelectTrigger>
      <SelectContent>
        {statusOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
</div>
          `}
        >
          <div className="grid max-w-3xl gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <div className="text-sm text-font-g">value exists</div>
              <Select resetEnabled defaultValue="reviewing">
                <SelectTrigger>
                  <SelectValue placeholder="상태를 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-sm text-font-g">empty (reset hidden)</div>
              <Select resetEnabled>
                <SelectTrigger>
                  <SelectValue placeholder="상태를 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </GuideBox>

        <GuideBox
          title="SelectSimple (라벨 + options 한 줄)"
          description="`label`과 `options`만 넘기면 트리거·SelectContent·SelectItem을 내부에서 구성합니다. Root의 value·defaultValue·onValueChange·disabled 등은 그대로 전달됩니다."
          code={`
const statusOptions = [
  { value: "pending", label: "대기" },
  { value: "reviewing", label: "심사중" },
  { value: "approved", label: "승인" },
];

<SelectSimple
  label="상태"
  options={statusOptions}
  placeholder="상태를 선택하세요"
  defaultValue="reviewing"
/>
        `}
        >
          <div className="max-w-xl space-y-4">
            <SelectSimple
              label="상태"
              options={statusOptions}
              placeholder="상태를 선택하세요"
              defaultValue="reviewing"
            />
            <SelectSimple
              label="우선순위"
              options={[
                { value: "low", label: "낮음" },
                { value: "mid", label: "보통" },
                { value: "high", label: "높음" },
              ]}
              placeholder="선택"
              size="sm"
            />
          </div>
        </GuideBox>

        <GuideBox
          title="Size"
          description="트리거 크기 조절과 popper 위치 지정처럼 자주 쓰는 옵션을 보여줍니다."
          code={`
<div className="grid max-w-3xl gap-4 md:grid-cols-2">
  <div className="flex flex-col gap-2">
    <div className="text-sm text-font-g">default</div>
    <Select defaultValue="pending">
      <SelectTrigger>
        <SelectValue placeholder="우선순위를 선택하세요" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="pending">보통</SelectItem>
        <SelectItem value="reviewing">중요</SelectItem>
        <SelectItem value="approved">긴급</SelectItem>
      </SelectContent>
    </Select>
  </div>
  <div className="flex flex-col gap-2">
    <div className="text-sm text-font-g">sm</div>
    <Select defaultValue="reviewing">
      <SelectTrigger size="sm">
        <SelectValue placeholder="우선순위를 선택하세요" />
      </SelectTrigger>
      <SelectContent position="popper">
        <SelectItem value="pending">보통</SelectItem>
        <SelectItem value="reviewing">중요</SelectItem>
        <SelectItem value="approved">긴급</SelectItem>
      </SelectContent>
    </Select>
  </div>
</div>
        `}
        >
          <div className="grid max-w-3xl gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <div className="text-sm text-font-g">default</div>
              <Select defaultValue="pending">
                <SelectTrigger>
                  <SelectValue placeholder="우선순위를 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">보통</SelectItem>
                  <SelectItem value="reviewing">중요</SelectItem>
                  <SelectItem value="approved">긴급</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-sm text-font-g">sm</div>
              <Select defaultValue="reviewing">
                <SelectTrigger size="sm">
                  <SelectValue placeholder="우선순위를 선택하세요" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="pending">보통</SelectItem>
                  <SelectItem value="reviewing">중요</SelectItem>
                  <SelectItem value="approved">긴급</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </GuideBox>

        <GuideBox
          title="Group and separator"
          description="레이블과 구분선을 포함한 구조화된 옵션 목록 예시입니다."
          code={`
<div className="grid max-w-3xl gap-4 md:grid-cols-2">
  <div className="flex flex-col gap-2">
    <div className="text-sm text-font-g">with label</div>
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="카테고리를 선택하세요" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>업무 상태</SelectLabel>
          <SelectItem value="requested">접수</SelectItem>
          <SelectItem value="processing">진행중</SelectItem>
          <SelectItem value="done">완료</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>보관 상태</SelectLabel>
          <SelectItem value="archived">보관</SelectItem>
          <SelectItem value="deleted" disabled>삭제됨</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
  <div className="flex flex-col gap-2">
    <div className="text-sm text-font-g">long list</div>
    <Select defaultValue="team-3">
      <SelectTrigger>
        <SelectValue placeholder="소속 팀을 선택하세요" />
      </SelectTrigger>
      <SelectContent position="popper">
        {Array.from({ length: 12 }, (_, index) => (
          <SelectItem key={\`team-\${index + 1}\`} value={\`team-\${index + 1}\`}>
            운영팀 {index + 1}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
</div>
        `}
        >
          <div className="grid max-w-3xl gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <div className="text-sm text-font-g">with label</div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="카테고리를 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>업무 상태</SelectLabel>
                    <SelectItem value="requested">접수</SelectItem>
                    <SelectItem value="processing">진행중</SelectItem>
                    <SelectItem value="done">완료</SelectItem>
                  </SelectGroup>
                  <SelectSeparator />
                  <SelectGroup>
                    <SelectLabel>보관 상태</SelectLabel>
                    <SelectItem value="archived">보관</SelectItem>
                    <SelectItem value="deleted" disabled>
                      삭제됨
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-sm text-font-g">long list</div>
              <Select defaultValue="team-3">
                <SelectTrigger>
                  <SelectValue placeholder="소속 팀을 선택하세요" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {Array.from({ length: 12 }, (_, index) => (
                    <SelectItem
                      key={`team-${index + 1}`}
                      value={`team-${index + 1}`}
                    >
                      운영팀 {index + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </GuideBox>

        <GuideBox
          title="btnType"
          description="버튼형 트리거 스타일을 적용한 Select 사용 예시입니다."
          code={`
<div className="grid max-w-3xl gap-4 md:grid-cols-2">
  <div className="flex flex-col gap-2">
    <div className="text-sm text-font-g">with label</div>
    <Select>
      <SelectTrigger variant="btnType">
        <SelectValue placeholder="카테고리를 선택하세요" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="pending">보통</SelectItem>
        <SelectItem value="reviewing">중요</SelectItem>
        <SelectItem value="approved">긴급</SelectItem>
      </SelectContent>
    </Select>
  </div>
  <div className="flex flex-col gap-2">
    <div className="text-sm text-font-g">long list</div>
    <Select disabled>
      <SelectTrigger variant="btnType">
        <SelectValue placeholder="카테고리를 선택하세요" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="pending">보통</SelectItem>
        <SelectItem value="reviewing">중요</SelectItem>
        <SelectItem value="approved">긴급</SelectItem>
      </SelectContent>
    </Select>
  </div>
</div>
        `}
        >
          <div className="grid max-w-3xl gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <div className="text-sm text-font-g">with label</div>
              <Select>
                <SelectTrigger variant="btnType">
                  <SelectValue placeholder="카테고리를 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">보통</SelectItem>
                  <SelectItem value="reviewing">중요</SelectItem>
                  <SelectItem value="approved">긴급</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-sm text-font-g">long list</div>
              <Select disabled>
                <SelectTrigger variant="btnType">
                  <SelectValue placeholder="카테고리를 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">보통</SelectItem>
                  <SelectItem value="reviewing">중요</SelectItem>
                  <SelectItem value="approved">긴급</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </GuideBox>
      </div>
    </div>
  );
}

export { SampleSelectPage };
export default SampleSelectPage;
