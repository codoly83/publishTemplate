import { GuideBox } from "@/publish/guide/GuideBox";

function SampleTailwindStrategyPage() {
  return (
    <div className="guide-layout">
      <h1 className="guide-title">TailwindCSS 전략</h1>
      <div className="guide-content">
        <GuideBox
          title="핵심 원칙"
          description="프로젝트는 SCSS 기반 컴포넌트 스타일을 기본으로 사용하고, 페이지에서 유동성이 큰 표현만 Tailwind 유틸리티 클래스로 보조합니다."
        >
          <ul className="list-disc pl-5 text-sm text-font-b space-y-1">
            <li>`ui/components` 내부 스타일은 기본적으로 SCSS(`.scss`)로 관리합니다.</li>
            <li>
              기존 `module.css` 사용 구간은 점진적으로 일반 SCSS 구조로 통일하는 것을
              권장합니다.
            </li>
            <li>
              반복되는 스타일/상태 스타일은 SCSS에서 클래스화하고, 페이지별
              변동값(간격/정렬/노출 등)은 Tailwind 클래스로 빠르게 조합합니다.
            </li>
          </ul>
        </GuideBox>

        <GuideBox
          title="언제 SCSS를 쓰는가"
          description="재사용성과 유지보수가 중요한 경우 SCSS를 우선합니다."
          code={`
/* Button.scss */
.buttonBase {
  display: inline-flex;
  align-items: center;
  border-radius: 8px;
  padding: 0 12px;
  height: 40px;
}

.buttonPrimary {
  background: var(--primary);
  color: var(--font-w);
}
          `}
        >
          <ul className="list-disc pl-5 text-sm text-font-b space-y-1">
            <li>컴포넌트 기본 스타일, variant, size, 상태 스타일</li>
            <li>디자인 토큰(`var(--...)`)과 연동되는 공통 UI 규칙</li>
            <li>여러 페이지에서 재사용되는 클래스</li>
          </ul>
        </GuideBox>

        <GuideBox
          title="언제 Tailwind 클래스를 쓰는가"
          description="페이지 문맥에 따라 자주 바뀌는 레이아웃/간격/정렬은 JSX className에서 빠르게 조합합니다."
          code={`
<section className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
  <div className="rounded-lg border border-line01 bg-base p-4">
    ...
  </div>
</section>
          `}
        >
          <ul className="list-disc pl-5 text-sm text-font-b space-y-1">
            <li>페이지 단위 레이아웃, 반응형 그리드/간격, 임시 정렬 조정</li>
            <li>컴포넌트 내부가 아닌 화면 조합 레벨의 빠른 스타일링</li>
            <li>한 번성 표현이거나 재사용 가능성이 낮은 스타일</li>
          </ul>
        </GuideBox>

        <GuideBox
          title="혼용 가이드 (권장 패턴)"
          description="컴포넌트는 SCSS로 안정화하고, 페이지에서는 Tailwind로 배치만 제어합니다."
          code={`
// Component (SCSS 기반)
<Button className="w-full md:w-auto" />

// Page (Tailwind로 유동 배치)
<div className="flex flex-col gap-2 sm:flex-row sm:items-center">
  <Button />
  <Button />
</div>
          `}
        >
          <div className="rounded border border-line01 bg-box p-3 text-sm text-font-b">
            정리: <strong>컴포넌트 규칙은 SCSS</strong>,{" "}
            <strong>페이지 유동 배치는 Tailwind className</strong>으로 혼용합니다.
          </div>
        </GuideBox>
      </div>
    </div>
  );
}

export { SampleTailwindStrategyPage };
export default SampleTailwindStrategyPage;
