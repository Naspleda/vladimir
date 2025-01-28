import { AppleNavbar } from "../navbar/appleNavbar";
import Home from "../views/Home";

function Layout() {
  return (
    <div className="bg-stone-950">
        <AppleNavbar />
        <Home />
      {/* <Header />
      <Main />
      <Footer /> */}
    </div>
  );
}

export default Layout;