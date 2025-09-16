"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';

interface GalleryItem {
    id: string
    imageUrl: string
    createdAt: string
}

interface UserGallery {
    userId: string
    username: string
    items: GalleryItem[]
}

export default function Gallery() {
    const router = useRouter()

    const [galleries, setGalleries] = useState<UserGallery[]>([])
    // const [isAuthenticated, setIsAuthenticated] = useState(false)


    useEffect(() => {
        const url = process.env.NEXT_PUBLIC_API_URL! + process.env.NEXT_PUBLIC_APP_PORT!

        // check if user logged in
        const response = fetch(url + '/me', {
            method: 'GET',
            credentials: 'include'
        })
            .then((response) => {
                if (response.status === 404) {
                    router.push('/auth/login')
                }

            }).catch((err) => {
                console.log(err)

            })

    }, [])



    return (
        <div>
            <h1>User Galleries</h1>
            {galleries.map(user => (
                <div key={user.userId} style={{ marginBottom: '2rem' }}>
                    <h2>{user.username}</h2>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        {user.items.map(item => (
                            <div key={item.id}>
                                <img src={item.imageUrl} alt="Gallery" style={{ width: 150, height: 150, objectFit: 'cover' }} />
                                <div>
                                    {new Date(item.createdAt).toLocaleString()}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}
