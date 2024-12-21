import Navbar from "../navbar/Navbar";
import Home from "../views/Home";

function Layout() {
  return (
    <div className="mt-[70px] bg-gray-100 dark:bg-gray-900">
        <Navbar />
        <Home />
      {/* <Header />
      <Main />
      <Footer /> */}
    </div>
  );
}

export default Layout;