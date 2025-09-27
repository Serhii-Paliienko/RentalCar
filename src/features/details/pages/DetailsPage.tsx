import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCarById } from "@api/cars";
import BookingForm from "@features/details/components/BookingForm/BookingForm";
import s from "./DetailsPage.module.css";

type Props = { carId?: string };

export default function DetailsPage({ carId }: Props) {
  const params = useParams();
  const id = carId ?? params.id;

  if (!id) {
    return (
      <main className="container">
        <p>Car id is missing</p>
      </main>
    );
  }

  const {
    data: car,
    status,
    error,
  } = useQuery({
    queryKey: ["car", id],
    queryFn: () => getCarById(id),
    enabled: !!id,
    staleTime: 60_000,
    gcTime: 600_000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: 1,
  });

  if (status === "pending") {
    return (
      <main className="container">
        <p>Loading…</p>
      </main>
    );
  }

  if (status === "error" || !car) {
    return (
      <main className="container">
        <p role="alert">Failed to load car. {(error as Error)?.message}</p>
      </main>
    );
  }

  return (
    <main className="container">
      <div className={s.grid}>
        <div className={s.left}>
          <img
            className={s.img}
            src={car.img}
            alt={`${car.brand} ${car.model}`}
            loading="eager"
          />
          {/* спеки/описание */}
        </div>
        <div className={s.right}>
          <BookingForm />
        </div>
      </div>
    </main>
  );
}
