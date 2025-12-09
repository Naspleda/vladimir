import React, { useRef, useEffect, useState } from 'react';

const AnimationIntro2 = ({ onComplete }) => {
    const [text, setText] = useState("Кремль Трейдинг");
    const [opacity, setOpacity] = useState(0);
    const [blur, setBlur] = useState(10);
    const [curtainTransform, setCurtainTransform] = useState("translate-y-0");

    // Refs for animation state
    const textRef = useRef(text);

    const russianText = "Кремль Трейдинг";
    const englishText = "Kremlin Trading";

    useEffect(() => {
        const sequence = async () => {
            // Phase 1: Fade in (0s - 1s)
            // Small delay to ensure render
            await new Promise(r => setTimeout(r, 100));
            setOpacity(1);
            setBlur(0);

            // Wait for fade in + hold (1s + 0.5s)
            await new Promise(r => setTimeout(r, 1500));

            // Phase 2: Text Scramble (1.5s duration)
            const scrambleDuration = 1500;
            const startTime = Date.now();
            const chars = "KTadegiklmnrt!@#$%^&*";

            const scrambleInterval = setInterval(() => {
                const now = Date.now();
                const progress = Math.min((now - startTime) / scrambleDuration, 1);

                const len = Math.floor(progress * englishText.length);
                let newText = "";

                // Part of the text that is already "revealed" (English)
                newText += englishText.substring(0, len);

                // Part that is still "scrambling" or Russian
                if (len < englishText.length) {
                    for (let i = len; i < englishText.length; i++) {
                        // Mix of Russian chars and random chars for effect
                        if (Math.random() > 0.5) {
                            newText += chars[Math.floor(Math.random() * chars.length)];
                        } else {
                            newText += russianText[i] || chars[Math.floor(Math.random() * chars.length)];
                        }
                    }
                }

                setText(newText);

                if (progress >= 1) {
                    clearInterval(scrambleInterval);
                    setText(englishText);
                }
            }, 50); // Update every 50ms

            // Wait for scramble to finish + hold
            await new Promise(r => setTimeout(r, scrambleDuration + 500));

            // Phase 3: Curtain Lift
            setCurtainTransform("-translate-y-full");

            // Wait for curtain animation (1.2s)
            await new Promise(r => setTimeout(r, 1200));

            onComplete && onComplete();
        };

        sequence();
    }, [onComplete]);

    return (
        <div
            className={`fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${curtainTransform}`}
        >
            <h1
                className="text-white text-4xl md:text-6xl font-bold tracking-wider transition-all duration-1000 ease-out"
                style={{
                    opacity: opacity,
                    filter: `blur(${blur}px)`
                }}
            >
                {text}
            </h1>
        </div>
    );
};

export default AnimationIntro2;
