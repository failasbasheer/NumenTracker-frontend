

// "use client"

// import { useEffect, useState } from "react"
// import { useRouter } from "next/navigation"
// import { login } from "@/lib/api"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import Link from "next/link"

// const countries = [
//   { code: "+1", name: "US", flag: "🇺🇸" },
//   { code: "+44", name: "UK", flag: "🇬🇧" },
//   { code: "+91", name: "IN", flag: "🇮🇳" },
//   { code: "+61", name: "AU", flag: "🇦🇺" },
//   { code: "+81", name: "JP", flag: "🇯🇵" },
//   { code: "+49", name: "DE", flag: "🇩🇪" },
//   { code: "+33", name: "FR", flag: "🇫🇷" },
//   { code: "+86", name: "CN", flag: "🇨🇳" },
//   { code: "+7", name: "RU", flag: "🇷🇺" },
// ]

// export default function LoginPage() {
//   const router = useRouter()
//   const [countryCode, setCountryCode] = useState("+91")
//   const [phone, setPhone] = useState("")
//   const [password, setPassword] = useState("")
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [success, setSuccess] = useState<string | null>(null)

//   useEffect(() => {
//     if (typeof window !== "undefined" && localStorage.getItem("token")) router.replace("/")
//   }, [router])

//   const onSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setLoading(true)
//     setError(null)
//     setSuccess(null)
//     try {
//       const fullPhone = countryCode + phone
//       const data = await login(fullPhone, password)

//       localStorage.setItem("token", data.token)
//       localStorage.setItem(
//         "user",
//         JSON.stringify({ name: data.name, phone: data.phone })
//       )

//       setSuccess(`Welcome back, ${data.name}!`)
//       router.replace("/")
//     } catch (err: any) {
//       setError(err.message || "Login failed")
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <main className="flex min-h-screen items-center justify-center px-6 py-12 bg-black">
//       <Card className="w-full max-w-md rounded-2xl border border-white/20 bg-black shadow-md">
//         <CardHeader className="border-b border-white/20">
//           <CardTitle className="text-center text-white text-2xl font-semibold tracking-tight">
//             Welcome Back
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           {error && (
//             <div className="rounded bg-white/10 px-4 py-2 text-sm text-white">
//               {error}
//             </div>
//           )}
//           {success && (
//             <div className="rounded bg-white/10 px-4 py-2 text-sm text-white">
//               {success}
//             </div>
//           )}
//           <form onSubmit={onSubmit} className="grid gap-6">
//             <div className="grid gap-2">
//               <Label className="text-gray-300">Country Code</Label>
//               <select
//                 value={countryCode}
//                 onChange={(e) => setCountryCode(e.target.value)}
//                 disabled={loading}
//                 className="rounded border border-white/20 px-3 py-2 bg-black text-white focus:outline-none focus:ring-2 focus:ring-white/30"
//               >
//                 {countries.map((c) => (
//                   <option key={c.code} value={c.code}>
//                     {c.flag} {c.code} ({c.name})
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="grid gap-2">
//               <Label className="text-gray-300">Phone Number</Label>
//               <Input
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//                 placeholder="Enter phone number"
//                 required
//                 disabled={loading}
//                 autoComplete="tel"
//                 className="bg-black text-white border border-white/20 focus:ring-2 focus:ring-white/30"
//               />
//             </div>
//             <div className="grid gap-2">
//               <Label className="text-gray-300">Password</Label>
//               <Input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Enter password"
//                 required
//                 disabled={loading}
//                 autoComplete="current-password"
//                 className="bg-black text-white border border-white/20 focus:ring-2 focus:ring-white/30"
//               />
//             </div>
//             <Button
//               type="submit"
//               disabled={loading}
//               className="bg-white text-black font-semibold hover:bg-gray-100"
//             >
//               {loading ? "Signing in..." : "Sign In"}
//             </Button>
//           </form>
//           <p className="mt-6 text-center text-sm text-gray-400">
//             No account?{" "}
//             <Link
//               href="/signup"
//               className="underline text-white hover:text-gray-300"
//             >
//               Sign up
//             </Link>
//           </p>
//         </CardContent>
//       </Card>
//     </main>
//   )
// }



"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { login } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { motion, Variants } from "framer-motion"

const countries = [
  { code: "+1", name: "US", flag: "🇺🇸" },
  { code: "+44", name: "UK", flag: "🇬🇧" },
  { code: "+91", name: "IN", flag: "🇮🇳" },
  { code: "+61", name: "AU", flag: "🇦🇺" },
  { code: "+81", name: "JP", flag: "🇯🇵" },
  { code: "+971", name: "UAE", flag: "🇦🇪" },
]

const fieldVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.35, ease: "easeOut" },
  }),
}

