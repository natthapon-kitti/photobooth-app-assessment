"use client"

import { useStore } from "@/app/store/store"

import ChooseYourLayout from "./components/chooseYourLayout"
import PhotoCapture from "./photo-app/photoCapture"
import Gallery from "./gallery"

export default function Main() {

    const pageState = useStore((state) => state.pageState)
    const setPageState = useStore((state) => state.setPageState)

    const renderPage = () => {

        switch (pageState) {
            case 1:
                // Choose Layout (1st state)
                return <ChooseYourLayout setPageState={setPageState} />
            case 2:
                //  Photo Capture (2nd state)
                return <PhotoCapture />
            case 3:
                // Gallery (3rd state)
                return <Gallery />
            default:
                <ChooseYourLayout />
        }


    }


    return (
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start font-mono">

            {renderPage()}

        </main>
    )
}