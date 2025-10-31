import { ButtonBorder } from "./buttonBorder"

export function Navbar(){
    return (  
        <>
            <header className="fixed inset-x-0 top-0 z-30 mx-auto w-[95%] bg-transparent py-3 border-b border-cyan-800/50">
                <div className="px-4"> 
                    <div className="flex items-center justify-between md:justify-between">
                        {/* Mobile: Título centrado */}
                        <div className="flex-1 flex justify-start md:hidden">
                            <a aria-current="page" className="text-xs font-bold tracking-wide text-cyan-300 [text-shadow:_0_0_10px_#0ff]" href="/">
                                <p>Kremlin Trading</p>
                            </a>
                        </div>
                        
                        {/* Desktop: Título a la izquierda */}
                        <div className="hidden md:flex md:shrink-0">
                            <a aria-current="page" className="text-4xl font-bold tracking-wide text-cyan-300 [text-shadow:_0_0_10px_#0ff]" href="/">
                                <p>Kremlin Trading</p>
                            </a>
                        </div>
                        
                        {/* Botón - siempre a la derecha */}
                        <div className="flex items-center justify-end gap-3">
                            <ButtonBorder title="Get Started !"></ButtonBorder>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}