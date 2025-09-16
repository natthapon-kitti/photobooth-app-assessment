"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from "@/app/store/store"

export default function Register() {
    const router = useRouter()
    const setPageState = useStore((state) => state.setPageState)
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    })
    const [error, setError] = useState<string | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (form.password !== form.confirmPassword) {
            setError('Passwords do not match')
            return
        }
        setError(null)
        try {
            const url = process.env.NEXT_PUBLIC_API_URL! + process.env.NEXT_PUBLIC_APP_PORT!
            const response = await fetch(url + "/register", {
                method: "POST",
                body: JSON.stringify({ username: form.name, email: form.email, password: form.password }),
                headers: { "Content-Type": "application/json" },
                credentials: 'include'
            })
            if (!response.ok) throw new Error("Invalid credentials")

            router.push("/")
            setPageState(3)

            alert(`Logged in as ${form.email}`)
        } catch (err: any) {
            setError(err.message || 'Registration failed')
        }
    }

    return (
        <div className='w-full h-screen bg-white p-6'>

            <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg font-mono">
                <h2 className="text-3xl font-extrabold mb-6 text-center text-purple-700">Register</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="w-full p-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
                            placeholder="Your name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full p-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 transition "
                            placeholder="you@email.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            className="w-full p-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
                            placeholder="Password"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            required
                            className="w-full p-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
                            placeholder="Confirm password"
                        />
                    </div>
                    {error && (
                        <div className="text-red-500 text-center font-semibold">{error}</div>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-400 to-purple-600 text-white px-6 py-3 rounded-full hover:from-purple-500 hover:to-purple-700 transition font-mono font-bold shadow-lg"
                    >
                        Confirm
                    </button>
                </form>
            </div>
        </div>


    )
}

