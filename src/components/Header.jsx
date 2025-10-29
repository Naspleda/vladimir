import Logo from "../assets/images/logo1.png";

const Header = () => {
    return (  
        <>
            <header className="absolute top-0 inset-x-0 md:h-16">
                <div className="relative h-full flex items-center justify-center">
                    <div className="absolute left-6 top-[3.5rem] -translate-y-1/2">
                        <div className="px-3 py-1 rounded-full text-white/90 backdrop-blur text-center">
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-amber-100 to-yellow-500 bg-clip-text text-transparent">KremlinTrading</h1>
                            <h1 className="text-2xl bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-transparent inline-block bg-clip-text font-extrabold">ScienceDivision</h1>
                        </div>
                    </div>
                    <div className="absolute right-6 top-4">
                        <img src={Logo} alt="Logo" className="h-12 w-auto" />
                    </div>
                </div>
            </header>
        </>
    );
}
export default Header;