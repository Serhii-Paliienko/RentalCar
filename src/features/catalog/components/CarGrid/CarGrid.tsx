import type { Car } from "@api/types";
import CarCard from "../CarCard/CarCard";
import s from "./CarGrid.module.css";

export default function CarGrid({ cars }: { cars: Car[] }) {
  return (
    <div className={s.grid} role="list">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
}
