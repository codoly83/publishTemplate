import { Chip, Icon } from "@/components/ui";
import { GuideBox } from "./GuideBox";

const colors = ["blue", "green", "yellow", "red", "purple", "gray"] as const;

function SampleChipPage() {
  return (
    <div className="guide-layout">
      <h1 className="guide-title">Chip Samples</h1>
      <div className="guide-content">
        <GuideBox
          title="variant: tint × color"
          description="톤이 약한 tint 스타일에서 색상별 Chip 표현을 확인합니다."
          code={`
{colors.map((color) => (
  <Chip key={color} variant="tint" color={color}>
    tint / {color}
  </Chip>
))}
        `}
        >
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <Chip key={color} variant="tint" color={color}>
                tint / {color}
              </Chip>
            ))}
          </div>
        </GuideBox>

        <GuideBox
          title="variant: solid × color"
          description="배경색이 꽉 찬 solid 스타일의 색상별 사용 예시입니다."
          code={`
{colors.map((color) => (
  <Chip key={color} variant="solid" color={color}>
    solid / {color}
  </Chip>
))}
        `}
        >
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <Chip key={color} variant="solid" color={color}>
                solid / {color}
              </Chip>
            ))}
          </div>
        </GuideBox>

        <GuideBox
          title="기타 variants"
          description="상태형 Chip, 아이콘 데이터형 Chip, `asChild` 조합을 함께 확인합니다."
          code={`
<Chip variant="stateYes">
  <Icon name="checkbox-circle-fill" />
  <span>stateYes</span>
</Chip>

<Chip variant="stateNo">
  <Icon name="error-warning-fill" />
  <span>stateNo</span>
</Chip>

<Chip asChild variant="iconData">
  <a href="https://example.com" target="_blank" rel="noreferrer">
    <Icon name="attachment" />
    <span>RQ_kumhoresort_2025.pdf</span>
  </a>
</Chip>
        `}
        >
          <div className="flex flex-wrap gap-2">
            <Chip variant="stateYes">
              <Icon name="checkbox-circle-fill" />
              <span>stateYes</span>
            </Chip>
            <Chip variant="stateNo">
              <Icon name="error-warning-fill" />
              <span>stateNo</span>
            </Chip>
            <Chip variant="iconData" className="gap-0!">
              <Icon name="attachment" />
              <span>2</span>
            </Chip>
          </div>
          <h2 className="text-lg font-semibold">다른 마크업으로 사용하기</h2>
          <div className="flex flex-wrap gap-2">
            <Chip asChild variant="iconData">
              <a
                href="https://example.com"
                target="_blank"
                rel="noreferrer"
                className="underline!"
              >
                <Icon name="attachment" />
                <span>RQ_kumhoresort_2025.pdf</span>
              </a>
            </Chip>
          </div>
        </GuideBox>
      </div>
    </div>
  );
}

export { SampleChipPage };
export default SampleChipPage;
