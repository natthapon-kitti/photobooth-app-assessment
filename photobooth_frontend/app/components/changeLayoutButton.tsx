"use client"

import { useEffect } from "react";

export default function ChangeLayoutButton({ setPageState, isCameraOpen, setIsCameraOpen }: { setPageState: (pageState: number) => void, isCameraOpen: boolean, setIsCameraOpen: (isCameraOpen: boolean) => void }) {


    useEffect(() => {
        console.log("isCameraOpen changed:", isCameraOpen);
    }, [isCameraOpen]);

    return (
        <button className="bg-purple-300 text-white px-6 py-3 rounded-full hover:bg-purple-400 transition font-mono cursor-pointer"
            onClick={async () => {
                if (isCameraOpen) {
                    await setIsCameraOpen(false)
                }
                setPageState(1)

            }}
        >
            Change Layout
        </button>
    )
}