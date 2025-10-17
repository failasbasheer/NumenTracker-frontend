

// // =========================
// // components/nav-bar.tsx
// // =========================
// "use client"

// import Link from "next/link"
// import { useRouter } from "next/navigation"
// import { useEffect, useState } from "react"
// import { ChevronDown, LogOut, Zap } from "lucide-react"

// export function NavBar() {
//   const router = useRouter()
//   const [user, setUser] = useState<{ name?: string; phone?: string } | null>(null)
//   const [showDropdown, setShowDropdown] = useState(false)

//   useEffect(() => {
//     const storedUser = window.localStorage.getItem("user")
//     if (storedUser) {
//       setUser(JSON.parse(storedUser))
//     }
//   }, [])

//   function handleLogout() {
//     window.localStorage.removeItem("token")
//     window.localStorage.removeItem("user")
//     router.replace("/login")
//   }

//   return (
//     <header className="w-full bg-black border-b border-gray-800 sticky top-0 z-50 backdrop-blur-xl">
//       <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
//         <Link href="/" className="flex items-center gap-2 font-bold text-xl text-gray-100 hover:text-blue-400 transition-colors">
//           <Zap className="h-6 w-6 text-blue-500" />
//           Numen — Personal Finance Tracker
//         </Link>
        
//         <nav className="flex items-center gap-6">
//           <Link 
//             href="/" 
//             className="text-sm text-gray-400 hover:text-gray-100 transition-colors"
//           >
//             Dashboard
//           </Link>
//           <Link 
//             href="/add" 
//             className="text-sm text-gray-400 hover:text-gray-100 transition-colors"
//           >
//             Add Transaction
//           </Link>

//           {user && (
//             <div className="relative">
//               <button
//                 onClick={() => setShowDropdown(!showDropdown)}
//                 className="flex items-center gap-2 px-3 py-2 bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-lg text-sm text-gray-200 transition-colors"
//               >
//                 {user.name ?? user.phone}
//                 <ChevronDown className="h-4 w-4" />
//               </button>
              
//               {showDropdown && (
//                 <div className="absolute right-0 mt-2 w-48 bg-black border border-gray-800 rounded-lg shadow-xl overflow-hidden">
//                   <button
//                     onClick={handleLogout}
//                     className="w-full flex items-center gap-2 px-4 py-3 text-sm text-gray-300 hover:bg-red-950 hover:text-red-400 transition-colors"
//                   >
//                     <LogOut className="h-4 w-4" />
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}
//         </nav>
//       </div>
//     </header>
//   )
// }


// =========================
// components/nav-bar.tsx
// =========================
"use client"

import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { ChevronDown, LogOut } from "lucide-react"

export function NavBar() {
  const router = useRouter()
  const [user, setUser] = useState<{ name?: string; phone?: string } | null>(null)
  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    const storedUser = window.localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  function handleLogout() {
    window.localStorage.removeItem("token")
    window.localStorage.removeItem("user")
    router.replace("/login")
  }

  return (
    <header className="w-full bg-black border-b border-gray-800 sticky top-0 z-50 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        {/* LOGO + BRAND NAME */}
        <Link 
  href="/" 
  className="flex items-center gap-3 font-semibold text-lg text-white hover:text-gray-300 transition-colors"
>
  <Image
    src="/logo.png"
    alt="Numen Logo"
    width={28}
    height={28}
    className="object-contain"
  />
  <div className="flex flex-col leading-tight">
    <span className="text-white text-xl font-bold">Numen</span>
    <span className="text-gray-500 text-sm tracking-wide">
      Track. Understand. Grow.
    </span>
  </div>
</Link>

        
        {/* NAV LINKS */}
        <nav className="flex items-center gap-6">
          <Link 
            href="/" 
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Dashboard
          </Link>
          <Link 
            href="/add" 
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Add Transaction
          </Link>

          {user && (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 px-3 py-2 bg-gray-950 hover:bg-gray-900 border border-gray-800 rounded-lg text-sm text-gray-200 transition-colors"
              >
                {user.name ?? user.phone}
                <ChevronDown className="h-4 w-4" />
              </button>
              
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-black border border-gray-800 rounded-lg shadow-xl overflow-hidden">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-3 text-sm text-gray-300 hover:bg-red-950 hover:text-red-400 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}
