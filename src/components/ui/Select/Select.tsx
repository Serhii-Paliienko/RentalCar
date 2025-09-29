import { useEffect, useMemo, useRef, useState } from "react";
import s from "./Select.module.css";

type Option = { value: string; label: string };
type ChangeHandler =
  | ((value: string) => void)
  | ((e: { target: { name: string; value: string } }) => void);

type Props = {
  options: Option[];
  value?: string | null;
  onChange?: ChangeHandler;
  placeholder?: string;
  className?: string;
  ariaLabel?: string;
  iconClosedId?: string;
  iconOpenId?: string;
  disabled?: boolean;
  id?: string;
  name?: string;
  onBlur?: (e: React.FocusEvent<any>) => void;
  children?: React.ReactNode;
  multiple?: boolean;
  checked?: boolean;
};

const SPRITE = "/sprite.svg";

export default function Select({
  options,
  value = null,
  onChange,
  placeholder = "Choose",
  className,
  ariaLabel,
  iconClosedId = "open",
  iconOpenId = "close",
  disabled,
  id,
  name,
  onBlur,
}: Props) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const current = useMemo(
    () => options.find((o) => o.value === value) ?? null,
    [options, value]
  );

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!wrapRef.current) return;
      if (wrapRef.current.contains(e.target as Node)) return;
      setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown" || e.key === "Enter") {
      e.preventDefault();
      setOpen(true);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  function commitValue(next: string) {
    if (onChange) {
      try {
        if (name) {
          (onChange as any)({ target: { name, value: next } });
        } else {
          (onChange as any)(next);
        }
      } catch {
        (onChange as any)(next);
      }
    }
    setOpen(false);
    btnRef.current?.focus();
  }

  return (
    <div className={`${s.wrap} ${className ?? ""}`} ref={wrapRef}>
      <button
        id={id}
        name={name}
        ref={btnRef}
        type="button"
        className={s.control}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        disabled={!!disabled}
      >
        <span className={s.value} data-placeholder={current ? "false" : "true"}>
          {current ? current.label : placeholder}
        </span>

        <svg className={s.icon} aria-hidden="true" focusable="false">
          <use href={`${SPRITE}#${open ? iconOpenId : iconClosedId}`} />
          <use xlinkHref={`${SPRITE}#${open ? iconOpenId : iconClosedId}`} />
        </svg>
      </button>

      {open && (
        <ul role="listbox" className={s.list} tabIndex={-1}>
          {options.map((o) => (
            <li
              key={o.value}
              role="option"
              aria-selected={o.value === value}
              className={`${s.option} ${
                o.value === value ? s.optionSelected : ""
              }`}
              onClick={() => commitValue(o.value)}
            >
              {o.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
