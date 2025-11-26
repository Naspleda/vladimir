import React, { useState, useEffect } from 'react';
import { motion, useAnimate, stagger } from 'framer-motion';
import KremlinLogo from '../../assets/images/logokt.jpg';

const AnimationIntro = ({ onComplete }) => {
    const [scope, animate] = useAnimate();
    const [count, setCount] = useState(0);
    const [text, setText] = useState("100%");
    const [textClass, setTextClass] = useState("text-white");
    const [showLogo, setShowLogo] = useState(false);
    const [isSplit, setIsSplit] = useState(false);

    // Generate some random candle data
    const candles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        height: Math.random() * 100 + 20, // Random height between 20 and 120
        isGreen: Math.random() > 0.5,
        y: Math.random() * 50 - 25 // Random y offset for "trend"
    }));

    useEffect(() => {
        const sequence = async () => {
            // 1. Animate candles appearing
            await animate(
                ".candle",
                { opacity: [0, 1], scaleY: [0, 1] },
                { duration: 0.5, delay: stagger(0.1) }
            );
        };

        sequence();
    }, [animate]);

    useEffect(() => {
        // Counter animation
        let start = 0;
        const end = 100;
        const duration = 2000; // 2 seconds to reach 100
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
                await animate(".candles-container", { opacity: 0 }, { duration: 0.5 });

                // Scale up and center the counter (it's already centered, just scale)
                // And change color to green
                await animate(
                    ".intro-text",
                    { scale: 3, color: "#4ade80" },
                    { duration: 0.8, ease: "easeInOut" }
                );

                // 4. Blur and fade out "100%"
                await animate(
                    ".intro-text",
                    { filter: "blur(10px)", opacity: 0 },
                    { duration: 1 } // 1s blur out
                );

                // 5. Change to Logo and unblur
                setShowLogo(true);

                // Wait a tick for React to render the logo
                await new Promise(resolve => setTimeout(resolve, 50));

                // Animate Logo in
                // We target the logo class. Set initial state in JSX or here if needed.
                // But since we just mounted it, it will have the initial styles from JSX (opacity 0, blur).
                await animate(
                    ".intro-logo",
                    { filter: "blur(0px)", opacity: 1, scale: 1 },
                    { duration: 1 } // 1s blur in
                );

                // Wait a moment to read the text
                await new Promise(resolve => setTimeout(resolve, 1000));

                // 6. Curtain up
                // Animate the single curtain panel up
                await animate("#intro-curtain", { y: "-100%" }, { duration: 1, ease: [0.22, 1, 0.36, 1] });

                // Complete
                onComplete && onComplete();
            };
            finishSequence();
        }
    }, [count, animate, onComplete]);

    return (
        <div ref={scope} className="fixed inset-0 z-50 pointer-events-none flex flex-col">

            {/* Candles Layer - z-30 */}
            <div className="candles-container absolute inset-0 flex items-center justify-center gap-2 z-30 pointer-events-none translate-y-32">
                {candles.map((candle) => (
                    <div
                        key={candle.id}
                        className={`candle w-4 ${candle.isGreen ? 'bg-green-500' : 'bg-red-500'}`}
                        style={{
                            height: `${candle.height}px`,
                            transform: `translateY(${candle.y}px)`,
                            opacity: 0 // Start hidden
                        }}
                    />
                ))}
            </div>

            {/* Curtain Container - z-20 */}
            <div id="intro-curtain" className="absolute inset-0 bg-black z-20 overflow-hidden flex items-center justify-center">
                <div className="relative flex items-center justify-center w-full">
                    <motion.div
                        className={`intro-text font-bold text-4xl ${textClass} absolute`}
                        animate={{ opacity: showLogo ? 0 : 1 }}
                    >
                        {text === "100%" ? `${count}%` : text}
                    </motion.div>
                    <motion.img
                        src={KremlinLogo}
                        alt="Kremlin Trading"
                        className="intro-logo w-[24rem] h-auto object-contain"
                        initial={{ opacity: 0, filter: "blur(10px)", scale: 0.8 }}
                        animate={showLogo ? { opacity: 1, filter: "blur(0px)", scale: 1 } : { opacity: 0, pointerEvents: "none" }}
                    />
                </div>
            </div>

        </div>
    );
};

export default AnimationIntro;
