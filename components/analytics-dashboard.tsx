

// // components/analytics-dashboard.tsx
// // =========================
// "use client"

// import useSWR from "swr"
// import { API_BASE, swrFetcher } from "@/lib/api"
// import { PieChartIcon, BarChartIcon } from "lucide-react"
// import {
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   Legend,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
// } from "recharts"

// type CategoryTotal = { category: string; amount: number }
// type MonthlyRow = { month: string; income: number; expense: number }
// type AnalyticsResponse = {
//   categoryTotals?: CategoryTotal[]
//   monthly?: MonthlyRow[]
// }

// const CHART_COLORS = ["#3b82f6", "#10b981", "#ef4444", "#8b5cf6", "#f59e0b", "#06b6d4"]

// // Custom Tooltip for Pie Chart
// const CustomPieTooltip = ({ active, payload }: any) => {
//   if (active && payload && payload.length) {
//     return (
//       <div style={{
//         backgroundColor: "#000000",
//         border: "1px solid #374151",
//         borderRadius: "8px",
//         padding: "12px",
//         boxShadow: "0 4px 12px rgba(0, 0, 0, 0.8)",
//       }}>
//         <p style={{ color: "#f3f4f6", fontWeight: "600", marginBottom: "4px", fontSize: "13px" }}>
//           {payload[0].name}
//         </p>
//         <p style={{ color: "#ffffff", fontWeight: "700", fontSize: "15px" }}>
//           ₹{payload[0].value.toLocaleString("en-IN")}
//         </p>
//       </div>
//     );
//   }
//   return null;
// };

// // Custom Tooltip for Bar Chart
// const CustomBarTooltip = ({ active, payload, label }: any) => {
//   if (active && payload && payload.length) {
//     return (
//       <div style={{
//         backgroundColor: "#000000",
//         border: "1px solid #374151",
//         borderRadius: "8px",
//         padding: "12px",
//         boxShadow: "0 4px 12px rgba(0, 0, 0, 0.8)",
//         minWidth: "140px",
//       }}>
//         <p style={{ color: "#f3f4f6", fontWeight: "600", marginBottom: "8px", fontSize: "13px" }}>
//           {label}
//         </p>
//         {payload.map((entry: any, index: number) => (
//           <div key={index} style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
//             <span style={{ color: "#9ca3af", fontSize: "12px" }}>{entry.name}:</span>
//             <span style={{ color: entry.color, fontWeight: "700", fontSize: "13px", marginLeft: "12px" }}>
//               ₹{entry.value.toLocaleString("en-IN")}
//             </span>
//           </div>
//         ))}
//       </div>
//     );
//   }
//   return null;
// };

// export default function AnalyticsDashboard() {
//   const { data, error, isLoading } = useSWR<AnalyticsResponse>("/analytics", swrFetcher)
  
