import * as React from "react";
import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui";
import { GuideBox } from "@/publish/guide/GuideBox";

function SampleTooltipPage() {
  const containerRef = React.useRef<HTMLDivElement>(null);

  return (
    <div className="guide-layout">
      <h1 className="guide-title">Tooltip Samples</h1>
      <div className="guide-content">
        <GuideBox
          title="기본 Tooltip"
          description="기본 Tooltip 컴포넌트 사용 예시입니다."
          code={`
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button>툴팁이 보이는 버튼</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>이것은 기본 툴팁입니다.</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
          `}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button>툴팁이 보이는 버튼</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>이것은 기본 툴팁입니다.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </GuideBox>

        <GuideBox
          title="다양한 variant 스타일"
          description="variant 속성을 사용하여 다양한 스타일의 툴팁을 적용할 수 있습니다."
          code={`
<div className="flex flex-wrap gap-4">
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" color="grayBg">
          기본
        </Button>
      </TooltipTrigger>
      <TooltipContent variant="default">
        <p>기본 툴팁 스타일</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>

  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" color="default">
          라이트
        </Button>
      </TooltipTrigger>
      <TooltipContent variant="light">
        <p>라이트 툴팁 스타일</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>

  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="default" color="black">
          다크
        </Button>
      </TooltipTrigger>
      <TooltipContent variant="dark">
        <p>다크 툴팁 스타일</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>

  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="text" color="default">
          에러
        </Button>
      </TooltipTrigger>
      <TooltipContent variant="error">
        <p>에러 툴팁 스타일</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>

  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" color="default">
          성공
        </Button>
      </TooltipTrigger>
      <TooltipContent variant="success">
        <p>성공 툴팁 스타일</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</div>
          `}
        >
          <div className="flex flex-wrap gap-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" color="grayBg">
                    기본
                  </Button>
                </TooltipTrigger>
                <TooltipContent variant="default">
                  <p>기본 툴팁 스타일</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" color="default">
                    라이트
                  </Button>
                </TooltipTrigger>
                <TooltipContent variant="light">
                  <p>라이트 툴팁 스타일</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="default" color="black">
                    다크
                  </Button>
                </TooltipTrigger>
                <TooltipContent variant="dark">
                  <p>다크 툴팁 스타일</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="text" color="default">
                    에러
                  </Button>
                </TooltipTrigger>
                <TooltipContent variant="error">
                  <p>에러 툴팁 스타일</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" color="default">
                    성공
                  </Button>
                </TooltipTrigger>
                <TooltipContent variant="success">
                  <p>성공 툴팁 스타일</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </GuideBox>

        <GuideBox
          title="다양한 크기"
          description="size 속성을 사용하여 툴팁의 크기를 조절할 수 있습니다."
          code={`
<div className="flex flex-wrap gap-4">
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" color="grayBg">
          작은 툴팁
        </Button>
      </TooltipTrigger>
      <TooltipContent size="sm">
        <p>작은 크기의 툴팁</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>

  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" color="grayBg">
          중간 툴팁
        </Button>
      </TooltipTrigger>
      <TooltipContent size="md">
        <p>중간 크기의 툴팁</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>

  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" color="grayBg">
          큰 툴팁
        </Button>
      </TooltipTrigger>
      <TooltipContent size="lg">
        <p>큰 크기의 툴팁 (긴 텍스트도 잘 표시됩니다)</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</div>
          `}
        >
          <div className="flex flex-wrap gap-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" color="grayBg">
                    작은 툴팁
                  </Button>
                </TooltipTrigger>
                <TooltipContent size="sm">
                  <p>작은 크기의 툴팁</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" color="grayBg">
                    중간 툴팁
                  </Button>
                </TooltipTrigger>
                <TooltipContent size="md">
                  <p>중간 크기의 툴팁</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" color="grayBg">
                    큰 툴팁
                  </Button>
                </TooltipTrigger>
                <TooltipContent size="lg">
                  <p>큰 크기의 툴팁 (긴 텍스트도 잘 표시됩니다)</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </GuideBox>

        <GuideBox
          title="화살표 없이 사용하기"
          description="arrow 속성을 false로 설정하여 화살표가 없는 툴팁을 사용할 수 있습니다."
          code={`
<div className="flex flex-wrap gap-4">
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" color="grayBg">
          화살표 있음
        </Button>
      </TooltipTrigger>
      <TooltipContent arrow={true}>
        <p>화살표가 있는 기본 툴팁</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>

  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" color="grayBg">
          화살표 없음
        </Button>
      </TooltipTrigger>
      <TooltipContent arrow={false}>
        <p>화살표가 없는 툴팁</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</div>
          `}
        >
          <div className="flex flex-wrap gap-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" color="grayBg">
                    화살표 있음
                  </Button>
                </TooltipTrigger>
                <TooltipContent arrow={true}>
                  <p>화살표가 있는 기본 툴팁</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" color="grayBg">
                    화살표 없음
                  </Button>
                </TooltipTrigger>
                <TooltipContent arrow={false}>
                  <p>화살표가 없는 툴팁</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </GuideBox>

        <GuideBox
          title="다양한 트리거 요소"
          description="TooltipTrigger는 다양한 HTML 요소를 감싸서 사용할 수 있습니다."
          code={`
<div className="flex flex-wrap gap-4 items-center">
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="default" color="default">
          버튼
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>버튼 요소에 툴팁</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>

  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="text-blue-600 underline cursor-pointer">
          텍스트 링크
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <p>텍스트 요소에 툴팁</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>

  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer">
          <span className="text-gray-700">A</span>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>아바타 요소에 툴팁</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>

  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="p-3 bg-gray-100 rounded-lg border cursor-pointer hover:bg-gray-200">
          <span className="text-sm">카드 요소</span>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>카드 요소에 툴팁</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</div>
          `}
        >
          <div className="flex flex-wrap gap-4 items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="default" color="default">
                    버튼
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>버튼 요소에 툴팁</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="text-blue-600 underline cursor-pointer">
                    텍스트 링크
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>텍스트 요소에 툴팁</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer">
                    <span className="text-gray-700">A</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>아바타 요소에 툴팁</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="p-3 bg-gray-100 rounded-lg border cursor-pointer hover:bg-gray-200">
                    <span className="text-sm">카드 요소</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>카드 요소에 툴팁</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </GuideBox>

        <GuideBox
          title="TooltipProvider delay 속성"
          description="TooltipProvider의 delay 속성을 사용하여 툴팁이 나타나는 속도를 조절할 수 있습니다."
          code={`
<div className="flex flex-wrap gap-4">
  <TooltipProvider delay="fast">
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" color="gray">
          빠른 툴팁
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>빠르게 나타나는 툴팁</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>

  <TooltipProvider delay="default">
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" color="gray">
          기본 툴팁
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>기본 속도로 나타나는 툴팁</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>

  <TooltipProvider delay="slow">
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" color="gray">
          느린 툴팁
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>느리게 나타나는 툴팁</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</div>
          `}
        >
          <div className="flex flex-wrap gap-4">
            <TooltipProvider delay="fast">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" color="gray">
                    빠른 툴팁
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>빠르게 나타나는 툴팁</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider delay="default">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" color="gray">
                    기본 툴팁
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>기본 속도로 나타나는 툴팁</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider delay="slow">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" color="gray">
                    느린 툴팁
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>느리게 나타나는 툴팁</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </GuideBox>

        <GuideBox
          title="복잡한 내용을 가진 툴팁"
          description="툴팁 내부에 복잡한 HTML 요소를 넣을 수 있습니다."
          code={`
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="default" size="md" color="default">
        정보 버튼
      </Button>
    </TooltipTrigger>
    <TooltipContent size="lg" className="max-w-xs">
      <div className="space-y-2">
        <div className="font-medium">중요한 정보</div>
        <p className="text-sm text-gray-600">
          이 툴팁은 여러 줄의 텍스트와 다양한 요소를 포함할 수 있습니다.
          긴 설명이나 추가 정보를 표시할 때 유용합니다.
        </p>
        <div className="flex gap-2 mt-2">
          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
            태그 1
          </span>
          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
            태그 2
          </span>
        </div>
        <button className="mt-2 px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors">
          액션 버튼
        </button>
      </div>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
          `}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="default" size="md" color="default">
                  정보 버튼
                </Button>
              </TooltipTrigger>
              <TooltipContent size="lg" className="max-w-xs">
                <div className="space-y-2">
                  <div className="font-medium">중요한 정보</div>
                  <p className="text-sm text-gray-600">
                    이 툴팁은 여러 줄의 텍스트와 다양한 요소를 포함할 수
                    있습니다. 긴 설명이나 추가 정보를 표시할 때 유용합니다.
                  </p>
                  <div className="flex gap-2 mt-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                      태그 1
                    </span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                      태그 2
                    </span>
                  </div>
                  <button className="mt-2 px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors">
                    액션 버튼
                  </button>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </GuideBox>

        <GuideBox
          title="전역 TooltipProvider 사용"
          description="여러 툴팁을 함께 사용할 때는 하나의 TooltipProvider로 감싸면 됩니다."
          code={`
<TooltipProvider>
  <div className="flex gap-4">
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" color="grayBg">
          첫 번째 버튼
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>첫 번째 툴팁</p>
      </TooltipContent>
    </Tooltip>

    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" color="grayBg">
          두 번째 버튼
        </Button>
      </TooltipTrigger>
      <TooltipContent variant="success">
        <p>두 번째 툴팁</p>
      </TooltipContent>
    </Tooltip>

    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" color="grayBg">
          세 번째 버튼
        </Button>
      </TooltipTrigger>
      <TooltipContent variant="error">
        <p>세 번째 툴팁</p>
      </TooltipContent>
    </Tooltip>
  </div>
</TooltipProvider>
          `}
        >
          <TooltipProvider>
            <div className="flex gap-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" color="grayBg">
                    첫 번째 버튼
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>첫 번째 툴팁</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" color="grayBg">
                    두 번째 버튼
                  </Button>
                </TooltipTrigger>
                <TooltipContent variant="success">
                  <p>두 번째 툴팁</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" color="grayBg">
                    세 번째 버튼
                  </Button>
                </TooltipTrigger>
                <TooltipContent variant="error">
                  <p>세 번째 툴팁</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </GuideBox>

        <GuideBox
          title="포탈 옵션과 컨테이너 설정"
          description="portal 속성으로 body에 포탈로 뜰지, 트리거 요소 바로 아래에 나올지 선택할 수 있습니다. container 속성으로 특정 DOM 요소 안에 툴팁이 뜨게 할 수도 있습니다."
          code={`
// 포탈 사용하지 않음 (트리거 요소 바로 아래에 렌더링)
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="default" color="default">
        포탈 없이
      </Button>
    </TooltipTrigger>
    <TooltipContent portal={false}>
      <p>이 툴팁은 포탈을 사용하지 않고 트리거 요소 바로 아래에 렌더링됩니다.</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>

// 특정 컨테이너 안에 렌더링 (useRef 사용)
const containerRef = useRef<HTMLDivElement>(null);

return (
  <div 
    ref={containerRef}
    className="relative border-2 border-dashed border-green-300 p-4 rounded-lg"
  >
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="default" color="gray">
            컨테이너 안에
          </Button>
        </TooltipTrigger>
        <TooltipContent
                    container={containerRef as React.RefObject<HTMLElement>}
                  >
          <p>이 툴팁은 특정 컨테이너 요소 안에 렌더링됩니다.</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>
);

// 기본 동작 (body에 포탈)
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="default" color="black">
        기본 포탈
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>이 툴팁은 기본적으로 body에 포탈로 렌더링됩니다.</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
          `}
        >
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-2">포탈 사용하지 않음</h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="default" color="default">
                      포탈 없이
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent portal={false}>
                    <p>
                      이 툴팁은 포탈을 사용하지 않고 트리거 요소 바로 아래에
                      렌더링됩니다.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div
              ref={containerRef}
              className="relative border-2 border-dashed border-green-300 p-4 rounded-lg"
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="default" color="gray">
                      컨테이너 안에
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent
                    container={containerRef as React.RefObject<HTMLElement>}
                  >
                    <p>이 툴팁은 특정 컨테이너 요소 안에 렌더링됩니다.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">
                기본 동작 (body 포탈)
              </h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="default" color="black">
                      기본 포탈
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>이 툴팁은 기본적으로 body에 포탈로 렌더링됩니다.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </GuideBox>
        <GuideBox
          title="고급 상호작용 기능"
          description="clickMode는 hover로 열리지 않고, 포인터는 pointerup으로 토글합니다. 마우스만 트리거 밖으로 빼도 닫히지 않으며, 바깥 클릭·Escape로 닫힙니다. defaultOpen은 clickMode일 때 마운트 시 열린 상태로 시작합니다."
          code={`
// 1. 클릭 모드 (clickMode) — hover로 열리지 않음, 트리거는 pointerup으로 토글
<TooltipProvider>
  <Tooltip clickMode>
    <TooltipTrigger asChild>
      <Button variant="default" size="md" color="default">
        클릭 모드 툴팁
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>트리거를 눌렀다 떼면(pointerup) 열고 닫습니다.</p>
      <p className="text-sm text-gray-600 mt-1">마우스 아웃만으로는 닫히지 않습니다.</p>
      <p className="text-sm text-gray-600 mt-1">콘텐츠 바깥을 누르면 닫힙니다.</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>

// 2. 클릭 모드 + 기본 열림 (defaultOpen)
<TooltipProvider>
  <Tooltip clickMode defaultOpen>
    <TooltipTrigger asChild>
      <Button variant="default" size="md" color="black">
        기본 열린 클릭 모드
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>마운트 시 열린 상태로 시작합니다.</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>

// 3. 닫기 버튼 — clickMode만 쓰면 내부에서 닫힘 처리 (open 상태 생략 가능)
<TooltipProvider>
  <Tooltip clickMode>
    <TooltipTrigger asChild>
      <Button variant="outline" size="md" color="default">
        닫기 버튼 있음
      </Button>
    </TooltipTrigger>
    <TooltipContent showCloseButton onClose={() => console.log("닫힘")}>
      <p>showCloseButton으로 X 버튼이 붙습니다.</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>

// 4. clickMode 없음 — Radix 기본 hover 툴팁 (defaultOpen은 마운트 시 열린 상태)
<TooltipProvider>
  <Tooltip defaultOpen>
    <TooltipTrigger asChild>
      <Button variant="ghost" size="md" color="default">
        hover + defaultOpen
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>hover로 열리고, defaultOpen이면 처음부터 열려 있습니다.</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>

// 5. 일반 hover 툴팁 (defaultOpen 없음)
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="text" size="md" color="default">
        일반 hover
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>트리거에 포인터를 올리면 열립니다.</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
          `}
        >
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-2">
                클릭 모드 (clickMode)
              </h3>
              <div className="flex flex-wrap gap-4">
                <TooltipProvider>
                  <Tooltip clickMode>
                    <TooltipTrigger asChild>
                      <Button variant="default" size="md" color="default">
                        클릭 모드 툴팁
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        hover로는 열리지 않고, 트리거를 눌렀다 떼면(pointerup)
                        열고 닫습니다.
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        마우스만 트리거 밖으로 빼도 닫히지 않습니다.
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        바깥 영역 클릭·Escape로 닫힙니다.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip clickMode defaultOpen>
                    <TooltipTrigger asChild>
                      <Button variant="default" size="md" color="black">
                        기본 열린 클릭 모드
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        clickMode + defaultOpen — 마운트 시 열린 상태로
                        시작합니다.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">
                닫기 버튼 (clickMode + showCloseButton + defaultOpen)
              </h3>
              <TooltipProvider>
                <Tooltip clickMode defaultOpen>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="md" color="default">
                      닫기 버튼 있음
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent showCloseButton>
                    <p>이 툴팁은 닫기 버튼이 있습니다.</p>
                    <p className="text-sm text-gray-600 mt-1">
                      X 버튼·트리거 재클릭·바깥 클릭으로 닫을 수 있습니다.
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      open/onOpenChange 없이 clickMode만으로 동작합니다.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">
                hover + defaultOpen (clickMode 없음)
              </h3>
              <TooltipProvider>
                <Tooltip defaultOpen>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="md" color="default">
                      기본 열림 (hover)
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>clickMode가 아닐 때는 Radix 기본 hover 동작입니다.</p>
                    <p className="text-sm text-gray-600 mt-1">
                      defaultOpen이면 처음부터 열려 있고, 포인터로 열고 닫을 수
                      있습니다.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">
                일반 hover 툴팁 (clickMode 없음)
              </h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="text" size="md" color="default">
                      일반 hover 툴팁
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>clickMode 없이 기본 동작(hover)입니다.</p>
                    <p className="text-sm text-gray-600 mt-1">
                      트리거에 포인터를 올리면 열립니다.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </GuideBox>
      </div>
    </div>
  );
}

export { SampleTooltipPage };
export default SampleTooltipPage;
