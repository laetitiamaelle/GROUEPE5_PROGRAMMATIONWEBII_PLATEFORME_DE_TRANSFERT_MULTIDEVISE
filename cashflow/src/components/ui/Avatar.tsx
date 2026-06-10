import { useState } from "react";
import styles from "./Avatar.module.css";

export type AvatarProps = {
  name: string;
  src?: string;
  size?: number;
  ring?: boolean;
};

export function Avatar({ name, src, size = 40, ring }: AvatarProps) {
  const [broken, setBroken] = useState(false);
  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const dimension = { width: size, height: size, fontSize: Math.max(12, Math.round(size * 0.36)) };

  if (src && !broken) {
    return (
      <img
        src={src}
        alt={name}
        className={[styles.img, ring ? styles.ring : ""].filter(Boolean).join(" ")}
        style={dimension}
        onError={() => setBroken(true)}
      />
    );
  }

  return (
    <div
      className={[styles.fallback, ring ? styles.ring : ""].filter(Boolean).join(" ")}
      style={dimension}
      aria-label={name}
    >
      {initials || "?"}
    </div>
  );
}
