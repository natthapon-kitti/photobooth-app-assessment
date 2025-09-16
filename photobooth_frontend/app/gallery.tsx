"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';

interface GalleryItem {
    id: string
    image_url: string
    created_at: string
    user_id: string
    title: string
}


export default function Gallery() {
    const router = useRouter()

    const [galleries, setGalleries] = useState<GalleryItem[]>([])
    // const [isAuthenticated, setIsAuthenticated] = useState(false)


    useEffect(() => {

        checkUserAuthentication()
        getGalleries()

    }, [])


    const checkUserAuthentication = async () => {
        const url = process.env.NEXT_PUBLIC_API_URL! + process.env.NEXT_PUBLIC_APP_PORT!

        // check if user logged in
        const meResponse = await fetch(url + '/me', {
            method: 'GET',
            credentials: 'include'
        })

        if (!meResponse.ok) {
            router.push('/auth/login')
        }



    }

    const getGalleries = async () => {
        const url = process.env.NEXT_PUBLIC_API_URL! + process.env.NEXT_PUBLIC_APP_PORT!

        const galleriesReponse = await fetch(url + '/gallery/get-image-by-user-id', {
            method: 'GET',
            credentials: 'include'
        })

        const galleriesData = await galleriesReponse.json()
        setGalleries(galleriesData)

    }


    return (
        <div className='text-black'>
            <div className='flex flex-wrap gap-x-12 md:gap-x-24 justify-center'>
                {galleries.map(image => (
                    <div key={image.id} >
                        <div className='flex flex-col justify-center items-center text-sm text-gray-600 gap-4'>
                            <img
                                src={image.image_url}
                                alt="Gallery"
                                className='w-32 md:w-42 shadow-xl'
                            />

                            <div className='flex flex-col items-center gap-2'>
                                {new Date(image.created_at).toLocaleDateString()}
                                <h2>{image.title}</h2>

                            </div>

                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}
