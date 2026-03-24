import { GuideBox } from "@/publish/guide/GuideBox";

function SampleBasePage() {
  return (
    <div className="guide-layout">
      <h1 className="guide-title">Base Publishing Guide</h1>
      <div className="guide-content">
        <GuideBox
          title="0) 프로젝트 기본 정보"
          description="퍼블리싱 시작 전에 합의해야 하는 기준입니다. 아래 값은 가이드 템플릿 예시이며 프로젝트에 맞게 조정해서 사용합니다."
        >
          <div className="grid grid-cols-1 gap-2 text-sm text-font-b">
            <div className="rounded border border-line01 bg-box p-3">
              <strong>프로젝트 타입/해상도</strong>
              <div className="mt-1">
                Responsive Web 기준. 브레이크포인트 예시: Mobile `360~767`,
                Tablet `768~1023`, Desktop `1024~1439`, Wide `1440+`.
              </div>
              <div className="mt-1">
                반응형의 경우 scaling으로 해서 브레이크포인트 까지 상대적으로
                페이지를 줄이는 타입
              </div>
            </div>
            <div className="rounded border border-line01 bg-box p-3">
              <strong>언어/기술 스택</strong>
              <div className="mt-1">
                TypeScript + React + tailwindcss 4.2 + Vite, Styling은 CSS/SCSS
                + 디자인 토큰 (`_color.css`, `_font.css`) 사용.
              </div>
            </div>
            <div className="rounded border border-line01 bg-box p-3">
              <strong>타겟 디바이스/OS</strong>
              <div className="mt-1">
                Mobile(iOS/Android) + PC(Windows/macOS) 기본 대응. 우선 지원
                버전은 기획/운영 정책에 맞춰 최소 OS 버전 합의 후 확정.
              </div>
            </div>
            <div className="rounded border border-line01 bg-box p-3">
              <strong>타겟 브라우저</strong>
              <div className="mt-1">
                Chrome/Edge 최신 2버전, Safari(iOS/macOS) 최신 2버전, Samsung
                Internet 최신 2버전 권장. IE는 미지원.
              </div>
            </div>
          </div>
        </GuideBox>

        <GuideBox
          title="1) CSS 로드 순서"
          description="기본 스타일은 리셋/토큰/레이아웃 순서로 쌓고, 컴포넌트 스타일이 마지막에 오도록 관리합니다."
          code={`
// global.css
@import "./_base.css";
@import "./_font.css";
@import "./_color.css";
@import "./_layout.css";
@import "./common.scss";
@import "./contents.scss";
          `}
        >
          <ul className="list-disc pl-5 text-sm text-font-b space-y-1">
            <li>reset/normalize는 가장 먼저 적용합니다.</li>
            <li>
              토큰(`_color.css`, `_font.css`)은 컴포넌트보다 먼저 정의합니다.
            </li>
            <li>페이지 전용 스타일은 공통 스타일 뒤에서 덮어씁니다.</li>
          </ul>
        </GuideBox>

        <GuideBox
          title="2) 색상/폰트 토큰 사용 규칙"
          description="하드코딩 대신 CSS 변수 기반 토큰(`var(--...)`)을 우선 사용합니다."
          code={`
.title {
  color: var(--font-b);
  font-family: "Pretendard", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.card {
  background: var(--bg-box);
  border: 1px solid var(--line01);
}
          `}
        >
          <div className="grid grid-cols-1 gap-2 text-sm text-font-b">
            <div className="rounded border border-line01 bg-box p-3">
              색상은 `--font-*`, `--bg-*`, `--line*`, `--primary`를 우선
              사용합니다.
            </div>
            <div className="rounded border border-line01 bg-box p-3">
              다크모드 대응을 위해 컴포넌트 내부 hex 값 직접 사용은
              최소화합니다.
            </div>
          </div>
        </GuideBox>

        <GuideBox
          title="3) 기본 마크업/접근성 체크"
          description="퍼블리싱 단계에서 자주 놓치는 시맨틱/접근성 기준입니다."
          code={`
<button type="button" aria-label="닫기">닫기</button>
<img src="/logo.svg" alt="서비스 로고" />
<input id="email" />
<label htmlFor="email">이메일</label>
          `}
        >
          <ul className="list-disc pl-5 text-sm text-font-b space-y-1">
            <li>버튼에는 `type`을 명시합니다.</li>
            <li>이미지에는 의미에 맞는 `alt`를 제공합니다.</li>
            <li>폼 컨트롤과 라벨을 연결합니다(`id`/`htmlFor`).</li>
            <li>키보드 포커스가 보이도록 outline 제거를 지양합니다.</li>
          </ul>
        </GuideBox>

        <GuideBox
          title="4) 네이밍/구조 컨벤션"
          description="파일/클래스/컴포넌트 네이밍을 통일하면 유지보수가 쉬워집니다."
          code={`
components/
  ui/
    Button/
      Button.tsx
      Button.module.scss

publish/guide/components/
  sampleButton.tsx
  sampleBase.tsx
          `}
        >
          <ul className="list-disc pl-5 text-sm text-font-b space-y-1">
            <li>재사용 컴포넌트는 `components/ui`에 둡니다.</li>
            <li>
              가이드 예제 페이지는 `publish/guide/.../sample*.tsx` 패턴을
              유지합니다.
            </li>
            <li>
              스타일 파일은 목적별로 분리하고 공통 토큰은 한 곳에서 관리합니다.
            </li>
          </ul>
        </GuideBox>
      </div>
    </div>
  );
}

export { SampleBasePage };
export default SampleBasePage;
