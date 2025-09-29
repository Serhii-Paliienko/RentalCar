import { api } from "@api/axios";
import type { CarsQuery, CarsResponseRaw, Car } from "@api/types";

function clean<T extends Record<string, unknown>>(obj: T): Partial<T> {
  const out: Partial<T> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v !== undefined && v !== null && String(v).trim() !== "") {
      (out as Record<string, unknown>)[k] = v;
    }
  }
  return out;
}

export async function getCars(query: CarsQuery): Promise<CarsResponseRaw> {
  const params = clean(query);
  const { data } = await api.get<CarsResponseRaw>("/cars", { params });
  if (!data || !Array.isArray(data.cars)) {
    return { cars: [], totalCars: 0, page: 1, totalPages: 1 };
  }
  return data;
}

export async function getCarById(id: string): Promise<Car> {
  const { data } = await api.get<Car>(`/cars/${id}`);
  return data;
}

export async function getBrands(): Promise<string[]> {
  const { data } = await api.get<string[]>("/brands");
  return data;
}
