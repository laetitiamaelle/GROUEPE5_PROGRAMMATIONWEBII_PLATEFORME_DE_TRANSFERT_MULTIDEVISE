import type { HTMLAttributes, ReactNode } from "react";
import styles from "./Card.module.css";

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  variant?: "default" | "flat";
  padding?: "none" | "sm" | "md" | "lg";
};

export function Card({
  children,
  variant = "default",
  padding = "md",
  className = "",
  ...rest
}: CardProps) {
  const pad =
    padding === "none"
      ? styles.noPadding
      : padding === "sm"
        ? styles.paddedSm
        : padding === "lg"
          ? styles.paddedLg
          : "";

  const classes = [styles.card, variant === "flat" ? styles.flat : "", pad, className].filter(Boolean).join(" ");

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
}