//   const categoryData = data?.categoryTotals?.filter(c => c.amount > 0) ?? []
//   const monthlyData = data?.monthly ?? []

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//       {/* Pie Chart */}
//       <div className="bg-black border border-gray-800 rounded-lg p-5">
//         <h3 className="text-base font-semibold text-gray-100 mb-4 pb-3 border-b border-gray-800 flex items-center gap-2">
//           <PieChartIcon className="h-4 w-4 text-blue-400" />
//           Category Breakdown
//         </h3>
//         <div className="h-72 w-full">
//           {isLoading ? (
//             <div className="flex items-center justify-center h-full">
//               <p className="text-gray-500 text-sm">Loading...</p>
//             </div>
//           ) : error ? (
//             <div className="flex items-center justify-center h-full">
//               <p className="text-red-400 text-sm">Failed to load</p>
//             </div>
//           ) : categoryData.length > 0 ? (
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   data={categoryData}
//                   dataKey="amount"
//                   nameKey="category"
//                   cx="50%"
//                   cy="50%"
//                   innerRadius={50}
//                   outerRadius={85}
//                   paddingAngle={3}
//                   stroke="transparent"
//                 >
//                   {categoryData.map((_, i) => (
//                     <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip 
//                   content={<CustomPieTooltip />}
//                   cursor={false}
//                 />
//                 <Legend
//                   verticalAlign="bottom"
//                   height={30}
//                   wrapperStyle={{ fontSize: "12px", color: "#9ca3af" }}
//                 />
//               </PieChart>
//             </ResponsiveContainer>
//           ) : (
//             <div className="flex items-center justify-center h-full">
//               <p className="text-gray-500 text-sm">No data</p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Bar Chart */}
//       <div className="bg-black border border-gray-800 rounded-lg p-5">
//         <h3 className="text-base font-semibold text-gray-100 mb-4 pb-3 border-b border-gray-800 flex items-center gap-2">
//           <BarChartIcon className="h-4 w-4 text-blue-400" />
//           Monthly Trends
//         </h3>
//         <div className="h-72 w-full">
//           {isLoading ? (
//             <div className="flex items-center justify-center h-full">
//               <p className="text-gray-500 text-sm">Loading...</p>
//             </div>
//           ) : error ? (
//             <div className="flex items-center justify-center h-full">
//               <p className="text-red-400 text-sm">Failed to load</p>
//             </div>
//           ) : monthlyData.length > 0 ? (
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={monthlyData}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
//                 <XAxis 
//                   dataKey="month" 
//                   stroke="#6b7280" 
//                   tickLine={false} 
//                   axisLine={false}
//                   style={{ fontSize: "12px" }}
//                 />
//                 <YAxis 
//                   stroke="#6b7280" 
//                   tickFormatter={(v) => `₹${v}`} 
//                   axisLine={false}
//                   style={{ fontSize: "12px" }}
//                 />
//                 <Tooltip
//                   content={<CustomBarTooltip />}
//                   cursor={{ fill: "rgba(55, 65, 81, 0.3)" }}
//                 />
//                 <Legend 
//                   wrapperStyle={{ paddingTop: "12px", fontSize: "12px" }}
//                 />
//                 <Bar dataKey="income" fill="#10b981" radius={[4, 4, 0, 0]} name="Income" />
//                 <Bar dataKey="expense" fill="#ef4444" radius={[4, 4, 0, 0]} name="Expense" />
//               </BarChart>
//             </ResponsiveContainer>
//           ) : (
//             <div className="flex items-center justify-center h-full">
//               <p className="text-gray-500 text-sm">No data</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }



// components/analytics-stats.tsx
"use client";

import useSWR from "swr";
import { API_BASE, swrFetcher } from "@/lib/api";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

// ---------------------- TYPES ----------------------
type AnalyticsResponse = {
  totalIncome?: number;
  totalExpense?: number;
  balance?: number;
};

type StatCardProps = {
  title: string;
  value: number;
  colorClass: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

// ---------------------- COUNT-UP HOOK ----------------------
const useCountUp = (target: number, duration: number = 1000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16);
    const step = () => {
      start += increment;
      if (start < target) {
        setCount(Math.floor(start));
        requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };
    step();
  }, [target, duration]);

  return count;
};

// ---------------------- STAT CARD COMPONENT ----------------------
const StatCard: React.FC<StatCardProps> = ({ title, value, colorClass, Icon }) => {
  const count = useCountUp(value);

  return (
    <motion.div
      className="bg-black border border-gray-800 rounded-lg p-5 hover:scale-105 hover:shadow-xl transition-all"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">{title}</span>
        <Icon className={`h-5 w-5 ${colorClass}`} />
      </div>
      <div className={`text-2xl font-bold ${colorClass}`}>₹{count.toLocaleString("en-IN")}</div>
    </motion.div>
  );
};

// ---------------------- MAIN COMPONENT ----------------------
export default function AnalyticsStats() {
  const { data, error, isLoading } = useSWR<AnalyticsResponse>("/analytics", swrFetcher);

  const totalIncome = data?.totalIncome ?? 0;
  const totalExpense = data?.totalExpense ?? 0;
  const balance = data?.balance ?? totalIncome - totalExpense;

  const stats = [
    { title: "Income", value: totalIncome, colorClass: "text-emerald-400", Icon: TrendingUp },
    { title: "Expenses", value: totalExpense, colorClass: "text-red-400", Icon: TrendingDown },
    { title: "Balance", value: balance, colorClass: balance >= 0 ? "text-blue-400" : "text-red-400", Icon: Wallet },
  ];

  const gridClass = "grid grid-cols-1 md:grid-cols-3 gap-6";

  if (isLoading) {
    return (
      <div className={gridClass}>
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-black border border-gray-800 rounded-lg p-5 animate-pulse">
            <div className="h-3 bg-gray-800 rounded w-20 mb-3"></div>
            <div className="h-7 bg-gray-800 rounded w-28"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-black border border-red-900 rounded-lg p-5">
        <p className="text-red-400 text-sm">Failed to load stats</p>
      </div>
    );
  }

  return (
    <motion.div
      className={gridClass}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.15 } },
      }}
    >
      <AnimatePresence>
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            colorClass={stat.colorClass}
            Icon={stat.Icon}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
