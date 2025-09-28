import { useState, useCallback } from "react";
import type { SelectHTMLAttributes, FocusEvent, MouseEvent } from "react";
import s from "./Select.module.css";

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  /** подпись для скринридера; визуальную подпись рендерим в Filters */
  ariaLabel?: string;
  /** id иконки «закрыт» в public/sprite.svg */
  iconClosedId?: string; // по макету — стрелка вниз
  /** id иконки «открыт» в public/sprite.svg */
  iconOpenId?: string; // по макету — стрелка вверх/close
};

export default function Select({
  ariaLabel,
  className = "",
  iconClosedId = "#open",
  iconOpenId = "#close",
  onFocus,
  onBlur,
  onMouseDown,
  children,
  ...rest
}: Props) {
  const [open, setOpen] = useState(false);
  const a11y = ariaLabel || rest["aria-label"] || "Select";

  const handleFocus = useCallback(
    (e: FocusEvent<HTMLSelectElement>) => {
      setOpen(true);
      onFocus?.(e);
    },
    [onFocus]
  );

  const handleBlur = useCallback(
    (e: FocusEvent<HTMLSelectElement>) => {
      setOpen(false);
      onBlur?.(e);
    },
    [onBlur]
  );

  const handleMouseDown = useCallback((_e: MouseEvent<HTMLLabelElement>) => {
    setOpen(true);
  }, []);

  return (
    <label
      className={[s.root, className].filter(Boolean).join(" ")}
      data-open={open ? "true" : "false"}
      aria-haspopup="listbox"
      aria-expanded={open}
      onMouseDown={handleMouseDown}
    >
      <span className="visually-hidden">{a11y}</span>

      <select
        {...rest}
        aria-label={a11y}
        className={s.control}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        {children}
      </select>

      <span className={s.chevron} aria-hidden>
        <svg className={s.iconClosed} focusable="false">
          <use href={iconClosedId} />
        </svg>
        <svg className={s.iconOpen} focusable="false">
          <use href={iconOpenId} />
        </svg>
        <span className={s.fallback}>▾</span>
      </span>
    </label>
  );
}
