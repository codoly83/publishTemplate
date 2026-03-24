import { GuideBox } from "./GuideBox";

function SampleFontPage() {
  const SIZES = [24, 20, 16, 14, 12];
  const WEIGHTS = [400, 500, 700];
  return (
    <div className="guide-layout">
      <h1 className="guide-title">Font Samples</h1>
      <div className="guide-content">
        <GuideBox title="Typography" description="Pretendard 폰트 샘플입니다.">
          {SIZES.map((size) => (
            <section key={size} className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-box text-btn-b font-bold text-xs rounded">
                  {size}px
                </span>
                <div className="h-px flex-1 bg-line02"></div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {WEIGHTS.map((weight) => (
                  <div
                    key={`${size}-${weight}`}
                    className="flex items-baseline gap-8"
                  >
                    {/* 정보 표시 (Label) */}
                    <span className="w-24 text-[14px] text-font-g">
                      {size}px / {weight}
                    </span>

                    {/* 실제 폰트 적용 영역 */}
                    <p
                      className="text-font-b"
                      style={{ fontSize: size, fontWeight: weight }}
                    >
                      Pretendard 프리텐다드
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </GuideBox>
      </div>
    </div>
  );
}

export { SampleFontPage };
export default SampleFontPage;
