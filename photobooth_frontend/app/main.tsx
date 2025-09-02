import TakingPhotoButton from "./takingPhotoButton";

export default function Main() {
    return (
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start font-mono">
            <h1 className=" md:text-4xl  text-3xl text-black text-center sm:text-left jiggle">
                Choose your layout
            </h1>

            {/* layout */}
            <div className="w-full m-auto flex justify-center">

                {/* layout A */}
                <div className=" w-fit p-4 flex flex-col justify-center items-center cursor-pointer hover:bg-purple-100 ">
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

                </div>

                {/* layout B */}
                <div className=" w-fit p-4 flex flex-col justify-center items-center cursor-pointer hover:bg-purple-100 ">
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

                </div>



            </div>



            {/* <TakingPhotoButton /> */}

        </main>
    )
}