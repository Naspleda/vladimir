import { ButtonBorder } from "../buttonBorder";
import { Hero } from "../Hero";
import { Navbar } from "../Navbar";
import Home from "../views/Home";


function Layout() {
  return (
    // bg-black cuando tenga el modelo
    <main className="h-screen flex flex-col bg-black overflow-hidden">
      {/* <div className="pt-[40px] h-[95%] w-[95%] mt-[20px] mx-auto rounded-xl border-2 border-transparent shadow-[0px_0px_19px_6px_rgba(0,_0,_0,_0.1)] bg-radial-center"> */}
        <div className="bg-radial-center">
          {/* <Navbar /> */}
          <Hero />
          <Home />
        </div>
      {/* </div> */}
    </main>
  );
}

export default Layout;