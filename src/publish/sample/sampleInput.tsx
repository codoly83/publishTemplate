import {
  Icon,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui";
import { GuideBox } from "./GuideBox";

function SampleInputPage() {
  return (
    <div className="guide-layout">
      <h1 className="guide-title">Input Samples</h1>
      <div className="guide-content">
        <GuideBox
          title="Basic input"
          description="기본 입력창, disabled, password, invalid 상태 예시입니다."
          code={`
<div className="grid max-w-3xl gap-4 md:grid-cols-2">
  <div className="flex flex-col gap-2">
    <div className="text-sm text-font-g">default</div>
    <Input placeholder="이름을 입력하세요" />
  </div>
  <div className="flex flex-col gap-2">
    <div className="text-sm text-font-g">disabled</div>
    <Input
      placeholder="비활성화 상태"
      disabled
      defaultValue={"비활성화 상태값"}
    />
  </div>
  <div className="flex flex-col gap-2">
    <div className="text-sm text-font-g">password + resetEnabled</div>
    <Input type="password" resetEnabled defaultValue="password123!" />
  </div>
  <div className="flex flex-col gap-2">
    <div className="text-sm text-font-g">password + resetEnabled (empty)</div>
    <Input
      type="password"
      resetEnabled
      placeholder="비밀번호를 입력하세요"
    />
  </div>
  <div className="flex flex-col gap-2">
    <div className="text-sm text-font-g">invalid</div>
    <Input
      aria-invalid="true"
      defaultValue="wrong-email-format"
      placeholder="이메일을 입력하세요"
    />
  </div>
</div>
          `}
        >
          <div className="grid max-w-3xl gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <div className="text-sm text-font-g">default</div>
              <Input placeholder="이름을 입력하세요" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-sm text-font-g">disabled</div>
              <Input
                placeholder="비활성화 상태"
                disabled
                defaultValue={"비활성화 상태값"}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-sm text-font-g">password + resetEnabled</div>
              <Input type="password" resetEnabled defaultValue="password123!" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-sm text-font-g">password + resetEnabled (empty)</div>
              <Input
                type="password"
                resetEnabled
                placeholder="비밀번호를 입력하세요"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-sm text-font-g">invalid</div>
              <Input
                aria-invalid="true"
                defaultValue="wrong-email-format"
                placeholder="이메일을 입력하세요"
              />
            </div>
          </div>
        </GuideBox>

        <GuideBox
          title="Input group · inline addons"
          description="prefix/suffix 텍스트나 아이콘을 입력창 양옆에 붙이는 패턴입니다."
          code={`
<div className="grid max-w-4xl gap-4 md:grid-cols-2">
  <div className="flex flex-col gap-2">
    <div className="text-sm text-font-g">prefix text</div>
    <InputGroup>
      <InputGroupAddon align="inline-start">
        <InputGroupText>https://</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="example.com" />
    </InputGroup>
  </div>
  <div className="flex flex-col gap-2">
    <div className="text-sm text-font-g">suffix text</div>
    <InputGroup>
      <InputGroupInput placeholder="금액" />
      <InputGroupAddon align="inline-end">
        <InputGroupText>KRW</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  </div>
  <div className="flex flex-col gap-2">
    <div className="text-sm text-font-g">icon + text</div>
    <InputGroup>
      <InputGroupAddon align="inline-start">
        <InputGroupText>
          <Icon name="user-settings" />
          담당자
        </InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="홍길동" />
    </InputGroup>
  </div>
</div>
          `}
        >
          <div className="grid max-w-4xl gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <div className="text-sm text-font-g">prefix text</div>
              <InputGroup>
                <InputGroupAddon align="inline-start">
                  <InputGroupText>https://</InputGroupText>
                </InputGroupAddon>
                <InputGroupInput placeholder="example.com" />
              </InputGroup>
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-sm text-font-g">suffix text</div>
              <InputGroup>
                <InputGroupInput placeholder="금액" />
                <InputGroupAddon align="inline-end">
                  <InputGroupText>KRW</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-sm text-font-g">icon + text</div>
              <InputGroup>
                <InputGroupAddon align="inline-start">
                  <InputGroupText>
                    <Icon name="user-settings" />
                    담당자
                  </InputGroupText>
                </InputGroupAddon>
                <InputGroupInput placeholder="홍길동" />
              </InputGroup>
            </div>
          </div>
        </GuideBox>

        <GuideBox
          title="Input group · block addons"
          description="가이드 텍스트를 위아래 블록으로 붙이는 레이아웃 예시입니다."
          code={`
<div className="grid max-w-4xl gap-4 md:grid-cols-2">
  <div className="flex flex-col gap-2">
    <div className="text-sm text-font-g">block-start</div>
    <InputGroup>
      <InputGroupAddon align="block-start">
        <InputGroupText>
          파일 설명
          <kbd>required</kbd>
        </InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="제목을 입력하세요" />
    </InputGroup>
  </div>
  <div className="flex flex-col gap-2">
    <div className="text-sm text-font-g">block-end</div>
    <InputGroup>
      <InputGroupInput placeholder="메모를 입력하세요" />
      <InputGroupAddon align="block-end">
        <InputGroupText>
          최대 100자까지 입력할 수 있습니다.
        </InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  </div>
</div>
          `}
        >
          <div className="grid max-w-4xl gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <div className="text-sm text-font-g">block-start</div>
              <InputGroup>
                <InputGroupAddon align="block-start">
                  <InputGroupText>
                    파일 설명
                    <kbd>required</kbd>
                  </InputGroupText>
                </InputGroupAddon>
                <InputGroupInput placeholder="제목을 입력하세요" />
              </InputGroup>
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-sm text-font-g">block-end</div>
              <InputGroup>
                <InputGroupInput placeholder="메모를 입력하세요" />
                <InputGroupAddon align="block-end">
                  <InputGroupText>
                    최대 100자까지 입력할 수 있습니다.
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </div>
          </div>
        </GuideBox>

        <GuideBox
          title="search"
          description="우측 검색 버튼을 인라인으로 붙인 검색형 InputGroup 예시입니다."
          code={`
<div className="grid max-w-4xl gap-4 md:grid-cols-2">
  <div className="flex flex-col gap-2">
    <InputGroup>
      <InputGroupInput placeholder="검색어를 입력하세요" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton variant="ghost">
          <Icon name="search" size={16} />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  </div>
  <div className="flex flex-col gap-2">
    <InputGroup>
      <InputGroupInput placeholder="검색어를 입력하세요" disabled />
      <InputGroupAddon align="inline-end">
        <InputGroupButton variant="ghost">
          <Icon name="search" size={16} />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  </div>
  <div className="flex flex-col gap-2">
    <InputGroup>
      <InputGroupInput
        placeholder="검색어를 입력하세요"
        aria-invalid="true"
      />
      <InputGroupAddon align="inline-end">
        <InputGroupButton variant="ghost">
          <Icon name="search" size={16} />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  </div>
</div>
          `}
        >
          <div className="grid max-w-4xl gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <InputGroup>
                <InputGroupInput placeholder="검색어를 입력하세요" />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton variant="ghost">
                    <Icon name="search" size={16} />
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </div>
            <div className="flex flex-col gap-2">
              <InputGroup>
                <InputGroupInput placeholder="검색어를 입력하세요" disabled />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton variant="ghost">
                    <Icon name="search" size={16} />
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </div>

            <div className="flex flex-col gap-2">
              <InputGroup>
                <InputGroupInput
                  placeholder="검색어를 입력하세요"
                  aria-invalid="true"
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton variant="ghost">
                    <Icon name="search" size={16} />
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </div>
          </div>
        </GuideBox>
        <GuideBox
          title="search-btnType"
          description="검색 버튼을 outline 버튼 타입으로 분리한 변형 예시입니다."
          code={`
<div className="grid max-w-4xl gap-4 md:grid-cols-2">
  <div className="flex flex-col gap-2">
    <InputGroup type="btnType">
      <InputGroupInput placeholder="검색어를 입력하세요" />
      <InputGroupAddon align="inline-end" className="p-0!">
        <InputGroupButton
          variant="outline"
          size="sm"
          shape="square"
          color="gray"
        >
          <Icon name="search" size={16} />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  </div>
  <div className="flex flex-col gap-2">
    <InputGroup type="btnType">
      <InputGroupInput placeholder="검색어를 입력하세요" disabled />
      <InputGroupAddon align="inline-end" className="p-0!">
        <InputGroupButton
          variant="outline"
          size="sm"
          shape="square"
          color="gray"
          disabled
        >
          <Icon name="search" size={16} />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  </div>
  <div className="flex flex-col gap-2">
    <InputGroup type="btnType">
      <InputGroupInput
        placeholder="검색어를 입력하세요"
        aria-invalid="true"
        defaultValue="Filled Value"
      />
      <InputGroupAddon align="inline-end">
        <Icon name="error-warning" size={16} />
      </InputGroupAddon>
    </InputGroup>
  </div>
</div>
          `}
        >
          <div className="grid max-w-4xl gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <InputGroup type="btnType">
                <InputGroupInput placeholder="검색어를 입력하세요" />
                <InputGroupAddon align="inline-end" className="p-0!">
                  <InputGroupButton
                    variant="outline"
                    size="sm"
                    shape="square"
                    color="gray"
                  >
                    <Icon name="search" size={16} />
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </div>
            <div className="flex flex-col gap-2">
              <InputGroup type="btnType">
                <InputGroupInput placeholder="검색어를 입력하세요" disabled />
                <InputGroupAddon align="inline-end" className="p-0!">
                  <InputGroupButton
                    variant="outline"
                    size="sm"
                    shape="square"
                    color="gray"
                    disabled
                  >
                    <Icon name="search" size={16} />
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </div>
            <div className="flex flex-col gap-2">
              <InputGroup type="btnType">
                <InputGroupInput
                  placeholder="검색어를 입력하세요"
                  aria-invalid="true"
                  defaultValue="Filled Value"
                />
                <InputGroupAddon align="inline-end">
                  <Icon name="error-warning" size={16} />
                </InputGroupAddon>
              </InputGroup>
            </div>
          </div>
        </GuideBox>

        <GuideBox
          title="resetEnabled"
          description="값이 있을 때만 보이는 리셋 버튼 예시입니다. (suffix가 있으면 suffix 바로 앞)"
          code={`
<div className="grid max-w-4xl gap-4 md:grid-cols-2">
  <div className="flex flex-col gap-2">
    <div className="text-sm text-font-g">reset shown when value exists</div>
    <Input resetEnabled defaultValue="입력해보세요" placeholder="리셋을 눌러 초기화" />
  </div>
  <div className="flex flex-col gap-2">
    <div className="text-sm text-font-g">reset hidden when empty</div>
    <Input resetEnabled placeholder="값이 없으면 리셋이 숨겨집니다" />
  </div>
  <div className="flex flex-col gap-2">
    <div className="text-sm text-font-g">reset + suffix</div>
    <InputGroup>
      <InputGroupInput resetEnabled defaultValue="1000" />
      <InputGroupAddon align="inline-end">
        <InputGroupText>KRW</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  </div>
  <div className="flex flex-col gap-2">
    <div className="text-sm text-font-g">suffix + reset hidden</div>
    <InputGroup>
      <InputGroupInput resetEnabled placeholder="금액" />
      <InputGroupAddon align="inline-end">
        <InputGroupText>KRW</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  </div>
</div>
          `}
        >
          <div className="grid max-w-4xl gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <div className="text-sm text-font-g">reset shown when value exists</div>
              <Input
                resetEnabled
                defaultValue="입력해보세요"
                placeholder="리셋을 눌러 초기화"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-sm text-font-g">reset hidden when empty</div>
              <Input resetEnabled placeholder="값이 없으면 리셋이 숨겨집니다" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-sm text-font-g">reset + suffix</div>
              <InputGroup>
                <InputGroupInput resetEnabled defaultValue="1000" />
                <InputGroupAddon align="inline-end">
                  <InputGroupText>KRW</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-sm text-font-g">suffix + reset hidden</div>
              <InputGroup>
                <InputGroupInput resetEnabled placeholder="금액" />
                <InputGroupAddon align="inline-end">
                  <InputGroupText>KRW</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </div>
          </div>
        </GuideBox>
      </div>
    </div>
  );
}

export { SampleInputPage };
export default SampleInputPage;
