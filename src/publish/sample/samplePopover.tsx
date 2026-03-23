import * as React from "react";
import {
  Button,
  POPOVER_PLACEMENTS,
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui";
import { GuideBox } from "./GuideBox";

function SamplePopoverPage() {
  return (
    <div className="guide-layout">
      <h1 className="guide-title">Popover Samples</h1>
      <div className="guide-content">
        <GuideBox
          title="기본 Popover"
          description="트리거 클릭 시 열리는 플로팅 패널입니다. `container`를 생략하면 Portal을 쓰지 않고, `PopoverTrigger` 바로 다음 형제로 DOM에 붙습니다."
          code={`
import {
  Button,
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui";

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline" type="button">
      열기
    </Button>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverHeader>
      <PopoverTitle>알림</PopoverTitle>
      <PopoverDescription>
        Popover 본문입니다. 바깥을 클릭하면 닫힙니다.
      </PopoverDescription>
    </PopoverHeader>
  </PopoverContent>
</Popover>
          `}
        >
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" type="button">
                열기
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverHeader>
                <PopoverTitle>알림</PopoverTitle>
                <PopoverDescription>
                  Popover 본문입니다. 바깥을 클릭하면 닫힙니다.
                </PopoverDescription>
              </PopoverHeader>
            </PopoverContent>
          </Popover>
        </GuideBox>

        <GuideBox
          title="placement (트리거 기준 뜨는 위치)"
          description='PopoverContent에 placement="bottom-start"처럼 지정하면 트리거 기준 방향·정렬이 한 번에 설정됩니다. side·align을 직접 넘길 수도 있으며, placement가 있으면 우선합니다. (기본은 트리거 다음 DOM; 다른 노드로 Portal 하려면 아래 container 섹션)'
          code={`
import {
  Button,
  POPOVER_PLACEMENTS,
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui";

<div className="flex max-w-4xl flex-wrap gap-2">
  {POPOVER_PLACEMENTS.map((placement) => (
    <Popover key={placement}>
      <PopoverTrigger asChild>
        <Button size="sm" variant="outline" type="button">
          {placement}
        </Button>
      </PopoverTrigger>
      <PopoverContent placement={placement} sideOffset={6}>
        <PopoverHeader>
          <PopoverTitle className="text-sm">{placement}</PopoverTitle>
          <PopoverDescription>
            placement prop으로 트리거 기준 위치를 지정했습니다.
          </PopoverDescription>
        </PopoverHeader>
        <PopoverClose asChild>
          <Button className="mt-3" size="sm" type="button">
            닫기
          </Button>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  ))}
</div>

// 또는 side / align 직접
<PopoverContent side="left" align="start" sideOffset={6}>
  ...
</PopoverContent>
          `}
        >
          <div className="flex max-w-4xl flex-wrap gap-2">
            {POPOVER_PLACEMENTS.map((placement) => (
              <Popover key={placement}>
                <PopoverTrigger asChild>
                  <Button size="sm" variant="outline" type="button">
                    {placement}
                  </Button>
                </PopoverTrigger>
                <PopoverContent placement={placement} sideOffset={6}>
                  <PopoverHeader>
                    <PopoverTitle className="text-sm">{placement}</PopoverTitle>
                    <PopoverDescription>
                      placement prop으로 트리거 기준 위치를 지정했습니다.
                    </PopoverDescription>
                  </PopoverHeader>
                  <PopoverClose asChild>
                    <Button className="mt-3" size="sm" type="button">
                      닫기
                    </Button>
                  </PopoverClose>
                </PopoverContent>
              </Popover>
            ))}
          </div>
        </GuideBox>

        <GuideBox
          title="Portal container (선택)"
          description="기본은 Portal 없이 트리거 다음에 렌더됩니다. `container`에 노드를 넘기면 그때만 해당 요소 안으로 Portal 합니다. (예: 스크롤 박스·모달 루트·document.body)"
          code={`
import * as React from "react";
import {
  Button,
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui";

<div
  className="relative min-h-48 overflow-auto rounded-xl border border-line02 bg-container p-4"
>
  <p className="mb-3 text-sm text-font-g">
    아래 버튼의 Popover는 이 박스 DOM 안에만 Portal 됩니다.
  </p>
  <Popover>
    <PopoverTrigger asChild>
      <Button variant="outline" size="sm" type="button">
        이 영역 안에 열기
      </Button>
    </PopoverTrigger>
    <PopoverContent container={document.body}>
      <PopoverHeader>
        <PopoverTitle>Portal 대상 영역 내부</PopoverTitle>
        <PopoverDescription>
          container prop으로 이 회색 박스에 마운트했습니다.
        </PopoverDescription>
      </PopoverHeader>
      <PopoverClose asChild>
        <Button className="mt-3" size="sm" type="button">
          닫기
        </Button>
      </PopoverClose>
    </PopoverContent>
  </Popover>
</div>
          `}
        >
          <div className="flex max-w-4xl flex-col gap-4">
            <div className="relative min-h-48 overflow-auto rounded-xl border border-line02 bg-container p-4">
              <p className="mb-3 text-sm text-font-g">
                아래 버튼의 Popover는 이 박스 DOM 안에만 Portal 됩니다.
              </p>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" type="button">
                    이 영역 안에 열기
                  </Button>
                </PopoverTrigger>
                <PopoverContent container={document.body}>
                  <PopoverHeader>
                    <PopoverTitle>Portal 대상 영역 내부</PopoverTitle>
                    <PopoverDescription>
                      container prop으로 이 회색 박스에 마운트했습니다.
                    </PopoverDescription>
                  </PopoverHeader>
                  <PopoverClose asChild>
                    <Button className="mt-3" size="sm" type="button">
                      닫기
                    </Button>
                  </PopoverClose>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </GuideBox>

        <GuideBox
          title="크기 (size)"
          description="PopoverContent의 size는 sm / md / lg 입니다."
          code={`
import {
  Button,
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui";

<div className="flex flex-wrap gap-4">
  {(["sm", "md", "lg"] as const).map((size) => (
    <Popover key={size}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" type="button">
          size: {size}
        </Button>
      </PopoverTrigger>
      <PopoverContent size={size}>
        <PopoverHeader>
          <PopoverTitle>크기 {size}</PopoverTitle>
          <PopoverDescription>
            width·padding이 사이즈별로 달라집니다.
          </PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  ))}
</div>
          `}
        >
          <div className="flex flex-wrap gap-4">
            {(["sm", "md", "lg"] as const).map((size) => (
              <Popover key={size}>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" type="button">
                    size: {size}
                  </Button>
                </PopoverTrigger>
                <PopoverContent size={size}>
                  <PopoverHeader>
                    <PopoverTitle>크기 {size}</PopoverTitle>
                    <PopoverDescription>
                      width·padding이 사이즈별로 달라집니다.
                    </PopoverDescription>
                  </PopoverHeader>
                </PopoverContent>
              </Popover>
            ))}
          </div>
        </GuideBox>
      </div>
    </div>
  );
}

export { SamplePopoverPage };
export default SamplePopoverPage;
