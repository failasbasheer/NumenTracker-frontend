// "use client";

// import ProtectedRoute from "@/components/protected-route";
// import { NavBar } from "@/components/nav-bar";

// // UI Components (Assuming these are available in your project structure)
// import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
// import { Button } from "../components/ui/button";
// import { Input } from "../components/ui/input";
// import { Label } from "../components/ui/label";

// // Core Utilities
// import { useState } from "react";
// import useSWR, { mutate } from "swr";
// // NOTE: I'm assuming API_BASE/authHeaders/swrFetcher/TxType are defined in your lib/api
// import { API_BASE, authHeaders, swrFetcher, Transaction as TxType } from "@/lib/api";

// // Lucide Icons
// import {
// Zap, PlusCircle, DollarSign, Calendar, Tag,
// TrendingUp, TrendingDown, Scale, PieChart as PieChartIcon, BarChart as BarChartIcon,
// History, Trash2
// } from "lucide-react";

// // Recharts Components (for AnalyticsDashboard)
// import {
// ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend,
// BarChart, XAxis, YAxis, CartesianGrid, Bar,
// } from "recharts";


// // --- TYPE DEFINITIONS (Shared) ---
// type CategoryTotal = { category: string; amount: number };
// type MonthlyRow = { month: string; income: number; expense: number };
// type AnalyticsResponse = {
// totalIncome?: number;
// totalExpense?: number;
// balance?: number;
// categoryTotals?: CategoryTotal[];
// monthly?: MonthlyRow[];
// };

// // Refined Chart Colors (High-Contrast, matching the detected theme)
// const CHART_COLORS = ["#2f6ff5", "#45f745", "#f74545", "#8b5cf6", "#f59e0b", "#06b6d4"];

// // --- Reusable Card Class for Screenshot Look ---
// // Flat, dark, subtle elevation, no glow border
// const cardBg = "bg-neutral-900"; // Close to #1c1c1c
// const professionalCardClass = `${cardBg} shadow-xl shadow-black/50 rounded-xl transition-all duration-300`;

// // A utility component simplified to match the flat, dark aesthetic
// const DashboardCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
// <div className={`
// p-0 rounded-xl ${professionalCardClass} ${className}
// `}>
// {children}
// </div>
// )


// // --- 1. AddTransactionForm Component Logic (Themed) ---
// function AddTransactionForm() {
// const [type, setType] = useState<"income" | "expense">("expense");
// const [category, setCategory] = useState("");
// const [amount, setAmount] = useState<number>(0);
// const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
// const [submitting, setSubmitting] = useState(false);

// async function onSubmit(e: React.FormEvent) {
// e.preventDefault();
// setSubmitting(true);
// try {
// const res = await fetch(`${API_BASE}/transactions`, {
// method: "POST",
// headers: authHeaders(),
// body: JSON.stringify({ type, category, amount, date }),
// });
// if (!res.ok) throw new Error(await res.text());
// setCategory("");
// setAmount(0);
// setDate(new Date().toISOString().slice(0, 10));
// // Invalidate both lists
// mutate(`${API_BASE}/transactions`);
// mutate(`${API_BASE}/analytics`);
// } catch (err) {
// console.error(err);
// } finally {
// setSubmitting(false);
// }
// }

