// // components/dashboard/analytics-charts.tsx

// "use client";

// import useSWR from "swr";
// import DashboardCard from "./dashboard-card";
// import { CardTitle } from "@/components/ui/card";
// import { PieChart as PieChartIcon, BarChart as BarChartIcon } from "lucide-react";
// // NOTE: Assuming API_BASE/swrFetcher are defined in your lib/api
// import { swrFetcher, API_BASE } from "@/lib/api"; 
// import {
//     ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend,
//     BarChart, XAxis, YAxis, CartesianGrid, Bar,
// } from "recharts";

// // --- TYPE DEFINITIONS ---
// type CategoryTotal = { category: string; amount: number };
// type MonthlyRow = { month: string; income: number; expense: number };
// type AnalyticsResponse = {
//     categoryTotals?: CategoryTotal[];
//     monthly?: MonthlyRow[];
// };

// // Colors (High-Contrast, matching the detected theme)
// const CHART_COLORS = ["#2f6ff5", "#45f745", "#f74545", "#8b5cf6", "#f59e0b", "#06b6d4"];
// const cardBgColor = "#1c1c1c"; // Used for Tooltip background

// const AnalyticsCharts: React.FC = () => {
//     const { data, error, isLoading } = useSWR<AnalyticsResponse>(`${API_BASE}/analytics`, swrFetcher);

//     const categoryData = data?.categoryTotals?.filter(c => c.amount > 0) ?? [];
//     const monthlyData = data?.monthly ?? [];

//     const ANIMATION_DURATION = 900;
//     const ANIMATION_BEGIN = 150;

//     return (
//         <div className="grid md:grid-cols-2 gap-6 animate-fade-in">
//             {/* Category Pie Chart */}
//             <DashboardCard className="delay-150">
//                 <div className="p-6 h-96 flex flex-col">
//                     <CardTitle className="text-xl mb-4 text-gray-100 font-bold border-b border-gray-800/50 pb-3 flex items-center gap-2">
//                         <PieChartIcon className="h-5 w-5 text-blue-400" /> Spending by Category
//                     </CardTitle>
//                     <div className="flex-1 flex items-center justify-center">
//                         {isLoading && <p className="text-gray-500">Processing telemetry...</p>}
//                         {categoryData.length > 0 ? (
//                             <ResponsiveContainer width="100%" height="90%">
//                                 <PieChart>
//                                     <Pie
//                                         data={categoryData}
//                                         dataKey="amount"
//                                         nameKey="category"
//                                         innerRadius={60}
//                                         outerRadius={100}
//                                         paddingAngle={5}
//                                         stroke={cardBgColor}
//                                         animationDuration={ANIMATION_DURATION}
//                                         animationBegin={ANIMATION_BEGIN}
//                                     >
//                                         {categoryData.map((_, i) => (
//                                             <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
//                                         ))}
//                                     </Pie>
//                                     <Tooltip
//                                         formatter={(value: number) => [`₹${value.toLocaleString("en-IN")}`]}
//                                         contentStyle={{ backgroundColor: cardBgColor, border: '1px solid #333333', color: '#e5e5e5', borderRadius: '4px' }}
//                                     />
//                                     <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ color: '#9CA3AF', fontSize: '14px' }} />
//                                 </PieChart>
//                             </ResponsiveContainer>
//                         ) : !isLoading && <p className="text-gray-500">No category data available.</p>}
//                     </div>
//                 </div>
//             </DashboardCard>

