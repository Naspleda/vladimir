import React, { useState, useEffect } from 'react';
import KremlinLogo from '../../assets/images/logokt.svg';

const AnimationIntro = ({ onComplete }) => {
    const [count, setCount] = useState(0);
    const [text, setText] = useState("100%");

    // Animation States
    const [candlesVisible, setCandlesVisible] = useState(false);
    const [candlesHidden, setCandlesHidden] = useState(false);

    // Text states
    const [textScale, setTextScale] = useState(false);
    const [textColor, setTextColor] = useState("text-white");
    const [textBlur, setTextBlur] = useState(false);
    const [textOpacity, setTextOpacity] = useState(1);

    // Logo states
    const [showLogo, setShowLogo] = useState(false);
    const [logoOpacity, setLogoOpacity] = useState(0);
    const [logoBlur, setLogoBlur] = useState(10);
    const [logoScale, setLogoScale] = useState(0.8);

    // Curtain
    const [curtainUp, setCurtainUp] = useState(false);

    // Generate some random candle data
    const [candles] = useState(() => Array.from({ length: 20 }, (_, i) => ({
        id: i,
        height: Math.random() * 100 + 20,
        isGreen: Math.random() > 0.5,
        y: Math.random() * 50 - 25,
        delay: i * 100 // Stagger in ms
    })));

    useEffect(() => {
        // Start sequence
        const sequence = async () => {
            // 1. Candles appear (triggered by mount effect with delay in render)
            setCandlesVisible(true);
        };
        sequence();
    }, []);

    useEffect(() => {
        // Counter animation
        let start = 0;
        const end = 100;
        const duration = 2000;
        const incrementTime = duration / end;

        const timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start === end) clearInterval(timer);
        }, incrementTime);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (count === 100) {
            const finishSequence = async () => {
                // 3. At 100%, hide candles
                setCandlesHidden(true);

                // Wait for candles fade out (0.5s)
                await new Promise(r => setTimeout(r, 500));

                // Scale up and center counter, change to green
                setTextScale(true);
                setTextColor("text-green-400"); // Using tailwind class instead of hex for simplicity if possible, or style.

                // Wait for scale (0.8s)
                await new Promise(r => setTimeout(r, 800));

                // 4. Blur and fade out "100%"
                setTextBlur(true);
                setTextOpacity(0);

                // Wait for fade out (1s)
                await new Promise(r => setTimeout(r, 1000));

                // 5. Change to Logo
                setShowLogo(true);

                // Small delay for render
                await new Promise(r => setTimeout(r, 50));

                // Animate Logo in
                setLogoBlur(0);
                setLogoOpacity(1);
                setLogoScale(1);

                // Wait to read text (1s + 1s hold)
                await new Promise(r => setTimeout(r, 2000));

                // 6. Curtain up
                setCurtainUp(true);

                // Wait for curtain (1s)
                await new Promise(r => setTimeout(r, 1000));

                // Complete
                onComplete && onComplete();
            };
            finishSequence();
        }
    }, [count, onComplete]);

    return (
        <div className="fixed inset-0 z-50 pointer-events-none flex flex-col">

            {/* Candles Layer - z-30 */}
            <div className={`candles-container absolute inset-0 flex items-center justify-center gap-2 z-30 pointer-events-none translate-y-32 transition-opacity duration-500 ${candlesHidden ? 'opacity-0' : 'opacity-100'}`}>
                {candles.map((candle) => (
                    <div
                        key={candle.id}
                        className={`candle w-4 transition-all duration-500 ease-out ${candle.isGreen ? 'bg-green-500' : 'bg-red-500'}`}
                        style={{
                            height: `${candle.height}px`,
                            transform: `translateY(${candle.y}px) scaleY(${candlesVisible ? 1 : 0})`,
                            opacity: candlesVisible ? 1 : 0,
                            transitionDelay: `${candle.delay}ms`
                        }}
                    />
                ))}
            </div>

            {/* Curtain Container - z-20 */}
            <div
                id="intro-curtain"
                className={`absolute inset-0 bg-black z-20 overflow-hidden flex items-center justify-center transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${curtainUp ? '-translate-y-full' : 'translate-y-0'}`}
            >
                <div className="relative flex items-center justify-center w-full">
                    <div
                        className={`intro-text font-bold text-4xl absolute transition-all duration-800 ease-in-out ${textColor}`}
                        style={{
                            transform: textScale ? 'scale(3)' : 'scale(1)',
                            filter: textBlur ? 'blur(10px)' : 'blur(0px)',
                            opacity: showLogo ? 0 : textOpacity
                        }}
                    >
                        {text === "100%" ? `${count}%` : text}
                    </div>

                    {/* Logo Image */}
                    <img
                        src={KremlinLogo}
                        alt="Kremlin Trading"
                        className="intro-logo w-[24rem] h-auto object-contain transition-all duration-1000 ease-out"
                        style={{
                            opacity: showLogo ? logoOpacity : 0,
                            filter: `blur(${logoBlur}px)`,
                            transform: `scale(${logoScale})`,
                            pointerEvents: showLogo ? 'auto' : 'none'
                        }}
                    />
                </div>
            </div>

        </div>
    );
};

export default AnimationIntro;
