import { Link } from "react-router-dom";
import s from "./HomePage.module.css";

export default function HomePage() {
  return (
    <main className={s.wrap}>
      <section className={s.banner} aria-labelledby="home-title">
        <h1 id="home-title" className={s.title}>
          Find your perfect ride
        </h1>
        <p className={s.text}>
          Browse our catalog and book a car in minutes. Filters, favorites and
          details — all in one place.
        </p>
        <Link to="/catalog" className={s.cta} aria-label="View Catalog">
          View Catalog
        </Link>
      </section>
    </main>
  );
}