//             {/* Monthly Bar Chart */}
//             <DashboardCard className="delay-200">
//                 <div className="p-6 h-96 flex flex-col">
//                     <CardTitle className="text-xl mb-4 text-gray-100 font-bold border-b border-gray-800/50 pb-3 flex items-center gap-2">
//                         <BarChartIcon className="h-5 w-5 text-blue-400" /> Monthly Flow Analysis
//                     </CardTitle>
//                     <div className="flex-1 flex items-center justify-center">
//                         {isLoading && <p className="text-gray-500">Processing telemetry...</p>}
//                         {monthlyData.length > 0 ? (
//                             <ResponsiveContainer width="100%" height="90%">
//                                 <BarChart data={monthlyData} barCategoryGap="15%">
//                                     <CartesianGrid strokeDasharray="3 3" stroke="#333333" vertical={false} />
//                                     <XAxis dataKey="month" stroke="#9CA3AF" tickLine={false} axisLine={false} />
//                                     <YAxis stroke="#9CA3AF" tickFormatter={(value) => `₹${value}`} axisLine={false} />
//                                     <Tooltip
//                                         formatter={(value: number) => [`₹${value.toLocaleString("en-IN")}`]}
//                                         contentStyle={{ backgroundColor: cardBgColor, border: '1px solid #333333', color: '#e5e5e5', borderRadius: '4px' }}
//                                     />
//                                     <Legend wrapperStyle={{ color: '#9CA3AF', paddingTop: '10px' }} iconType="circle" />
//                                     <Bar dataKey="income" fill="#45f745" radius={[4, 4, 0, 0]} name="Income (INFLOW)" animationDuration={ANIMATION_DURATION} animationBegin={ANIMATION_BEGIN} />
//                                     <Bar dataKey="expense" fill="#f74545" radius={[4, 4, 0, 0]} name="Expense (OUTFLOW)" animationDuration={ANIMATION_DURATION} animationBegin={ANIMATION_BEGIN + 100} />
//                                 </BarChart>
//                             </ResponsiveContainer>
//                         ) : !isLoading && <p className="text-gray-500">No monthly data available.</p>}
//                     </div>
//                 </div>
//             </DashboardCard>
//         </div>
//     );
// }

// export default AnalyticsCharts;

// "use client";

// import useSWR from "swr";
// import dynamic from "next/dynamic";
// import DashboardCard from "./dashboard-card";
// import { CardTitle } from "@/components/ui/card";
// import {
//   PieChart as PieChartIcon,
//   BarChart as BarChartIcon,
//   DollarSign,
//   Coffee,
//   Home,
//   ShoppingCart,
// } from "lucide-react";
// import { swrFetcher, API_BASE } from "@/lib/api";

// type CategoryTotal = { category: string; amount: number };
// type MonthlyRow = { month: string; income: number; expense: number };
// type AnalyticsResponse = {
//   categoryTotals?: CategoryTotal[];
//   monthly?: MonthlyRow[];
// };

// // ApexCharts is client-only
// const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

// // Lucide icons for categories
// const ICONS: Record<string, string> = {
//   fuel: "💧", // Use emojis for HTML labels inside ApexCharts
//   salary: "💵",
//   food: "🍔",
//   rent: "🏠",
//   shopping: "🛒",
//   entertainment: "🎮",
//   travel: "✈️",
//   bills: "📄",
//   others: "🔹",
// };

// const CHART_COLORS = ["#2f6ff5", "#45f745", "#f74545", "#8b5cf6", "#f59e0b", "#06b6d4"];
// const cardBgColor = "#1c1c1c";

// const AnalyticsCharts: React.FC = () => {
//   const { data, error, isLoading } = useSWR<AnalyticsResponse>(
//     `${API_BASE}/analytics`,
//     swrFetcher
//   );

//   const categoryData = data?.categoryTotals?.filter((c) => c.amount > 0) ?? [];
//   const monthlyData = data?.monthly ?? [];

//   // Pie Chart
//   const pieSeries = categoryData.map((c) => c.amount);
//   const pieLabels = categoryData.map((c) => c.category);

