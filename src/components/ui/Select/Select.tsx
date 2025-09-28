import type { SelectHTMLAttributes } from "react";
import s from "./Select.module.css";

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  /** совместимость с существующим использованием */
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
    <label className={[s.root, className].filter(Boolean).join(" ")}>
      <span className="visually-hidden">{label ?? a11y}</span>
      <select {...rest} aria-label={a11y} className={s.control}>
        {children}
      </select>
      <span className={s.chevron} aria-hidden>
        ▾
      </span>
    </label>
  );
}
