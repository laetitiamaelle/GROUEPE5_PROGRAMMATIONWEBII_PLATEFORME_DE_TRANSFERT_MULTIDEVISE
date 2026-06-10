import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

type Variant = "primary" | "secondary" | "ghost";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  fullWidth,
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const classes = [
    styles.btn,
    styles[variant],
    size === "sm" ? styles.sm : "",
    size === "lg" ? styles.lg : "",
    fullWidth ? styles.fullWidth : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}
