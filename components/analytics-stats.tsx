
// "use client"

// import useSWR from "swr"
// import { API_BASE, swrFetcher } from "@/lib/api"
// import { TrendingUp, TrendingDown, Wallet } from "lucide-react"

// type AnalyticsResponse = {
//   totalIncome?: number
//   totalExpense?: number
//   balance?: number
// }

// export default function AnalyticsStats() {
//   const { data, error, isLoading } = useSWR<AnalyticsResponse>("/analytics", swrFetcher)

//   type StatCardProps = {
//     title: string;
//     value: string | number;
//     colorClass: string;
//     Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
//   };

//   const StatCard: React.FC<StatCardProps> = ({ title, value, colorClass, Icon }) => (
//     <div className="bg-black border border-gray-800 rounded-lg p-5 hover:border-gray-700 transition-all">
//       <div className="flex items-center justify-between mb-3">
//         <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">{title}</span>
//         <Icon className={`h-5 w-5 ${colorClass}`} />
//       </div>
//       <div className={`text-2xl font-bold ${colorClass}`}>{value}</div>
//     </div>
//   )

//   if (isLoading) {
//     return (
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {[1, 2, 3].map(i => (
//           <div key={i} className="bg-black border border-gray-800 rounded-lg p-5 animate-pulse">
//             <div className="h-3 bg-gray-800 rounded w-20 mb-3"></div>
//             <div className="h-7 bg-gray-800 rounded w-28"></div>
//           </div>
//         ))}
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="bg-black border border-red-900 rounded-lg p-5">
//         <p className="text-red-400 text-sm">Failed to load stats</p>
//       </div>
//     )
//   }

//   const totalIncome = data?.totalIncome ?? 0
//   const totalExpense = data?.totalExpense ?? 0
//   const balance = data?.balance ?? totalIncome - totalExpense

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//       <StatCard 
//         title="Income" 
//         value={`₹${totalIncome.toLocaleString("en-IN")}`} 
//         colorClass="text-emerald-400" 
//         Icon={TrendingUp} 
//       />
//       <StatCard 
//         title="Expenses" 
//         value={`₹${totalExpense.toLocaleString("en-IN")}`} 
//         colorClass="text-red-400" 
//         Icon={TrendingDown} 
//       />
//       <StatCard 
//         title="Balance" 
//         value={`₹${balance.toLocaleString("en-IN")}`} 
//         colorClass={balance >= 0 ? "text-blue-400" : "text-red-400"} 
//         Icon={Wallet} 
//       />
//     </div>
//   )
// }


"use client";

import useSWR from "swr";
import { API_BASE, swrFetcher } from "@/lib/api";
import { TrendingUp, TrendingDown, Wallet, Info } from "lucide-react";
import { motion } from "framer-motion";
import CountUp from "react-countup";

// ---------------------- TYPES ----------------------
type AnalyticsResponse = {
  totalIncome?: number;
  totalExpense?: number;
  balance?: number;
};

type StatCardProps = {
  title: string;
  value: number; // numeric value for counting animation
  colorClass: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

// ---------------------- STAT CARD COMPONENT ----------------------
const StatCard: React.FC<StatCardProps> = ({ title, value, colorClass, Icon }) => {
  return (
    <motion.div
      className="bg-black border border-gray-800 rounded-lg p-5 cursor-pointer transition-all hover:scale-105 hover:shadow-lg hover:bg-gradient-to-br hover:from-gray-900 hover:via-gray-800 hover:to-gray-900"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ scale: 1.03, boxShadow: "0 10px 25px rgba(0,255,255,0.1)" }}
      transition={{ type: "spring", stiffness: 200, damping: 20, duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">{title}</span>
        <div className="flex items-center gap-1">
          <Icon className={`h-6 w-6 ${colorClass}`} />
          <Info className="h-4 w-4 text-gray-400 hover:text-gray-200" />
        </div>
      </div>
      <div className={`text-2xl font-bold ${colorClass}`}>
        <CountUp
          end={value}
          duration={1.5}      // animation duration in seconds
          separator=","       // 1,000 format
          prefix="₹"          // currency symbol
        />
      </div>
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
    {
      title: "Balance",
      value: balance,
      colorClass: balance >= 0 ? "text-blue-400" : "text-red-400",
      Icon: Wallet,
    },
  ];

  const gridClass = "grid grid-cols-1 md:grid-cols-3 gap-4";

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
      {stats.map((stat) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          colorClass={stat.colorClass}
          Icon={stat.Icon}
        />
      ))}
    </motion.div>
  );
}
