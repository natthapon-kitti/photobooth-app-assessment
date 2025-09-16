"use client"

import { useRouter } from "next/navigation"
// import { useSession } from "next-auth/react"

type SaveToGalleryButtonProps = {
    imageUrl: string
}

export default function SaveToGalleryButton({ imageUrl }: SaveToGalleryButtonProps) {
    // const { data: session, status } = useSession()
    const router = useRouter()

    const handleSave = async () => {
        const isAuthenticated = checkCookie("session")

        if (!isAuthenticated) {
            alert("Please log in to save to gallery.")
            router.push("/login")
            return
        }

        try {
            // const res = await fetch("/api/gallery", {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify({ imageUrl }),
            // })
            // if (!res.ok) throw new Error("Failed to save")
            alert("Saved to gallery!")
        } catch (error) {
            console.log(error)
            alert("Failed to save.")
        }
    }

    if (status === "loading") return null

    return (
        <button
            onClick={handleSave}
            className="bg-purple-300 text-white px-6 py-3 rounded-full hover:bg-purple-400 transition font-mono cursor-pointer"
            type="button"
        >
            Save to Gallery
        </button>
    )
}
