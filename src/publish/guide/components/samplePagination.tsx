import { Pagination } from "@/components/ui";
import { useState } from "react";
import { GuideBox } from "./GuideBox";

function SamplePaginationPage() {
  // 1. Basic
  const [page1, setPage1] = useState(1);
  // 2. ellipsis on / off
  const [page2, setPage2] = useState(5);
  // 3. max – 점프 거리
  const [page3, setPage3] = useState(5);
  // 4. ellipsis + max 비교
  const [page4, setPage4] = useState(5);
  // 5. 경계 위치 (각 행 독립 상태)
  const [page5a, setPage5a] = useState(2);
  const [page5b, setPage5b] = useState(5);
  const [page5c, setPage5c] = useState(9);
  // 6. Controlled – ellipsis 토글
  const [page6, setPage6] = useState(5);
  const [ellipsis6, setEllipsis6] = useState(false);
  // 7. Jump – total=50
  const [page7, setPage7] = useState(1);
  // 8. getHref
  const [page8, setPage8] = useState(5);

  return (
    <div className="guide-layout">
      <h1 className="guide-title">Pagination Samples</h1>
      <div className="guide-content">
        {/* 1. Basic */}
        <GuideBox
          title="Basic"
          description="total / current / onPageChange 만으로 렌더링합니다. ellipsis=false(기본), max=5(기본)이며 << >> 는 항상 표시됩니다."
          code={`
  <Pagination total={10} current={page} onPageChange={setPage} />
          `}
        >
          <div className="flex flex-col items-center gap-4">
            <p className="text-sm text-font-g">
              현재 페이지:{" "}
              <span className="font-semibold text-font-b">{page1}</span> / 10
            </p>
            <Pagination total={10} current={page1} onPageChange={setPage1} />
          </div>
        </GuideBox>

        {/* 2. ellipsis on / off */}
        <GuideBox
          title="ellipsis on / off"
          description="ellipsis=true 시 max 기준으로 페이지를 그룹화하고 줄임표를 표시합니다. false(기본)는 max 개수만큼 표시합니다."
          code={`
  // ellipsis on: max 기준 그룹 + 줄임표
  <Pagination total={10} current={page} ellipsis max={5} onPageChange={setPage} />
  
  // ellipsis off (기본값): max 개수만큼 표시
  <Pagination total={10} current={page} max={5} onPageChange={setPage} />
          `}
        >
          <div className="flex flex-col gap-4">
            <p className="text-sm text-font-g text-center">
              현재 페이지:{" "}
              <span className="font-semibold text-font-b">{page2}</span> / 10
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-font-g">
                  ellipsis=true, max=5
                </span>
                <Pagination
                  total={10}
                  current={page2}
                  ellipsis
                  max={5}
                  onPageChange={setPage2}
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-font-g">
                  ellipsis=false (기본), max=5
                </span>
                <Pagination
                  total={10}
                  current={page2}
                  max={5}
                  onPageChange={setPage2}
                />
              </div>
            </div>
          </div>
        </GuideBox>

        {/* 3. max – 점프 거리 */}
        <GuideBox
          title="max – 점프 거리 (ellipsis 무관)"
          description="max는 ellipsis on/off 모두에서 << / >> 점프 거리로 사용됩니다."
          code={`
  // ellipsis=false, max=3 → << >> 3페이지 이동
  <Pagination total={10} current={page} max={3} onPageChange={setPage} />
  
  // ellipsis=false, max=5 → << >> 5페이지 이동
  <Pagination total={10} current={page} max={5} onPageChange={setPage} />
  
  // ellipsis=true, max=5 → 그룹화 + << >> 5페이지 이동
  <Pagination total={10} current={page} ellipsis max={5} onPageChange={setPage} />
          `}
        >
          <div className="flex flex-col gap-4">
            <p className="text-sm text-font-g text-center">
              현재 페이지:{" "}
              <span className="font-semibold text-font-b">{page3}</span> / 10
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-font-g">
                  ellipsis=false, max=3 (점프 3)
                </span>
                <Pagination
                  total={10}
                  current={page3}
                  max={3}
                  onPageChange={setPage3}
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-font-g">
                  ellipsis=false, max=5 (점프 5)
                </span>
                <Pagination
                  total={10}
                  current={page3}
                  max={5}
                  onPageChange={setPage3}
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-font-g">
                  ellipsis=true, max=5 (그룹화 + 점프 5)
                </span>
                <Pagination
                  total={10}
                  current={page3}
                  ellipsis
                  max={5}
                  onPageChange={setPage3}
                />
              </div>
            </div>
          </div>
        </GuideBox>

        {/* 4. ellipsis + max 크기 비교 */}
        <GuideBox
          title="ellipsis + max 비교"
          description="ellipsis=true 일 때 max 값에 따라 표시되는 페이지 번호 버튼 수와 점프 거리가 함께 달라집니다."
          code={`
  <Pagination total={10} current={page} ellipsis max={3} onPageChange={setPage} />
  <Pagination total={10} current={page} ellipsis max={5} onPageChange={setPage} />
  <Pagination total={10} current={page} ellipsis max={7} onPageChange={setPage} />
          `}
        >
          <div className="flex flex-col gap-4">
            <p className="text-sm text-font-g text-center">
              현재 페이지:{" "}
              <span className="font-semibold text-font-b">{page4}</span> / 10
            </p>
            <div className="flex flex-col gap-4">
              {([3, 5, 7] as const).map((m) => (
                <div key={m} className="flex flex-col gap-1">
                  <span className="text-xs font-medium text-font-g">
                    max={m}
                  </span>
                  <Pagination
                    total={10}
                    current={page4}
                    ellipsis
                    max={m}
                    onPageChange={setPage4}
                  />
                </div>
              ))}
            </div>
          </div>
        </GuideBox>

        {/* 5. 경계 위치 */}
        <GuideBox
          title="경계 위치 (ellipsis=true, max=5, total=10)"
          description="현재 페이지가 앞·중간·끝에 위치할 때 ellipsis 위치 변화를 확인합니다. 각 행은 독립적으로 동작합니다."
          code={`
  <Pagination total={10} current={page} ellipsis max={5} onPageChange={setPage} />
          `}
        >
          <div className="flex flex-col gap-4">
            {(
              [
                { label: "시작 근처", page: page5a, setPage: setPage5a },
                { label: "중간", page: page5b, setPage: setPage5b },
                { label: "끝 근처", page: page5c, setPage: setPage5c },
              ] as const
            ).map(({ label, page, setPage }) => (
              <div key={label} className="flex flex-col gap-1">
                <span className="text-xs font-medium text-font-g">
                  {label} (current={page})
                </span>
                <Pagination
                  total={10}
                  current={page}
                  ellipsis
                  max={5}
                  onPageChange={setPage}
                />
              </div>
            ))}
          </div>
        </GuideBox>

        {/* 6. Controlled – ellipsis 토글 */}
        <GuideBox
          title="Controlled – ellipsis 토글"
          description="버튼으로 ellipsis를 켜고 끄며 페이지를 이동하는 예시입니다. max=5는 양쪽 모두 점프 거리로 동작합니다."
          code={`
  const [page, setPage] = useState(5);
  const [showEllipsis, setShowEllipsis] = useState(false);
  
  <Pagination
    total={10}
    current={page}
    max={5}
    ellipsis={showEllipsis}
    onPageChange={setPage}
  />
          `}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-3">
              <p className="text-sm text-font-g">
                현재 페이지:{" "}
                <span className="font-semibold text-font-b">{page6}</span> / 10
              </p>
              <button
                type="button"
                className="rounded border border-line02 px-3 py-1 text-xs text-font-g transition-colors hover:bg-box"
                onClick={() => setEllipsis6((v) => !v)}
              >
                ellipsis: {ellipsis6 ? "ON" : "OFF"}
              </button>
            </div>
            <Pagination
              total={10}
              current={page6}
              max={5}
              ellipsis={ellipsis6}
              onPageChange={setPage6}
            />
          </div>
        </GuideBox>

        {/* 7. Jump – total=50 */}
        <GuideBox
          title="Jump – max 단위 이동 (total=50)"
          description="<< / >> 버튼은 max 크기만큼 이동합니다. ellipsis on/off 모두 동일하게 동작합니다."
          code={`
  // ellipsis=true + max=5: 그룹화 및 << >> 5페이지 이동
  <Pagination total={50} current={page} ellipsis max={5} onPageChange={setPage} />
  
  // ellipsis=false + max=5: max 개수 표시, << >> 5페이지 이동
  <Pagination total={50} current={page} max={5} onPageChange={setPage} />
          `}
        >
          <div className="flex flex-col gap-4">
            <p className="text-sm text-font-g text-center">
              현재 페이지:{" "}
              <span className="font-semibold text-font-b">{page7}</span> / 50
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-font-g">
                  ellipsis=true, max=5 (그룹화 + 점프 5)
                </span>
                <Pagination
                  total={50}
                  current={page7}
                  ellipsis
                  max={5}
                  onPageChange={setPage7}
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-font-g">
                  ellipsis=false, max=5 (5개 표시 + 점프 5)
                </span>
                <Pagination
                  total={50}
                  current={page7}
                  max={5}
                  onPageChange={setPage7}
                />
              </div>
            </div>
          </div>
        </GuideBox>

        {/* 8. getHref – URL 기반 */}
        <GuideBox
          title="getHref – URL 기반 페이지네이션"
          description="getHref prop으로 각 페이지에 실제 href를 생성하는 예시입니다."
          code={`
  <Pagination
    total={10}
    current={page}
    getHref={(page) => \`?page=\${page}\`}
    onPageChange={setPage}
  />
          `}
        >
          <div className="flex flex-col items-center gap-4">
            <p className="text-sm text-font-g">
              현재 페이지:{" "}
              <span className="font-semibold text-font-b">{page8}</span> / 10
            </p>
            <Pagination
              total={10}
              current={page8}
              getHref={(page) => `?page=${page}`}
              onPageChange={setPage8}
            />
          </div>
        </GuideBox>
      </div>
    </div>
  );
}

export { SamplePaginationPage };
export default SamplePaginationPage;
