import { useLocation, useNavigate } from "react-router-dom";
import {
  readFilters,
  readCatalogSettings,
  stringifyCatalogFilters,
} from "@utils/url";
import { useCarsInfinite } from "@features/catalog/hooks/useCarsInfinite";
import CarCard from "@features/catalog/components/CarCard/CarCard";
import Filters from "@features/catalog/components/Filters/Filters";
import s from "./CatalogPage.module.css";

export default function CatalogPage() {
  const loc = useLocation();
  const navigate = useNavigate();

  // только rentalPrice
  const filters = readFilters(loc.search);
  const { instantFromCache, placeholderCap } = readCatalogSettings(loc.search);

  const {
    cars,
    hasAnyFilter,
    isEmptyAfterAllPages,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    isRefetching,
    error,
  } = useCarsInfinite(
    {
      brand: filters.brand || "",
      rentalPrice: filters.rentalPrice || "",
      minMileage: filters.minMileage || "",
      maxMileage: filters.maxMileage || "",
    },
    {
      limit: "12",
      instantFromCache,
      placeholderCap,
    }
  );

  const onSearch = (next: {
    brand: string;
    rentalPrice: string;
    minMileage: string;
    maxMileage: string;
  }) => {
    const qs = stringifyCatalogFilters(next);
    navigate(`/catalog?${qs}`, { replace: false });
  };

  return (
    <main className="container">
      <h1 className="visually-hidden">Catalog</h1>

      <Filters
        onSubmit={onSearch}
        initial={{
          brand: filters.brand || "",
          rentalPrice: filters.rentalPrice || "",
          minMileage: filters.minMileage || "",
          maxMileage: filters.maxMileage || "",
        }}
      />

      {isLoading && <div className={s.state}>Loading…</div>}
      {error && <div className={s.state}>Failed to load.</div>}
      {isRefetching && <div className={s.state}>Updating…</div>}

      {!isLoading && cars.length > 0 && (
        <section className={s.grid} aria-label="Cars grid">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </section>
      )}

      {hasAnyFilter && isEmptyAfterAllPages && (
        <div className={s.state}>No cars match your filters.</div>
      )}

      {hasNextPage && (
        <div className={s.more}>
          <button
            type="button"
            className={s.moreBtn}
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            aria-label="Load more cars"
          >
            {isFetchingNextPage ? "Loading…" : "Load more"}
          </button>
        </div>
      )}
    </main>
  );
}
