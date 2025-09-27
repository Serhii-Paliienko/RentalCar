import s from "./Loader.module.css";

type Props = {
  label?: string;
};

export default function Loader({ label = "Loading…" }: Props) {
  return (
    <div className={s.wrap} role="status" aria-live="polite" aria-busy="true">
      <div className={s.spinner} aria-hidden />
      <span className={s.text}>{label}</span>
    </div>
  );
}
