export type NormalizedError = {
  message: string;
  status?: number;
  code?: string;
};

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

export type CarsResponseRaw = {
  cars: Car[];
  totalCars: number;
  page: number;
  totalPages: number;
};

export type CarsQuery = {
  brand?: string;
  rentalPrice?: string;
  minMileage?: string;
  maxMileage?: string;
  limit?: string;
  page?: string;
};

export type CatalogFilters = {
  brand?: string;
  rentalPrice?: string;
  minMileage?: string;
  maxMileage?: string;
};
