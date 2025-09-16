"use client"
import { useStore } from "./store/store"
export default function Header() {

    const setPageState = useStore((state) => state.setPageState)


    return (
        <header className="flex justify-start items-center w-full">

            {/* gradient */}

            <div className="relative flex justify-center items-center">
                <h2 className="text-4xl  text-center sm:text-left text-black z-10 cursor-pointer"
                    onClick={() => setPageState(1)}
                >

                    {process.env.NEXT_PUBLIC_APP_TITLE}

                </h2>

                <span className="rounded-[100%] w-36 h-12 bg-purple-300  blur-xl absolute left-16">
                </span>


            </div>







        </header>
    )
}