import { Link } from "react-router-dom";
import type { Car } from "@api/types";
import { useFavorites } from "@store/favorites.store";
import { formatMileage, formatPriceUsd } from "@utils/format";
import s from "./CarCard.module.css";

function splitAddress(address: string): { city?: string; country?: string } {
  if (!address) return {};
  const parts = address
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);
  const country = parts.pop();
  const city = parts.pop();
  return { city, country };
}

export default function CarCard({ car }: { car: Car }) {
  // ВАЖНО: подписываемся на ids, иначе кнопка «сердце» не будет ре-рендерить карточку
  const fav = useFavorites((st) => st.ids.includes(car.id));
  const toggle = useFavorites((st) => st.toggle);

  const { city, country } = splitAddress(car.address);

  return (
    <article className={s.card}>
      <div className={s.imageWrap}>
        <img
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          className={s.img}
          loading="lazy"
        />

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

      <div className={s.body}>
        <div className={s.head}>
          <h3 className={s.title}>
            {car.brand} <span className={s.model}>{car.model}</span>, {car.year}
          </h3>
          <div className={s.price}>{formatPriceUsd(car.rentalPrice)}</div>
        </div>

        <div className={s.meta} aria-label="Car meta">
          <div className={s.row}>
            {city && <span className={s.chip}>{city}</span>}
            {country && <span className={s.chip}>{country}</span>}
            {car.rentalCompany && (
              <span className={s.chip}>{car.rentalCompany}</span>
            )}
          </div>
          <div className={s.row}>
            {car.type && <span className={s.chip}>{car.type}</span>}
            <span className={s.chip}>{formatMileage(car.mileage)}</span>
          </div>
        </div>

        <div className={s.actions}>
          <Link to={`/catalog/${car.id}`} className={s.btn}>
            Read more
          </Link>
        </div>
      </div>
    </article>
  );
}
