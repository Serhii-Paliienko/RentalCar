import s from "./Loader.module.css";

export default function Loader({ label = "Loading..." }: { label?: string }) {
  return (
    <div className={s.wrap} role="status" aria-live="polite" aria-busy="true">
      <span className={s.spinner} aria-hidden="true" />
      <span className={s.text}>{label}</span>
    </div>
  );
}
