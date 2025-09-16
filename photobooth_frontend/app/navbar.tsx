import Link from "next/link"

export default function Navbar() {




    return (
        <nav className="absolute top-0 right-[12%] w-full h-24 md:h-46  text-black flex items-center justify-end ">

            <Link
                href="/gallery"
                className=""
            >

                <div className="relative flex justify-center items-center group cursor-pointer">


                    <h1
                        className="z-10 text-xl font-bold "

                    >Gallery

                    </h1>

                    <span className="rounded-[100%] w-24 h-8 bg-purple-300  blur-xl absolute  hidden group-hover:block
                 ">
                    </span>


                </div>
            </Link>

        </nav >
    )
}