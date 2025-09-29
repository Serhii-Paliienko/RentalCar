import styles from "./SplitInput.module.css";

export default function SplitInput() {
  return (
    <div className={styles.root}>
      <span className={styles.part}>
        <label className={styles.mileageLabel} htmlFor="fromInput">
          From
        </label>
        <div className={styles.staticText}>км</div>
        <input id="fromInput" className={styles.input} inputMode="numeric" />
      </span>
      <span className={styles.part}>
        <label className={styles.mileageLabel} htmlFor="toInput">
          To
        </label>
        <div className={styles.staticText}>км</div>
        <input id="toInput" className={styles.input} inputMode="numeric" />
      </span>
    </div>
  );
}
