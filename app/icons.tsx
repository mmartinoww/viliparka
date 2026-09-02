import { LOGO_SM_GOLD_SRC, LOGO_SM_GREEN_SRC } from "./lib/site";

type IconProps = {
  size?: number;
  className?: string;
};

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true
});

/** Twin gable houses — gold by default, green tilt on header hover. */
export function BrandMark({ size = 36, className }: IconProps) {
  return (
    <span className={className} style={{ width: size, height: size }} aria-hidden="true">
      <img
        src={LOGO_SM_GOLD_SRC}
        alt=""
        width={size}
        height={size}
        className="site-header__mark-img site-header__mark-img--default"
        draggable={false}
      />
      <img
        src={LOGO_SM_GREEN_SRC}
        alt=""
        width={size}
        height={size}
        className="site-header__mark-img site-header__mark-img--hover"
        draggable={false}
      />
    </span>
  );
}

export function IconPhone({ size = 20, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M15.6 21A13.6 13.6 0 0 1 3 8.4 3.4 3.4 0 0 1 6.4 5h1.9a1 1 0 0 1 1 .85l.5 3a1 1 0 0 1-.5 1L8 11.2a10.4 10.4 0 0 0 4.8 4.8l1.35-1.3a1 1 0 0 1 1-.5l3 .5a1 1 0 0 1 .85 1v1.9A3.4 3.4 0 0 1 15.6 21Z" />
    </svg>
  );
}

export function IconMail({ size = 20, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="2.6" y="5" width="18.8" height="14" rx="2.6" />
      <path d="m3.4 7.4 7.5 5.2a2 2 0 0 0 2.2 0l7.5-5.2" />
    </svg>
  );
}

export function IconViber({ size = 20, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M12 2.8c5 0 8.4 3.2 8.4 7.7 0 4.6-3.4 7.8-8.4 7.8a11 11 0 0 1-2-.2l-3.9 2.6a.5.5 0 0 1-.8-.5l.5-3.3C3.9 15.6 3 13.2 3 10.5 3 6 6.9 2.8 12 2.8Z" />
      <path d="M9.2 8.1c.5-.2.9 0 1.2.5l.5 1a.9.9 0 0 1-.2 1.1c-.3.3-.3.5-.1.8.4.7 1 1.2 1.7 1.5.3.2.6.1.8-.2a.9.9 0 0 1 1.1-.2l1 .5c.5.3.7.7.5 1.2-.3.7-1 1.1-1.9 1-2.4-.4-5-3-5.4-5.4-.1-.9.2-1.6 1-1.8Z" />
      <path d="M13.8 7.6a2.7 2.7 0 0 1 2.1 2.2" />
    </svg>
  );
}

export function IconFacebook({ size = 20, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M13.6 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5H17V3.6c-.3 0-1.3-.1-2.45-.1-2.45 0-4.1 1.5-4.1 4.2v2.2H7.7V13h2.75v8Z" />
    </svg>
  );
}

export function IconPin({ size = 20, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M12 21.2c3.7-4.1 5.6-7.2 5.6-9.6a5.6 5.6 0 1 0-11.2 0c0 2.4 1.9 5.5 5.6 9.6Z" />
      <circle cx="12" cy="11.2" r="2.2" />
    </svg>
  );
}

export function IconCheck({ size = 20, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="m4.5 12.6 4.6 4.6L19.5 6.8" />
    </svg>
  );
}

export function IconArrowRight({ size = 20, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M4.5 12h15" />
      <path d="m13.4 5.8 6.1 6.2-6.1 6.2" />
    </svg>
  );
}

export function IconArrowUp({ size = 20, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M12 19.5v-15" />
      <path d="m5.8 10.6 6.2-6.1 6.2 6.1" />
    </svg>
  );
}

export function IconChevronRight({ size = 20, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="m9.5 5.5 6.5 6.5-6.5 6.5" />
    </svg>
  );
}

export function IconChevronLeft({ size = 20, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M14.5 5.5 8 12l6.5 6.5" />
    </svg>
  );
}

export function IconMenu({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M4 7h16M4 12h16M4 17h11" />
    </svg>
  );
}

