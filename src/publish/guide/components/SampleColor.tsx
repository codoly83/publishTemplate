import { GuideBox } from "@/publish/guide/GuideBox";

const COLOR_TOKENS = [
  "primary",
  "font-b",
  "font-g",
  "font-lg",
  "font-w",
  "bg-base",
  "bg-container",
  "bg-box",
  "bg-row",
  "blue",
  "red",
  "purple",
  "yellow",
  "green-50",
  "blue-50",
  "red-50",
  "purple-50",
  "yellow-50",
  "gray-50",
  "line01",
  "line02",
  "btn-b",
  "btn-g",
] as const;

function SampleColorPage() {
  return (
    <div className="guide-layout">
      <h1 className="guide-title">Color Samples</h1>
      <div className="guide-content">
        <GuideBox
          title="_color.css 토큰 미리보기"
          description="`src/assets/styles/_color.css`에 정의된 CSS 변수 컬러를 샘플로 확인합니다."
          code={`
// src/assets/styles/_color.css
@theme {
  --primary: #00997a;
  --font-b: #1f2533;
  --line01: #ebf0f5;
}

<div style={{ backgroundColor: "var(--primary)" }} />
          `}
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {COLOR_TOKENS.map((token) => (
              <div
                key={token}
                className="rounded-lg border border-line01 bg-base p-3"
              >
                <div
                  className="h-12 w-full rounded border border-line02"
                  style={{ backgroundColor: `var(--${token})` }}
                />
                <div className="mt-2 text-sm text-font-b">{`--${token}`}</div>
              </div>
            ))}
          </div>
        </GuideBox>
      </div>
    </div>
  );
}

export { SampleColorPage };
export default SampleColorPage;
