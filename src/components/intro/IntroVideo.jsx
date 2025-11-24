import { useState, useEffect, useRef } from 'react';
import IntroVideoFile from '../../assets/intro/Animación_Inicial_Cinematográfica_de_Landing_Page.mp4';

const IntroVideo = ({ onComplete }) => {
    const videoRef = useRef(null);
    const [isMuted, setIsMuted] = useState(true); // Start muted to ensure autoplay works

    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        const handleEnded = () => {
            onComplete();
        };

        videoElement.addEventListener('ended', handleEnded);

        // Attempt to play
        videoElement.play().catch(error => {
            console.log("Autoplay prevented:", error);
            // If autoplay fails, we might want to show a "Play" button or just let it be.
            // For now, we rely on 'muted' to allow autoplay.
        });

        return () => {
            videoElement.removeEventListener('ended', handleEnded);
        };
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
            <video
                ref={videoRef}
                className="w-full h-full object-cover"
                src={IntroVideoFile}
                autoPlay
                muted={isMuted}
                playsInline
            />
            {/* Optional: Skip button */}
            <button
                onClick={onComplete}
                className="absolute bottom-8 right-8 text-white/50 hover:text-white text-sm uppercase tracking-widest transition-colors z-[101]"
            >
                Skip Intro
            </button>
        </div>
    );
};

export default IntroVideo;