// return (
// <DashboardCard className="p-0">
// <CardHeader className={`p-6 border-b border-gray-800/50`}>
// <CardTitle className="text-2xl font-bold text-gray-100 flex items-center gap-3">
// <Zap className="h-5 w-5 text-blue-500" /> Add Transaction
// </CardTitle>
// </CardHeader>
// <CardContent className="pt-8 px-6 pb-6">
// <form onSubmit={onSubmit} className="grid gap-6">
// <div>
// <Label className="text-gray-300 mb-2 block font-semibold flex items-center gap-2 text-sm">
// <DollarSign className="h-4 w-4 text-blue-400" /> Transaction Type
// </Label>
// {/* Simple, slightly raised toggle for the screenshot look */}
// <div className="flex bg-gray-800 rounded-lg p-1.5 shadow-inner shadow-black/30">
// <button
// type="button"
// // Green highlight for Income
// className={`flex-1 p-2 rounded-md font-medium transition-colors duration-200 ${type === 'income' ? 'bg-green-600 text-black shadow-md' : 'text-gray-400 hover:bg-gray-700'}`}
// onClick={() => setType('income')}
// >
// Income
// </button>
// <button
// type="button"
// // Red highlight for Expense
// className={`flex-1 p-2 rounded-md font-medium transition-colors duration-200 ${type === 'expense' ? 'bg-red-600 text-black shadow-md' : 'text-gray-400 hover:bg-gray-700'}`}
// onClick={() => setType('expense')}
// >
// Expense
// </button>
// </div>
// </div>
// <div className="grid grid-cols-2 gap-4">
// <div>
// <Label className="text-gray-300 mb-2 block font-semibold flex items-center gap-2 text-sm">
// <Tag className="h-4 w-4 text-blue-400" /> Category
// </Label>
// <Input
// // Darker input field to match screenshot style
// className="bg-gray-800 border border-gray-700/50 text-gray-100 placeholder:text-gray-500 focus:border-blue-500 p-3 rounded-lg"
// value={category}
// onChange={(e) => setCategory(e.target.value)}
// required
// placeholder="Salary, Rent, Shopping..."
// />
// </div>
// <div>
// <Label className="text-gray-300 mb-2 block font-semibold flex items-center gap-2 text-sm">
// <DollarSign className="h-4 w-4 text-blue-400" /> Amount (₹)
// </Label>
// <Input
// type="number"
// className="bg-gray-800 border border-gray-700/50 text-gray-100 placeholder:text-gray-500 focus:border-blue-500 p-3 rounded-lg"
// value={amount}
// onChange={(e) => setAmount(Number(e.target.value))}
// required
// min="0.01"
// step="any"
// />
// </div>
// </div>
// <div>
// <Label className="text-gray-300 mb-2 block font-semibold flex items-center gap-2 text-sm">
// <Calendar className="h-4 w-4 text-blue-400" /> Date
// </Label>
// <Input
// type="date"
// className="bg-gray-800 border border-gray-700/50 text-gray-100 placeholder:text-gray-500 focus:border-blue-500 p-3 rounded-lg"
// value={date}
// onChange={(e) => setDate(e.target.value)}
// required
// />
// </div>

// <Button
// type="submit"
// disabled={submitting || amount <= 0 || category.trim() === ""}
// // Saturated blue button
// className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition-all duration-300 shadow-lg shadow-blue-900/40 disabled:bg-gray-700 disabled:shadow-none mt-2 flex items-center justify-center gap-2 text-lg"
// >
// {submitting ? (
// <>
// <Zap className="h-5 w-5 animate-spin" /> Processing...
// </>
// ) : (
// <>
// <PlusCircle className="h-5 w-5" /> Commit Transaction
// </>
// )}
// </Button>
// </form>
// </CardContent>
// </DashboardCard>
// );
// }


// // --- 2. AnalyticsStats Component Logic (Themed) ---
// function AnalyticsStats() {
// const { data, error, isLoading } = useSWR<AnalyticsResponse>("/analytics", swrFetcher);

// // StatBox simplified to match the flat card look
// const StatBox = ({ title, value, colorClass, Icon }: { title: string; value: string; colorClass: string; Icon: React.ElementType }) => (
// <DashboardCard className="p-6">
//     <div className="flex items-start gap-4">
//         <Icon className={`h-8 w-8 ${colorClass} shrink-0`} />
//         <div>
//             <div className="text-xs uppercase tracking-widest text-gray-400 font-medium">{title}</div>
//             <div className={`text-2xl font-extrabold ${colorClass} tracking-tight mt-1`}>{value}</div>
//         </div>
//     </div>
// </DashboardCard>
// );

// if (isLoading) {
// return <div className="grid md:grid-cols-3 gap-6"><p className="text-gray-500 p-4">Loading financial summary...</p></div>;
// }
// if (error) {
// return <div className="grid md:grid-cols-3 gap-6"><p className="text-red-500 p-4">Failed to load summary.</p></div>;
// }

// const totalIncome = data?.totalIncome ?? 0;
// const totalExpense = data?.totalExpense ?? 0;
// const balance = data?.balance ?? totalIncome - totalExpense;

// return (
// <div className="w-full grid md:grid-cols-3 gap-6 animate-fade-in">
//     {/* Green highlight for Income */}
//     <StatBox title="Total Income" value={`₹${totalIncome.toLocaleString("en-IN")}`} colorClass="text-green-400" Icon={TrendingUp} />
//     {/* Red highlight for Expense */}
//     <StatBox title="Total Expenses" value={`₹${totalExpense.toLocaleString("en-IN")}`} colorClass="text-red-400" Icon={TrendingDown} />
//     {/* Blue highlight for Net Balance */}
//     <StatBox title="Net Balance" value={`₹${balance.toLocaleString("en-IN")}`} colorClass={balance >= 0 ? "text-blue-400" : "text-red-500"} Icon={Scale} />
// </div>
// );
// }


// // --- 3. AnalyticsDashboard Component Logic (Themed) ---
// function AnalyticsDashboard() {
// const { data, error, isLoading } = useSWR<AnalyticsResponse>("/analytics", swrFetcher);

// const categoryData = data?.categoryTotals?.filter(c => c.amount > 0) ?? [];
// const monthlyData = data?.monthly ?? [];

// const ANIMATION_DURATION = 900;
// const ANIMATION_BEGIN = 150;

