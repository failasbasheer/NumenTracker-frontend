// "use client"

// import ProtectedRoute from "@/components/protected-route"
// import { NavBar } from "@/components/nav-bar"
// import AddTransactionForm from  "@/components/add-transaction-form"

// export default function AddPage() {
//   return (
//     <ProtectedRoute>
//       <NavBar />
//       <main className="mx-auto max-w-3xl px-4 py-6 bg-[#0a0a0a]">
        
//         <AddTransactionForm />
//       </main>
//     </ProtectedRoute>
//   )
// }

"use client"

import ProtectedRoute from "@/components/protected-route"
import { NavBar } from "@/components/nav-bar"
import AddTransactionForm from "@/components/add-transaction-form"
import { motion, Variants, Transition } from "framer-motion"

export default function AddPage() {
  // Properly typed transition
  const defaultTransition: Transition = { duration: 0.4, ease: [0.42, 0, 0.58, 1] } // easeOut cubic-bezier

  const pageVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: defaultTransition },
  }

  const formContainerVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { ...defaultTransition, delay: 0.2 } },
  }

  return (
    <ProtectedRoute>
      <NavBar />
      <motion.main
        className="mx-auto max-w-3xl px-4 py-6 bg-[#0a0a0a] min-h-screen"
        initial="hidden"
        animate="visible"
        variants={pageVariants}
      >
        <motion.div
          variants={formContainerVariants}
          className="w-full"
        >
          <AddTransactionForm />
        </motion.div>
      </motion.main>
    </ProtectedRoute>
  )
}
