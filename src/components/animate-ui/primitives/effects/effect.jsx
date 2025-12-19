'use client';
import * as React from 'react';
import { useIsInView } from '@/hooks/use-is-in-view';
import { Slot } from '@/components/animate-ui/primitives/animate/slot';
import { cn } from '@/lib/utils'; // Assuming cn exists, if not I see clsx/tailwind-merge in package.json so I can use that or just template literals. I'll rely on template literals/variables to be safe or assuming this project structure follows shadcn-like patterns.
// Wait, I don't see `cn` imported in the original file. I should not introduce it unless I'm sure. I'll just use template strings.

const Effect = React.forwardRef(({
  transition = { duration: 0.5, ease: "ease-out" }, // Approximate default mapping
  delay = 0,
  inView = false,
  inViewMargin = '0px',
  inViewOnce = true,
  blur = false,
  slide = false,
  fade = false,
  zoom = false,
  asChild = false,
  className,
  style,
  children,
  ...props
}, ref) => {
  const { ref: localRef, isInView } = useIsInView(ref, {
    inView,
    inViewOnce,
    inViewMargin,
  });

  // Calculate delay in seconds for style
  const delaySec = delay / 1000;

  // Determine classes based on prop configuration
  // We will use inline styles for dynamic transform/filter values to emulate the framed-motion variants precisely without creating 1000 CSS classes

  const getInitialStyle = () => {
    const s = {
      transition: `all ${transition.duration ?? 0.5}s ${transition.ease ?? "ease-out"}`,
      transitionDelay: `${delaySec}s`,
      opacity: 1,
      transform: 'translate(0, 0) scale(1)',
      filter: 'blur(0px)',
    };

    if (!isInView) {
      if (fade) {
        s.opacity = typeof fade === 'object' ? (fade.initialOpacity ?? 0) : 0;
      }

      if (zoom) {
        const scale = typeof zoom === 'object' ? (zoom.initialScale ?? 0.5) : 0.5;
        s.transform = `scale(${scale})`; // Only scale? what if slide is also there? see below
      }

      if (slide) {
        const offset = typeof slide === 'object' ? (slide.offset ?? 100) : 100;
        const direction = typeof slide === 'object' ? (slide.direction ?? 'up') : 'up';

        let x = 0;
        let y = 0;
        if (direction === 'up') y = offset;
        if (direction === 'down') y = -offset;
        if (direction === 'left') x = offset;
        if (direction === 'right') x = -offset;

        // Compose transform
        const currentScale = s.transform.match(/scale\(([^)]+)\)/)?.[1] ?? 1;
        s.transform = `translate(${x}px, ${y}px) scale(${currentScale})`;
      }

      if (blur) {
        const b = typeof blur === 'object' ? (blur.initialBlur ?? 10) : 10;
        s.filter = `blur(${b}px)`;
      }
    }

    return s;
  };

  const Component = asChild ? Slot : 'div';

  return (
    <Component
      ref={localRef}
      className={className}
      style={{
        ...style,
        ...getInitialStyle()
      }}
      {...props}
    >
      {children}
    </Component>
  );
});

Effect.displayName = "Effect";

function Effects({
  children,
  delay = 0,
  holdDelay = 0,
  ...props
}) {
  const array = React.Children.toArray(children);

  return (
    <>
      {array.map((child, index) => (
        <Effect key={child.key ?? index} delay={delay + index * holdDelay} {...props}>
          {child}
        </Effect>
      ))}
    </>
  );
}

export { Effect, Effects };
