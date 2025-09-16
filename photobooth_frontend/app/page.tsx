import Header from "./header";
import Main from "./main";
import Navbar from "./navbar";


export default function Home() {
  return (
    <div className="bg-white font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-12 md:p-20 pb-20 gap-16 ">

      <Header />
      <Navbar />
      <Main />

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">

      </footer>
    </div>
  );
}
