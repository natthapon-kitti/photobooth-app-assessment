"use client"

import type React from "react"

import { useCallback, useEffect, useRef, useState } from "react"
import TakingPhotoButton from "../components/takingPhotoButton"
import { useStore } from "@/app/store/store"
import ChangeLayoutButton from "../components/changeLayoutButton"
import { compressImage } from "../lib/image-utils"
import SaveToGalleryButton from "../components/saveToGalleryButton"


export default function PhotoCapture() {


    const setPageState = useStore((state) => state.setPageState)
    const layout = useStore((state) => state.layout)

    const [isCameraOpen, setIsCameraOpen] = useState(false)
    const [isError, setIsError] = useState("")
    const [isProcessing, setIsProcessing] = useState(false)
    const [isCapturing, setIsCapturing] = useState(false)
    const [showFlash, setShowFlash] = useState(false)
    const [capturedImage, setCapturedImage] = useState<string | null>(null)
    const [capturedPhotos, setCapturedPhotos] = useState<string[]>([])
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
    const [countdown, setCountdown] = useState<number | null>(null)
    const [caption, setCaption] = useState("")


    const streamRef = useRef<MediaStream | null>(null)
    const videoRef = useRef<HTMLVideoElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)


    const startCamera = useCallback(async () => {
        try {
            setIsError("")
            setIsCapturing(true)
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: "user",
                    width: { ideal: 740 },
                    height: { ideal: 520 },
                },
            })
            streamRef.current = stream
            if (videoRef.current) {
                videoRef.current.srcObject = stream
            }
        } catch (error) {
            console.log(error)
            setIsCapturing(false)
        }
    }, [])

    const stopCamera = useCallback(async () => {
        if (streamRef.current) {
            // camera stop
            streamRef.current.getTracks().forEach((track) => track.stop())
            streamRef.current = null
            setIsCameraOpen(false)
        }
        if (videoRef.current) {
            videoRef.current.srcObject = null
        }

        setIsCapturing(false)
    }, [])

    const capturePhoto = useCallback(async () => {

        if (videoRef.current && canvasRef.current) {
            try {
                setIsProcessing(true)
                setIsError("")

                setShowFlash(true)
                setTimeout(() => setShowFlash(false), 300)

                const canvas = canvasRef.current
                const video = videoRef.current
                const context = canvas.getContext("2d")

                canvas.width = video.videoWidth
                canvas.height = video.videoHeight



                if (context) {

                    // flip image for front camera
                    context.translate(canvas.width, 0)
                    context.scale(-1, 1)

                    context.drawImage(video, 0, 0)
                    const imageData = canvas.toDataURL("image/jpeg", 0.9)

                    // compress image
                    const compressedImage = await compressImage(imageData, 1920, 1080, 0.8)



                    const newPhotos = [...capturedPhotos, compressedImage]

                    setTimeout(() => {
                        setCapturedPhotos((prev) => {

                            return [...prev, compressedImage]
                        }
                        )

                    }, 500)

                    setCurrentPhotoIndex(newPhotos.length)

                    console.log("Current Photo:", newPhotos)



                }
            } catch (error) {
                console.log(error)
                setIsError("Failed to capture photo. Please try again.")
            } finally {
                setIsProcessing(false)
            }
        }
    }, [layout, capturedPhotos])

    const createPhotoStrip = async (photos: string[]): Promise<string> => {
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")!

        let targetWidth = 0
        let targetHeight = 0
        let padding = 0
        let topPadding = 0
        let bottomPadding = 0
        const horizontalPadding = 0

        // set max target dimensions based on layout
        if (layout.poses === 3) {
            targetWidth = 400
            targetHeight = 250
            padding = 10
            topPadding = 80
            bottomPadding = 80

        } else if (layout.poses === 4) {
            targetWidth = 200
            targetHeight = 150
            padding = 0
            topPadding = 40
            bottomPadding = 40
        }

        const borderWidth = 5


        canvas.width = targetWidth + borderWidth * 2 + horizontalPadding * 2
        canvas.height =
            targetHeight * photos.length +
            padding * (photos.length - 1) +
            topPadding +
            bottomPadding +
            borderWidth * 2

        // background color
        ctx.fillStyle = "#ffffff"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        for (let i = 0; i < photos.length; i++) {
            const img = new Image()
            img.crossOrigin = "anonymous"

            await new Promise((resolve) => {
                img.onload = () => {
                    const x = borderWidth + horizontalPadding
                    const y = borderWidth + padding + i * (targetHeight + padding)

                    // maintain aspect ratio
                    const ratio = Math.min(targetWidth / img.width, targetHeight / img.height)
                    const newWidth = img.width * ratio
                    const newHeight = img.height * ratio

                    // center horizontally inside target box
                    const offsetX = x + (targetWidth - newWidth) / 2 - horizontalPadding
                    const offsetY = y + (targetHeight - newHeight) / 2 + 50

                    ctx.drawImage(img, offsetX, offsetY, newWidth, newHeight)
                    resolve(null)
                }
                img.src = photos[i]
            })
        }

        console.log("Photo strip created", canvas.toDataURL("image/jpeg", 0.9))

        return canvas.toDataURL("image/jpeg", 0.9)
    }

    const startCountdown = useCallback(() => {
        console.log("Starting countdown")
        let countdown = 3
        let poses = layout.poses

        // countdown logic
        const timer = setInterval(() => {
            console.log("Countdown:", countdown)
            setCountdown(countdown)
            countdown--

            if (countdown === 0) {


                setTimeout(() => {
                    capturePhoto()
                    setCountdown(0)
                }, 1000)
                poses -= 1
                console.log("Remaining poses:", poses)

                // check if more poses needed
                if (poses > 0) {
                    setTimeout(() => {
                        countdown = 3 // reset for next pose

                    }, 1000)
                } else {
                    setTimeout(() => {

                        clearInterval(timer)

                    }, 1000)
                }
            }
        }, 1000)

    }, [layout.poses])

    const retakePhoto = useCallback(() => {
        setCapturedImage(null)
        setIsError("")
        setCapturedPhotos([])
        setCurrentPhotoIndex(0)
    }, [])

    useEffect(() => {
        const processPhotos = async () => {
            if (capturedPhotos) {
                console.log("capturedPhotos:", capturedPhotos)

                if (capturedPhotos.length >= layout.poses) {
                    const stripImage = await createPhotoStrip(capturedPhotos)
                    setCapturedImage(stripImage)
                    stopCamera()
                    console.log("Final Photo Strip:", stripImage)

                    // reset image index for next time
                    setCurrentPhotoIndex(0)
                }
            }
        }

        processPhotos()

    }, [capturedPhotos])


    useEffect(() => {
        if (isCameraOpen) {
            console.log("Camera opened")
            startCamera()
        } else {
            console.log("Camera closed")
            stopCamera()
        }
    }, [isCameraOpen])


    return (
        <div className="flex flex-col gap-6 justify-center items-center">

            {
                isCameraOpen || capturedImage !== null
                    ?
                    <>
                    </>
                    :
                    <div className="flex flex-col items-center  gap-2">
                        <h2 className="text-3xl text-black ">Ready for fun? </h2>
                        <p className="text-black ">3 seconds for each shot</p>
                        <p className="text-black ">({layout.name} taking {layout.poses} Poses)</p>
                    </div>
            }


            {
                isCameraOpen && !capturedImage &&

                <div >
                    {/* show flash when countdown finished */}
                    {
                        showFlash &&
                        <div className="absolute w-full h-full bg-white opacity-75 z-10 pointer-events-none animate-flash" />
                    }
                    {countdown !== null && countdown > 0 &&
                        <div className="absolute z-20 text-6xl text-black font-bold
                        ml-6 mt-6">
                            {countdown}
                        </div>
                    }
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover rounded-2xl"

                    />
                </div>

            }


            <canvas ref={canvasRef} className="hidden" />

            {/* photo strip */}
            <div>
                {capturedImage &&
                    <div className="flex flex-col items-center gap-4">
                        <img
                            src={capturedImage}
                            alt="Captured Photo Strip"
                            className="w-80 h-auto rounded-2xl border-4 border-white shadow-lg"
                        />

                    </div>
                }
            </div>

            <div className="w-full">
                {
                    capturedImage
                    &&
                    <input
                        type="text"
                        placeholder="Caption 🥳"
                        onChange={(e) => setCaption(e.target.value)}
                        className="w-full px-4 py-2 text-black border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition "
                    />
                }

            </div>

            <div className="flex justify-center items-center gap-4 z-50">

                {
                    capturedImage
                        ?

                        <SaveToGalleryButton
                            imageUrl={capturedImage}
                            caption={caption}
                        />

                        :
                        <ChangeLayoutButton
                            setPageState={setPageState}
                            isCameraOpen={isCameraOpen}
                            setIsCameraOpen={setIsCameraOpen}
                        />
                }


                <TakingPhotoButton
                    isCameraOpen={isCameraOpen}
                    setIsCameraOpen={setIsCameraOpen}
                    startCountdown={startCountdown}
                    capturedImage={capturedImage}
                    retakePhoto={retakePhoto}
                />
            </div>


        </div >
    )
}