//   const pieOptions: ApexCharts.ApexOptions = {
//     chart: {
//       type: "pie",
//       background: cardBgColor,
//       animations: { enabled: true, easing: "easeinout", speed: 800 },
//       toolbar: { show: false },
//     },
//     labels: pieLabels,
//     colors: CHART_COLORS,
//     legend: {
//       position: "right",
//       labels: { colors: "#e5e5e5" },
//       markers: { radius: 6 },
//       itemMargin: { vertical: 4 },
//     },
//     tooltip: {
//       theme: "dark",
//       y: { formatter: (val) => `₹${val.toLocaleString("en-IN")}` },
//     },
//     dataLabels: {
//       enabled: true,
//       style: { colors: ["#fff"], fontSize: "14px", fontWeight: "600" },
//       formatter: (val, opts) => {
//         const category = opts?.w?.config.labels?.[opts.seriesIndex];
//         const icon = ICONS[category as string] || "🔹";
//         return `${icon} ${val.toFixed(0)}%`;
//       },
//     },
//   };

//   // Bar Chart
//   const barSeries = [
//     { name: "Income", data: monthlyData.map((m) => m.income) },
//     { name: "Expense", data: monthlyData.map((m) => m.expense) },
//   ];

//   const barOptions: ApexCharts.ApexOptions = {
//     chart: {
//       type: "bar",
//       stacked: false,
//       background: cardBgColor,
//       animations: { enabled: true, easing: "easeinout", speed: 1000 },
//       toolbar: { show: false },
//     },
//     plotOptions: { bar: { columnWidth: "50%", borderRadius: 6 } },
//     colors: ["#45f745", "#f74545"], // Income green, Expense red
//     dataLabels: {
//       enabled: true,
//       style: { colors: ["#fff"] },
//       formatter: (val) => `₹${val.toLocaleString("en-IN")}`,
//       offsetY: -8,
//     },
//     xaxis: {
//       categories: monthlyData.map((m) => m.month),
//       labels: { style: { colors: "#9CA3AF" } },
//       axisBorder: { show: false },
//       axisTicks: { show: false },
//     },
//     yaxis: {
//       labels: { style: { colors: "#9CA3AF" } },
//     },
//     tooltip: {
//       theme: "dark",
//       y: { formatter: (val) => `₹${val.toLocaleString("en-IN")}` },
//     },
//     legend: {
//       position: "top",
//       labels: { colors: "#e5e5e5" },
//     },
//     grid: {
//       borderColor: "#333",
//       strokeDashArray: 3,
//     },
//   };

//   return (
//     <div className="grid md:grid-cols-2 gap-6 animate-fade-in">
//       {/* Pie Chart */}
//       <DashboardCard className="delay-150">
//         <div className="p-6 h-96 flex flex-col bg-[#1c1c1c] rounded-lg">
//           <CardTitle className="text-xl mb-4 text-gray-100 font-bold border-b border-gray-800/50 pb-3 flex items-center gap-2">
//             <PieChartIcon className="h-5 w-5 text-blue-400" /> Spending by Category
//           </CardTitle>
//           <div className="flex-1 flex items-center justify-center">
//             {isLoading && <p className="text-gray-500">Loading chart...</p>}
//             {!isLoading && categoryData.length > 0 && (
//               <Chart options={pieOptions} series={pieSeries} type="pie" width="100%" height="90%" />
//             )}
//             {!isLoading && categoryData.length === 0 && (
//               <p className="text-gray-500">No category data available.</p>
//             )}
//           </div>
//         </div>
//       </DashboardCard>

//       {/* Bar Chart */}
//       <DashboardCard className="delay-200">
//         <div className="p-6 h-96 flex flex-col bg-[#1c1c1c] rounded-lg">
//           <CardTitle className="text-xl mb-4 text-gray-100 font-bold border-b border-gray-800/50 pb-3 flex items-center gap-2">
//             <BarChartIcon className="h-5 w-5 text-blue-400" /> Monthly Flow Analysis
//           </CardTitle>
//           <div className="flex-1 flex items-center justify-center">
//             {isLoading && <p className="text-gray-500">Loading chart...</p>}
//             {!isLoading && monthlyData.length > 0 && (
//               <Chart options={barOptions} series={barSeries} type="bar" width="100%" height="90%" />
//             )}
//             {!isLoading && monthlyData.length === 0 && (
//               <p className="text-gray-500">No monthly data available.</p>
//             )}
//           </div>
//         </div>
//       </DashboardCard>
//     </div>
//   );
// };

