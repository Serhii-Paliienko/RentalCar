import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCarById } from "@api/cars";
import { formatMileage, formatPriceUsd } from "@utils/format";
import Specs from "../components/Specs/Specs";
import BookingForm from "../components/BookingForm/BookingForm";
import Loader from "@components/Loader/Loader";
import s from "./DetailsPage.module.css";

export default function DetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: car, status } = useQuery({
    queryKey: ["car", id],
    queryFn: () => getCarById(id!),
    enabled: !!id,
    staleTime: 300_000,
  });

  if (status === "pending") {
    return (
      <main className={s.wrap}>
        <Loader label="Loading car…" />
      </main>
    );
  }

  if (status === "error") {
    return (
      <main className={s.wrap}>
        <p role="alert">Failed to load the car. Please try again.</p>
      </main>
    );
  }

  if (!car) return null;

  return (
    <main className={s.wrap}>
      <header className={s.header}>
        <h1 className={s.title}>
          {car.brand} {car.model}
        </h1>
        <div className={s.meta}>
          {car.year} • {car.type} • {formatMileage(car.mileage)} •{" "}
          {formatPriceUsd(car.rentalPrice)}/day
        </div>
      </header>

      <section className={s.content}>
        <div>
          <img
            src={car.img}
            alt={`${car.brand} ${car.model}`}
            className={s.img}
          />
          <h2>Specifications</h2>
          <Specs car={car} />
          <h2>Description</h2>
          <p>{car.description}</p>
        </div>
        <aside>
          <h2 id="book-title">Rental</h2>
          <BookingForm carId={car.id} />
        </aside>
      </section>
    </main>
  );
}
