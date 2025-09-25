export function formatMileage(n: number) {
  const s = Math.trunc(n).toString();
  return s.replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " km";
}

export function formatPriceUsd(perDay: string) {
  const n = Number(perDay);
  if (Number.isFinite(n)) return `$${n}`;
  return `$${perDay}`;
}
