// // =========================
// // components/add-transaction-form.tsx
// // =========================
// "use client"

// import { useState } from "react"
// import { mutate } from "swr"
// import { API_BASE, authHeaders } from "@/lib/api"
// import { Plus } from "lucide-react"

// export default function AddTransactionForm() {
//   const [type, setType] = useState<"income" | "expense">("expense")
//   const [category, setCategory] = useState("")
//   const [amount, setAmount] = useState("")
//   const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
//   const [submitting, setSubmitting] = useState(false)

//   async function onSubmit(e: React.FormEvent) {
//     e.preventDefault()
//     setSubmitting(true)
//     try {
//       const res = await fetch(`${API_BASE}/transactions`, {
//         method: "POST",
//         headers: authHeaders(),
//         body: JSON.stringify({ type, category, amount: Number(amount), date }),
//       })
//       if (!res.ok) throw new Error(await res.text())
      
//       setCategory("")
//       setAmount("")
//       setDate(new Date().toISOString().slice(0, 10))
      
//       mutate("/transactions")
//       mutate("/analytics")
//     } catch (err) {
//       console.error(err)
//     } finally {
//       setSubmitting(false)
//     }
//   }

//   return (
//     <div className="bg-black border border-gray-800 rounded-lg overflow-hidden">
//       <div className="border-b border-gray-800 px-5 py-3">
//         <h3 className="text-base font-semibold text-gray-100">Add Transaction</h3>
//       </div>
      
//       <div className="p-5">
//         <div className="space-y-4">
//           {/* Type Selector */}
//           <div className="flex gap-2">
//             <button
//               type="button"
//               onClick={() => setType("income")}
//               className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
//                 type === "income"
//                   ? "bg-emerald-600 text-white"
//                   : "bg-gray-900 text-gray-400 hover:bg-gray-800"
//               }`}
//             >
//               Income
//             </button>
//             <button
//               type="button"
//               onClick={() => setType("expense")}
//               className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
//                 type === "expense"
//                   ? "bg-red-600 text-white"
//                   : "bg-gray-900 text-gray-400 hover:bg-gray-800"
//               }`}
//             >
//               Expense
//             </button>
//           </div>

//           {/* Category */}
//           <div>
//             <label className="text-xs text-gray-500 font-medium mb-1.5 block">Category</label>
//             <input
//               className="w-full bg-gray-900 border border-gray-800 text-gray-100 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               placeholder="Salary, Rent, Food..."
//               required
//             />
//           </div>

//           {/* Amount & Date */}
//           <div className="grid grid-cols-2 gap-3">
//             <div>
//               <label className="text-xs text-gray-500 font-medium mb-1.5 block">Amount (₹)</label>
//               <input
//                 type="number"
//                 className="w-full bg-gray-900 border border-gray-800 text-gray-100 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
//                 value={amount}
//                 onChange={(e) => setAmount(e.target.value)}
//                 placeholder="0.00"
//                 min="0.01"
//                 step="any"
//                 required
//               />
//             </div>
//             <div>
//               <label className="text-xs text-gray-500 font-medium mb-1.5 block">Date</label>
//               <input
//                 type="date"
//                 className="w-full bg-gray-900 border border-gray-800 text-gray-100 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
//                 value={date}
//                 onChange={(e) => setDate(e.target.value)}
//                 required
//               />
//             </div>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="button"
//             onClick={onSubmit}
//             disabled={submitting || !amount || !category.trim()}
//             className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-gray-800 disabled:text-gray-600 text-white font-medium py-2.5 rounded-md transition-all text-sm flex items-center justify-center gap-2"
//           >
//             {submitting ? (
//               "Adding..."
//             ) : (
//               <>
//                 <Plus className="h-4 w-4" />
//                 Add Transaction
//               </>
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }



// components/add-transaction-form.tsx
"use client";

import { useState } from "react";
import { mutate } from "swr";
import { API_BASE, authHeaders } from "@/lib/api";
import { Plus, ArrowUp, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

// ---------------------- COMMON INPUT STYLE ----------------------
const inputClass = "w-full bg-gray-900 border border-gray-800 text-gray-100 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all";

// ---------------------- FORM COMPONENT ----------------------
export default function AddTransactionForm() {
  const [formData, setFormData] = useState({
    type: "expense" as "income" | "expense",
    category: "",
    amount: "",
    date: new Date().toISOString().slice(0, 10),
  });
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // ---------------------- HANDLERS ----------------------
  const handleInputChange = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleTypeChange = (type: "income" | "expense") => {
    setFormData((prev) => ({ ...prev, type }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.category.trim() || !formData.amount) return;

    setSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch(`${API_BASE}/transactions`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({
          type: formData.type,
          category: formData.category,
          amount: Number(formData.amount),
          date: formData.date,
        }),
      });

      if (!res.ok) throw new Error(await res.text());

      // Reset form
      setFormData({
        type: "expense",
        category: "",
        amount: "",
        date: new Date().toISOString().slice(0, 10),
      });

      // Revalidate SWR data
      mutate("/transactions");
      mutate("/analytics");
    } catch (err: any) {
      console.error(err);
      setErrorMsg("Failed to add transaction.");
    } finally {
      setSubmitting(false);
    }
  };

  // ---------------------- RENDER ----------------------
  return (
    <motion.div
      className="bg-black border border-gray-800 rounded-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
    >
      {/* HEADER */}
      <div className="border-b border-gray-800 px-5 py-3">
        <h3 className="text-base font-semibold text-gray-100">Add Transaction</h3>
      </div>

      {/* FORM */}
      <form className="p-5 space-y-4" onSubmit={onSubmit}>
        {/* TYPE SELECTOR */}
        <div className="flex gap-2">
          {["income", "expense"].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => handleTypeChange(t as "income" | "expense")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-transform transform ${
                formData.type === t
                  ? t === "income"
                    ? "bg-emerald-600 text-white"
                    : "bg-red-600 text-white"
                  : "bg-gray-900 text-gray-400 hover:bg-gray-800 hover:scale-105"
              } flex items-center justify-center gap-1`}
            >
              {t === "income" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* CATEGORY */}
        <div>
          <label className="text-xs text-gray-500 font-medium mb-1.5 block">Category</label>
          <input
            className={inputClass}
            value={formData.category}
            onChange={(e) => handleInputChange("category", e.target.value)}
            placeholder="Salary, Rent, Food..."
            required
          />
        </div>

        {/* AMOUNT & DATE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-gray-500 font-medium mb-1.5 block">Amount (₹)</label>
            <input
              type="number"
              className={inputClass}
              value={formData.amount}
              onChange={(e) => handleInputChange("amount", e.target.value)}
              placeholder="0.00"
              min="0.01"
              step="any"
              required
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 font-medium mb-1.5 block">Date</label>
            <input
              type="date"
              className={inputClass}
              value={formData.date}
              onChange={(e) => handleInputChange("date", e.target.value)}
              required
            />
          </div>
        </div>

        {/* ERROR MESSAGE */}
        {errorMsg && <p className="text-red-400 text-sm">{errorMsg}</p>}

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={submitting || !formData.amount || !formData.category.trim()}
          className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-gray-800 disabled:text-gray-600 text-white font-medium py-2.5 rounded-md transition-transform transform hover:scale-105 flex items-center justify-center gap-2 text-sm"
        >
          {submitting ? "Adding..." : <>
            <Plus className="h-4 w-4" />
            Add Transaction
          </>}
        </button>
      </form>
    </motion.div>
  );
}
