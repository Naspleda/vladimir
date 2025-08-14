import { ButtonBorder } from "./buttonBorder"

export function Navbar(){
    return (  
        <>
            <header
                className="fixed inset-x-0 top-0 z-30 mx-auto w-[95%] bg-transparent py-3 border-b border-cyan-800/50">
                <div className="px-4"> 
                    <div className="flex items-center justify-between">
                        <div className="flex shrink-0">
                            <a aria-current="page" className="text-4xl font-bold tracking-wide text-cyan-300 [text-shadow:_0_0_10px_#0ff]" href="/">
                                {/* <img className="h-7 w-auto" src="https://cdn-icons-png.flaticon.com/512/861/861539.png" alt=""/> */}
                                <p className="">Kremlin Trading</p>
                            </a>
                        </div>
                        {/* <div className="hidden md:flex md:items-center md:justify-center md:gap-5">
                            <a aria-current="page"
                                className="text-xl font-medium text-cyan-300 hover:text-cyan-100 [text-shadow:_0_0_5px_#0ff]"
                                href="#">How it works</a>
                            <a className="text-xl font-medium text-cyan-300 hover:text-cyan-100 [text-shadow:_0_0_5px_#0ff]"
                                href="#">Pricing</a>
                        </div> */}
                        <div className="flex items-center justify-end gap-3">
                            <ButtonBorder title="Get Started !"></ButtonBorder>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}