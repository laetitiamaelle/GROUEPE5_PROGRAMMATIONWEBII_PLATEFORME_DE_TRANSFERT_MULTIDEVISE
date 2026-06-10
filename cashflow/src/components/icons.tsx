import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function I({ size = 20, children, ...p }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      {children}
    </svg>
  );
}

export function Mail(p: IconProps) {
  return (
    <I {...p}>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </I>
  );
}

export function Lock(p: IconProps) {
  return (
    <I {...p}>
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </I>
  );
}

export function ArrowRight(p: IconProps) {
  return (
    <I {...p}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </I>
  );
}

export function Bell(p: IconProps) {
  return (
    <I {...p}>
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </I>
  );
}

export function CircleHelp(p: IconProps) {
  return (
    <I {...p}>
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </I>
  );
}

export function Shield(p: IconProps) {
  return (
    <I {...p}>
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </I>
  );
}

export function Globe(p: IconProps) {
  return (
    <I {...p}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </I>
  );
}

export function Headphones(p: IconProps) {
  return (
    <I {...p}>
      <path d="M3 14v3a2 2 0 0 0 2 2h1" />
      <path d="M21 14v3a2 2 0 0 1-2 2h-1" />
      <path d="M21 14a6 6 0 0 0-6-6h-2a6 6 0 0 0-6 6" />
      <path d="M9 14v3a3 3 0 0 0 3 3v0a3 3 0 0 0 3-3v-3" />
    </I>
  );
}

export function Info(p: IconProps) {
  return (
    <I {...p}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </I>
  );
}

export function ChevronRight(p: IconProps) {
  return (
    <I {...p}>
      <path d="m9 18 6-6-6-6" />
    </I>
  );
}

export function MessageCircle(p: IconProps) {
  return (
    <I {...p}>
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </I>
  );
}

export function Clock(p: IconProps) {
  return (
    <I {...p}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </I>
  );
}

export function RefreshCw(p: IconProps) {
  return (
    <I {...p}>
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </I>
  );
}

export function Download(p: IconProps) {
  return (
    <I {...p}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </I>
  );
}

export function Filter(p: IconProps) {
  return (
    <I {...p}>
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </I>
  );
}

export function Database(p: IconProps) {
  return (
    <I {...p}>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
      <path d="M3 12A9 3 0 0 0 21 12" />
    </I>
  );
}

export function TrendingUp(p: IconProps) {
  return (
    <I {...p}>
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </I>
  );
}

export function CalendarDays(p: IconProps) {
  return (
    <I {...p}>
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </I>
  );
}

export function SlidersHorizontal(p: IconProps) {
  return (
    <I {...p}>
      <line x1="21" x2="14" y1="4" y2="4" />
      <line x1="10" x2="3" y1="4" y2="4" />
      <line x1="21" x2="12" y1="12" y2="12" />
      <line x1="8" x2="3" y1="12" y2="12" />
      <line x1="21" x2="16" y1="20" y2="20" />
      <line x1="12" x2="3" y1="20" y2="20" />
      <line x1="14" x2="14" y1="2" y2="6" />
      <line x1="8" x2="8" y1="10" y2="14" />
      <line x1="16" x2="16" y1="18" y2="22" />
    </I>
  );
}

export function Search(p: IconProps) {
  return (
    <I {...p}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </I>
  );
}

export function ArrowDownLeft(p: IconProps) {
  return (
    <I {...p}>
      <path d="M17 7 7 17" />
      <path d="M17 17H7V7" />
    </I>
  );
}

export function ArrowUpRight(p: IconProps) {
  return (
    <I {...p}>
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </I>
  );
}

export function Shuffle(p: IconProps) {
  return (
    <I {...p}>
      <path d="m18 14 4 4-4 4" />
      <path d="m6 10-4-4 4-4" />
      <path d="M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22" />
      <path d="m22 6-1.973a4 4 0 0 0-3.3-1.7l-5.454 8.6a4 4 0 0 1-3.3 1.7H2" />
    </I>
  );
}

export function UserCog(p: IconProps) {
  return (
    <I {...p}>
      <circle cx="18" cy="15" r="3" />
      <circle cx="9" cy="7" r="4" />
      <path d="M10 15H6a4 4 0 0 0-4 4v2" />
      <path d="m21.7 16.4-.9-.3" />
      <path d="m15.2 13.9-.9-.3" />
      <path d="m16.6 18.7.3-.9" />
      <path d="m19.1 12.2.3-.9" />
      <path d="m19.6 18.7-.4-1" />
      <path d="m16.8 15.3-.4-1" />
      <path d="m14.3 19.6 1-.4" />
      <path d="m20.7 14.8 1-.4" />
    </I>
  );
}

export function MoreHorizontal(p: IconProps) {
  return (
    <I {...p}>
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </I>
  );
}

export function CheckCircle2(p: IconProps) {
  return (
    <I {...p}>
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </I>
  );
}

export function FileText(p: IconProps) {
  return (
    <I {...p}>
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 9H8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </I>
  );
}

export function LayoutGrid(p: IconProps) {
  return (
    <I {...p}>
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </I>
  );
}

export function Share2(p: IconProps) {
  return (
    <I {...p}>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
      <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
    </I>
  );
}
