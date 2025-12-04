import React from 'react';
import { Effect } from '../animate-ui/primitives/effects/effect';

// Importa los logos
import BinanceLogo from '../../assets/images/binancelogo.png';
import BingxLogo from '../../assets/images/bingxlogo.png';
import BitgetLogo from '../../assets/images/bitgetlogo.png';

const Footer = () => {
    return (
        <Effect
            fade={{ initialOpacity: 0, opacity: 1 }}
            slide={{ direction: 'down', offset: 50 }}
            zoom={{ initialScale: 0.8, scale: 1 }}
            inView={true}
            inViewOnce={true}
            delay={0}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
        >
            <div className="absolute bottom-0 inset-x-0 h-8 md:h-16 flex items-center justify-center space-x-8 md:space-x-32 transition-opacity duration-1000 delay-500 opacity-100">
                <img src={BinanceLogo} alt="Binance Logo" className="h-4 md:h-6 w-auto text-shadow-lg" />
                <img src={BingxLogo} alt="BingX Logo" className="h-4 md:h-6 w-auto" />
                <img src={BitgetLogo} alt="Bitget Logo" className="h-4 md:h-6 w-auto" />
            </div>
        </Effect>
    );
};

export default Footer;