import s from "./Loader.module.css";

type LoaderProps = {
  label?: string;
  ariaLabel?: string;
};

export default function Loader({ label = "Loading…", ariaLabel }: LoaderProps) {
  return (
    <section
      className={s.wrap}
      role="status"
      aria-live="polite"
      aria-label={ariaLabel}
    >
      <div className={s.scene} aria-hidden="true">
        <div className={s.car} />
        <div className={s.road} />
      </div>
      <p className={s.text}>{label}</p>
    </section>
  );
}
