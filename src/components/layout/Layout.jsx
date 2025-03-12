import { AppleNavbar } from "../navbar/appleNavbar";
import Home from "../views/Home";

function Layout() {
  return (
    // bg-black cuando tenga el modelo
    <div className="bg-black">
        <AppleNavbar />
        <Home />
      {/* <Header />
      <Main />
      <Footer /> */}
    </div>
  );
}

export default Layout;