import { ButtonBorder } from "../buttonBorder";

export function AppleNavbar(){
    return (     
        <header
            class="fixed inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md border border-gray-800 bg-transparent py-3 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg">
            <div class="px-4"> 
                <div class="flex items-center justify-between">
                    <div class="flex shrink-0">
                        <a aria-current="page" class="flex items-center" href="/">
                            <img class="h-7 w-auto" src="https://cdn-icons-png.flaticon.com/512/861/861539.png" alt=""/>
                            <p class="sr-only">Kremlin Trading</p>
                        </a>
                    </div>
                    <div class="hidden md:flex md:items-center md:justify-center md:gap-5">
                        <a aria-current="page"
                            class="inline-block rounded-lg mx-10 px-6 py-1 text-sm font-medium text-[#C0A080] transition-all duration-200 hover:text-gray-100"
                            href="#">How it works</a>
                        <a class="inline-block rounded-lg mx-10 px-6 py-1 text-sm font-medium text-[#C0A080] transition-all duration-200 hover:text-gray-100"
                            href="#">Pricing</a>
                    </div>
                    <div class="flex items-center justify-end gap-3">
                        <ButtonBorder title="Get Started !"></ButtonBorder>
                    </div>
                </div>
            </div>
        </header>
    )
}