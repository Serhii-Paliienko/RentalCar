export interface Car {
  id: string;
  year: number;
  brand: string;
  model: string;
  type: string;
  img: string;
  description: string;
  fuelConsumption: string;
  engineSize: string;
  accessories: string[];
  functionalities: string[];
  rentalPrice: string;
  rentalCompany: string;
  address: string;
  rentalConditions: string[];
  mileage: number;
}

export interface CarsResponseRaw {
  cars: Car[];
  totalCars: number | string;
  page: number | string;
  totalPages: number | string;
}

export interface CarsResponse {
  cars: Car[];
  totalCars: number;
  page: number;
  totalPages: number;
}

export type BrandsResponse = string[];
export interface CatalogFilters {
  brand?: string;
  price?: string;
  minMileage?: string;
  maxMileage?: string;
  page?: string;
  limit?: string;
}
export interface CarsQuery {
  brand?: string;
  price?: string;
  minMileage?: string;
  maxMileage?: string;
  page: string;
  limit: string;
}

export interface NormalizedError {
  code: string;
  message: string;
  details?: unknown;
}
