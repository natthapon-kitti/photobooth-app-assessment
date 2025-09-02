export default function Header() {
    return (
        <header className="flex justify-start items-center w-full">

            {/* gradient */}

            <div className="relative flex justify-center items-center">
                <h2 className="text-4xl  text-center sm:text-left text-black z-10">
                    {process.env.APP_TITLE}

                </h2>
                <span className="rounded-[100%] w-36 h-12 bg-purple-300  blur-xl absolute left-16">
                </span>


            </div>







        </header>
    )
}