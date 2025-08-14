import { ButtonBorder } from "../buttonBorder";

export function AppleNavbar(){
    return (     
        <header
            className="fixed inset-x-0 top-0 z-30 mx-auto w-[95%] bg-transparent py-3 shadow backdrop-blur-lg md:top-6 md:rounded-3xl">
            <div className="px-4"> 
                <div className="flex items-center justify-between">
                    <div className="flex shrink-0">
                        <a aria-current="page" className="flex items-center" href="/">
                            <img className="h-7 w-auto" src="https://cdn-icons-png.flaticon.com/512/861/861539.png" alt=""/>
                            <p className="sr-only">Kremlin Trading</p>
                        </a>
                    </div>
                    <div className="hidden md:flex md:items-center md:justify-center md:gap-5">
                        <a aria-current="page"
                            className="inline-block rounded-lg mx-10 px-6 py-1 text-sm font-medium text-[#C0A080] transition-all duration-200 hover:text-gray-100"
                            href="#">How it works</a>
                        <a className="inline-block rounded-lg mx-10 px-6 py-1 text-sm font-medium text-[#C0A080] transition-all duration-200 hover:text-gray-100"
                            href="#">Pricing</a>
                    </div>
                    <div className="flex items-center justify-end gap-3">
                        <ButtonBorder title="Get Started !"></ButtonBorder>
                    </div>
                </div>
            </div>
        </header>
    )
}