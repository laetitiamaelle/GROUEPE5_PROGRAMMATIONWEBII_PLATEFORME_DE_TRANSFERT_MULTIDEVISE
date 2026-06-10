import type { ReactNode } from "react";
import styles from "./Toast.module.css";

export type ToastType = "success" | "error" | "info";

export type ToastPayload = {
  title?: string;
  message: string;
  type?: ToastType;
};

type ToastProps = ToastPayload & {
  onClose: () => void;
};

function Icon({ type }: { type: ToastType }) {
  const stroke = type === "success" ? "#22c55e" : type === "error" ? "#f87171" : "#60a5fa";
  if (type === "success") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M20 6L9 17l-5-5"
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (type === "error") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 8v5M12 17h.01" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="12" r="9" stroke={stroke} strokeWidth="2" />
      </svg>
    );
  }
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke={stroke} strokeWidth="2" />
      <path d="M12 10v6M12 8h.01" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function Toast({ title, message, type = "success", onClose }: ToastProps) {
  const kind = type === "success" ? styles.success : type === "error" ? styles.error : "";

  return (
    <div className={[styles.wrap, kind].filter(Boolean).join(" ")} role="status" aria-live="polite">
      <span className={styles.icon}>
        <Icon type={type} />
      </span>
      <div className={styles.body}>
        {title ? <div className={styles.title}>{title}</div> : null}
        <div className={styles.msg}>{message}</div>
      </div>
      <button type="button" className={styles.close} onClick={onClose} aria-label="Fermer la notification">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}

export function ToastViewport({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
