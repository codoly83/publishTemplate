import {
  ChartArea,
  ChartBar,
  ChartLine,
  ChartPie,
  ChartRadar,
} from "@/components/ui";
import { GuideBox } from "@/publish/guide/GuideBox";

const monthlyData = [
  { month: "Jan", sales: 120, revenue: 180 },
  { month: "Feb", sales: 98, revenue: 150 },
  { month: "Mar", sales: 140, revenue: 210 },
  { month: "Apr", sales: 110, revenue: 170 },
  { month: "May", sales: 170, revenue: 260 },
  { month: "Jun", sales: 155, revenue: 230 },
];

const pieData = [
  { name: "검색", value: 36 },
  { name: "광고", value: 24 },
  { name: "직접유입", value: 20 },
  { name: "소셜", value: 20 },
];

const radarData = [
  { subject: "성능", current: 84, target: 90 },
  { subject: "접근성", current: 72, target: 88 },
  { subject: "SEO", current: 80, target: 85 },
  { subject: "유지보수", current: 78, target: 87 },
  { subject: "테스트", current: 69, target: 82 },
];

function SampleChartPage() {
  return (
    <div className="guide-layout">
      <h1 className="guide-title">Chart</h1>
      <div className="guide-content">
        <GuideBox
          title="Line Chart"
          description="시계열 추세를 선형으로 표시합니다."
          code={`
<ChartLine
  data={monthlyData}
  xKey="month"
  series={[
    { dataKey: "sales", name: "Sales", color: "#00997a" },
    { dataKey: "revenue", name: "Revenue", color: "#2b7bd6" },
  ]}
/>
          `}
        >
          <ChartLine
            data={monthlyData}
            xKey="month"
            series={[
              { dataKey: "sales", name: "Sales", color: "#00997a" },
              { dataKey: "revenue", name: "Revenue", color: "#2b7bd6" },
            ]}
          />
        </GuideBox>

        <GuideBox
          title="Area Chart"
          description="누적 느낌의 변화량을 면적으로 보여줍니다."
          code={`
<ChartArea
  data={monthlyData}
  xKey="month"
  series={[{ dataKey: "revenue", name: "Revenue", color: "#a63ac0" }]}
/>
          `}
        >
          <ChartArea
            data={monthlyData}
            xKey="month"
            series={[{ dataKey: "revenue", name: "Revenue", color: "#a63ac0" }]}
          />
        </GuideBox>

        <GuideBox
          title="Bar Chart"
          description="항목별 값을 막대로 비교할 때 사용합니다."
          code={`
<ChartBar
  data={monthlyData}
  xKey="month"
  series={[{ dataKey: "sales", name: "Sales", color: "#00997a" }]}
/>
          `}
        >
          <ChartBar
            data={monthlyData}
            xKey="month"
            series={[{ dataKey: "sales", name: "Sales", color: "#00997a" }]}
          />
        </GuideBox>

        <GuideBox
          title="Pie Chart"
          description="구성 비율을 한눈에 보여줍니다."
          code={`
<ChartPie data={pieData} series={{ dataKey: "value", nameKey: "name" }} />
          `}
        >
          <ChartPie data={pieData} series={{ dataKey: "value", nameKey: "name" }} />
        </GuideBox>

        <GuideBox
          title="Radar Chart"
          description="다중 지표를 방사형으로 비교할 때 사용합니다."
          code={`
<ChartRadar
  data={radarData}
  angleKey="subject"
  series={[
    { dataKey: "current", name: "현재", color: "#00997a" },
    { dataKey: "target", name: "목표", color: "#2b7bd6" },
  ]}
/>
          `}
        >
          <ChartRadar
            data={radarData}
            angleKey="subject"
            series={[
              { dataKey: "current", name: "현재", color: "#00997a" },
              { dataKey: "target", name: "목표", color: "#2b7bd6" },
            ]}
          />
        </GuideBox>
      </div>
    </div>
  );
}

export default SampleChartPage;
