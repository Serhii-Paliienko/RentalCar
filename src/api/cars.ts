import { api, toNormalizedError } from "./axios";
import type {
  BrandsResponse,
  Car,
  CarsResponse,
  CarsResponseRaw,
  CarsQuery,
} from "@api/types";

export async function getBrands() {
  try {
    const res = await api.get<BrandsResponse>("/brands");
    return res.data;
  } catch (e) {
    throw toNormalizedError(e);
  }
}

function normalizeIntString(v?: string): string | undefined {
  if (v == null) return undefined;
  const s = String(v);
  const cleaned = s.replace(/[^\d]/g, "").trim();
  if (!cleaned) return undefined;
  const n = Number.parseInt(cleaned, 10);
  return Number.isFinite(n) ? String(n) : undefined;
}

function normalizeCarsResponse(raw: CarsResponseRaw): CarsResponse {
  const page = Number(raw.page);
  const totalPages = Number(raw.totalPages);
  const totalCars = Number(raw.totalCars);

  return {
    cars: Array.isArray(raw.cars) ? raw.cars : ([] as Car[]),
    page: Number.isFinite(page) ? page : 1,
    totalPages: Number.isFinite(totalPages) ? totalPages : 1,
    totalCars: Number.isFinite(totalCars) ? totalCars : 0,
  };
}

export async function getCars(params: CarsQuery): Promise<CarsResponse> {
  const { brand, price, minMileage, maxMileage, page, limit } = params;

  const q: Record<string, string> = { page, limit };

  const brandClean = brand?.trim();
  if (brandClean) q.brand = brandClean;

  const priceClean = normalizeIntString(price);
  if (priceClean) q.rentalPrice = priceClean;

  let min = normalizeIntString(minMileage);
  let max = normalizeIntString(maxMileage);
  if (min && max && Number(min) > Number(max)) {
    [min, max] = [max, min];
  }
  if (min) q.minMileage = min;
  if (max) q.maxMileage = max;

  if (import.meta.env.DEV) {
    console.debug("[api] GET /cars params:", q);
  }

  try {
    const res = await api.get<CarsResponseRaw>("/cars", { params: q });
    let data = normalizeCarsResponse(res.data);

    if (priceClean) {
      const before = data.cars.length;
      const exact = data.cars.filter(
        (c) => String(c.rentalPrice).trim() === priceClean
      );
      if (import.meta.env.DEV) {
        console.debug(
          `[api] post-filter price === ${priceClean}: ${before} → ${exact.length}`
        );
      }
      data = { ...data, cars: exact };
    }

    return data;
  } catch (e) {
    throw toNormalizedError(e);
  }
}

export async function getCarById(id: string) {
  try {
    const res = await api.get<Car>(`/cars/${id}`);
    return res.data;
  } catch (e) {
    throw toNormalizedError(e);
  }
}
