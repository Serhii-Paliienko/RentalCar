import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCarById } from "@api/cars";
import type { Car } from "@api/types";
import BookingForm from "@features/details/components/BookingForm/BookingForm";
import Loader from "@components/feedback/Loader/Loader";
import ErrorState from "@components/feedback/ErrorState/ErrorState";
import { formatMileage, formatPriceUsd } from "@utils/format";
import s from "./DetailsPage.module.css";

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

export default function DetailsPage() {
  const { id } = useParams<{ id: string }>();
  const qc = useQueryClient();
  const placeholder = qc
    .getQueriesData({ queryKey: ["cars"] })
    .flatMap(([, data]) => {
      const pages = (data as any)?.pages;
      if (Array.isArray(pages))
        return pages.flatMap((p: any) => p?.items ?? p?.cars ?? []);
      return Array.isArray((data as any)?.items) ? (data as any).items : [];
    })
    .find((c: any) => c?.id === id) as Car | undefined;

  const carQ = useQuery({
    queryKey: ["car", id],
    queryFn: () => getCarById(id!),
    enabled: !!id,
    placeholderData: placeholder,
  });

  if (!id) {
    return (
      <main className="container" role="main">
        <ErrorState />
      </main>
    );
  }

  if (carQ.isLoading && !carQ.data) {
    return (
      <main className="container" role="main">
        <Loader />
      </main>
    );
  }

  if (carQ.isError || !carQ.data) {
    return (
      <main className="container" role="main">
        <ErrorState />
      </main>
    );
  }

  const car = carQ.data;
  const { city, country } = splitAddress(car.address);

  return (
    <main className="container" role="main">
      <div className={s.grid} data-gap="24">
        {/* LEFT */}
        <div className={s.left}>
          <img
            className={s.img}
            src={car.img}
            alt={`${car.brand} ${car.model}`}
            width={640}
            height={512}
            loading="eager"
          />

          <BookingForm />
        </div>

        {/* RIGHT */}
        <div className={s.right}>
          <div>
            <h1 className={s.title}>
              {car.brand} {car.model}, {car.year}
              <span className={s.itemId}>id: {car.id}</span>
            </h1>
            <div className={s.subhead}>
              {city && (
                <span className={s.metaItem}>
                  <svg className={s.metaIcon} aria-hidden focusable="false">
                    <use href="/sprite.svg#location" />
                  </svg>
                  {city},{" "}
                  {country && <span className={s.metaItem}>{country}</span>}
                </span>
              )}

              <span className={s.metaItem}>
                Mileage: {formatMileage(car.mileage)}
              </span>
            </div>
            <div className={s.price}>{formatPriceUsd(car.rentalPrice)}</div>
            {car.description && (
              <p className={s.description}>{car.description}</p>
            )}
            {/* Rental Conditions */}
            <section className={s.section} aria-labelledby="rc">
              <h3 id="rc" className={s.sectionTitle}>
                Rental Conditions:
              </h3>
              <ul className={s.list}>
                {(car.rentalConditions ?? []).map((cond) => (
                  <li key={cond} className={s.listItem}>
                    <svg className={s.bullet} aria-hidden focusable="false">
                      <use href="/sprite.svg#check-circle" />
                    </svg>
                    {cond}
                  </li>
                ))}
              </ul>
            </section>
          </div>
          <div className={s.sectionWrapper}>
            {/* Car Specifications */}
            <section className={s.section} aria-labelledby="specs">
              <h3 id="specs" className={s.sectionTitle}>
                Car Specifications:
              </h3>
              <div className={s.list}>
                <span className={s.specs}>
                  <svg className={s.metaIcon} aria-hidden focusable="false">
                    <use href="/sprite.svg#calendar" />
                  </svg>
                  Year: {car.year}
                </span>
                <span className={s.specs}>
                  <svg className={s.metaIcon} aria-hidden focusable="false">
                    <use href="/sprite.svg#car" />
                  </svg>
                  Type: {car.type}
                </span>
                <span className={s.specs}>
                  <svg className={s.metaIcon} aria-hidden focusable="false">
                    <use href="/sprite.svg#fuel-pump" />
                  </svg>
                  Fuel Consumption: {car.fuelConsumption}
                </span>
                <span className={s.specs}>
                  <svg className={s.metaIcon} aria-hidden focusable="false">
                    <use href="/sprite.svg#gear" />
                  </svg>
                  Engine Size: {car.engineSize}
                </span>
              </div>
            </section>

            {/* Accessories and functionalities */}
            <section className={s.section} aria-labelledby="acc">
              <h3 id="acc" className={s.sectionTitle}>
                Accessories and functionalities:
              </h3>
              <div className={s.list}>
                {car.accessories.map((a) => (
                  <span key={`a-${a}`} className={s.listItem}>
                    <svg className={s.bullet} aria-hidden focusable="false">
                      <use href="/sprite.svg#check-circle" />
                    </svg>
                    {a}
                  </span>
                ))}
                {car.functionalities.map((f) => (
                  <span key={`f-${f}`} className={s.listItem}>
                    <svg className={s.bullet} aria-hidden focusable="false">
                      <use href="/sprite.svg#check-circle" />
                    </svg>
                    {f}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