// return (
// <div className="grid gap-6 animate-fade-in">
// <div className="grid md:grid-cols-2 gap-6">
// {/* Category Pie Chart */}
// <DashboardCard className="delay-150">
// <div className="p-6 h-96 flex flex-col">
// <CardTitle className="text-xl mb-4 text-gray-100 font-bold border-b border-gray-800/50 pb-3 flex items-center gap-2">
// <PieChartIcon className="h-5 w-5 text-blue-400" /> Spending by Category
// </CardTitle>
// <div className="flex-1 flex items-center justify-center">
// {isLoading && <p className="text-gray-500">Processing telemetry...</p>}
// {error && <p className="text-red-500">Failed to load analytics feed.</p>}
// {categoryData.length > 0 ? (
// <ResponsiveContainer width="100%" height="90%">
// <PieChart>
// <Pie
// data={categoryData}
// dataKey="amount"
// nameKey="category"
// innerRadius={60}
// outerRadius={100}
// paddingAngle={5}
// stroke="#1c1c1c"
// animationDuration={ANIMATION_DURATION}
// animationBegin={ANIMATION_BEGIN}
// >
// {categoryData.map((_, i) => (
// <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
// ))}
// </Pie>
// <Tooltip
// formatter={(value: number) => [`₹${value.toLocaleString("en-IN")}`]}
// contentStyle={{ backgroundColor: '#1c1c1c', border: '1px solid #333333', color: '#e5e5e5', borderRadius: '4px' }}
// itemStyle={{ color: '#e5e5e5', fontWeight: 'bold' }}
// labelStyle={{ color: '#9CA3AF' }}
// />
// <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ color: '#9CA3AF', fontSize: '14px' }} />
// </PieChart>
// </ResponsiveContainer>
// ) : !isLoading && <p className="text-gray-500">No category data available.</p>}
// </div>
// </div>
// </DashboardCard>

// {/* Monthly Bar Chart */}
// <DashboardCard className="delay-200">
// <div className="p-6 h-96 flex flex-col">
// <CardTitle className="text-xl mb-4 text-gray-100 font-bold border-b border-gray-800/50 pb-3 flex items-center gap-2">
// <BarChartIcon className="h-5 w-5 text-blue-400" /> Monthly Flow Analysis
// </CardTitle>
// <div className="flex-1 flex items-center justify-center">
// {monthlyData.length > 0 ? (
// <ResponsiveContainer width="100%" height="90%">
// <BarChart data={monthlyData} barCategoryGap="15%">
// <CartesianGrid strokeDasharray="3 3" stroke="#333333" vertical={false} />
// <XAxis dataKey="month" stroke="#9CA3AF" tickLine={false} axisLine={false} />
// <YAxis stroke="#9CA3AF" tickFormatter={(value) => `₹${value}`} axisLine={false} />
// <Tooltip
// formatter={(value: number) => [`₹${value.toLocaleString("en-IN")}`]}
// contentStyle={{ backgroundColor: '#1c1c1c', border: '1px solid #333333', color: '#e5e5e5', borderRadius: '4px' }}
// itemStyle={{ color: '#e5e5e5', fontWeight: 'bold' }}
// labelStyle={{ color: '#9CA3AF' }}
// />
// <Legend wrapperStyle={{ color: '#9CA3AF', paddingTop: '10px' }} iconType="circle" />
// {/* Green highlight for Income */}
// <Bar dataKey="income" fill="#45f745" radius={[4, 4, 0, 0]} name="Income (INFLOW)" animationDuration={ANIMATION_DURATION} animationBegin={ANIMATION_BEGIN} />
// {/* Red highlight for Expense */}
// <Bar dataKey="expense" fill="#f74545" radius={[4, 4, 0, 0]} name="Expense (OUTFLOW)" animationDuration={ANIMATION_DURATION} animationBegin={ANIMATION_BEGIN + 100} />
// </BarChart>
// </ResponsiveContainer>
// ) : !isLoading && <p className="text-gray-500">No monthly data available.</p>}
// </div>
// </div>
// </DashboardCard>
// </div>
// </div>
// );
// }


// // --- 4. TransactionList Component Logic (Themed) ---
// function TransactionList() {
// const { data, error, isLoading } = useSWR<TxType[]>("/transactions", swrFetcher);

