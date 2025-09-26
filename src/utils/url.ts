import type { CatalogFilters } from "@api/types";

function clean(v: unknown): string {
  if (v == null) return "";
  return String(v).trim();
}

function digits(v: unknown): string | undefined {
  if (v == null) return undefined;
  const cleaned = String(v).replace(/[^\d]/g, "").trim();
  return cleaned ? cleaned : undefined;
}

type FiltersShape = Required<
  Pick<CatalogFilters, "brand" | "price" | "minMileage" | "maxMileage">
>;

export function readFilters(search: string): FiltersShape {
  const sp = new URLSearchParams(search || "");

  const brand = clean(sp.get("brand"));
  const price = digits(sp.get("price")) ?? "";

  let min = digits(sp.get("minMileage"));
  let max = digits(sp.get("maxMileage"));

  if (min && max && Number(min) > Number(max)) {
    [min, max] = [max, min];
  }

  return {
    brand,
    price,
    minMileage: min ?? "",
    maxMileage: max ?? "",
  };
}

export function buildSearch(values: Partial<FiltersShape>): string {
  const sp = new URLSearchParams();

  const brand = clean(values.brand);
  const price = digits(values.price);
  let min = digits(values.minMileage);
  let max = digits(values.maxMileage);

  if (min && max && Number(min) > Number(max)) {
    [min, max] = [max, min];
  }

  if (brand) sp.set("brand", brand);
  if (price) sp.set("price", price);
  if (min) sp.set("minMileage", min);
  if (max) sp.set("maxMileage", max);

  const q = sp.toString();
  return q ? `?${q}` : "";
}
