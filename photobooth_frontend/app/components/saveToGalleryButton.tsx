"use client"

import { useStore } from "../store/store"

type SaveToGalleryButtonProps = {
    imageUrl: string
    caption: string
}

export default function SaveToGalleryButton({ imageUrl, caption }: SaveToGalleryButtonProps) {

    const setPageState = useStore((state) => state.setPageState)

    const handleSave = async () => {


        try {
            const url = process.env.NEXT_PUBLIC_API_URL! + process.env.NEXT_PUBLIC_APP_PORT!

            // check if user logged in 
            // if no so let user login first
            fetch(url + '/me', {
                method: 'GET',
                credentials: 'include'
            })
                .then(() => {

                    console.log(imageUrl)
                    const body = {
                        image_url: imageUrl,
                        title: caption
                    }


                    // send image to save
                    fetch(url + '/gallery/save-image', {
                        method: 'POST',
                        credentials: 'include',
                        body: JSON.stringify(body)
                    }).then(() => {
                        setPageState(1)
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
