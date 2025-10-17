

// "use client"

// import { useEffect, useState } from "react"
// import { useRouter } from "next/navigation"
// import { signup } from "@/lib/api"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import Link from "next/link"

// export default function SignupPage() {
//   const router = useRouter()
//   const [countryCode, setCountryCode] = useState("+91")
//   const [phone, setPhone] = useState("")
//   const [name, setName] = useState("")
//   const [password, setPassword] = useState("")
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [success, setSuccess] = useState<string | null>(null)

//   useEffect(() => {
//     if (typeof window !== "undefined" && localStorage.getItem("token")) router.replace("/")
//   }, [router])

//   const onSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError(null)
//     setSuccess(null)

//     setLoading(true)
//     try {
//       const fullPhone = countryCode + phone
//       const data = await signup(name, fullPhone, password)
//       localStorage.setItem("token", data.token)
//       localStorage.setItem(
//         "user",
//         JSON.stringify({
//           name: data.name,
//           phone: data.phone
//         })
//       )
//       setSuccess("Account created successfully!")
//       router.replace("/")
//     } catch (err: any) {
//       setError(err.message || "Signup failed")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const isFormValid = phone.trim() !== "" && name.trim() !== "" && password.trim() !== ""

//   return (
//     <main className="flex min-h-screen items-center justify-center px-6 py-12 bg-black">
//       <Card className="w-full max-w-md rounded-2xl border border-white/20 bg-black shadow-md">
//         <CardHeader className="border-b border-white/20">
//           <CardTitle className="text-center text-white text-2xl font-semibold tracking-tight">
//             Create Your Account
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4 pt-4">
//           {error && <div className="rounded bg-white/10 px-4 py-2 text-sm text-white">{error}</div>}
//           {success && <div className="rounded bg-white/10 px-4 py-2 text-sm text-white">{success}</div>}
//           <form onSubmit={onSubmit} className="flex flex-col gap-6">
//             <div className="flex flex-col gap-1">
//               <Label className="text-gray-300">Full Name</Label>
//               <Input
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 placeholder="Enter your full name"
//                 required
//                 disabled={loading}
//                 className="py-3 px-4 rounded-md border border-white/20 bg-black text-white focus:ring-2 focus:ring-white/30 focus:outline-none"
//               />
//             </div>
//             <div className="flex flex-col gap-1">
//               <Label className="text-gray-300">Phone Number</Label>
//               <select
//                 value={countryCode}
//                 onChange={e => setCountryCode(e.target.value)}
//                 disabled={loading}
//                 className="mb-2 py-2 px-3 rounded-md border border-white/20 bg-black text-white focus:ring-2 focus:ring-white/30 focus:outline-none"
//               >
//                 <option value="+1">🇺🇸 +1 (USA)</option>
//                 <option value="+44">🇬🇧 +44 (UK)</option>
//                 <option value="+91">🇮🇳 +91 (India)</option>
//                 <option value="+61">🇦🇺 +61 (Australia)</option>
//                 <option value="+81">🇯🇵 +81 (Japan)</option>
//                 <option value="+49">🇩🇪 +49 (Germany)</option>
//                 <option value="+971">🇦🇪 +971 (UAE)</option>
//                 <option value="+86">🇨🇳 +86 (China)</option>
//                 <option value="+33">🇫🇷 +33 (France)</option>
//               </select>
//               <Input
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//                 placeholder="Enter phone number"
//                 required
//                 disabled={loading}
//                 type="tel"
//                 className="py-3 px-4 rounded-md border border-white/20 bg-black text-white focus:ring-2 focus:ring-white/30 focus:outline-none"
//               />
//             </div>
//             <div className="flex flex-col gap-1">
//               <Label className="text-gray-300">Password</Label>
//               <Input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Enter password"
//                 required
//                 disabled={loading}
//                 className="py-3 px-4 rounded-md border border-white/20 bg-black text-white focus:ring-2 focus:ring-white/30 focus:outline-none"
//               />
//             </div>
//             <Button
//               type="submit"
//               disabled={loading || !isFormValid}
//               className="bg-white text-black font-semibold py-3 rounded-md text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
//             >
//               {loading ? "Creating..." : "Sign Up"}
//             </Button>
//           </form>
//           <p className="mt-6 text-center text-sm text-gray-400">
//             Already have an account?{" "}
//             <Link href="/login" className="underline text-white hover:text-gray-300">
//               Sign in
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
import { signup } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { motion } from "framer-motion"

export default function SignupPage() {
  const router = useRouter()
  const [countryCode, setCountryCode] = useState("+91")
  const [phone, setPhone] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("token")) router.replace("/")
  }, [router])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)
    try {
      const fullPhone = countryCode + phone
      const data = await signup(name, fullPhone, password)
      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify({ name: data.name, phone: data.phone }))
      setSuccess("Account created successfully!")
      router.replace("/")
    } catch (err: any) {
      setError(err.message || "Signup failed")
    } finally {
      setLoading(false)
    }
  }

  const isFormValid = phone.trim() && name.trim() && password.trim()

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <Card className="w-full max-w-md rounded-2xl border border-white/15 bg-[#0a0a0a]/90 backdrop-blur-md shadow-xl">
          <CardHeader className="border-b border-white/10 pb-5">
            <CardTitle className="text-center text-white text-2xl font-semibold tracking-tight">
              Create Your Account
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-5 pt-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-md bg-red-500/10 border border-red-500/30 px-4 py-2 text-sm text-red-400"
              >
                {error}
              </motion.div>
            )}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-md bg-green-500/10 border border-green-500/30 px-4 py-2 text-sm text-green-400"
              >
                {success}
              </motion.div>
            )}

            <form onSubmit={onSubmit} className="flex flex-col gap-5">
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <Label className="text-gray-300 text-sm">Full Name</Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                  disabled={loading}
                  className="h-11 px-4 rounded-md border border-white/20 bg-black text-white focus:ring-2 focus:ring-white/30 focus:outline-none"
                />
              </div>

              {/* Phone + Code */}
              <div className="flex flex-col gap-1.5">
                <Label className="text-gray-300 text-sm">Phone Number</Label>
                <div className="flex gap-3">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    disabled={loading}
                    className="w-[90px] h-11 px-2 rounded-md border border-white/20 bg-black text-white focus:ring-2 focus:ring-white/30 focus:outline-none"
                  >
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+971">🇦🇪 +971</option>
                    <option value="+81">🇯🇵 +81</option>
                    <option value="+49">🇩🇪 +49</option>
                    <option value="+33">🇫🇷 +33</option>
                    <option value="+61">🇦🇺 +61</option>
                  </select>
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone number"
                    required
                    disabled={loading}
                    type="tel"
                    className="flex-1 h-11 px-4 rounded-md border border-white/20 bg-black text-white focus:ring-2 focus:ring-white/30 focus:outline-none"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <Label className="text-gray-300 text-sm">Password</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  disabled={loading}
                  className="h-11 px-4 rounded-md border border-white/20 bg-black text-white focus:ring-2 focus:ring-white/30 focus:outline-none"
                />
              </div>

              <motion.div whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.985 }}>
                <Button
                  type="submit"
                  disabled={loading || !isFormValid}
                  className="w-full bg-white text-black font-semibold h-11 rounded-md text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                >
                  {loading ? "Creating..." : "Sign Up"}
                </Button>
              </motion.div>
            </form>

            <p className="text-center text-sm text-gray-400">
              Already have an account?{" "}
              <Link href="/login" className="underline text-white hover:text-gray-300">
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  )
}
