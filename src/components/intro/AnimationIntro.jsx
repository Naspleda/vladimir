import React, { useState, useEffect } from 'react';
import { motion, useAnimate, stagger } from 'framer-motion';

const AnimationIntro = ({ onComplete }) => {
    const [scope, animate] = useAnimate();
    const [count, setCount] = useState(0);
    const [text, setText] = useState("100%");
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

                // 5. Change text and unblur
                setText("Kremlin Trading");
                // Reset scale for the new text if needed, or keep it large. 
                // "Kremlin Trading" is longer, so maybe scale down a bit or keep it.
                // Let's set scale to 1.5 for the title.

                // We need to set the properties immediately before animating in
                animate(".intro-text", { scale: 1.5, color: "#ffffff" }, { duration: 0 });

                await animate(
                    ".intro-text",
                    { filter: "blur(0px)", opacity: 1 },
                    { duration: 1 } // 1s blur in
                );

                // Wait a moment to read the text
                await new Promise(resolve => setTimeout(resolve, 1000));

                // 6. Split screen
                // We trigger the split state or animate manually
                setIsSplit(true);

                // Animate panels
                await Promise.all([
                    animate("#top-panel", { y: "-100%" }, { duration: 1.5, ease: [0.22, 1, 0.36, 1] }),
                    animate("#bottom-panel", { y: "100%" }, { duration: 1.5, ease: [0.22, 1, 0.36, 1] })
                ]);

                // Complete
                onComplete && onComplete();
            };
            finishSequence();
        }
    }, [count, animate, onComplete]);

    return (
        <div ref={scope} className="fixed inset-0 z-50 pointer-events-none flex flex-col">

            {/* Candles Layer - z-30 */}
            <div className="candles-container absolute inset-0 flex items-center justify-center gap-2 z-30 pointer-events-none">
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

            {/* Split Panels Container - z-20 */}
            {/* We use absolute positioning for panels to ensure they cover the screen */}

            {/* Top Panel */}
            <div id="top-panel" className="absolute top-0 left-0 right-0 h-1/2 bg-black z-20 overflow-hidden border-b border-gray-800/0">
                <div className="absolute bottom-0 left-0 right-0 w-full h-screen flex items-center justify-center translate-y-1/2">
                    <motion.div className="intro-text text-white font-bold font-mono text-4xl">
                        {text === "100%" ? `${count}%` : text}
                    </motion.div>
                </div>
            </div>

            {/* Bottom Panel */}
            <div id="bottom-panel" className="absolute bottom-0 left-0 right-0 h-1/2 bg-black z-20 overflow-hidden border-t border-gray-800/0">
                <div className="absolute top-0 left-0 right-0 w-full h-screen flex items-center justify-center -translate-y-1/2">
                    <motion.div className="intro-text text-white font-bold font-mono text-4xl">
                        {text === "100%" ? `${count}%` : text}
                    </motion.div>
                </div>
            </div>

        </div>
    );
};

export default AnimationIntro;
