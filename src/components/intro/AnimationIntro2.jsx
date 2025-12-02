import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const AnimationIntro2 = ({ onComplete }) => {
    const containerRef = useRef(null);
    const textRef = useRef(null);

    const russianText = "Кремль Трейдинг";
    const englishText = "Kremlin Trading";

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                onComplete && onComplete();
            }
        });

        // Initial state
        gsap.set(textRef.current, {
            opacity: 0,
            filter: "blur(10px)",
            text: russianText // Ensure initial text is Russian
        });

        // Phase 1: Fade in Russian text
        tl.to(textRef.current, {
            opacity: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "power2.out"
        });

        // Phase 2: Text Scramble Effect
        // We'll manually animate the text change since ScrambleText is paid
        const scrambleDuration = 1.5;
        const chars = "KTadegiklmnrt!@#$%^&*";

        tl.to({}, {
            duration: scrambleDuration,
            onUpdate: function () {
                const progress = this.progress();
                const len = Math.floor(progress * englishText.length);
                let newText = "";

                // Part of the text that is already "revealed" (English)
                newText += englishText.substring(0, len);

                // Part that is still "scrambling" or Russian
                if (len < englishText.length) {
                    // Add some random chars for the scrambling effect
                    for (let i = len; i < englishText.length; i++) {
                        // Mix of Russian chars and random chars for effect
                        if (Math.random() > 0.5) {
                            newText += chars[Math.floor(Math.random() * chars.length)];
                        } else {
                            // Keep original Russian char if length matches, otherwise random
                            newText += russianText[i] || chars[Math.floor(Math.random() * chars.length)];
                        }
                    }
                }

                if (textRef.current) {
                    textRef.current.innerText = newText;
                }
            },
            onComplete: () => {
                if (textRef.current) {
                    textRef.current.innerText = englishText;
                }
            }
        });

        // Wait a bit to read the final text
        tl.to({}, { duration: 0.5 });

        // Phase 3: Curtain Lift
        tl.to(containerRef.current, {
            yPercent: -100,
            duration: 1.2,
            ease: "power4.inOut"
        });

    }, [onComplete]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
        >
            <h1
                ref={textRef}
                className="text-white text-4xl md:text-6xl font-bold tracking-wider"
            // Monospace helps with the scramble effect look
            >
                {russianText}
            </h1>
        </div>
    );
};

export default AnimationIntro2;
