import { api } from "./axios";
import type { CarsQuery, CarsResponseRaw, Car } from "./types";

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

  if (query.rentalPrice && Array.isArray(data.cars)) {
    const target = String(Number(query.rentalPrice));
    data.cars = data.cars.filter((c) => String(c.rentalPrice) === target);
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
