import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui";
import { GuideBox } from "./GuideBox";

function SampleAccordionPage() {
  return (
    <div className="guide-layout">
      <h1 className="guide-title">Accordion Samples</h1>
      <div className="guide-content">
        <GuideBox
          title="기본 Accordion"
          description="기본 Accordion 컴포넌트 사용 예시입니다."
          code={`
<Accordion type="single" collapsible className="w-full max-w-md">
  <AccordionItem value="item-1">
    <AccordionTrigger>첫 번째 섹션</AccordionTrigger>
    <AccordionContent>
      첫 번째 섹션의 내용입니다. 여기에 자세한 설명이나 콘텐츠를 추가할 수 있습니다.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>두 번째 섹션</AccordionTrigger>
    <AccordionContent>
      두 번째 섹션의 내용입니다. 여러 줄의 텍스트나 컴포넌트를 포함할 수 있습니다.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-3">
    <AccordionTrigger>세 번째 섹션</AccordionTrigger>
    <AccordionContent>
      세 번째 섹션의 내용입니다. 다양한 유형의 콘텐츠를 표시할 수 있습니다.
    </AccordionContent>
  </AccordionItem>
</Accordion>
          `}
        >
          <Accordion type="single" collapsible className="w-full max-w-md">
            <AccordionItem value="item-1">
              <AccordionTrigger>첫 번째 섹션</AccordionTrigger>
              <AccordionContent>
                첫 번째 섹션의 내용입니다. 여기에 자세한 설명이나 콘텐츠를
                추가할 수 있습니다.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>두 번째 섹션</AccordionTrigger>
              <AccordionContent>
                두 번째 섹션의 내용입니다. 여러 줄의 텍스트나 컴포넌트를 포함할
                수 있습니다.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>세 번째 섹션</AccordionTrigger>
              <AccordionContent>
                세 번째 섹션의 내용입니다. 다양한 유형의 콘텐츠를 표시할 수
                있습니다.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </GuideBox>

        <GuideBox
          title="여러 항목 확장 가능한 Accordion"
          description="type='multiple'을 사용하여 여러 항목을 동시에 확장할 수 있는 Accordion 예시입니다."
          code={`
<Accordion type="multiple" className="w-full max-w-md">
  <AccordionItem value="item-1">
    <AccordionTrigger>프로젝트 개요</AccordionTrigger>
    <AccordionContent>
      이 프로젝트는 React와 TypeScript를 사용하여 구축된 웹 애플리케이션입니다.
      주요 기능으로는 사용자 인증, 데이터 시각화, 실시간 업데이트 등이 포함됩니다.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>기술 스택</AccordionTrigger>
    <AccordionContent>
      • React 18<br />
      • TypeScript 5<br />
      • Tailwind CSS<br />
      • Radix UI<br />
      • Vite
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-3">
    <AccordionTrigger>설치 및 실행 방법</AccordionTrigger>
    <AccordionContent>
      1. 저장소 클론<br />
      2. npm install<br />
      3. npm run dev
    </AccordionContent>
  </AccordionItem>
</Accordion>
          `}
        >
          <Accordion type="multiple" className="w-full max-w-md">
            <AccordionItem value="item-1">
              <AccordionTrigger>프로젝트 개요</AccordionTrigger>
              <AccordionContent>
                이 프로젝트는 React와 TypeScript를 사용하여 구축된 웹
                애플리케이션입니다. 주요 기능으로는 사용자 인증, 데이터 시각화,
                실시간 업데이트 등이 포함됩니다.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>기술 스택</AccordionTrigger>
              <AccordionContent>
                • React 18
                <br />
                • TypeScript 5<br />
                • Tailwind CSS
                <br />
                • Radix UI
                <br />• Vite
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>설치 및 실행 방법</AccordionTrigger>
              <AccordionContent>
                1. 저장소 클론
                <br />
                2. npm install
                <br />
                3. npm run dev
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </GuideBox>

        <GuideBox
          title="비활성화된 Accordion 항목"
          description="disabled 속성을 사용하여 특정 항목을 비활성화할 수 있습니다."
          code={`
<Accordion type="single" collapsible className="w-full max-w-md">
  <AccordionItem value="item-1" disabled>
    <AccordionTrigger>비활성화된 섹션</AccordionTrigger>
    <AccordionContent>
      이 섹션은 비활성화되어 있어 클릭할 수 없습니다.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>활성화된 섹션</AccordionTrigger>
    <AccordionContent>
      이 섹션은 정상적으로 작동합니다.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-3">
    <AccordionTrigger>다른 활성화된 섹션</AccordionTrigger>
    <AccordionContent>
      이 섹션도 정상적으로 작동합니다.
    </AccordionContent>
  </AccordionItem>
</Accordion>
          `}
        >
          <Accordion type="single" collapsible className="w-full max-w-md">
            <AccordionItem value="item-1" disabled>
              <AccordionTrigger>비활성화된 섹션</AccordionTrigger>
              <AccordionContent>
                이 섹션은 비활성화되어 있어 클릭할 수 없습니다.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>활성화된 섹션</AccordionTrigger>
              <AccordionContent>
                이 섹션은 정상적으로 작동합니다.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>다른 활성화된 섹션</AccordionTrigger>
              <AccordionContent>
                이 섹션도 정상적으로 작동합니다.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </GuideBox>

        <GuideBox
          title="기본값이 열린 Accordion"
          description="defaultValue를 사용하여 특정 항목을 기본적으로 열린 상태로 설정할 수 있습니다."
          code={`
<Accordion type="single" defaultValue="item-2" collapsible className="w-full max-w-md">
  <AccordionItem value="item-1">
    <AccordionTrigger>첫 번째 섹션</AccordionTrigger>
    <AccordionContent>
      이 섹션은 기본적으로 닫혀 있습니다.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>두 번째 섹션 (기본 열림)</AccordionTrigger>
    <AccordionContent>
      이 섹션은 defaultValue로 인해 기본적으로 열려 있습니다.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-3">
    <AccordionTrigger>세 번째 섹션</AccordionTrigger>
    <AccordionContent>
      이 섹션도 기본적으로 닫혀 있습니다.
    </AccordionContent>
  </AccordionItem>
</Accordion>
          `}
        >
          <Accordion
            type="single"
            defaultValue="item-2"
            collapsible
            className="w-full max-w-md"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>첫 번째 섹션</AccordionTrigger>
              <AccordionContent>
                이 섹션은 기본적으로 닫혀 있습니다.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>두 번째 섹션 (기본 열림)</AccordionTrigger>
              <AccordionContent>
                이 섹션은 defaultValue로 인해 기본적으로 열려 있습니다.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>세 번째 섹션</AccordionTrigger>
              <AccordionContent>
                이 섹션도 기본적으로 닫혀 있습니다.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </GuideBox>

        <GuideBox
          title="커스텀 스타일이 적용된 Accordion"
          description="className을 사용하여 커스텀 스타일을 적용한 Accordion 예시입니다."
          code={`
<div className="space-y-4">
  <div>
    <h3 className="text-sm font-medium mb-2">컴팩트 스타일</h3>
    <Accordion type="single" collapsible className="w-full max-w-md border-none">
      <AccordionItem value="item-1" className="border-b border-line02 last:border-b-0">
        <AccordionTrigger className="py-2 text-sm hover:no-underline">
          컴팩트 헤더
        </AccordionTrigger>
        <AccordionContent className="text-sm py-2">
          컴팩트한 스타일의 내용입니다.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" className="border-b border-line02 last:border-b-0">
        <AccordionTrigger className="py-2 text-sm hover:no-underline">
          또 다른 컴팩트 헤더
        </AccordionTrigger>
        <AccordionContent className="text-sm py-2">
          두 번째 컴팩트한 내용입니다.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>

  <div>
    <h3 className="text-sm font-medium mb-2">강조 스타일</h3>
    <Accordion type="single" collapsible className="w-full max-w-md bg-bg-box rounded-lg p-2">
      <AccordionItem value="item-1" className="bg-bg-base rounded-lg mb-2 last:mb-0">
        <AccordionTrigger className="px-4 py-3 hover:bg-bg-box rounded-lg">
          강조된 헤더
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-3">
          배경색이 강조된 내용 영역입니다.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" className="bg-bg-base rounded-lg mb-2 last:mb-0">
        <AccordionTrigger className="px-4 py-3 hover:bg-bg-box rounded-lg">
          두 번째 강조 헤더
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-3">
          두 번째 강조된 내용 영역입니다.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
</div>
          `}
        >
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">컴팩트 스타일</h3>
              <Accordion
                type="single"
                collapsible
                className="w-full max-w-md border-none"
              >
                <AccordionItem
                  value="item-1"
                  className="border-b border-line02 last:border-b-0"
                >
                  <AccordionTrigger className="py-2 text-sm hover:no-underline">
                    컴팩트 헤더
                  </AccordionTrigger>
                  <AccordionContent className="text-sm py-2">
                    컴팩트한 스타일의 내용입니다.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem
                  value="item-2"
                  className="border-b border-line02 last:border-b-0"
                >
                  <AccordionTrigger className="py-2 text-sm hover:no-underline">
                    또 다른 컴팩트 헤더
                  </AccordionTrigger>
                  <AccordionContent className="text-sm py-2">
                    두 번째 컴팩트한 내용입니다.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">강조 스타일</h3>
              <Accordion
                type="single"
                collapsible
                className="w-full max-w-md bg-bg-box rounded-lg p-2"
              >
                <AccordionItem
                  value="item-1"
                  className="bg-bg-base rounded-lg mb-2 last:mb-0"
                >
                  <AccordionTrigger className="px-4 py-3 hover:bg-bg-box rounded-lg">
                    강조된 헤더
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-3">
                    배경색이 강조된 내용 영역입니다.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem
                  value="item-2"
                  className="bg-bg-base rounded-lg mb-2 last:mb-0"
                >
                  <AccordionTrigger className="px-4 py-3 hover:bg-bg-box rounded-lg">
                    두 번째 강조 헤더
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-3">
                    두 번째 강조된 내용 영역입니다.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </GuideBox>
      </div>
    </div>
  );
}

export { SampleAccordionPage };
export default SampleAccordionPage;
