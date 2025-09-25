import { api } from "./axios";
import type {
  BrandsResponse,
  Car,
  CarsResponse,
  CatalogFilters,
} from "./types";

export async function getBrands() {
  const res = await api.get<BrandsResponse>("/brands");
  return res.data;
}

export async function getCars(
  params: CatalogFilters & { page: string; limit: string }
) {
  const res = await api.get<CarsResponse>("/cars", { params });
  return res.data;
}

export async function getCarById(id: string) {
  const res = await api.get<Car>(`/cars/${id}`);
  return res.data;
}
