import {
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
} from "@/components/ui";
import { GuideBox } from "@/publish/guide/GuideBox";

function SampleCardPage() {
  return (
    <div className="guide-layout">
      <h1 className="guide-title">Card Samples</h1>
      <div className="guide-content">
        <GuideBox
          title="기본 카드"
          description="제목, 설명, 본문, 푸터 영역으로 구성된 기본 카드입니다."
          code={`
<Card className="max-w-[420px]">
  <CardHeader>
    <CardTitle>프로젝트 생성</CardTitle>
    <CardDescription>새 프로젝트 기본 정보를 입력하세요.</CardDescription>
  </CardHeader>
  <CardContent>...</CardContent>
  <CardFooter>...</CardFooter>
</Card>
          `}
        >
          <Card className="max-w-[420px]">
            <CardHeader>
              <CardTitle>프로젝트 생성</CardTitle>
              <CardDescription>
                새 프로젝트 기본 정보를 입력하세요.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2">
              <Input placeholder="프로젝트명" />
              <Input placeholder="담당자 이메일" />
            </CardContent>
            <CardFooter className="justify-end">
              <Button size="sm">저장</Button>
            </CardFooter>
          </Card>
        </GuideBox>

        <GuideBox
          title="CardAction 포함 헤더"
          description="헤더 우측 액션 영역(CardAction)과 본문 목록을 함께 사용하는 예시입니다."
          code={`
<Card>
  <CardHeader>
    <CardTitle>알림</CardTitle>
    <CardAction>
      <Button variant="outline" size="sm">전체 읽음</Button>
    </CardAction>
  </CardHeader>
  <CardContent>...</CardContent>
</Card>
          `}
        >
          <Card>
            <CardHeader>
              <CardTitle>알림</CardTitle>
              <CardAction>
                <Button variant="outline" size="sm">
                  전체 읽음
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent className="grid gap-2 text-sm text-font-g">
              <p>신규 댓글이 등록되었습니다.</p>
              <p>배포 작업이 완료되었습니다.</p>
              <p>팀 초대 요청이 도착했습니다.</p>
            </CardContent>
          </Card>
        </GuideBox>
      </div>
    </div>
  );
}

export { SampleCardPage };
export default SampleCardPage;
