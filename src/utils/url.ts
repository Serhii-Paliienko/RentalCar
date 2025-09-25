import type { CatalogFilters } from "@api/types";

export function readFilters(
  search: string
): Required<
  Pick<CatalogFilters, "brand" | "price" | "minMileage" | "maxMileage">
> {
  const sp = new URLSearchParams(search);
  return {
    brand: sp.get("brand") ?? "",
    price: sp.get("price") ?? "",
    minMileage: sp.get("minMileage") ?? "",
    maxMileage: sp.get("maxMileage") ?? "",
  };
}

export function buildSearch(filters: Partial<CatalogFilters>) {
  const sp = new URLSearchParams();
  if (filters.brand) sp.set("brand", String(filters.brand));
  if (filters.price) sp.set("price", String(filters.price));
  if (filters.minMileage) sp.set("minMileage", String(filters.minMileage));
  if (filters.maxMileage) sp.set("maxMileage", String(filters.maxMileage));
  return `?${sp.toString()}`;
}
