import { Link } from "react-router-dom";
import type { Car } from "@api/types";
import { useFavorites } from "@store/favorites.store";
import { formatMileage, formatPriceUsd } from "@utils/format";
import s from "./CarCard.module.css";

export default function CarCard({ car }: { car: Car }) {
  const toggle = useFavorites((s) => s.toggle);
  const has = useFavorites((s) => s.has);
  const fav = has(car.id);

  return (
    <article className={s.card}>
      <img
        src={car.img}
        alt={`${car.brand} ${car.model}`}
        className={s.img}
        loading="lazy"
      />
      <div className={s.body}>
        <div className={s.row}>
          <h3 className={s.title}>
            {car.brand} {car.model}
          </h3>
          <div aria-label="Price per day">
            {formatPriceUsd(car.rentalPrice)}
          </div>
        </div>
        <div className={s.meta}>
          {car.year} • {car.type} • {formatMileage(car.mileage)}
        </div>
        <div className={s.actions}>
          <Link to={`/catalog/${car.id}`} className={`${s.btn} ${s.primary}`}>
            Read more
          </Link>
          <button
            type="button"
            className={`${s.btn} ${s.fav}`}
            aria-pressed={fav}
            onClick={() => toggle(car.id)}
          >
            {fav ? "★ In favorites" : "☆ Add to favorites"}
          </button>
        </div>
      </div>
    </article>
  );
}
