import s from "./NoResults.module.css";

export default function NoResults() {
  return (
    <section className={s.wrap} role="status" aria-live="polite">
      <div className={s.box} aria-hidden="true">
        <div className={s.car}>🚗</div>
        <div className={s.scan} />
      </div>
      <h2 className={s.title}>Nothing found</h2>
      <p className={s.text}>
        No cars match your filters. Try adjusting the criteria or reset filters.
      </p>
    </section>
  );
}