export default function LoginPage() {
  const router = useRouter()
  const [countryCode, setCountryCode] = useState("+91")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<{ phone?: string; password?: string }>({})

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("token")) router.replace("/")
  }, [router])

  const validateFields = () => {
    const errors: { phone?: string; password?: string } = {}
    if (!phone.trim()) errors.phone = "Phone number is required"
    else if (!/^\d{6,15}$/.test(phone.trim())) errors.phone = "Invalid phone number"
    if (!password.trim()) errors.password = "Password is required"
    else if (password.length < 6) errors.password = "Password must be at least 6 characters"
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateFields()) return

    setLoading(true)
    setError(null)
    setSuccess(null)
    try {
      const fullPhone = countryCode + phone
      const data = await login(fullPhone, password)
      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify({ name: data.name, phone: data.phone }))
      setSuccess(`Welcome back, ${data.name}!`)
      setTimeout(() => router.replace("/"), 1000)
    } catch (err: any) {
      setError(err.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12 bg-black">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Card className="w-full max-w-lg rounded-2xl border border-white/15 bg-black shadow-lg px-10 py-10">
          <CardHeader className="border-b border-white/10 mb-6">
            <CardTitle className="text-center text-white text-3xl font-semibold tracking-tight">
              Welcome Back
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-8">
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-md bg-red-500/10 border border-red-500/40 px-4 py-3 text-sm text-red-300"
              >
                {error}
              </motion.div>
            )}
            {success && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-md bg-green-500/10 border border-green-500/40 px-4 py-3 text-sm text-green-300"
              >
                {success}
              </motion.div>
            )}

            <form onSubmit={onSubmit} className="flex flex-col gap-8">
              {/* Country Code + Phone */}
              <motion.div
                custom={0}
                initial="hidden"
                animate="visible"
                variants={fieldVariants}
                className="flex flex-col gap-2"
              >
                <Label className="text-gray-300">Phone Number</Label>
                <div className="flex gap-3">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    disabled={loading}
                    className="w-28 rounded-md border border-white/20 bg-black text-white focus:ring-2 focus:ring-white/30 focus:outline-none text-base h-[52px] px-3"
                  >
                    {countries.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.flag} {c.code}
                      </option>
                    ))}
                  </select>
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter phone number"
                    required
                    disabled={loading}
                    className={`flex-1 h-[52px] text-base rounded-md border ${
                      fieldErrors.phone ? "border-red-500" : "border-white/20"
                    } bg-black text-white focus:ring-2 focus:ring-white/30 focus:outline-none px-4`}
                  />
                </div>
                {fieldErrors.phone && <span className="text-xs text-red-400">{fieldErrors.phone}</span>}
              </motion.div>

              {/* Password */}
              <motion.div
                custom={1}
                initial="hidden"
                animate="visible"
                variants={fieldVariants}
                className="flex flex-col gap-2"
              >
                <Label className="text-gray-300">Password</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  disabled={loading}
                  className={`h-[52px] text-base rounded-md border ${
                    fieldErrors.password ? "border-red-500" : "border-white/20"
                  } bg-black text-white focus:ring-2 focus:ring-white/30 focus:outline-none px-4`}
                />
                {fieldErrors.password && <span className="text-xs text-red-400">{fieldErrors.password}</span>}
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.4 } }}
              >
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-white text-black font-semibold py-4 rounded-md text-lg transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </motion.div>
            </form>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5 } }}
              className="text-center text-sm text-gray-400"
            >
              No account?{" "}
              <Link href="/signup" className="underline text-white hover:text-gray-300">
                Sign up
              </Link>
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  )
}
