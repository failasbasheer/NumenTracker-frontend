


"use client"

import ProtectedRoute from "@/components/protected-route"

import AnalyticsStats from "@/components/analytics-stats"
import AnalyticsDashboard from "@/components/analytics-dashboard"
import AddTransactionForm from "@/components/add-transaction-form"
import TransactionList from "@/components/transaction-list"
import { NavBar } from "@/components/nav-bar"


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