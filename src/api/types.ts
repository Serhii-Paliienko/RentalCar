export type Car = {
  id: string;
  year: number;
  brand: string;
  model: string;
  type: string;
  img: string;
  description: string;
  fuelConsumption: string; // e.g., "10.5"
  engineSize: string; // e.g., "3.6L V6"
  accessories: string[];
  functionalities: string[];
  rentalPrice: string; // e.g., "40"
  rentalCompany: string;
  address: string;
  rentalConditions: string[];
  mileage: number; // e.g., 5858
};

export type CarsResponse = {
  cars: Car[];
  totalCars: number;
  page: number;
  totalPages: number;
};

export type BrandsResponse = string[];

export type CatalogFilters = {
  brand?: string;
  price?: string;
  minMileage?: string;
  maxMileage?: string;
  page?: string;
  limit?: string;
};

export type NormalizedError = {
  code: string;
  message: string;
  details?: unknown;
};
