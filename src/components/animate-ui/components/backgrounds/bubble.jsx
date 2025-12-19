'use client';
import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * CSS-only BubbleBackground - Optimized for mobile performance
 * Replaces motion/react with pure CSS @keyframes animations
 */
function BubbleBackground({
  ref,
  className,
  children,
  interactive = false, // Interactive mode disabled for performance (mouse follow removed)
  colors = {
    first: '18,113,255',
    second: '221,74,255',
    third: '0,220,255',
    fourth: '200,50,50',
    fifth: '180,180,50',
    sixth: '140,100,255',
  },
  ...props
}) {
  const containerRef = React.useRef(null);
  React.useImperativeHandle(ref, () => containerRef.current);

  // CSS keyframes as a string to inject
  const keyframesCSS = `
    @keyframes bubble-float-y {
      0%, 100% { transform: translateY(-50px) translateZ(0); }
      50% { transform: translateY(50px) translateZ(0); }
    }
    @keyframes bubble-float-x {
      0%, 100% { transform: translateX(-50px) translateZ(0); }
      50% { transform: translateX(50px) translateZ(0); }
    }
    @keyframes bubble-rotate-slow {
      from { transform: rotate(0deg) translateZ(0); }
      to { transform: rotate(360deg) translateZ(0); }
    }
    @keyframes bubble-rotate-medium {
      from { transform: rotate(0deg) translateZ(0); }
      to { transform: rotate(360deg) translateZ(0); }
    }
  `;

  return (
    <div
      ref={containerRef}
      data-slot="bubble-background"
      className={cn(
        'relative size-full overflow-hidden bg-gradient-to-br from-black to-blue-900',
        className
      )}
      {...props}
    >
      <style>
        {keyframesCSS}
        {`
          :root {
            --bubble-first-color: ${colors.first};
            --bubble-second-color: ${colors.second};
            --bubble-third-color: ${colors.third};
            --bubble-fourth-color: ${colors.fourth};
            --bubble-fifth-color: ${colors.fifth};
            --bubble-sixth-color: ${colors.sixth};
          }
        `}
      </style>

      {/* SVG Filter for Goo Effect */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 left-0 w-0 h-0"
        aria-hidden="true"
      >
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="16" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {/* Animated Bubbles Container */}
      <div className="absolute inset-0" style={{ filter: 'url(#goo) blur(40px)' }}>

        {/* Bubble 1: Float Y */}
        <div
          className="absolute rounded-full size-[80%] top-[10%] left-[10%] mix-blend-hard-light"
          style={{
            background: `radial-gradient(circle at center, rgba(var(--bubble-first-color), 0.8) 0%, rgba(var(--bubble-first-color), 0) 50%)`,
            animation: 'bubble-float-y 30s ease-in-out infinite',
            willChange: 'transform',
          }}
        />

        {/* Bubble 2: Rotate Slow (origin offset left) */}
        <div
          className="absolute inset-0 flex justify-center items-center"
          style={{
            transformOrigin: 'calc(50% - 400px) 50%',
            animation: 'bubble-rotate-slow 20s linear infinite',
            willChange: 'transform',
          }}
        >
          <div
            className="rounded-full size-[80%] mix-blend-hard-light"
            style={{
              background: `radial-gradient(circle at center, rgba(var(--bubble-second-color), 0.8) 0%, rgba(var(--bubble-second-color), 0) 50%)`,
            }}
          />
        </div>

        {/* Bubble 3: Rotate Medium (origin offset right) */}
        <div
          className="absolute inset-0 flex justify-center items-center"
          style={{
            transformOrigin: 'calc(50% + 400px) 50%',
            animation: 'bubble-rotate-medium 40s linear infinite',
            willChange: 'transform',
          }}
        >
          <div
            className="absolute rounded-full size-[80%] mix-blend-hard-light"
            style={{
              background: `radial-gradient(circle at center, rgba(var(--bubble-third-color), 0.8) 0%, rgba(var(--bubble-third-color), 0) 50%)`,
              top: 'calc(50% + 200px)',
              left: 'calc(50% - 500px)',
            }}
          />
        </div>

        {/* Bubble 4: Float X */}
        <div
          className="absolute rounded-full size-[80%] top-[10%] left-[10%] mix-blend-hard-light opacity-70"
          style={{
            background: `radial-gradient(circle at center, rgba(var(--bubble-fourth-color), 0.8) 0%, rgba(var(--bubble-fourth-color), 0) 50%)`,
            animation: 'bubble-float-x 40s ease-in-out infinite',
            willChange: 'transform',
          }}
        />

        {/* Bubble 5: Rotate with large origin offset */}
        <div
          className="absolute inset-0 flex justify-center items-center"
          style={{
            transformOrigin: 'calc(50% - 800px) calc(50% + 200px)',
            animation: 'bubble-rotate-slow 20s linear infinite',
            willChange: 'transform',
          }}
        >
          <div
            className="absolute rounded-full size-[160%] mix-blend-hard-light"
            style={{
              background: `radial-gradient(circle at center, rgba(var(--bubble-fifth-color), 0.8) 0%, rgba(var(--bubble-fifth-color), 0) 50%)`,
              top: 'calc(50% - 80%)',
              left: 'calc(50% - 80%)',
            }}
          />
        </div>

        {/* Bubble 6: Static (interactive disabled for performance) */}
        {interactive && (
          <div
            className="absolute rounded-full size-full mix-blend-hard-light opacity-70"
            style={{
              background: `radial-gradient(circle at center, rgba(var(--bubble-sixth-color), 0.8) 0%, rgba(var(--bubble-sixth-color), 0) 50%)`,
            }}
          />
        )}
      </div>

      {children}
    </div>
  );
}

export { BubbleBackground };
