import { api } from "./axios";
import type {
  BrandsResponse,
  Car,
  CarsResponse,
  CarsResponseRaw,
  CarsQuery,
} from "./types";

export async function getBrands() {
  const res = await api.get<BrandsResponse>("/brands");
  return res.data;
}

function normalizeIntString(v?: string): string | undefined {
  if (!v) return undefined;
  const cleaned = v.replace(/\s+/g, "").trim();
  if (!cleaned) return undefined;
  const n = Number(cleaned);
  if (!Number.isFinite(n)) return undefined;
  return String(Math.trunc(n));
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

  const minClean = normalizeIntString(minMileage);
  const maxClean = normalizeIntString(maxMileage);

  if (minClean && maxClean && Number(minClean) > Number(maxClean)) {
    q.minMileage = maxClean;
    q.maxMileage = minClean;
  } else {
    if (minClean) q.minMileage = minClean;
    if (maxClean) q.maxMileage = maxClean;
  }

  if (import.meta.env.DEV) {
    console.debug("[api] GET /cars params:", q);
  }

  const res = await api.get<CarsResponseRaw>("/cars", { params: q });
  const data = normalizeCarsResponse(res.data);

  if (import.meta.env.DEV) {
    console.debug("[api] /cars response:", {
      page: data.page,
      totalPages: data.totalPages,
      totalCars: data.totalCars,
      count: data.cars.length,
    });
  }

  return data;
}

export async function getCarById(id: string) {
  const res = await api.get<Car>(`/cars/${id}`);
  return res.data;
}
