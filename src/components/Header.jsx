import LogoKt from "../assets/images/logokt.png";
import { Effect } from './animate-ui/primitives/effects/effect';

const Header = ({ onLogoClick }) => {
    return (
        <Effect
            fade={{ initialOpacity: 0, opacity: 1 }}
            slide={{ direction: 'up', offset: 50 }}
            zoom={{ initialScale: 0.8, scale: 1 }}
            inView={true}
            inViewOnce={true}
            delay={0}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
        >
            <header className="absolute top-0 inset-x-0 md:h-16">
                <div className="relative h-full flex items-center justify-center">
                    <div className="absolute left-2 md:left-4 top-10 md:top-[3.5rem] -translate-y-1/2">
                        <div className="px-3 py-1 rounded-full text-white/90 backdrop-blur text-center">
                            <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-yellow-400 via-amber-100 to-yellow-500 bg-clip-text text-transparent">KremlinTrading</h3>
                            <h3 className="text-lg md:text-xl bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-transparent inline-block bg-clip-text font-extrabold">ScienceDivision</h3>
                        </div>
                    </div>
                    <div className="absolute right-6 top-4">
                        <img
                            src={LogoKt}
                            alt="Logo"
                            className="h-12 w-auto cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={onLogoClick}
                        />
                    </div>
                </div>
            </header>
        </Effect>
    );
}
export default Header;