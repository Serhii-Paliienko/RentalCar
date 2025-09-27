import type { SelectHTMLAttributes } from "react";
import styles from "./Select.module.css";

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  /** совместимость с существующим использованием в router.tsx */
  ariaLabel?: string;
};

export default function Select({
  label,
  ariaLabel,
  children,
  className = "",
  ...rest
}: Props) {
  const a11y = ariaLabel || label || rest["aria-label"] || "Select";
  return (
    <label className={[styles.select, className].filter(Boolean).join(" ")}>
      <span className="visually-hidden">{label ?? a11y}</span>
      <select {...rest} aria-label={a11y} className={styles.control}>
        {children}
      </select>
      <span className={styles.chevron} aria-hidden>
        ▾
      </span>
    </label>
  );
}
