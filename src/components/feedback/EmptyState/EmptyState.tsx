import Button from "@components/ui/Button";

export default function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="empty" role="status" aria-live="polite">
      <p>Nothing found</p>
      <Button onClick={onReset}>Try again</Button>
    </div>
  );
}
