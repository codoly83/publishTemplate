import { useLayoutClass } from "@/hooks/useLayoutClass";

function SampleLayoutBasicPage() {
  useLayoutClass("type2");

  return (
    <>
      <p style={{ margin: "0 0 16px", fontSize: 14, color: "var(--font-g)" }}>
        헤더는 상단 전체 너비에 고정되고, 본문·푸터만 아래 영역에서
        스크롤됩니다.
      </p>
      {Array.from({ length: 24 }, (_, i) => (
        <p key={i} style={{ margin: "0 0 12px", fontSize: 14 }}>
          본문 {i + 1}
        </p>
      ))}
    </>
  );
}

export { SampleLayoutBasicPage };
export default SampleLayoutBasicPage;
