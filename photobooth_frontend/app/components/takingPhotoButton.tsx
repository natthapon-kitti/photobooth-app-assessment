"use client"

export default function TakingPhotoButton({ setIsCameraOpen, isCameraOpen, startCountdown, capturedImage,retakePhoto }: { setIsCameraOpen: (isCameraOpen: boolean) => void, isCameraOpen: boolean, startCountdown: () => void, capturedImage: string | null, retakePhoto: () => void }) {
    return (
        <button className="bg-purple-300 text-white px-6 py-3 rounded-full hover:bg-purple-400 transition font-mono cursor-pointer"
            onClick={() => {
                if (!isCameraOpen && capturedImage === null) {
                    setIsCameraOpen(true)
                } else {
                    if (capturedImage !== null) {

                        console.log("Retake photo clicked")
                        setIsCameraOpen(true)
                        retakePhoto()
                    }


                    startCountdown()
                }
            }
            }

        >
            {/* if already take photo so appear "Retake photo" if not so appear "Take photo" or "Open Camera" */}
            {
                capturedImage !== null
                    ? "Retake Photo"
                    : isCameraOpen
                        ? "Take Photo"
                        : "Open Camera"
            }

        </button >
    )
}