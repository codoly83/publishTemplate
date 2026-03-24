import { useLayoutClass } from "@/hooks/useLayoutClass";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";

const summaryCards = [
  { label: "오늘 방문자", value: "2,431", change: "+12.4%", color: "green" },
  { label: "신규 가입", value: "128", change: "+4.2%", color: "blue" },
  { label: "활성 프로젝트", value: "37", change: "-1.1%", color: "yellow" },
  { label: "오류 건수", value: "3", change: "-62.5%", color: "purple" },
] as const;

const recentTasks = [
  { id: 1, name: "배너 문구 수정", owner: "디자인팀", status: "완료" },
  { id: 2, name: "회원 통계 API 점검", owner: "개발팀", status: "진행중" },
  { id: 3, name: "공지사항 등록", owner: "운영팀", status: "대기" },
] as const;

function Dashboard() {
  useLayoutClass("type2");

  return (
    <main style={{ display: "grid", gap: 16, padding: 16 }}>
      <section
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <div>
          <h1 style={{ margin: "0 0 8px", fontSize: 24, fontWeight: 700 }}>
            Dashboard
          </h1>
          <p style={{ margin: 0, fontSize: 14, color: "var(--font-g)" }}>
            운영 현황을 한눈에 볼 수 있는 샘플 대시보드입니다.
          </p>
        </div>
        <Button size="sm">리포트 다운로드</Button>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 12,
        }}
      >
        {summaryCards.map((card) => (
          <Card key={card.label}>
            <CardHeader>
              <CardTitle style={{ fontSize: 14, fontWeight: 500 }}>
                {card.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p style={{ margin: "0 0 8px", fontSize: 28, fontWeight: 700 }}>
                {card.value}
              </p>
              <Chip variant="solid" color={card.color}>
                {card.change}
              </Chip>
            </CardContent>
          </Card>
        ))}
      </section>

      <section>
        <Card>
          <CardHeader>
            <CardTitle>최근 작업 현황</CardTitle>
          </CardHeader>
          <CardContent>
            <Table variant="sub" type="vertical">
              <TableHeader>
                <TableRow>
                  <TableHead>업무</TableHead>
                  <TableHead>담당</TableHead>
                  <TableHead>상태</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>{task.name}</TableCell>
                    <TableCell>{task.owner}</TableCell>
                    <TableCell>
                      <Chip
                        variant="solid"
                        color={
                          task.status === "완료"
                            ? "green"
                            : task.status === "진행중"
                              ? "blue"
                              : "gray"
                        }
                      >
                        {task.status}
                      </Chip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

export { Dashboard };
export default Dashboard;
