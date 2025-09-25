import type { ReactNode } from "react";
import s from "./LoadMore.module.css";

interface Props {
  disabled?: boolean;
  loading?: boolean;
  onClick: () => void | Promise<unknown>;
  children?: ReactNode;
}

export default function LoadMore({
  disabled,
  loading,
  onClick,
  children,
}: Props) {
  return (
    <div className={s.wrap}>
      <button
        type="button"
        className={s.btn}
        disabled={!!disabled || !!loading}
        aria-busy={!!loading}
        onClick={onClick}
      >
        {children ?? (loading ? "Loading…" : "Load more")}
      </button>
    </div>
  );
}
