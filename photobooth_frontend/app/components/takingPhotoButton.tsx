"use client"

export default function TakingPhotoButton({ setIsCameraOpen, isCameraOpen }: { setIsCameraOpen: (isCameraOpen: boolean) => void, isCameraOpen: boolean }) {
    return (
        <button className="bg-purple-300 text-white px-6 py-3 rounded-full hover:bg-purple-400 transition font-mono cursor-pointer"
            onClick={() => {
                if (!isCameraOpen) {
                    setIsCameraOpen(true)
                }
            }

            }
        >
            {isCameraOpen ? "Take Photo" : "Open Camera"}

        </button>
    )
}