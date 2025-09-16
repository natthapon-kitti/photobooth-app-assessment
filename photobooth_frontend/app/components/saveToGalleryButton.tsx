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



        try {
            const url = process.env.NEXT_PUBLIC_API_URL! + process.env.NEXT_PUBLIC_APP_PORT!

            // check if user logged in 
            // if no so let user login first
            const response = fetch(url + '/me', {
                method: 'GET',
                credentials: 'include'
            })
                .then((response) => {

                    const body = {
                        image_url:""
                    }

                    fetch(url + '/gallery/save-image', {
                        method: 'POST',
                        credentials: 'include',
                        body: body
                    })

                }).catch((err) => {
                    console.log(err)

                })

            // if (!res.ok) throw new Error("Failed to save")
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
