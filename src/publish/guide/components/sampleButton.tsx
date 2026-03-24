import { Button, Icon } from "@/components/ui";
import { GuideBox } from "./GuideBox";

function SampleButtonPage() {
  return (
    <div className="guide-layout">
      <h1 className="guide-title">Button Samples</h1>
      <div className="guide-content">
        <GuideBox
          title="Variants : defalut"
          description="기본 버튼의 size와 square shape 조합을 확인합니다."
          code={`
<div className="gap-12 flex">
  <div>
    <div className="mb-1.5 text-font-g">Sizes: default</div>
    <div className="gap-2 flex">
      <Button>Button</Button>
      <Button disabled>Button</Button>
    </div>
  </div>
  <div>
    <div className="mb-1.5 text-font-g">Sizes: md</div>
    <div className="gap-2 flex">
      <Button size="md">Button</Button>
      <Button size="md" disabled>Button</Button>
    </div>
  </div>
  <div>
    <div className="mb-1.5 text-font-g">Sizes: sm</div>
    <div className="gap-2 flex">
      <Button size="sm">Button</Button>
      <Button size="sm" disabled>Button</Button>
    </div>
  </div>
</div>
<div className="gap-12 flex">
  <div>
    <div className="mb-1.5 text-font-g">Sizes: default + shape: square</div>
    <div className="gap-2 flex">
      <Button shape="square">Button</Button>
      <Button shape="square" disabled>Button</Button>
    </div>
  </div>
  <div>
    <div className="mb-1.5 text-font-g">Sizes: md + shape: square</div>
    <div className="gap-2 flex">
      <Button size="md" shape="square">Button</Button>
      <Button size="md" shape="square" disabled>Button</Button>
    </div>
  </div>
  <div>
    <div className="mb-1.5 text-font-g">Sizes: sm + shape: square</div>
    <div className="gap-2 flex">
      <Button size="sm" shape="square">Button</Button>
      <Button size="sm" shape="square" disabled>Button</Button>
    </div>
  </div>
</div>
        `}
        >
          <div className="gap-12 flex">
            <div>
              <div className="mb-1.5 text-font-g">Sizes: default</div>
              <div className="gap-2 flex">
                <Button>Button</Button>
                <Button disabled>Button</Button>
              </div>
            </div>
            <div>
              <div className="mb-1.5 text-font-g">Sizes: md</div>
              <div className="gap-2 flex">
                <Button size="md">Button</Button>
                <Button size="md" disabled>
                  Button
                </Button>
              </div>
            </div>
            <div>
              <div className="mb-1.5 text-font-g">Sizes: sm</div>
              <div className="gap-2 flex">
                <Button size="sm">Button</Button>
                <Button size="sm" disabled>
                  Button
                </Button>
              </div>
            </div>
          </div>
          <div className="gap-12 flex">
            <div>
              <div className="mb-1.5 text-font-g">
                Sizes: default + shape: square
              </div>
              <div className="gap-2 flex">
                <Button shape="square">Button</Button>
                <Button shape="square" disabled>
                  Button
                </Button>
              </div>
            </div>
            <div>
              <div className="mb-1.5 text-font-g">
                Sizes: md + shape: square
              </div>
              <div className="gap-2 flex">
                <Button size="md" shape="square">
                  Button
                </Button>
                <Button size="md" shape="square" disabled>
                  Button
                </Button>
              </div>
            </div>
            <div>
              <div className="mb-1.5 text-font-g">
                Sizes: sm + shape: square
              </div>
              <div className="gap-2 flex">
                <Button size="sm" shape="square">
                  Button
                </Button>
                <Button size="sm" shape="square" disabled>
                  Button
                </Button>
              </div>
            </div>
          </div>
        </GuideBox>

        <GuideBox
          title="Variants : defalut + color:black"
          description="기본 variant에 검정 색상 옵션을 적용한 케이스입니다."
          code={`
<div className="gap-12 flex">
  <div>
    <div className="mb-1.5 text-font-g">Sizes: default</div>
    <div className="gap-2 flex">
      <Button color="black">Button</Button>
      <Button color="black" disabled>Button</Button>
    </div>
  </div>
  <div>
    <div className="mb-1.5 text-font-g">Sizes: md</div>
    <div className="gap-2 flex">
      <Button color="black" size="md">Button</Button>
      <Button color="black" size="md" disabled>Button</Button>
    </div>
  </div>
  <div>
    <div className="mb-1.5 text-font-g">Sizes: sm</div>
    <div className="gap-2 flex">
      <Button color="black" size="sm">Button</Button>
      <Button color="black" size="sm" disabled>Button</Button>
    </div>
  </div>
</div>
<div className="gap-12 flex">
  <div>
    <div className="mb-1.5 text-font-g">Sizes: default + shape: square</div>
    <div className="gap-2 flex">
      <Button color="black" shape="square">
        <Icon name="arrow-left-right" />
        <span>Button</span>
      </Button>
      <Button color="black" shape="square" disabled>Button</Button>
    </div>
  </div>
  <div>
    <div className="mb-1.5 text-font-g">Sizes: md + shape: square</div>
    <div className="gap-2 flex">
      <Button color="black" size="md" shape="square">
        <Icon name="arrow-left-right" />
        <span>Button</span>
      </Button>
      <Button color="black" size="md" shape="square" disabled>Button</Button>
    </div>
  </div>
  <div>
    <div className="mb-1.5 text-font-g">Sizes: sm + shape: square</div>
    <div className="gap-2 flex">
      <Button color="black" size="sm" shape="square">
        <Icon name="arrow-left-right" />
        <span>Button</span>
      </Button>
      <Button color="black" size="sm" shape="square" disabled>Button</Button>
    </div>
  </div>
</div>
        `}
        >
          <div className="gap-12 flex">
            <div>
              <div className="mb-1.5 text-font-g">Sizes: default</div>
              <div className="gap-2 flex">
                <Button color="black">Button</Button>
                <Button color="black" disabled>
                  Button
                </Button>
              </div>
            </div>
            <div>
              <div className="mb-1.5 text-font-g">Sizes: md</div>
              <div className="gap-2 flex">
                <Button color="black" size="md">
                  Button
                </Button>
                <Button color="black" size="md" disabled>
                  Button
                </Button>
              </div>
            </div>
            <div>
              <div className="mb-1.5 text-font-g">Sizes: sm</div>
              <div className="gap-2 flex">
                <Button color="black" size="sm">
                  Button
                </Button>
                <Button color="black" size="sm" disabled>
                  Button
                </Button>
              </div>
            </div>
          </div>
          <div className="gap-12 flex">
            <div>
              <div className="mb-1.5 text-font-g">
                Sizes: default + shape: square
              </div>
              <div className="gap-2 flex">
                <Button color="black" shape="square">
                  Button
                </Button>
                <Button color="black" shape="square" disabled>
                  Button
                </Button>
              </div>
            </div>
            <div>
              <div className="mb-1.5 text-font-g">
                Sizes: md + shape: square
              </div>
              <div className="gap-2 flex">
                <Button color="black" size="md" shape="square">
                  Button
                </Button>
                <Button color="black" size="md" shape="square" disabled>
                  Button
                </Button>
              </div>
            </div>
            <div>
              <div className="mb-1.5 text-font-g">
                Sizes: sm + shape: square
              </div>
              <div className="gap-2 flex">
                <Button color="black" size="sm" shape="square">
                  Button
                </Button>
                <Button color="black" size="sm" shape="square" disabled>
                  Button
                </Button>
              </div>
            </div>
          </div>
        </GuideBox>

        <GuideBox
          title="Variants : outline"
          description="테두리형 outline 버튼의 size와 shape 조합입니다."
          code={`
<div className="gap-12 flex">
  <div>
    <div className="mb-1.5 text-font-g">Sizes: default</div>
    <div className="gap-2 flex">
      <Button variant="outline">Button</Button>
      <Button variant="outline" disabled>Button</Button>
    </div>
  </div>
  <div>
    <div className="mb-1.5 text-font-g">Sizes: md</div>
    <div className="gap-2 flex">
      <Button variant="outline" size="md">Button</Button>
      <Button variant="outline" size="md" disabled>Button</Button>
    </div>
  </div>
  <div>
    <div className="mb-1.5 text-font-g">Sizes: sm</div>
    <div className="gap-2 flex">
      <Button variant="outline" size="sm">Button</Button>
      <Button variant="outline" size="sm" disabled>Button</Button>
    </div>
  </div>
</div>
<div className="gap-12 flex">
  <div>
    <div className="mb-1.5 text-font-g">Sizes: default + shape: square</div>
    <div className="gap-2 flex">
      <Button variant="outline" shape="square">Button</Button>
      <Button variant="outline" shape="square" disabled>Button</Button>
    </div>
  </div>
  <div>
    <div className="mb-1.5 text-font-g">Sizes: md + shape: square</div>
    <div className="gap-2 flex">
      <Button variant="outline" size="md" shape="square">Button</Button>
      <Button variant="outline" size="md" shape="square" disabled>Button</Button>
    </div>
  </div>
  <div>
    <div className="mb-1.5 text-font-g">Sizes: sm + shape: square</div>
    <div className="gap-2 flex">
      <Button variant="outline" size="sm" shape="square">Button</Button>
      <Button variant="outline" size="sm" shape="square" disabled>Button</Button>
    </div>
  </div>
</div>
        `}
        >
          <div className="gap-12 flex">
            <div>
              <div className="mb-1.5 text-font-g">Sizes: default</div>
              <div className="gap-2 flex">
                <Button variant="outline">Button</Button>
                <Button variant="outline" disabled>
                  Button
                </Button>
              </div>
            </div>
            <div>
              <div className="mb-1.5 text-font-g">Sizes: md</div>
              <div className="gap-2 flex">
                <Button variant="outline" size="md">
                  Button
                </Button>
                <Button variant="outline" size="md" disabled>
                  Button
                </Button>
              </div>
            </div>
            <div>
              <div className="mb-1.5 text-font-g">Sizes: sm</div>
              <div className="gap-2 flex">
                <Button variant="outline" size="sm">
                  Button
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Button
                </Button>
              </div>
            </div>
          </div>
          <div className="gap-12 flex">
            <div>
              <div className="mb-1.5 text-font-g">
                Sizes: default + shape: square
              </div>
              <div className="gap-2 flex">
                <Button variant="outline" shape="square">
                  Button
                </Button>
                <Button variant="outline" shape="square" disabled>
                  Button
                </Button>
              </div>
            </div>
            <div>
              <div className="mb-1.5 text-font-g">
                Sizes: md + shape: square
              </div>
              <div className="gap-2 flex">
                <Button variant="outline" size="md" shape="square">
                  Button
                </Button>
                <Button variant="outline" size="md" shape="square" disabled>
                  Button
                </Button>
              </div>
            </div>
            <div>
              <div className="mb-1.5 text-font-g">
                Sizes: sm + shape: square
              </div>
              <div className="gap-2 flex">
                <Button variant="outline" size="sm" shape="square">
                  Button
                </Button>
                <Button variant="outline" size="sm" shape="square" disabled>
                  Button
                </Button>
              </div>
            </div>
          </div>
        </GuideBox>

        <GuideBox
          title="Variants : outline + color:gray"
          description="outline variant에 gray, grayBg 컬러를 더한 확장형 케이스입니다."
          code={`
<div className="gap-12 flex">
  <div>
    <div className="mb-1.5 text-font-g">Sizes: default</div>
    <div className="gap-2 flex">
      <Button variant="outline" color="gray">
        <Icon name="user-settings" />
        <span>Button</span>
      </Button>
      <Button variant="outline" color="gray" disabled>
        <Icon name="user-settings" />
        <span>Button</span>
      </Button>
    </div>
  </div>
  <div>
    <div className="mb-1.5 text-font-g">Sizes: md</div>
    <div className="gap-2 flex">
      <Button variant="outline" color="gray" size="md">
        <Icon name="user-settings" />
        <span>Button</span>
      </Button>
      <Button variant="outline" color="gray" size="md" disabled>
        <Icon name="user-settings" />
        <span>Button</span>
      </Button>
    </div>
  </div>
  <div>
    <div className="mb-1.5 text-font-g">Sizes: sm</div>
    <div className="gap-2 flex">
      <Button variant="outline" color="gray" size="sm">
        <Icon name="user-settings" />
        <span>Button</span>
      </Button>
      <Button variant="outline" color="gray" size="sm" disabled>
        <Icon name="user-settings" />
        <span>Button</span>
      </Button>
    </div>
  </div>
</div>
<div className="gap-12 flex">
  <div>
    <div className="mb-1.5 text-font-g">Sizes: default + shape: square</div>
    <div className="gap-2 flex">
      <Button variant="outline" color="gray" shape="square">
        <Icon name="arrow-left-right" />
        <span>Button</span>
      </Button>
      <Button variant="outline" color="gray" shape="square" disabled>
        <Icon name="arrow-left-right" />
        <span>Button</span>
      </Button>
    </div>
  </div>
  <div>
    <div className="mb-1.5 text-font-g">Sizes: md + shape: square</div>
    <div className="gap-2 flex">
      <Button variant="outline" color="gray" size="md" shape="square">
        <Icon name="arrow-left-right" />
        <span>Button</span>
      </Button>
      <Button variant="outline" color="gray" size="md" shape="square" disabled>
        <Icon name="arrow-left-right" />
        <span>Button</span>
      </Button>
    </div>
  </div>
  <div>
    <div className="mb-1.5 text-font-g">Sizes: sm + shape: square</div>
    <div className="gap-2 flex">
      <Button variant="outline" color="gray" size="sm" shape="square">
        <Icon name="arrow-left-right" />
        <span>Button</span>
      </Button>
      <Button variant="outline" color="gray" size="sm" shape="square" disabled>
        <Icon name="arrow-left-right" />
        <span>Button</span>
      </Button>
    </div>
  </div>
</div>
<div className="gap-12 flex">
  <div>
    <div className="mb-1.5 text-font-g">Sizes: default + shape: square + color:grayBg</div>
    <div className="gap-2 flex">
      <Button variant="outline" color="grayBg" shape="square">
        <Icon name="arrow-left-right" />
        <span>Button</span>
      </Button>
      <Button variant="outline" color="grayBg" shape="square" disabled>
        <Icon name="arrow-left-right" />
        <span>Button</span>
      </Button>
    </div>
  </div>
  <div>
    <div className="mb-1.5 text-font-g">Sizes: md + shape: square + color:grayBg</div>
    <div className="gap-2 flex">
      <Button variant="outline" color="grayBg" size="md" shape="square">
        <Icon name="arrow-left-right" />
        <span>Button</span>
      </Button>
      <Button variant="outline" color="grayBg" size="md" shape="square" disabled>
        <Icon name="arrow-left-right" />
        <span>Button</span>
      </Button>
    </div>
  </div>
  <div>
    <div className="mb-1.5 text-font-g">Sizes: sm + shape: square + color:grayBg</div>
    <div className="gap-2 flex">
      <Button variant="outline" color="grayBg" size="sm" shape="square">
        <Icon name="arrow-left-right" />
        <span>Button</span>
      </Button>
      <Button variant="outline" color="grayBg" size="sm" shape="square" disabled>
        <Icon name="arrow-left-right" />
        <span>Button</span>
      </Button>
    </div>
  </div>
</div>
        `}
        >
          <div className="gap-12 flex">
            <div>
              <div className="mb-1.5 text-font-g">Sizes: default</div>
              <div className="gap-2 flex">
                <Button variant="outline" color="gray">
                  <Icon name="user-settings" />
                  <span>Button</span>
                </Button>
                <Button variant="outline" color="gray" disabled>
                  <Icon name="user-settings" />
                  <span>Button</span>
                </Button>
              </div>
            </div>
            <div>
              <div className="mb-1.5 text-font-g">Sizes: md</div>
              <div className="gap-2 flex">
                <Button variant="outline" color="gray" size="md">
                  <Icon name="user-settings" />
                  <span>Button</span>
                </Button>
                <Button variant="outline" color="gray" size="md" disabled>
                  <Icon name="user-settings" />
                  <span>Button</span>
                </Button>
              </div>
            </div>
            <div>
              <div className="mb-1.5 text-font-g">Sizes: sm</div>
              <div className="gap-2 flex">
                <Button variant="outline" color="gray" size="sm">
                  <Icon name="user-settings" />
                  <span>Button</span>
                </Button>
                <Button variant="outline" color="gray" size="sm" disabled>
                  <Icon name="user-settings" />
                  <span>Button</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="gap-12 flex">
            <div>
              <div className="mb-1.5 text-font-g">
                Sizes: default + shape: square
              </div>
              <div className="gap-2 flex">
                <Button variant="outline" color="gray" shape="square">
                  <Icon name="arrow-left-right" />
                  <span>Button</span>
                </Button>
                <Button variant="outline" color="gray" shape="square" disabled>
                  <Icon name="arrow-left-right" />
                  <span>Button</span>
                </Button>
              </div>
            </div>
            <div>
              <div className="mb-1.5 text-font-g">
                Sizes: md + shape: square
              </div>
              <div className="gap-2 flex">
                <Button variant="outline" color="gray" size="md" shape="square">
                  <Icon name="arrow-left-right" />
                  <span>Button</span>
                </Button>
                <Button
                  variant="outline"
                  color="gray"
                  size="md"
                  shape="square"
                  disabled
                >
                  <Icon name="arrow-left-right" />
                  <span>Button</span>
                </Button>
              </div>
            </div>
            <div>
              <div className="mb-1.5 text-font-g">
                Sizes: sm + shape: square
              </div>
              <div className="gap-2 flex">
                <Button variant="outline" color="gray" size="sm" shape="square">
                  <Icon name="arrow-left-right" />
                  <span>Button</span>
                </Button>
                <Button
                  variant="outline"
                  color="gray"
                  size="sm"
                  shape="square"
                  disabled
                >
                  <Icon name="arrow-left-right" />
                  <span>Button</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="gap-12 flex">
            <div>
              <div className="mb-1.5 text-font-g">
                Sizes: default + shape: square + color:grayBg
              </div>
              <div className="gap-2 flex">
                <Button variant="outline" color="grayBg" shape="square">
                  <Icon name="arrow-left-right" />
                  <span>Button</span>
                </Button>
                <Button
                  variant="outline"
                  color="grayBg"
                  shape="square"
                  disabled
                >
                  <Icon name="arrow-left-right" />
                  <span>Button</span>
                </Button>
              </div>
            </div>
            <div>
              <div className="mb-1.5 text-font-g">
                Sizes: md + shape: square + color:grayBg
              </div>
              <div className="gap-2 flex">
                <Button
                  variant="outline"
                  color="grayBg"
                  size="md"
                  shape="square"
                >
                  <Icon name="arrow-left-right" />
                  <span>Button</span>
                </Button>
                <Button
                  variant="outline"
                  color="grayBg"
                  size="md"
                  shape="square"
                  disabled
                >
                  <Icon name="arrow-left-right" />
                  <span>Button</span>
                </Button>
              </div>
            </div>
            <div>
              <div className="mb-1.5 text-font-g">
                Sizes: sm + shape: square + color:grayBg
              </div>
              <div className="gap-2 flex">
                <Button
                  variant="outline"
                  color="grayBg"
                  size="sm"
                  shape="square"
                >
                  <Icon name="arrow-left-right" />
                  <span>Button</span>
                </Button>
                <Button
                  variant="outline"
                  color="grayBg"
                  size="sm"
                  shape="square"
                  disabled
                >
                  <Icon name="arrow-left-right" />
                  <span>Button</span>
                </Button>
              </div>
            </div>
          </div>
        </GuideBox>

        <GuideBox
          title="Variants : outline + color:gray + iconOnly"
          description="텍스트 없이 아이콘만 표시하는 사각 outline 버튼 예시입니다."
          code={`
<div className="gap-12 flex">
  <div>
    <div className="mb-1.5 text-font-g">Sizes: default + shape: square + color:gray</div>
    <div className="gap-2 flex">
      <Button variant="outline" color="gray" shape="square">
        <Icon name="arrow-left-right" />
      </Button>
      <Button variant="outline" color="gray" shape="square" disabled>
        <Icon name="arrow-left-right" />
      </Button>
    </div>
  </div>
  <div>
    <div className="mb-1.5 text-font-g">Sizes: md + shape: square + color:gray</div>
    <div className="gap-2 flex">
      <Button variant="outline" color="gray" size="md" shape="square">
        <Icon name="arrow-left-right" />
      </Button>
      <Button variant="outline" color="gray" size="md" shape="square" disabled>
        <Icon name="arrow-left-right" />
      </Button>
    </div>
  </div>
  <div>
    <div className="mb-1.5 text-font-g">Sizes: sm + shape: square + color:gray</div>
    <div className="gap-2 flex">
      <Button variant="outline" color="gray" size="sm" shape="square">
        <Icon name="arrow-left-right" />
      </Button>
      <Button variant="outline" color="gray" size="sm" shape="square" disabled>
        <Icon name="arrow-left-right" />
      </Button>
    </div>
  </div>
</div>
        `}
        >
          <div className="gap-12 flex">
            <div>
              <div className="mb-1.5 text-font-g">
                Sizes: default + shape: square + color:gray
              </div>
              <div className="gap-2 flex">
                <Button variant="outline" color="gray" shape="square">
                  <Icon name="arrow-left-right" />
                </Button>
                <Button variant="outline" color="gray" shape="square" disabled>
                  <Icon name="arrow-left-right" />
                </Button>
              </div>
            </div>
            <div>
              <div className="mb-1.5 text-font-g">
                Sizes: md + shape: square + color:gray
              </div>
              <div className="gap-2 flex">
                <Button variant="outline" color="gray" size="md" shape="square">
                  <Icon name="arrow-left-right" />
                </Button>
                <Button
                  variant="outline"
                  color="gray"
                  size="md"
                  shape="square"
                  disabled
                >
                  <Icon name="arrow-left-right" />
                </Button>
              </div>
            </div>
            <div>
              <div className="mb-1.5 text-font-g">
                Sizes: sm + shape: square + color:gray
              </div>
              <div className="gap-2 flex">
                <Button variant="outline" color="gray" size="sm" shape="square">
                  <Icon name="arrow-left-right" />
                </Button>
                <Button
                  variant="outline"
                  color="gray"
                  size="sm"
                  shape="square"
                  disabled
                >
                  <Icon name="arrow-left-right" />
                </Button>
              </div>
            </div>
          </div>
        </GuideBox>

        <GuideBox
          title="Variants : text"
          description="배경 없이 텍스트 액션처럼 쓰는 버튼 스타일입니다."
          code={`
<div className="gap-12 flex">
  <div>
    <div className="mb-1.5 text-font-g">Sizes: default</div>
    <div className="gap-2 flex">
      <Button variant="text">
        <Icon name="arrow-left-right" size={16} />
        <span className="text">button</span>
      </Button>
      <Button variant="text" disabled>
        <Icon name="arrow-left-right" />
        <span className="text">button</span>
      </Button>
    </div>
  </div>
  <div>
    <div className="mb-1.5 text-font-g">Sizes: md</div>
    <div className="gap-2 flex">
      <Button variant="text" size="md">
        <Icon name="arrow-left-right" />
        <span className="text">button</span>
      </Button>
      <Button variant="text" size="md" disabled>
        <Icon name="arrow-left-right" />
        <span className="text">button</span>
      </Button>
    </div>
  </div>
  <div>
    <div className="mb-1.5 text-font-g">Sizes: sm</div>
    <div className="gap-2 flex">
      <Button variant="text" size="sm">
        <Icon name="arrow-left-right" />
        <span className="text">button</span>
      </Button>
      <Button variant="text" size="sm" disabled>
        <Icon name="arrow-left-right" />
        <span className="text">button</span>
      </Button>
    </div>
  </div>
</div>
        `}
        >
          <div className="gap-12 flex">
            <div>
              <div className="mb-1.5 text-font-g">Sizes: default</div>
              <div className="gap-2 flex">
                <Button variant="text">
                  <Icon name="arrow-left-right" size={16} />
                  <span className="text">button</span>
                </Button>
                <Button variant="text" disabled>
                  <Icon name="arrow-left-right" />
                  <span className="text">button</span>
                </Button>
              </div>
            </div>
            <div>
              <div className="mb-1.5 text-font-g">Sizes: md</div>
              <div className="gap-2 flex">
                <Button variant="text" size="md">
                  <Icon name="arrow-left-right" />
                  <span className="text">button</span>
                </Button>
                <Button variant="text" size="md" disabled>
                  <Icon name="arrow-left-right" />
                  <span className="text">button</span>
                </Button>
              </div>
            </div>
            <div>
              <div className="mb-1.5 text-font-g">Sizes: sm</div>
              <div className="gap-2 flex">
                <Button variant="text" size="sm">
                  <Icon name="arrow-left-right" />
                  <span className="text">button</span>
                </Button>
                <Button variant="text" size="sm" disabled>
                  <Icon name="arrow-left-right" />
                  <span className="text">button</span>
                </Button>
              </div>
            </div>
          </div>
        </GuideBox>

        <GuideBox
          title="Variants : ghost"
          description="아이콘 액션에 어울리는 원형 ghost 버튼 케이스입니다."
          code={`
<div className="gap-12 flex">
  <div>
    <div className="mb-1.5 text-font-g">Sizes: default</div>
    <div className="gap-2 flex">
      <Button
        variant="ghost"
        className="size-12 rounded-full hover:bg-box"
      >
        <Icon name="arrow-left-right" size={24} />
      </Button>
    </div>
  </div>
</div>
        `}
        >
          <div className="gap-12 flex">
            <div>
              <div className="mb-1.5 text-font-g">Sizes: default</div>
              <div className="gap-2 flex">
                <Button
                  variant="ghost"
                  className="size-12 rounded-full hover:bg-box"
                >
                  <Icon name="arrow-left-right" size={24} />
                </Button>
              </div>
            </div>
          </div>
        </GuideBox>
      </div>
    </div>
  );
}

export { SampleButtonPage };
export default SampleButtonPage;
