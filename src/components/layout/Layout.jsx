import { useState } from "react";
import { ButtonBorder } from "../buttonBorder";
import { Hero } from "../Hero";
import { Navbar } from "../Navbar";
import Home from "../views/Home";


function Layout() {
  return (
    <main className="h-screen flex flex-col overflow-hidden">
         {/* bg-radial-center */}
          <div className="w-[95%] h-[95%] left-1/2 transform -translate-x-1/2 my-6 border border-white/40 rounded-3xl p-3 absolute z-[100] bg-transparent">
          <h1 className="text-white justify-self-center">MI BOMBI</h1>
          </div>
        <div className="">
          {/* <Navbar /> */}
          {/* <Hero /> */}
          <Home />
        </div>
    </main>
  );
}

export default Layout;