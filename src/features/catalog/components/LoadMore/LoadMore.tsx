import s from "./LoadMore.module.css";

type Props = {
  disabled?: boolean;
  loading?: boolean;
  onClick: () => void;
};

export default function LoadMore({ disabled, loading, onClick }: Props) {
  return (
    <button
      type="button"
      className={s.btn}
      disabled={disabled}
      aria-busy={!!loading}
      onClick={onClick}
    >
      {loading ? "Loading..." : "Load more"}
    </button>
  );
}
