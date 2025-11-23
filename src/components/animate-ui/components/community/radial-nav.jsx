'use client';;
import * as React from 'react';
import { MousePointer2 } from 'lucide-react';
import { motion } from 'motion/react';

import { Bookmark, LayoutGrid, User } from 'lucide-react';

const ITEMS = [
  { id: 1, icon: LayoutGrid, label: 'Projects', angle: 0 },
  { id: 2, icon: Bookmark, label: 'Bookmarks', angle: -115 },
  { id: 3, icon: User, label: 'About', angle: 115 },
];

const defaultMenuButtonConfig = {
  iconSize: 20,
  buttonSize: 40,
  buttonPadding: 8,
};

const POINTER_BASE_DEG = 45;

const POINTER_ROT_SPRING = {
  type: 'spring',
  stiffness: 220,
  damping: 26
};

const BUTTON_MOTION_CONFIG = {
  initial: 'rest',

  variants: {
    rest: { maxWidth: '40px' },
    hover: {
      maxWidth: '140px',
      transition: { type: 'spring', stiffness: 200, damping: 35, delay: 0.05 },
    },
    tap: { scale: 0.95 },
  },

  transition: { type: 'spring', stiffness: 200, damping: 25 }
};

const LABEL_VARIANTS = {
  rest: { opacity: 0, x: 4 },
  hover: {
    opacity: 1,
    x: 0,
    visibility: 'visible',
    width: 'auto',
  },
  tap: { opacity: 1, x: 0, visibility: 'visible', width: 'auto' },
};

const LABEL_TRANSITION = {
  type: 'spring',
  stiffness: 200,
  damping: 25,
};

function getPolarCoordinates(angleDeg, r) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: r * Math.cos(rad), y: r * Math.sin(rad) };
}

function calculateIconOffset({
  buttonSize,
  iconSize,
  buttonPadding,
  bias = 0
}) {
  const centerOffset = (buttonSize - iconSize) / 2;
  return centerOffset - buttonPadding + bias;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function withDefaults(defaults, overrides) {
  return { ...defaults, ...overrides };
}

function normalizeDeg(a) {
  return ((a % 360) + 360) % 360;
}

function toNearestTurn(prev, target) {
  const b = normalizeDeg(target);
  if (prev === undefined) return b;
  const k = Math.round((prev - b) / 360);
  return b + 360 * k;
}

function useShortestRotation(target) {
  const prevRef = React.useRef(undefined);
  return React.useMemo(() => {
    const next = toNearestTurn(prevRef.current, target);
    prevRef.current = next;
    return next;
  }, [target]);
}

function MenuButton({
  item,
  isActive,
  onActivate,
  menuButtonConfig
}) {
  const { icon: Icon, label } = item;
  const { iconSize, buttonSize, buttonPadding } = menuButtonConfig;

  const translateX = calculateIconOffset({
    ...menuButtonConfig,
    bias: -1,
  });

  return (
    <motion.button
      {...BUTTON_MOTION_CONFIG}
      initial={false}
      animate={isActive ? 'hover' : 'rest'}
      className="relative flex space-x-1 items-center overflow-hidden whitespace-nowrap rounded-full border border-neutral-800 dark:border-neutral-200 bg-background text-foreground font-medium"
      style={{
        height: buttonSize,
        minWidth: buttonSize,
        padding: buttonPadding,
      }}
      onClick={onActivate}
      type="button"
      role="menuitem"
      aria-pressed={!!isActive}
      aria-label={label}>
      <Icon
        className="shrink-0"
        style={{
          height: iconSize,
          width: iconSize,
          transform: `translateX(${translateX}px)`,
        }} />
      <motion.span
        variants={LABEL_VARIANTS}
        transition={LABEL_TRANSITION}
        className="invisible text-sm w-0">
        {label}
      </motion.span>
    </motion.button>
  );
}

// orbitRadius determines how far from the center each item should be placed.
// It positions the CENTER of each small circle exactly on the parent circle's stroke.
// Formula: parentRadius (size/2) minus half of the child diameter (~0.5 accounts for border).
function RadialNav({
  size = 480,
  items = ITEMS,
  menuButtonConfig,
  defaultActiveId,
  onActiveChange
}) {
  const orbitRadius = size / 2 - 0.5;
  const [activeId, setActiveId] = React.useState(defaultActiveId ?? null);

  const handleActivate = React.useCallback((id) => {
    setActiveId(id);
    onActiveChange?.(id);
  }, [onActiveChange]);

  const baseAngle =
    (items.find((it) => it.id === activeId)?.angle ?? 0) + POINTER_BASE_DEG;
  const rotateAngle = useShortestRotation(baseAngle);

  const resolvedMenuButtonConfig = withDefaults(defaultMenuButtonConfig, menuButtonConfig);

  return (
    <div
      className="relative flex items-center justify-center rounded-full border border-neutral-800 dark:border-neutral-200"
      style={{ width: size, height: size }}
      role="menu"
      aria-label="Radial navigation">
      <motion.div
        initial={false}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{ rotate: rotateAngle }}
        transition={POINTER_ROT_SPRING}
        style={{ originX: 0.5, originY: 0.5 }}
        aria-hidden="true">
        <MousePointer2 className="size-5 text-foreground" />
      </motion.div>
      {items.map((item) => {
        const { id, angle } = item;
        const { x, y } = getPolarCoordinates(angle, orbitRadius);
        return (
          <div
            key={id}
            className="group absolute"
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              transform: 'translate(-50%, -50%)',
            }}>
            <MenuButton
              item={item}
              isActive={activeId === id}
              onActivate={() => handleActivate(id)}
              menuButtonConfig={resolvedMenuButtonConfig} />
          </div>
        );
      })}
    </div>
  );
}

export { RadialNav };
