import { useState } from "react";
import { ButtonBorder } from "../buttonBorder";
import { Hero } from "../Hero";
import { Navbar } from "../Navbar";
import Home from "../views/Home";
import { BubbleBackground } from "../animate-ui/components/backgrounds/bubble";


function Layout() {
  return (
    <main className="h-screen flex flex-col overflow-hidden ">
      <BubbleBackground
          colors={{ first: "18,113,255", second: "18,113,255", third: "0,220,255", fourth: "0,0,0", fifth: "18,113,255", sixth: "140,100,255" }} />
          <Home />
    </main>
  );
}

export default Layout;