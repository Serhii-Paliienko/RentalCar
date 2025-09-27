// src/api/cars.ts
import { api } from "./axios";
import type { CarsQuery, CarsResponseRaw, Car } from "./types";

/** Удаляем пустые/undefined значения из объекта params */
function clean<T extends Record<string, unknown>>(obj: T): Partial<T> {
  const out: Partial<T> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v !== undefined && v !== null && String(v).trim() !== "") {
      (out as any)[k] = v;
    }
  }
  return out;
}

/** GET /cars (с ПОСТ-строгой фильтрацией по rentalPrice) */
export async function getCars(query: CarsQuery): Promise<CarsResponseRaw> {
  const params = clean(query);
  const { data } = await api.get<CarsResponseRaw>("/cars", { params });

  // Строгая цена — API допускает вольности, поэтому на фронте фильтруем по точному совпадению
  if (query.rentalPrice && Array.isArray(data.cars)) {
    const target = String(Number(query.rentalPrice)); // нормализуем "040" -> "40"
    data.cars = data.cars.filter((c) => String(c.rentalPrice) === target);
  }

  return data;
}

/** GET /cars/{id} */
export async function getCarById(id: string): Promise<Car> {
  const { data } = await api.get<Car>(`/cars/${id}`);
  return data;
}

/** GET /brands */
export async function getBrands(): Promise<string[]> {
  const { data } = await api.get<string[]>("/brands");
  return data;
}
