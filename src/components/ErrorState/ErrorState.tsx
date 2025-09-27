import Button from "@components/ui/Button/Button";
import styles from "./ErrorState.module.css";

export default function ErrorState() {
  return (
    <section className={styles.wrap}>
      <div className={styles.title}>Something went wrong</div>
      <p className={styles.desc}>
        The service is temporarily unavailable. Please try again.
      </p>
      <Button onClick={() => location.reload()}>Try again</Button>
    </section>
  );
}
