import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import MaskOverlay from "./MaskOverlay";

const IntroCanvas = ({ onComplete }) => {
    const [maskExpanded, setMaskExpanded] = useState(false);

    const handleRevealComplete = () => {
        setMaskExpanded(true);
        // Since this is an overlay, upon completion we call the callback 
        // to unmount this component and let the user interact with the Layout below.
        if (onComplete) onComplete();
    };

    return (
        <div className="absolute inset-0 z-50 pointer-events-none">
            {/* 
         pointer-events-none on wrapper so clicks pass through if empty, 
         BUT Canvas/MaskOverlay needs pointer-events-auto to catch the 'reveal' click.
         We can set pointer-events on the mesh/canvas.
      */}
            <Canvas
                camera={{ position: [0, 0, 5], fov: 50 }}
                gl={{ powerPreference: "high-performance", antialias: true, alpha: true }}
                className="pointer-events-auto" // Enable clicks on the canvas
                style={{ background: 'transparent' }} // Crucial for overlay
            >
                <MaskOverlay
                    onRevealComplete={handleRevealComplete}
                />
            </Canvas>
        </div>
    );
};

export default IntroCanvas;
