import styles from "./SplitInput.module.css";

export default function SplitInput() {
  return (
    <div className={styles.root}>
      <span className={styles.part}>
        <input
          className={styles.input}
          placeholder="From"
          inputMode="numeric"
        />
      </span>
      <span className={styles.part}>
        <input className={styles.input} placeholder="To" inputMode="numeric" />
      </span>
    </div>
  );
}
