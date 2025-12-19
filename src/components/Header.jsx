import LogoKt from "../assets/images/logokt.svg";
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
                    <div className="absolute left-[1px] top-2 py-1 md:py-2">
                        <img
                            src={LogoKt}
                            alt="Logo"
                            className="h-16 w-auto cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={onLogoClick}
                        />
                    </div>
                    <div className="absolute left-10 md:left-4 top-10 md:top-[3.5rem] -translate-y-1/2">
                        <div className="px-3 md:px-10 py-1 md:py-2 rounded-full text-white/90 backdrop-blur text-center">
                            <h3 className="text-md md:text-2xl font-bold text-white">KREMLINTRADING</h3>
                            <h3 className="text-xs md:text-xl font-bold text-white">SCIENCE DIVISION</h3>
                        </div>
                    </div>

                </div>
            </header>
        </Effect>
    );
}
export default Header;