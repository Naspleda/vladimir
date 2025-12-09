'use client';
import * as React from 'react';
import { MousePointer2 } from 'lucide-react';
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
    <button
      className={`relative flex space-x-1 items-center overflow-hidden whitespace-nowrap rounded-full border border-neutral-800 dark:border-neutral-200 bg-background text-foreground font-medium transition-all duration-300 ease-out ${isActive ? 'max-w-[140px]' : 'max-w-[40px]'
        }`}
      style={{
        height: buttonSize,
        minWidth: buttonSize,
        padding: buttonPadding,
      }}
      onClick={onActivate}
      type="button"
      role="menuitem"
      aria-pressed={!!isActive}
      aria-label={label}
    >
      <Icon
        className="shrink-0"
        style={{
          height: iconSize,
          width: iconSize,
          transform: `translateX(${translateX}px)`,
        }}
      />
      <span
        className={`text-sm transition-all duration-300 ease-out ${isActive
            ? 'opacity-100 w-auto visible translate-x-0'
            : 'opacity-0 w-0 invisible translate-x-1'
          }`}
      >
        {label}
      </span>
    </button>
  );
}

function RadialNav({
  size = 480,
  items = ITEMS,
  menuButtonConfig,
  activeId,
  onActiveChange
}) {
  const orbitRadius = size / 2 - 0.5;

  const handleActivate = React.useCallback((id) => {
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
      aria-label="Radial navigation"
    >
      {/* Pointer - CSS transition instead of motion */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 ease-out"
        style={{
          transform: `translate(-50%, -50%) rotate(${rotateAngle}deg)`,
        }}
        aria-hidden="true"
      >
        <MousePointer2 className="size-5 text-foreground" />
      </div>

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
            }}
          >
            <MenuButton
              item={item}
              isActive={activeId === id}
              onActivate={() => handleActivate(id)}
              menuButtonConfig={resolvedMenuButtonConfig}
            />
          </div>
        );
      })}
    </div>
  );
}

export { RadialNav };
