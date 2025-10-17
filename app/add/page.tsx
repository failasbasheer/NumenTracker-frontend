"use client"

import ProtectedRoute from "@/components/protected-route"
import { NavBar } from "@/components/nav-bar"
import AddTransactionForm from  "@/components/add-transaction-form"

export default function AddPage() {
  return (
    <ProtectedRoute>
      <NavBar />
      <main className="mx-auto max-w-3xl px-4 py-6 bg-[#0a0a0a]">
        
        <AddTransactionForm />
      </main>
    </ProtectedRoute>
  )
}
