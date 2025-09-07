"use client"

import type React from "react"

import { useCallback, useEffect, useRef, useState } from "react"
import TakingPhotoButton from "../components/takingPhotoButton"
import { useStore } from "@/app/store/store"
import ChangeLayoutButton from "../components/changeLayoutButton"


export default function PhotoCapture() {


    const setPageState = useStore((state) => state.setPageState)
    const layout = useStore((state) => state.layout)

    const [isCameraOpen, setIsCameraOpen] = useState(false)
    const [isError, setIsError] = useState("")
    const [isEditing, setIsEditing] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const [isCapturing, setIsCapturing] = useState(false)
    const [capturedImage, setCapturedImage] = useState<string | null>(null)


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
            console.error("[v0] Error accessing camera:", error)
            setIsError("Unable to access camera. Please check permissions and try again.")
            setIsCapturing(false)
        }
    }, [])

    const stopCamera = useCallback(async () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
            streamRef.current = null;
        }
        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }

        setIsCapturing(false)
    }, [])



    useEffect(() => {
        if (isCameraOpen) {
            startCamera()

        } else {
            stopCamera()
        }



    }, [isCameraOpen])


    return (
        <div className="flex flex-col gap-6 justify-center items-center">

            {
                isCameraOpen
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
                isCameraOpen &&
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover rounded-2xl"

                />
            }


            {/* <canvas ref={canvasRef} className="hidden" /> */}


            <div className="flex justify-center items-center gap-4">
                <ChangeLayoutButton
                    setPageState={setPageState}
                    isCameraOpen={isCameraOpen}
                    setIsCameraOpen={setIsCameraOpen}
                />

                <TakingPhotoButton
                    isCameraOpen={isCameraOpen}
                    setIsCameraOpen={setIsCameraOpen}
                />
            </div>


        </div >
    )
}