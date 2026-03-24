import type { ReactNode } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type ChartContainerProps = {
  children: ReactNode;
  height?: number;
  className?: string;
};

type ChartSeries = {
  dataKey: string;
  name?: string;
  color?: string;
  strokeWidth?: number;
};

type ChartLineProps<T extends Record<string, unknown>> = {
  data: T[];
  xKey: keyof T & string;
  series: ChartSeries[];
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  yDomain?: [number, number] | ["auto", "auto"];
};

type ChartAreaProps<T extends Record<string, unknown>> = ChartLineProps<T>;

type ChartBarProps<T extends Record<string, unknown>> = {
  data: T[];
  xKey: keyof T & string;
  series: ChartSeries[];
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
};

type ChartPieSeries = {
  dataKey: string;
  nameKey?: string;
  innerRadius?: number;
  outerRadius?: number;
};

type ChartPieProps<T extends Record<string, unknown>> = {
  data: T[];
  series: ChartPieSeries;
  colors?: string[];
  height?: number;
  showLegend?: boolean;
};

type ChartRadarProps<T extends Record<string, unknown>> = {
  data: T[];
  angleKey: keyof T & string;
  series: ChartSeries[];
  height?: number;
  showLegend?: boolean;
};

function ChartContainer({
  children,
  height = 280,
  className = "",
}: ChartContainerProps) {
  return (
    <div
      className={`rounded-lg border border-line01 bg-base p-3 ${className}`.trim()}
      style={{ height }}
    >
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  );
}

function ChartLine<T extends Record<string, unknown>>({
  data,
  xKey,
  series,
  height = 280,
  showGrid = true,
  showLegend = true,
  yDomain,
}: ChartLineProps<T>) {
  return (
    <ChartContainer height={height}>
      <LineChart data={data}>
        {showGrid ? <CartesianGrid strokeDasharray="3 3" /> : null}
        <XAxis dataKey={xKey} />
        <YAxis domain={yDomain} />
        <Tooltip />
        {showLegend ? <Legend /> : null}
        {series.map((item) => (
          <Line
            key={item.dataKey}
            type="monotone"
            dataKey={item.dataKey}
            name={item.name}
            stroke={item.color ?? "var(--primary)"}
            strokeWidth={item.strokeWidth ?? 2}
            dot={false}
          />
        ))}
      </LineChart>
    </ChartContainer>
  );
}

function ChartArea<T extends Record<string, unknown>>({
  data,
  xKey,
  series,
  height = 280,
  showGrid = true,
  showLegend = true,
  yDomain,
}: ChartAreaProps<T>) {
  return (
    <ChartContainer height={height}>
      <AreaChart data={data}>
        {showGrid ? <CartesianGrid strokeDasharray="3 3" /> : null}
        <XAxis dataKey={xKey} />
        <YAxis domain={yDomain} />
        <Tooltip />
        {showLegend ? <Legend /> : null}
        {series.map((item) => (
          <Area
            key={item.dataKey}
            type="monotone"
            dataKey={item.dataKey}
            name={item.name}
            stroke={item.color ?? "var(--primary)"}
            fill={item.color ?? "var(--primary)"}
            fillOpacity={0.2}
          />
        ))}
      </AreaChart>
    </ChartContainer>
  );
}

function ChartBar<T extends Record<string, unknown>>({
  data,
  xKey,
  series,
  height = 280,
  showGrid = true,
  showLegend = true,
}: ChartBarProps<T>) {
  return (
    <ChartContainer height={height}>
      <BarChart data={data}>
        {showGrid ? <CartesianGrid strokeDasharray="3 3" /> : null}
        <XAxis dataKey={xKey} />
        <YAxis />
        <Tooltip />
        {showLegend ? <Legend /> : null}
        {series.map((item) => (
          <Bar
            key={item.dataKey}
            dataKey={item.dataKey}
            name={item.name}
            fill={item.color ?? "var(--primary)"}
          />
        ))}
      </BarChart>
    </ChartContainer>
  );
}

function ChartPie<T extends Record<string, unknown>>({
  data,
  series,
  colors = ["#00997a", "#2b7bd6", "#a63ac0", "#e73434", "#ad7f23"],
  height = 280,
  showLegend = true,
}: ChartPieProps<T>) {
  return (
    <ChartContainer height={height}>
      <PieChart>
        <Tooltip />
        {showLegend ? <Legend /> : null}
        <Pie
          data={data}
          dataKey={series.dataKey}
          nameKey={series.nameKey ?? "name"}
          innerRadius={series.innerRadius}
          outerRadius={series.outerRadius ?? 90}
          label
        >
          {data.map((_, index) => (
            <Cell key={`pie-cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}

function ChartRadar<T extends Record<string, unknown>>({
  data,
  angleKey,
  series,
  height = 320,
  showLegend = true,
}: ChartRadarProps<T>) {
  return (
    <ChartContainer height={height}>
      <RadarChart data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey={angleKey} />
        <Tooltip />
        {showLegend ? <Legend /> : null}
        {series.map((item) => (
          <Radar
            key={item.dataKey}
            dataKey={item.dataKey}
            name={item.name}
            stroke={item.color ?? "var(--primary)"}
            fill={item.color ?? "var(--primary)"}
            fillOpacity={0.2}
          />
        ))}
      </RadarChart>
    </ChartContainer>
  );
}

export { ChartArea, ChartBar, ChartContainer, ChartLine, ChartPie, ChartRadar };
export type {
  ChartAreaProps,
  ChartBarProps,
  ChartLineProps,
  ChartPieProps,
  ChartRadarProps,
  ChartSeries,
};
