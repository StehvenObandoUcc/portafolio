import type { SVGProps } from "react";

/** Hand-authored 24px line icons, 1.75 stroke, round joins. */
const paths = {
  "arrow-right": <path d="M5 12h14M13 6l6 6-6 6" />,
  "arrow-up-right": <path d="M7 17 17 7M8.5 7H17v8.5" />,
  "arrow-up": <path d="M12 19V5M6 11l6-6 6 6" />,
  download: <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />,
  play: <path d="M8 5.5v13l10.5-6.5z" />,
  pause: <path d="M8.5 5.5v13M15.5 5.5v13" />,
  code: <path d="M8.5 8 4.5 12l4 4M15.5 8l4 4-4 4M13.5 5.5l-3 13" />,
  github: (
    <path d="M9 19.5c-4 1.3-4-2-6-2.5m12 4.5v-3.4c0-1 .1-1.5-.5-2.1 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.6 11.6 0 0 0-6.2 0C6.6 2 5.6 2.3 5.6 2.3a4.3 4.3 0 0 0-.1 3.2 4.6 4.6 0 0 0-1.3 3.2c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2.1v4.7" />
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3.5" />
      <path d="M8 10.5V17M8 7.25v.01M12 17v-6.5M12 13.5a2.75 2.75 0 0 1 5.5 0V17" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  whatsapp: (
    <path d="M4 20.5 5.4 16A8.25 8.25 0 1 1 8.3 18.9zM9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .75a3.5 3.5 0 0 1-1.75-1.75l.75-1-1-2z" />
  ),
  copy: (
    <>
      <rect x="8.5" y="8.5" width="11.5" height="11.5" rx="2.25" />
      <path d="M15.5 8.5V6.25A2.25 2.25 0 0 0 13.25 4h-7A2.25 2.25 0 0 0 4 6.25v7a2.25 2.25 0 0 0 2.25 2.25H8.5" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  menu: <path d="M4 8.5h16M4 15.5h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  "map-pin": (
    <>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" />
      <circle cx="12" cy="10" r="2.25" />
    </>
  ),
  layout: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <path d="M3 9h18M9 9v11" />
    </>
  ),
  server: (
    <>
      <rect x="4" y="4" width="16" height="7" rx="2" />
      <rect x="4" y="13" width="16" height="7" rx="2" />
      <path d="M8 7.5h.01M8 16.5h.01" />
    </>
  ),
  devices: (
    <>
      <rect x="2.5" y="5" width="12.5" height="9.5" rx="1.75" />
      <path d="M6 18.5h5.5M8.75 14.5v4" />
      <rect x="16.5" y="8" width="5" height="11" rx="1.5" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="2.75" />
      <path d="M5 6v12c0 1.5 3.1 2.75 7 2.75s7-1.25 7-2.75V6M5 12c0 1.5 3.1 2.75 7 2.75s7-1.25 7-2.75" />
    </>
  ),
  cloud: <path d="M7.25 18.5a4.5 4.5 0 0 1-.7-8.95 6 6 0 0 1 11.6.45 4.25 4.25 0 0 1-.4 8.5z" />,
  graduation: <path d="M2.5 9 12 4.5 21.5 9 12 13.5zM6.5 11v4.75c0 1.4 2.5 3 5.5 3s5.5-1.6 5.5-3V11M21.5 9v5" />,
  award: (
    <>
      <circle cx="12" cy="9" r="5.25" />
      <path d="m8.75 13.25-1.5 7.25L12 18l4.75 2.5-1.5-7.25" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </>
  ),
  book: <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5zM4 20.5A2.5 2.5 0 0 0 6.5 21H20M8.5 7.5h7" />,
  users: (
    <>
      <circle cx="9" cy="8.5" r="3.25" />
      <path d="M3 19.5a6 6 0 0 1 12 0M15.5 5.5a3.25 3.25 0 0 1 0 6.25M17.5 14a6 6 0 0 1 3.5 5.5" />
    </>
  ),
} as const;

export type IconName = keyof typeof paths;

interface IconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  name: IconName;
  size?: number;
  /** When set, the icon is announced; otherwise it is decorative. */
  title?: string;
}

export function Icon({ name, size = 18, title, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      data-icon={name}
      focusable="false"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
