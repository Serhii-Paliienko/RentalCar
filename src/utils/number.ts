// Нормализация чисел и диапазонов — по плану (digits/normalizeIntString)

export function normalizeIntString(
  value: string | number | null | undefined
): string {
  if (value === null || value === undefined) return "";
  const s = String(value).replace(/\D+/g, ""); // оставляем только цифры
  if (!s) return "";
  // Убираем лидирующие нули
  return String(Number(s));
}

export function normalizeRange(
  min: string | number | null | undefined,
  max: string | number | null | undefined
): { min: string; max: string } {
  const mi = normalizeIntString(min as any);
  const ma = normalizeIntString(max as any);
  if (mi && ma && Number(mi) > Number(ma)) {
    return { min: ma, max: mi };
  }
  return { min: mi, max: ma };
}

/** Форматирование пробега: 5000 -> "5 000 km" */
export function formatMileage(n: number): string {
  const s = Number(n || 0)
    .toLocaleString("en-US")
    .replace(/,/g, " ");
  return `${s} km`;
}
