"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useStore } from "@/app/store/store"
import Link from "next/link"

export default function Login() {
    const router = useRouter()
    const setPageState = useStore((state) => state.setPageState)
    const [form, setForm] = useState({
        email: '',
        password: '',
    })
    const [error, setError] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        try {
            const url = process.env.NEXT_PUBLIC_API_URL! + process.env.NEXT_PUBLIC_APP_PORT!

            const response = await fetch(url + "/login", {
                method: "POST",
                body: JSON.stringify({ email: form.email, password: form.password }),
                headers: { "Content-Type": "application/json" },
                credentials: 'include'
            })
            if (!response.ok) throw new Error("Invalid credentials")

            router.push("/")
            setPageState(3)

            alert(`Logged in as ${form.email}`)
        } catch {
            setError("Invalid credentials")
        }
    }

    useEffect(() => {
        const url = process.env.NEXT_PUBLIC_API_URL! + process.env.NEXT_PUBLIC_APP_PORT!
        fetch(url + '/me', {
            method: 'GET',
            credentials: 'include'
        })
            .then((response) => {
                if (response.status === 404) {
                    router.push('/auth/login')
                } else {
                    router.push("/")
                    setPageState(3)
                }

            }).catch((err) => {
                console.log(err)

            })
    }, [])

    return (
        <div className='w-full h-screen bg-white p-6'>

            <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg mt-16 font-mono">
                <h2 className="text-3xl font-extrabold mb-6 text-center text-purple-700 font-mono">Sign In</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 text-black border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition "
                            placeholder="you@example.com"
                            autoComplete="email"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 text-black border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                            placeholder="••••••••"
                            autoComplete="current-password"
                        />
                    </div>
                    {error && (
                        <div className="text-red-500 text-center font-medium bg-red-50 border border-red-200 rounded-lg py-2">
                            {error}
                        </div>
                    )}
                    <div className="flex gap-2">
                        <label className="text-slate-400 text-sm">Don't have account yet?</label>
                        <Link href='/auth/register' className="text-purple-500 text-sm cursor-pointer" >register</Link>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-400 to-purple-600 text-white px-6 py-3 rounded-full hover:from-purple-500 hover:to-purple-700 transition font-mono font-bold shadow-lg"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>

    )
}
