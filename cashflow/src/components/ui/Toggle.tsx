import styles from "./Toggle.module.css";

export type ToggleProps = {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
  hint?: string;
  disabled?: boolean;
  id?: string;
};

export function Toggle({ checked, onChange, label, hint, disabled, id }: ToggleProps) {
  return (
    <div className={styles.row}>
      <div>
        <div className={styles.label} id={id ? `${id}-label` : undefined}>
          {label}
        </div>
        {hint ? <div className={styles.hint}>{hint}</div> : null}
      </div>
      <button
        type="button"
        id={id}
        role="switch"
        aria-checked={checked}
        aria-labelledby={id ? `${id}-label` : undefined}
        disabled={disabled}
        className={[styles.track, checked ? styles.trackOn : ""].join(" ")}
        onClick={() => onChange(!checked)}
      >
        <span className={[styles.thumb, checked ? styles.thumbOn : ""].join(" ")} />
      </button>
    </div>
  );
}
