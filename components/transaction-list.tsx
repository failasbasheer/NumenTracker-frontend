// =========================
// components/transaction-list.tsx
// =========================
"use client"

import useSWR, { mutate } from "swr"
import { API_BASE, authHeaders, swrFetcher, Transaction as TxType } from "@/lib/api"
import { Trash2 } from "lucide-react"

export default function TransactionList() {
  const { data, error, isLoading } = useSWR<TxType[]>("/transactions", swrFetcher)

  async function handleDelete(id?: string) {
    if (!id) return
    
    mutate("/transactions", data?.filter(tx => tx._id !== id), false)
    mutate("/analytics")
    
    try {
      const res = await fetch(`${API_BASE}/transactions/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      })
      
      if (!res.ok) {
        console.error("Delete failed")
        mutate("/transactions")
        return
      }
      
      mutate("/transactions")
      mutate("/analytics")
    } catch (err) {
      console.error("Delete error:", err)
      mutate("/transactions")
    }
  }

  return (
    <div className="bg-black border border-gray-800 rounded-lg overflow-hidden">
      <div className="border-b border-gray-800 px-5 py-3">
        <h3 className="text-base font-semibold text-gray-100">Recent Transactions</h3>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {isLoading ? (
          <div className="p-5 text-center">
            <p className="text-gray-500 text-sm">Loading...</p>
          </div>
        ) : error ? (
          <div className="p-5 text-center">
            <p className="text-red-400 text-sm">Error loading data</p>
          </div>
        ) : !data || data.length === 0 ? (
          <div className="p-5 text-center">
            <p className="text-gray-500 text-sm">No transactions yet</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-800">
            {data.slice(0, 10).map((tx) => (
              <li
                key={tx._id}
                className="flex items-center justify-between px-5 py-3 hover:bg-gray-900/50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-gray-100 text-sm">{tx.category}</span>
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded ${
                        tx.type === "income"
                          ? "bg-emerald-950 text-emerald-400"
                          : "bg-red-950 text-red-400"
                      }`}
                    >
                      {tx.type}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(tx.date).toLocaleDateString("en-IN", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                </div>
                
                <div className="flex items-center gap-3 ml-4">
                  <span
                    className={`font-semibold text-base ${
                      tx.type === "income" ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    {tx.type === "income" ? "+" : "-"}₹{tx.amount.toLocaleString("en-IN")}
                  </span>
                  <button
                    onClick={() => handleDelete(tx._id)}
                    className="p-1.5 rounded-md bg-gray-900 hover:bg-red-950 hover:text-red-400 text-gray-500 transition-all"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}