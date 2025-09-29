import Button from "@components/ui/Button/Button";
import styles from "./ErrorState.module.css";

export default function ErrorState() {
  return (
    <section className={styles.wrap} role="status" aria-live="polite">
      <div className={styles.title}>Something went wrong</div>
      <Button onClick={() => location.reload()}>Try again</Button>
    </section>
  );
}
