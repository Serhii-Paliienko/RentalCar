import type { CatalogFilters } from "@api/types";
import { normalizeIntString, normalizeRange } from "@utils/number";

// только rentalPrice (никакого "price")
export function parseCatalogFilters(search: string): CatalogFilters {
  const q = new URLSearchParams(search.startsWith("?") ? search : `?${search}`);

  const brand = q.get("brand") || "";
  const rentalPrice = q.get("rentalPrice") || "";
  const minMileageRaw = q.get("minMileage") || "";
  const maxMileageRaw = q.get("maxMileage") || "";

  const { min, max } = normalizeRange(minMileageRaw, maxMileageRaw);

  const filters: CatalogFilters = {
    ...(brand ? { brand } : {}),
    ...(rentalPrice ? { rentalPrice: normalizeIntString(rentalPrice) } : {}),
    ...(min ? { minMileage: normalizeIntString(min) } : {}),
    ...(max ? { maxMileage: normalizeIntString(max) } : {}),
  };

  return filters;
}

export type ReadFilters = ReturnType<typeof parseCatalogFilters>;
export const readFilters = parseCatalogFilters;

export function readCatalogSettings(search: string): {
  instantFromCache: boolean;
  placeholderCap: number;
} {
  const q = new URLSearchParams(search.startsWith("?") ? search : `?${search}`);
  const instantFromCache = q.get("instant") !== "false";
  const cap = Number(q.get("cap") || "200");
  return {
    instantFromCache,
    placeholderCap: Number.isFinite(cap) && cap > 0 ? cap : 200,
  };
}

export function stringifyCatalogFilters(f: CatalogFilters): string {
  const p = new URLSearchParams();
  if (f.brand) p.set("brand", f.brand);
  if (f.rentalPrice) p.set("rentalPrice", normalizeIntString(f.rentalPrice));
  if (f.minMileage) p.set("minMileage", normalizeIntString(f.minMileage));
  if (f.maxMileage) p.set("maxMileage", normalizeIntString(f.maxMileage));
  return p.toString();
}
