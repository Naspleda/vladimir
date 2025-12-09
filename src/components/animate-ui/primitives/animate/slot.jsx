'use client';
import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * Simplified Slot component - passes props to children without motion dependency
 * Used for composition patterns where you want to apply props to a child element
 */
function mergeRefs(...refs) {
  return (node) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === 'function') {
        ref(node);
      } else {
        ref.current = node;
      }
    });
  };
}

function mergeProps(childProps, slotProps) {
  const merged = { ...childProps, ...slotProps };

  if (childProps.className || slotProps.className) {
    merged.className = cn(childProps.className, slotProps.className);
  }

  if (childProps.style || slotProps.style) {
    merged.style = {
      ...(childProps.style),
      ...(slotProps.style),
    };
  }

  return merged;
}

function Slot({ children, ref, ...props }) {
  if (!React.isValidElement(children)) return null;

  const { ref: childRef, ...childProps } = children.props;
  const mergedProps = mergeProps(childProps, props);

  return React.cloneElement(children, {
    ...mergedProps,
    ref: mergeRefs(childRef, ref),
  });
}

export { Slot };
