export function normalizeIntString(
  value: string | number | null | undefined
): string {
  if (value === null || value === undefined) return "";
  const s = String(value).replace(/\D+/g, "");
  if (!s) return "";
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

export { formatMileage } from "./format";
