import type { CatalogFilters } from "@api/types";

function clean(v?: string) {
  if (!v) return "";
  return v.trim();
}
function digits(v?: string) {
  if (!v) return "";
  return v.replace(/[^\d]/g, "");
}

export function readFilters(
  search: string
): Required<
  Pick<CatalogFilters, "brand" | "price" | "minMileage" | "maxMileage">
> {
  const sp = new URLSearchParams(search);
  return {
    brand: clean(sp.get("brand") ?? ""),
    price: digits(sp.get("price") ?? ""),
    minMileage: digits(sp.get("minMileage") ?? ""),
    maxMileage: digits(sp.get("maxMileage") ?? ""),
  };
}

export function buildSearch(values: {
  brand?: string;
  price?: string;
  minMileage?: string;
  maxMileage?: string;
}) {
  const sp = new URLSearchParams();

  const brand = clean(values.brand);
  const price = digits(values.price);
  let min = digits(values.minMileage);
  let max = digits(values.maxMileage);

  if (min && max && Number(min) > Number(max)) {
    const t = min;
    min = max;
    max = t;
  }

  if (brand) sp.set("brand", brand);
  if (price) sp.set("price", price);
  if (min) sp.set("minMileage", min);
  if (max) sp.set("maxMileage", max);

  const q = sp.toString();
  return q ? `?${q}` : "";
}
