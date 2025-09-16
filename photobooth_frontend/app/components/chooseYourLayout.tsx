import Image from 'next/image'
import { useStore } from "@/app/store/store"

interface ChooseYourLayoutProps {
    setPageState: (page: number) => void;
}

export default function ChooseYourLayout({ setPageState }: ChooseYourLayoutProps){

    const setLayout = useStore((state) => state.setLayout)


    const layoutOptions = [
        {
            name: "layout A",
            poses: 3,
            layoutImage: "/layout-image/layoutA.png"
        },
        {
            name: "layout B",
            poses: 4,
            layoutImage: "/layout-image/layoutB.png"
        }
    ]


    return (
        <>
            <h1 className=" md:text-4xl  text-3xl text-black text-center sm:text-left jiggle">
                Choose your layout

            </h1>

            {/* layout */}
            <div className="w-full m-auto flex justify-center">

                {
                    layoutOptions.map((layout) => {
                        return (
                            <div key={layout.name}>
                                <div className="w-fit p-4 flex flex-col justify-center items-center cursor-pointer hover:bg-purple-100 "
                                    onClick={() => {
                                        setPageState(2)
                                        setLayout(layout.name, layout.poses)
                                    }}

                                >

                                    <Image
                                        src={layout.layoutImage}
                                        alt={layout.name}
                                        width={72}
                                        height={152}
                                        className=""
                                    />

                                    <p className=" text-black mt-2">
                                        {layout.name}
                                    </p>
                                    <p className=" text-black mt-2">
                                        {`${layout.poses} Poses`}
                                    </p>

                                </div>
                            </div>
                        )
                    })
                }


                {/* layout A */}
                {/* <div className=" w-fit p-4 flex flex-col justify-center items-center cursor-pointer hover:bg-purple-100 "
                    onClick={() => setPageState(2)}

                >
                    <div className="w-18 h-38  border-[0.5px] border-black p-1 flex flex-col gap-0.5">
                        <div className="w-full h-9 border-[0.5px] border-black">

                        </div>
                        <div className="w-full h-9 border-[0.5px] border-black">

                        </div>
                        <div className="w-full h-9 border-[0.5px] border-black">

                        </div>
                    </div>

                    <p className=" text-black mt-2">
                        layout A
                    </p>
                    <p className=" text-black mt-2">
                        {`3 Pose`}
                    </p>

                </div> */}

                {/* layout B */}
                {/* <div className=" w-fit p-4 flex flex-col justify-center items-center cursor-pointer hover:bg-purple-100 "
                    onClick={() => setPageState(2)}

                >
                    <div className="w-18 h-38  border-[0.5px] border-black p-1 flex flex-col gap-0.5">
                        <div className="w-full h-13 border-[0.5px] border-black">

                        </div>
                        <div className="w-full h-13 border-[0.5px] border-black">

                        </div>

                    </div>

                    <p className=" text-black mt-2">
                        layout B

                    </p>
                    <p className=" text-black mt-2">
                        {`2 Pose`}
                    </p>

                </div> */}



            </div>
        </>

    )
}

