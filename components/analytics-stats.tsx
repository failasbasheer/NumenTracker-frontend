
"use client"

import useSWR from "swr"
import { API_BASE, swrFetcher } from "@/lib/api"
import { TrendingUp, TrendingDown, Wallet } from "lucide-react"

type AnalyticsResponse = {
  totalIncome?: number
  totalExpense?: number
  balance?: number
}

export default function AnalyticsStats() {
  const { data, error, isLoading } = useSWR<AnalyticsResponse>("/analytics", swrFetcher)

  type StatCardProps = {
    title: string;
    value: string | number;
    colorClass: string;
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  };

  const StatCard: React.FC<StatCardProps> = ({ title, value, colorClass, Icon }) => (
    <div className="bg-black border border-gray-800 rounded-lg p-5 hover:border-gray-700 transition-all">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">{title}</span>
        <Icon className={`h-5 w-5 ${colorClass}`} />
      </div>
      <div className={`text-2xl font-bold ${colorClass}`}>{value}</div>
    </div>
  )

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-black border border-gray-800 rounded-lg p-5 animate-pulse">
            <div className="h-3 bg-gray-800 rounded w-20 mb-3"></div>
            <div className="h-7 bg-gray-800 rounded w-28"></div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-black border border-red-900 rounded-lg p-5">
        <p className="text-red-400 text-sm">Failed to load stats</p>
      </div>
    )
  }

  const totalIncome = data?.totalIncome ?? 0
  const totalExpense = data?.totalExpense ?? 0
  const balance = data?.balance ?? totalIncome - totalExpense

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard 
        title="Income" 
        value={`₹${totalIncome.toLocaleString("en-IN")}`} 
        colorClass="text-emerald-400" 
        Icon={TrendingUp} 
      />
      <StatCard 
        title="Expenses" 
        value={`₹${totalExpense.toLocaleString("en-IN")}`} 
        colorClass="text-red-400" 
        Icon={TrendingDown} 
      />
      <StatCard 
        title="Balance" 
        value={`₹${balance.toLocaleString("en-IN")}`} 
        colorClass={balance >= 0 ? "text-blue-400" : "text-red-400"} 
        Icon={Wallet} 
      />
    </div>
  )
}
