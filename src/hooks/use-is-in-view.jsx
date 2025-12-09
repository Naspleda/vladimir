import * as React from 'react';

/**
 * Custom hook to detect if element is in viewport
 * Replaces motion/react useInView with native IntersectionObserver
 */
function useIsInView(ref, options = {}) {
  const { inView, inViewOnce = false, inViewMargin = '0px' } = options;
  const localRef = React.useRef(null);
  const [isInViewState, setIsInViewState] = React.useState(false);
  const hasBeenInView = React.useRef(false);

  React.useImperativeHandle(ref, () => localRef.current);

  React.useEffect(() => {
    const element = localRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;

        if (inViewOnce) {
          // Once mode: only trigger once, then stay true
          if (isVisible && !hasBeenInView.current) {
            hasBeenInView.current = true;
            setIsInViewState(true);
          }
        } else {
          setIsInViewState(isVisible);
        }
      },
      {
        rootMargin: inViewMargin,
        threshold: 0,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [inViewMargin, inViewOnce]);

  // If inView option is false, always consider it "in view"
  const isInView = !inView || isInViewState;

  return { ref: localRef, isInView };
}

export { useIsInView };
