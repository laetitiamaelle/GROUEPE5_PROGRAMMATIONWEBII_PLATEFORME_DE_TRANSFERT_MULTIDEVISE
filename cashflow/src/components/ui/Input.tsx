import { useId, type InputHTMLAttributes, type ReactNode } from "react";
import styles from "./Input.module.css";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  iconLeft?: ReactNode;
};

export function Input({ label, error, iconLeft, className = "", id, ...rest }: InputProps) {
  const autoId = useId();
  const inputId = id ?? (typeof rest.name === "string" && rest.name ? rest.name : autoId);

  return (
    <div className={styles.wrap}>
      {label ? (
        <label className={styles.label} htmlFor={inputId}>
          {label}
        </label>
      ) : null}
      <div className={styles.inputRow}>
        {iconLeft ? <span className={styles.iconLeft}>{iconLeft}</span> : null}
        <input
          id={inputId}
          className={[styles.input, iconLeft ? styles.inputWithIcon : "", className].filter(Boolean).join(" ")}
          {...rest}
        />
      </div>
      {error ? <span className={styles.error}>{error}</span> : null}
    </div>
  );
}