// async function handleDelete(id?: string) {
// if (!id) return;
// // Optimistically update cache
// mutate("/transactions", (data ?? []).filter(tx => tx._id !== id), false);
// mutate("/analytics");
// try {
// const res = await fetch(`${API_BASE}/transactions/${id}`, { // Using API_BASE here for trust
// method: "DELETE",
// headers: authHeaders(),
// });
// if (!res.ok) {
// console.error("Delete failed:", await res.text());
// mutate("/transactions"); // Revert or refetch
// return;
// }
// mutate("/transactions"); // Final refetch
// mutate("/analytics");
// } catch (err) {
// console.error("Delete request error:", err);
// mutate("/transactions"); // Revert or refetch on network error
// }
// }
// return (
// <DashboardCard className="delay-300">
// <CardHeader className={`p-6 border-b border-gray-800/50`}>
// <CardTitle className="text-2xl text-gray-100 font-bold flex items-center gap-2">
// <History className="h-5 w-5 text-blue-400" /> Recent Transaction History
// </CardTitle>
// </CardHeader>
// <CardContent className="p-0">
// {isLoading && <p className="p-6 text-gray-500">Loading data packets...</p>}
// {error && <p className="p-6 text-red-500">Error loading transaction history.</p>}
// {data && data.length === 0 && <p className="p-6 text-gray-500">No transactions recorded yet. Start by adding one!</p>}
// <ul className="divide-y divide-gray-800/50">
// {data?.slice(0, 10).map(tx => ( // Limit to 10 for a cleaner "feed" look
// <li
// key={tx._id}
// className="flex justify-between py-4 px-6 items-center hover:bg-neutral-800 transition-colors duration-200"
// >
// <div className="flex-1 min-w-0">
// <span className="font-bold text-lg text-gray-100 truncate block">{tx.category}</span>
// <span className={`text-xs font-semibold mt-1 px-3 py-1 rounded-full tracking-wider inline-block ${tx.type === "income" ? "bg-green-700/30 text-green-300" : "bg-red-700/30 text-red-300"}`}>
// {tx.type.toUpperCase()}
// </span>
// <div className="text-sm text-gray-500 mt-2">
// <Calendar className="h-3 w-3 inline mr-1" /> {new Date(tx.date).toLocaleDateString("en-IN", { year: 'numeric', month: 'short', day: 'numeric' })}
// </div>
// </div>
// <div className="flex items-center gap-5 ml-4">
// <span className={`font-extrabold text-xl ${tx.type === "income" ? "text-green-400" : "text-red-400"}`}>
// {tx.type === "income" ? "+" : "-"}₹{tx.amount.toLocaleString("en-IN")}
// </span>
// <Button
// size="icon"
// onClick={() => tx._id && handleDelete(tx._id)}
// // Red highlight for Delete button
// className="bg-red-800/50 hover:bg-red-700/70 text-red-400 h-9 w-9 p-2 rounded-md transition-all duration-200"
// title="Delete Transaction"
// >
// <Trash2 className="h-4 w-4" />
// </Button>

// </div>
// </li>
// ))}
// </ul>
// </CardContent>
// </DashboardCard>
// );
// }


// // --- 5. Main DashboardPage Component (Themed) ---
// export default function DashboardPage() {
// return (
// <ProtectedRoute>
// {/* Base background color is very dark, approaching black (#0a0a0a - #0f0f0f) */}
// <div className="min-h-screen bg-gray-950 text-gray-100">
// <NavBar />
// <main className="mx-auto max-w-7xl px-4 py-12 space-y-8">
// {/* Header Section */}
// <section className="animate-fade-in">
// <h1 className="text-4xl font-extrabold tracking-tight text-gray-100">
// Finance Tracker
// </h1>
// <p className="text-gray-400 mt-1 text-base">
// Track your money. Stay in control.
// </p>
// </section>
// {/* Financial Indicators (Stats) at the very top below header */}
// <section>
// <AnalyticsStats />
// </section>
// {/* Charts */}
// <section className="grid md:grid-cols-2 gap-6">
// <AnalyticsDashboard />
// </section>
// {/* Transaction Form and List in a vertical stack to match the screenshot flow */}
// <section className="space-y-6">
// {/* Transaction Form Title - for visual grouping */}
// <h2 className="text-2xl font-bold text-gray-100 pt-2">Add Transaction</h2>
// <AddTransactionForm />
// </section>
// <section className="space-y-6">
// {/* Transaction List Title - for visual grouping */}
// <h2 className="text-2xl font-bold text-gray-100 pt-2">Transaction History</h2>
// <TransactionList />
// </section>
// </main>
// </div>
// </ProtectedRoute>
// );
// }




"use client"

import ProtectedRoute from "@/components/protected-route"
import { NavBar } from "@/components/nav-bar"
import AnalyticsStats from "@/components/analytics-stats"
import AnalyticsDashboard from "@/components/analytics-dashboard"
import AddTransactionForm from "@/components/add-transaction-form"
import TransactionList from "@/components/transaction-list"

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#0a0a0a]">
        <NavBar />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-100 mb-1">Dashboard</h1>
            <p className="text-sm text-gray-500">Track your finances</p>
          </div>

          {/* Stats */}
          <AnalyticsStats />

          {/* Charts */}
          <AnalyticsDashboard />

          {/* Form and List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <AddTransactionForm />
            <TransactionList />
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}