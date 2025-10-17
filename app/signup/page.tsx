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
//     <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-200 via-pink-200 to-yellow-200 px-6">
//       <Card className="w-full max-w-md rounded-xl shadow-xl p-8">
//         <div className="mb-6 text-center">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h1>
//           <p className="text-gray-600 text-sm">Join us and start managing your finances easily</p>
//         </div>
//         <CardContent className="pt-0">
//           {error && <div className="mb-4 rounded bg-red-100 px-4 py-3 text-sm text-red-700">{error}</div>}
//           {success && <div className="mb-4 rounded bg-green-100 px-4 py-3 text-sm text-green-700">{success}</div>}
//           <form onSubmit={onSubmit} className="flex flex-col gap-6">
//             <div className="flex flex-col gap-1">
//               <Label>Full Name</Label>
//               <Input
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 placeholder="Enter your full name"
//                 required
//                 disabled={loading}
//                 className="py-3 px-4 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none"
//               />
//             </div>
//             <div className="flex flex-col gap-1">
//               <Label>Phone Number</Label>
//               <select
//                 value={countryCode}
//                 onChange={e => setCountryCode(e.target.value)}
//                 disabled={loading}
//                 className="mb-2 py-2 px-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none"
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
//                 className="py-3 px-4 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none"
//                 type="tel"
//               />
//             </div>
//             <div className="flex flex-col gap-1">
//               <Label>Password</Label>
//               <Input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Enter password"
//                 required
//                 disabled={loading}
//                 className="py-3 px-4 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none"
//               />
//             </div>
//             <Button
//               type="submit"
//               disabled={loading || !isFormValid}
//               className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-md text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {loading ? "Creating..." : "Sign Up"}
//             </Button>
//           </form>
//           <p className="mt-6 text-center text-sm text-gray-700">
//             Already have an account?{" "}
//             <Link href="/login" className="underline text-purple-600 hover:text-purple-800 font-medium">
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
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: data.name,
          phone: data.phone
        })
      )
      setSuccess("Account created successfully!")
      router.replace("/")
    } catch (err: any) {
      setError(err.message || "Signup failed")
    } finally {
      setLoading(false)
    }
  }

  const isFormValid = phone.trim() !== "" && name.trim() !== "" && password.trim() !== ""

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12 bg-black">
      <Card className="w-full max-w-md rounded-2xl border border-white/20 bg-black shadow-md">
        <CardHeader className="border-b border-white/20">
          <CardTitle className="text-center text-white text-2xl font-semibold tracking-tight">
            Create Your Account
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          {error && <div className="rounded bg-white/10 px-4 py-2 text-sm text-white">{error}</div>}
          {success && <div className="rounded bg-white/10 px-4 py-2 text-sm text-white">{success}</div>}
          <form onSubmit={onSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <Label className="text-gray-300">Full Name</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
                disabled={loading}
                className="py-3 px-4 rounded-md border border-white/20 bg-black text-white focus:ring-2 focus:ring-white/30 focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-gray-300">Phone Number</Label>
              <select
                value={countryCode}
                onChange={e => setCountryCode(e.target.value)}
                disabled={loading}
                className="mb-2 py-2 px-3 rounded-md border border-white/20 bg-black text-white focus:ring-2 focus:ring-white/30 focus:outline-none"
              >
                <option value="+1">🇺🇸 +1 (USA)</option>
                <option value="+44">🇬🇧 +44 (UK)</option>
                <option value="+91">🇮🇳 +91 (India)</option>
                <option value="+61">🇦🇺 +61 (Australia)</option>
                <option value="+81">🇯🇵 +81 (Japan)</option>
                <option value="+49">🇩🇪 +49 (Germany)</option>
                <option value="+971">🇦🇪 +971 (UAE)</option>
                <option value="+86">🇨🇳 +86 (China)</option>
                <option value="+33">🇫🇷 +33 (France)</option>
              </select>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter phone number"
                required
                disabled={loading}
                type="tel"
                className="py-3 px-4 rounded-md border border-white/20 bg-black text-white focus:ring-2 focus:ring-white/30 focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-gray-300">Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                disabled={loading}
                className="py-3 px-4 rounded-md border border-white/20 bg-black text-white focus:ring-2 focus:ring-white/30 focus:outline-none"
              />
            </div>
            <Button
              type="submit"
              disabled={loading || !isFormValid}
              className="bg-white text-black font-semibold py-3 rounded-md text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              {loading ? "Creating..." : "Sign Up"}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="underline text-white hover:text-gray-300">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  )
}
