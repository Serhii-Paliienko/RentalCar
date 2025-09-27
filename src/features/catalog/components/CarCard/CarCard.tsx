import { Link } from "react-router-dom";
import type { Car } from "@api/types";
import { useFavorites } from "@store/favorites.store";
import { formatMileage, formatPriceUsd } from "@utils/format";
import s from "./CarCard.module.css";

export default function CarCard({ car }: { car: Car }) {
  const toggle = useFavorites((st) => st.toggle);
  const has = useFavorites((st) => st.has);
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
            {car.brand} {car.model}, {car.year}
          </h3>
          <div className={s.price}>{formatPriceUsd(car.rentalPrice)}</div>
        </div>

        <ul className={s.meta} aria-label="Car meta">
          <li>{car.rentalCompany}</li>
          <li>{formatMileage(car.mileage)}</li>
          <li>{car.address}</li>
        </ul>

        <div className={s.actions}>
          <Link to={`/catalog/${car.id}`} className={s.btn}>
            Read more
          </Link>

          <button
            type="button"
            className={fav ? `${s.favBtn} ${s.favBtnActive}` : s.favBtn}
            aria-pressed={fav}
            aria-label={fav ? "Remove from favorites" : "Add to favorites"}
            onClick={() => toggle(car.id)}
          >
            <svg className={s.favIcon} aria-hidden="true" focusable="false">
              <use href="/sprite.svg#heart" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}
