import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from "@/components/ui";
import { useState } from "react";
import { GuideBox } from "@/publish/guide/GuideBox";

function SampleAlertDialogPage() {
  const [alertOpen, setAlertOpen] = useState(false);

  return (
    <div className="guide-layout">
      <h1 className="guide-title">Alert Samples</h1>
      <div className="guide-content">
        {/* ── Alert ── */}
        <GuideBox
          title="Alert"
          description="단순 알림 메시지에 사용하는 최소형 다이얼로그입니다. 제목 없이 내용과 확인 버튼만 표시됩니다."
          code={`
{/* 방법 1: Trigger로 제어 */}
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="outline" size="md">
      Alert 열기 (Trigger)
    </Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>알림</AlertDialogTitle>
      <AlertDialogDescription>
        수정시 AI 재추론 과정을 진행합니다.
        <br /> 재추론에는 5~10분가량 소요됩니다.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogAction>확인</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

{/* 방법 2: 외부 상태로 제어 */}
<Button
  variant="outline"
  size="md"
  onClick={() => setAlertOpen(true)}
>
  Alert 열기 (External)
</Button>
<AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>알림</AlertDialogTitle>
      <AlertDialogDescription>
        이 항목을 정말로 삭제하시겠습니까?
        <br />
        삭제된 데이터는 복구할 수 없습니다.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>취소</AlertDialogCancel>
      <AlertDialogAction>확인</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
          `}
        >
          <div className="flex flex-wrap gap-4">
            {/* 방법 1: Trigger로 제어 */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="md">
                  Alert 열기 (Trigger)
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>알림</AlertDialogTitle>
                  <AlertDialogDescription>
                    수정시 AI 재추론 과정을 진행합니다.
                    <br /> 재추론에는 5~10분가량 소요됩니다.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction>확인</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {/* 방법 2: 외부 상태로 제어 */}
            <Button
              variant="outline"
              size="md"
              onClick={() => setAlertOpen(true)}
            >
              Alert 열기 (External)
            </Button>
            <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>알림</AlertDialogTitle>
                  <AlertDialogDescription>
                    이 항목을 정말로 삭제하시겠습니까?
                    <br />
                    삭제된 데이터는 복구할 수 없습니다.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>취소</AlertDialogCancel>
                  <AlertDialogAction>확인</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </GuideBox>
      </div>
    </div>
  );
}

export { SampleAlertDialogPage };
export default SampleAlertDialogPage;
