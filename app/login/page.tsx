

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

//       // Save token and user info from DB
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
//     <main className="flex min-h-screen items-center justify-center  px-6 py-12">
//       <Card className="w-full max-w-md rounded-xl border border-gray-200 shadow-lg">
//         <CardHeader>
//           <CardTitle className="text-center text-gray-900 text-2xl font-semibold">
//             Welcome Back
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           {error && <div className="mb-4 rounded bg-red-50 px-4 py-2 text-sm text-red-600">{error}</div>}
//           {success && <div className="mb-4 rounded bg-green-50 px-4 py-2 text-sm text-green-600">{success}</div>}
//           <form onSubmit={onSubmit} className="grid gap-6">
//             <div className="grid gap-2">
//               <Label>Country Code</Label>
//               <select
//                 value={countryCode}
//                 onChange={(e) => setCountryCode(e.target.value)}
//                 disabled={loading}
//                 className="rounded border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 {countries.map((c) => (
//                   <option key={c.code} value={c.code}>{c.flag} {c.code} ({c.name})</option>
//                 ))}
//               </select>
//             </div>
//             <div className="grid gap-2">
//               <Label>Phone Number</Label>
//               <Input
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//                 placeholder="Enter phone number"
//                 required
//                 disabled={loading}
//                 autoComplete="tel"
//               />
//             </div>
//             <div className="grid gap-2">
//               <Label>Password</Label>
//               <Input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Enter password"
//                 required
//                 disabled={loading}
//                 autoComplete="current-password"
//               />
//             </div>
//             <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700">
//               {loading ? "Signing in..." : "Sign In"}
//             </Button>
//           </form>
//           <p className="mt-8 text-center text-sm text-gray-600">
//             No account? <Link href="/signup" className="underline text-blue-600 hover:text-blue-700">Sign up</Link>
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

const countries = [
  { code: "+1", name: "US", flag: "🇺🇸" },
  { code: "+44", name: "UK", flag: "🇬🇧" },
  { code: "+91", name: "IN", flag: "🇮🇳" },
  { code: "+61", name: "AU", flag: "🇦🇺" },
  { code: "+81", name: "JP", flag: "🇯🇵" },
  { code: "+49", name: "DE", flag: "🇩🇪" },
  { code: "+33", name: "FR", flag: "🇫🇷" },
  { code: "+86", name: "CN", flag: "🇨🇳" },
  { code: "+7", name: "RU", flag: "🇷🇺" },
]

export default function LoginPage() {
  const router = useRouter()
  const [countryCode, setCountryCode] = useState("+91")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("token")) router.replace("/")
  }, [router])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)
    try {
      const fullPhone = countryCode + phone
      const data = await login(fullPhone, password)

      localStorage.setItem("token", data.token)
      localStorage.setItem(
        "user",
        JSON.stringify({ name: data.name, phone: data.phone })
      )

      setSuccess(`Welcome back, ${data.name}!`)
      router.replace("/")
    } catch (err: any) {
      setError(err.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12 bg-black">
      <Card className="w-full max-w-md rounded-2xl border border-white/20 bg-black shadow-md">
        <CardHeader className="border-b border-white/20">
          <CardTitle className="text-center text-white text-2xl font-semibold tracking-tight">
            Welcome Back
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="rounded bg-white/10 px-4 py-2 text-sm text-white">
              {error}
            </div>
          )}
          {success && (
            <div className="rounded bg-white/10 px-4 py-2 text-sm text-white">
              {success}
            </div>
          )}
          <form onSubmit={onSubmit} className="grid gap-6">
            <div className="grid gap-2">
              <Label className="text-gray-300">Country Code</Label>
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                disabled={loading}
                className="rounded border border-white/20 px-3 py-2 bg-black text-white focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                {countries.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.code} ({c.name})
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-2">
              <Label className="text-gray-300">Phone Number</Label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter phone number"
                required
                disabled={loading}
                autoComplete="tel"
                className="bg-black text-white border border-white/20 focus:ring-2 focus:ring-white/30"
              />
            </div>
            <div className="grid gap-2">
              <Label className="text-gray-300">Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                disabled={loading}
                autoComplete="current-password"
                className="bg-black text-white border border-white/20 focus:ring-2 focus:ring-white/30"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="bg-white text-black font-semibold hover:bg-gray-100"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-400">
            No account?{" "}
            <Link
              href="/signup"
              className="underline text-white hover:text-gray-300"
            >
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  )
}