export function IconClose({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function IconPlus({ size = 16, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function IconUsers({ size = 20, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="9.2" cy="8.4" r="3.4" />
      <path d="M3 20a6.2 6.2 0 0 1 12.4 0" />
      <path d="M16.2 5.6a3 3 0 0 1 0 5.6" />
      <path d="M17.8 14.4A5.2 5.2 0 0 1 21 19.4" />
    </svg>
  );
}

export function IconBed({ size = 20, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M3 19v-9" />
      <path d="M3 13h18v6" />
      <path d="M21 19v-4.4a2.6 2.6 0 0 0-2.6-2.6H11V8.4A1.4 1.4 0 0 1 12.4 7h5" />
      <circle cx="7" cy="10" r="1.9" />
    </svg>
  );
}

export function IconWaves({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M2.5 15.5c1.6 0 2.4-1.2 4-1.2s2.4 1.2 4 1.2 2.4-1.2 4-1.2 2.4 1.2 4 1.2h1" />
      <path d="M2.5 19.4c1.6 0 2.4-1.2 4-1.2s2.4 1.2 4 1.2 2.4-1.2 4-1.2 2.4 1.2 4 1.2h1" />
      <path d="M8.4 10.6V6.2a2.2 2.2 0 0 1 4.4 0v4.9" />
      <path d="M15 10.6V6.2a2.2 2.2 0 0 1 4.4 0" />
    </svg>
  );
}

export function IconCar({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M4 16.6v2.2h2.6v-2.2" />
      <path d="M17.4 16.6v2.2H20v-2.2" />
      <path d="M3.2 16.6h17.6v-4l-1.6-4.2A2 2 0 0 0 17.3 7H6.7a2 2 0 0 0-1.9 1.4L3.2 12.6Z" />
      <path d="M3.6 12.6h16.8" />
      <path d="M7 14.9h1.4M15.6 14.9H17" />
    </svg>
  );
}

export function IconUtensils({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M6.4 3.4v6.2a2.4 2.4 0 0 0 4.8 0V3.4" />
      <path d="M8.8 12v8.6" />
      <path d="M16.6 3.4c1.9 0 3.2 1.7 3.2 4.2s-1.1 3.7-2.2 4v9" />
    </svg>
  );
}

export function IconFlame({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M12 21c3.5 0 5.8-2.2 5.8-5.4 0-4-3.3-5.6-3.3-9-.1-1-.5-2-1.3-3.1-.9 2.2-2.4 3.1-3.9 4.7A7.7 7.7 0 0 0 6.2 15c0 3.4 2.3 6 5.8 6Z" />
      <path d="M12 21c1.7 0 2.8-1.2 2.8-2.8 0-1.9-1.6-2.7-1.6-4.4-1.4 1.2-2.9 2.1-2.9 4.4 0 1.6 1 2.8 1.7 2.8Z" />
    </svg>
  );
}

export function IconGrill({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M3.6 6.6h16.8l-2.4 7.2a4 4 0 0 1-3.8 2.7H9.8a4 4 0 0 1-3.8-2.7Z" />
      <path d="M8 6.6v7.9M12 6.6v7.9M16 6.6v7.9" />
      <path d="m9.6 16.5-2 4.2M14.4 16.5l2 4.2" />
      <path d="M8.6 3.4v1.6M15.4 3.4v1.6" />
    </svg>
  );
}

export function IconDroplet({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M12 3.2c3.2 3.5 5.4 6.3 5.4 9.2A5.4 5.4 0 0 1 6.6 12.4c0-2.9 2.2-5.7 5.4-9.2Z" />
      <path d="M9.6 14.6a2.6 2.6 0 0 0 2.6 2.4" />
    </svg>
  );
}

export function IconTree({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M12 3 7.4 9.6h2.2L6.4 14.4h11.2L14.4 9.6h2.2Z" />
      <path d="M12 14.4V21" />
      <path d="M9.4 21h5.2" />
    </svg>
  );
}

export function IconMountain({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="m2.6 19 6.2-11 4 6.6 2-3.2 6.6 7.6Z" />
      <path d="m6.8 12.2 2 1.6 2-1.6" />
    </svg>
  );
}

export function IconClock({ size = 20, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M12 7.6V12l3.2 2" />
    </svg>
  );
}

export function IconTag({ size = 20, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M12.6 3.4H20V11l-8.2 8.2a2 2 0 0 1-2.8 0L4.2 14a2 2 0 0 1 0-2.8Z" />
      <circle cx="16.3" cy="7.7" r="1.3" />
    </svg>
  );
}

export function IconSparkle({ size = 20, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M12 3.4l1.9 5.1 5.1 1.9-5.1 1.9-1.9 5.1-1.9-5.1L5 10.4l5.1-1.9Z" />
      <path d="M18.4 16.6l.7 1.9 1.9.7-1.9.7-.7 1.9-.7-1.9-1.9-.7 1.9-.7Z" />
    </svg>
  );
}

export function IconGlobe({ size = 18, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M3.4 12h17.2" />
      <path d="M12 3.4c2.2 2.4 3.4 5.4 3.4 8.6S14.2 18.2 12 20.6C9.8 18.2 8.6 15.2 8.6 12S9.8 5.8 12 3.4Z" />
    </svg>
  );
}
