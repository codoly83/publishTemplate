import * as React from "react";

import { Button, Loading } from "@/components/ui";
import { GuideBox } from "./GuideBox";

function SampleLoadingPage() {
  const [screenLoading, setScreenLoading] = React.useState(false);
  const [areaLoading, setAreaLoading] = React.useState(false);

  React.useEffect(() => {
    if (!screenLoading) return;
    const id = window.setTimeout(() => setScreenLoading(false), 1800);
    return () => window.clearTimeout(id);
  }, [screenLoading]);

  React.useEffect(() => {
    if (!areaLoading) return;
    const id = window.setTimeout(() => setAreaLoading(false), 2000);
    return () => window.clearTimeout(id);
  }, [areaLoading]);

  return (
    <div className="guide-layout">
      <h1 className="guide-title">Loading Samples</h1>
      <div className="guide-content">
        <GuideBox
          title="전체 화면 가림 로딩"
          description="페이지 전체를 가리는 오버레이 로딩입니다. 데모에서는 1.8초 뒤 자동으로 해제됩니다."
          code={`
const [loading, setLoading] = useState(false);

useEffect(() => {
  if (!loading) return;
  const id = window.setTimeout(() => setLoading(false), 1800);
  return () => window.clearTimeout(id);
}, [loading]);

<Button onClick={() => setLoading(true)}>전체 로딩 시작</Button>
<Loading loading={loading} label="전체 화면 로딩 중..." />
          `}
        >
          <div className="flex items-center gap-3">
            <Button type="button" onClick={() => setScreenLoading(true)}>
              전체 로딩 시작
            </Button>
            <span className="text-sm text-font-g">
              로딩 중에는 화면이 잠시 비활성화됩니다.
            </span>
          </div>
          <Loading loading={screenLoading} label="전체 화면 로딩 중..." />
        </GuideBox>

        <GuideBox
          title="특정 영역 로딩"
          description="카드/테이블 같은 특정 컨테이너 안에만 오버레이를 씌울 때 사용합니다."
          code={`
const [loading, setLoading] = useState(false);

<Loading fullscreen={false} loading={loading} label="목록 불러오는 중...">
  <div className="rounded-xl border border-line02 bg-base p-4">
    <p className="font-medium text-font-b">주문 목록</p>
    <p className="mt-2 text-sm text-font-g">총 3건의 데이터가 있습니다.</p>
  </div>
</Loading>
          `}
        >
          <div className="mb-3 flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setAreaLoading(true)}
            >
              영역 로딩 시작
            </Button>
            <span className="text-sm text-font-g">
              2초 후 자동으로 해제됩니다.
            </span>
          </div>

          <Loading
            fullscreen={false}
            loading={areaLoading}
            label="목록 불러오는 중..."
          >
            <div className="rounded-xl border border-line02 bg-base p-4">
              <p className="font-medium text-font-b">주문 목록</p>
              <p className="mt-2 text-sm text-font-g">총 3건의 데이터가 있습니다.</p>
              <ul className="mt-3 list-disc pl-5 text-sm text-font-b">
                <li>주문번호 #A-1024</li>
                <li>주문번호 #A-1025</li>
                <li>주문번호 #A-1026</li>
              </ul>
            </div>
          </Loading>
        </GuideBox>
      </div>
    </div>
  );
}

export { SampleLoadingPage };
export default SampleLoadingPage;
