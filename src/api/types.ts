export type Car = {
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