// export default AnalyticsCharts;


"use client";

import { useState } from "react";
import useSWR from "swr";
import DashboardCard from "./dashboard-card";
import { CardTitle } from "@/components/ui/card";
import {
  PieChart as PieChartIcon,
  BarChart3,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { swrFetcher, API_BASE } from "@/lib/api";

type CategoryTotal = { category: string; amount: number };
type MonthlyRow = { month: string; income: number; expense: number };
type AnalyticsResponse = {
  categoryTotals?: CategoryTotal[];
  monthly?: MonthlyRow[];
};

// Category icon mapping
const getCategoryIcon = (category: string) => {
  const icons: Record<string, string> = {
    fuel: "⛽",
    salary: "💰",
    food: "🍽️",
    rent: "🏠",
    shopping: "🛍️",
    entertainment: "🎮",
    travel: "✈️",
    bills: "📋",
    others: "📌",
  };
  return icons[category.toLowerCase()] || "📌";
};

// Modern color palette
const CHART_COLORS = [
  "#3b82f6", "#10b981", "#f59e0b", "#ef4444", 
  "#8b5cf6", "#ec4899", "#06b6d4", "#f97316",
];

// Custom Donut Chart Component
const DonutChart = ({ data, total }: { data: any[]; total: number }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const size = 300;
  const center = size / 2;
  const radius = 100;
  const innerRadius = 60;

  let currentAngle = -90;
  const paths = data.map((item, index) => {
    const percentage = (item.amount / total) * 100;
    const angle = (percentage / 100) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;

    currentAngle = endAngle;

    const x1 = center + radius * Math.cos((startAngle * Math.PI) / 180);
    const y1 = center + radius * Math.sin((startAngle * Math.PI) / 180);
    const x2 = center + radius * Math.cos((endAngle * Math.PI) / 180);
    const y2 = center + radius * Math.sin((endAngle * Math.PI) / 180);

    const ix1 = center + innerRadius * Math.cos((startAngle * Math.PI) / 180);
    const iy1 = center + innerRadius * Math.sin((startAngle * Math.PI) / 180);
    const ix2 = center + innerRadius * Math.cos((endAngle * Math.PI) / 180);
    const iy2 = center + innerRadius * Math.sin((endAngle * Math.PI) / 180);

    const largeArc = angle > 180 ? 1 : 0;

    const path = `
      M ${x1} ${y1}
      A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}
      L ${ix2} ${iy2}
      A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${ix1} ${iy1}
      Z
    `;

    const midAngle = (startAngle + endAngle) / 2;
    const labelRadius = (radius + innerRadius) / 2;
    const labelX = center + labelRadius * Math.cos((midAngle * Math.PI) / 180);
    const labelY = center + labelRadius * Math.sin((midAngle * Math.PI) / 180);

    return {
      path,
      color: CHART_COLORS[index % CHART_COLORS.length],
      percentage: percentage.toFixed(1),
      labelX,
      labelY,
      item,
      showLabel: percentage > 5,
    };
  });

  const handleMouseMove = (e: React.MouseEvent, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setHoveredIndex(index);
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${size} ${size}`}
        style={{ maxWidth: "400px", margin: "0 auto", display: "block" }}
      >
        {paths.map((p, i) => (
          <g key={i}>
            <path
              d={p.path}
              fill={p.color}
              stroke="#18181b"
              strokeWidth="2"
              style={{
                cursor: "pointer",
                opacity: hoveredIndex === null || hoveredIndex === i ? 1 : 0.6,
                transition: "all 0.3s ease",
                transform: hoveredIndex === i ? "scale(1.05)" : "scale(1)",
                transformOrigin: "center",
              }}
              onMouseMove={(e) => handleMouseMove(e, i)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
            {p.showLabel && (
              <text
                x={p.labelX}
                y={p.labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontSize="14"
                fontWeight="700"
                style={{
                  textShadow: "1px 1px 3px rgba(0,0,0,0.8)",
                  pointerEvents: "none",
                }}
              >
                {p.percentage}%
              </text>
            )}
          </g>
        ))}
        <text
          x={center}
          y={center - 10}
          textAnchor="middle"
          fill="#a1a1aa"
          fontSize="14"
          fontWeight="600"
        >
          Total Spending
        </text>
        <text
          x={center}
          y={center + 15}
          textAnchor="middle"
          fill="#ffffff"
          fontSize="20"
          fontWeight="700"
        >
          ₹{total.toLocaleString("en-IN")}
        </text>
      </svg>

      {hoveredIndex !== null && (
        <div
          style={{
            position: "absolute",
            left: tooltipPos.x + 10,
            top: tooltipPos.y + 10,
            backgroundColor: "#18181b",
            border: "1px solid #52525b",
            borderRadius: "8px",
            padding: "12px",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.8)",
            pointerEvents: "none",
            zIndex: 1000,
            minWidth: "160px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <span style={{ fontSize: "20px" }}>
              {getCategoryIcon(paths[hoveredIndex].item.category)}
            </span>
            <span style={{ color: "#fafafa", fontWeight: "600", fontSize: "14px" }}>
              {paths[hoveredIndex].item.category.charAt(0).toUpperCase() +
                paths[hoveredIndex].item.category.slice(1)}
            </span>
          </div>
          <div style={{ color: "#ffffff", fontWeight: "700", fontSize: "16px", marginBottom: "4px" }}>
            ₹{paths[hoveredIndex].item.amount.toLocaleString("en-IN")}
          </div>
          <div style={{ color: "#a1a1aa", fontSize: "12px" }}>
            {paths[hoveredIndex].percentage}% of total
          </div>
        </div>
      )}

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "16px", marginTop: "20px" }}>
        {data.map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
              opacity: hoveredIndex === null || hoveredIndex === i ? 1 : 0.5,
              transition: "opacity 0.3s",
            }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: CHART_COLORS[i % CHART_COLORS.length],
              }}
            />
            <span style={{ color: "#e4e4e7", fontSize: "13px" }}>
              {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Custom Bar Chart Component
const BarChartCustom = ({ data }: { data: MonthlyRow[] }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  if (data.length === 0) return null;

  const maxValue = Math.max(...data.map((d) => Math.max(d.income, d.expense)));
  const chartHeight = 300;
  const chartWidth = 600;
  const barWidth = 40;
  const gap = 20;
  const groupWidth = barWidth * 2 + gap;
  const totalWidth = data.length * groupWidth;
  const padding = { top: 40, right: 40, bottom: 60, left: 60 };

  const handleMouseMove = (e: React.MouseEvent, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setHoveredIndex(index);
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflowX: "auto" }}>
      <svg
        width={Math.max(chartWidth, totalWidth + padding.left + padding.right)}
        height={chartHeight + padding.top + padding.bottom}
      >
        {/* Grid lines */}
        {[0, 1, 2, 3, 4].map((i) => {
          const y = padding.top + (chartHeight / 4) * i;
          const value = maxValue - (maxValue / 4) * i;
          return (
            <g key={i}>
              <line
                x1={padding.left}
                y1={y}
                x2={totalWidth + padding.left}
                y2={y}
                stroke="#27272a"
                strokeDasharray="3,3"
              />
              <text
                x={padding.left - 10}
                y={y}
                textAnchor="end"
                dominantBaseline="middle"
                fill="#a1a1aa"
                fontSize="12"
              >
                ₹{(value / 1000).toFixed(0)}k
              </text>
            </g>
          );
        })}

        {/* Bars */}
        {data.map((item, index) => {
          const x = padding.left + index * groupWidth;
          const incomeHeight = (item.income / maxValue) * chartHeight;
          const expenseHeight = (item.expense / maxValue) * chartHeight;

          return (
            <g key={index}>
              {/* Income bar */}
              <rect
                x={x}
                y={padding.top + chartHeight - incomeHeight}
                width={barWidth}
                height={incomeHeight}
                fill="#10b981"
                rx="8"
                ry="8"
                style={{
                  cursor: "pointer",
                  opacity: hoveredIndex === null || hoveredIndex === index ? 1 : 0.6,
                  transition: "all 0.3s ease",
                }}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={() => setHoveredIndex(null)}
              />

              {/* Expense bar */}
              <rect
                x={x + barWidth + gap}
                y={padding.top + chartHeight - expenseHeight}
                width={barWidth}
                height={expenseHeight}
                fill="#ef4444"
                rx="8"
                ry="8"
                style={{
                  cursor: "pointer",
                  opacity: hoveredIndex === null || hoveredIndex === index ? 1 : 0.6,
                  transition: "all 0.3s ease",
                }}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={() => setHoveredIndex(null)}
              />

              {/* Month label */}
              <text
                x={x + groupWidth / 2}
                y={padding.top + chartHeight + 20}
                textAnchor="middle"
                fill="#a1a1aa"
                fontSize="12"
                transform={`rotate(-45 ${x + groupWidth / 2} ${padding.top + chartHeight + 20})`}
              >
                {item.month}
              </text>
            </g>
          );
        })}
      </svg>

      {hoveredIndex !== null && (
        <div
          style={{
            position: "absolute",
            left: tooltipPos.x + 10,
            top: tooltipPos.y + 10,
            backgroundColor: "#18181b",
            border: "1px solid #52525b",
            borderRadius: "8px",
            padding: "16px",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.8)",
            pointerEvents: "none",
            zIndex: 1000,
            minWidth: "200px",
          }}
        >
          <div
            style={{
              color: "#fafafa",
              fontWeight: "600",
              fontSize: "14px",
              marginBottom: "12px",
              paddingBottom: "8px",
              borderBottom: "1px solid #52525b",
            }}
          >
            {data[hoveredIndex].month}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#a1a1aa", fontSize: "12px" }}>Income:</span>
              <span style={{ color: "#10b981", fontWeight: "700", fontSize: "13px" }}>
                ₹{data[hoveredIndex].income.toLocaleString("en-IN")}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#a1a1aa", fontSize: "12px" }}>Expense:</span>
              <span style={{ color: "#ef4444", fontWeight: "700", fontSize: "13px" }}>
                ₹{data[hoveredIndex].expense.toLocaleString("en-IN")}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: "8px",
                borderTop: "1px solid #52525b",
              }}
            >
              <span style={{ color: "#fafafa", fontSize: "12px", fontWeight: "600" }}>Balance:</span>
              <span
                style={{
                  color:
                    data[hoveredIndex].income - data[hoveredIndex].expense >= 0
                      ? "#10b981"
                      : "#ef4444",
                  fontWeight: "700",
                  fontSize: "13px",
                }}
              >
                ₹
                {(data[hoveredIndex].income - data[hoveredIndex].expense).toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginTop: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "12px", height: "12px", borderRadius: "4px", backgroundColor: "#10b981" }} />
          <span style={{ color: "#e4e4e7", fontSize: "13px", fontWeight: "600" }}>Income</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "12px", height: "12px", borderRadius: "4px", backgroundColor: "#ef4444" }} />
          <span style={{ color: "#e4e4e7", fontSize: "13px", fontWeight: "600" }}>Expense</span>
        </div>
      </div>
    </div>
  );
};

const AnalyticsCharts: React.FC = () => {
  const { data, error, isLoading } = useSWR<AnalyticsResponse>(
    `${API_BASE}/analytics`,
    swrFetcher
  );

  const categoryData = data?.categoryTotals?.filter((c) => c.amount > 0) ?? [];
  const monthlyData = data?.monthly ?? [];

  const totalExpense = categoryData.reduce((sum, c) => sum + c.amount, 0);
  const totalIncome = monthlyData.reduce((sum, m) => sum + m.income, 0);
  const totalMonthlyExpense = monthlyData.reduce((sum, m) => sum + m.expense, 0);

  if (error) {
    return (
      <div
        style={{
          padding: "24px",
          textAlign: "center",
          color: "#f87171",
          backgroundColor: "#18181b",
          borderRadius: "8px",
          border: "1px solid #27272a",
        }}
      >
        <p style={{ fontWeight: "600" }}>Failed to load analytics data</p>
        <p style={{ fontSize: "14px", color: "#71717a", marginTop: "8px" }}>{error.message}</p>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6 animate-fade-in">
      {/* Donut Chart Card */}
      <DashboardCard className="delay-150">
        <div className="p-6 flex flex-col bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-xl border border-zinc-800/50 shadow-2xl h-full min-h-[500px]">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-800/50">
            <CardTitle className="text-xl text-zinc-100 font-bold flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <PieChartIcon className="h-5 w-5 text-blue-400" />
              </div>
              Spending by Category
            </CardTitle>
            {!isLoading && categoryData.length > 0 && (
              <div className="text-right">
                <p className="text-xs text-zinc-500 font-medium">Total</p>
                <p className="text-lg font-bold text-zinc-100">
                  ₹{totalExpense.toLocaleString("en-IN")}
                </p>
              </div>
            )}
          </div>

          <div className="flex-1 flex items-center justify-center min-h-[350px]">
            {isLoading && (
              <div className="flex flex-col items-center gap-3">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                <p className="text-zinc-500 text-sm font-medium">Loading chart...</p>
              </div>
            )}
            {!isLoading && categoryData.length > 0 && (
              <DonutChart data={categoryData} total={totalExpense} />
            )}
            {!isLoading && categoryData.length === 0 && (
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="p-4 bg-zinc-800/50 rounded-full">
                  <PieChartIcon className="h-12 w-12 text-zinc-600" />
                </div>
                <p className="text-zinc-500 font-medium">No category data available</p>
                <p className="text-zinc-600 text-sm">Start adding transactions to see insights</p>
              </div>
            )}
          </div>
        </div>
      </DashboardCard>

      {/* Bar Chart Card */}
      <DashboardCard className="delay-200">
        <div className="p-6 flex flex-col bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-xl border border-zinc-800/50 shadow-2xl h-full min-h-[500px]">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-800/50">
            <CardTitle className="text-xl text-zinc-100 font-bold flex items-center gap-3">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <BarChart3 className="h-5 w-5 text-purple-400" />
              </div>
              Monthly Flow Analysis
            </CardTitle>
            {!isLoading && monthlyData.length > 0 && (
              <div className="flex gap-4">
                <div className="text-right">
                  <p className="text-xs text-zinc-500 font-medium flex items-center gap-1 justify-end">
                    <TrendingUp className="h-3 w-3 text-green-400" /> Income
                  </p>
                  <p className="text-sm font-bold text-green-400">
                    ₹{totalIncome.toLocaleString("en-IN")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-zinc-500 font-medium flex items-center gap-1 justify-end">
                    <TrendingDown className="h-3 w-3 text-red-400" /> Expense
                  </p>
                  <p className="text-sm font-bold text-red-400">
                    ₹{totalMonthlyExpense.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex-1 flex items-center justify-center min-h-[350px]">
            {isLoading && (
              <div className="flex flex-col items-center gap-3">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
                <p className="text-zinc-500 text-sm font-medium">Loading chart...</p>
              </div>
            )}
            {!isLoading && monthlyData.length > 0 && <BarChartCustom data={monthlyData} />}
            {!isLoading && monthlyData.length === 0 && (
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="p-4 bg-zinc-800/50 rounded-full">
                  <BarChart3 className="h-12 w-12 text-zinc-600" />
                </div>
                <p className="text-zinc-500 font-medium">No monthly data available</p>
                <p className="text-zinc-600 text-sm">Transaction history will appear here</p>
              </div>
            )}
          </div>
        </div>
      </DashboardCard>
    </div>
  );
};

export default AnalyticsCharts;