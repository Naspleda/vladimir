import { useState } from "react";
import { ButtonBorder } from "../buttonBorder";
import { Hero } from "../Hero";
import { Navbar } from "../Navbar";
import Home from "../views/Home";


function Layout() {
  return (
    <main className="h-screen flex flex-col overflow-hidden">
          <Home />
    </main>
  );
}

export default Layout;