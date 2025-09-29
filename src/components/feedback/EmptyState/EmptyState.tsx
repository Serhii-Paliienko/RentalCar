import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import Button from "@components/ui/Button";
import s from "./EmptyState.module.css";

type Props = { onReset?: () => void };

export default function EmptyState({ onReset }: Props) {
  const [, setSearchParams] = useSearchParams();

  const fallbackReset = useCallback(() => {
    setSearchParams({}, { replace: true });
  }, [setSearchParams]);

  const handleReset = onReset ?? fallbackReset;

  return (
    <section className={s.wrap} role="status" aria-live="polite">
      <h2 className={s.title}>Nothing found</h2>
      <p className={s.desc}>
        No cars match your filters. Try adjusting criteria or reset filters.
      </p>
      <Button onClick={handleReset}>Reset filters</Button>
    </section>
  );
}
