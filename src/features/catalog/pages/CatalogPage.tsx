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
import Button from "@components/ui/Button";
import EmptyState from "@components/feedback/EmptyState/EmptyState";

export default function CatalogPage() {
  const loc = useLocation();
  const navigate = useNavigate();

  const filters = readFilters(loc.search);
  const { instantFromCache, placeholderCap } = readCatalogSettings(loc.search);

  const {
    cars,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    hasAnyFilter,
    isEmptyAfterAllPages,
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
    <div className={s.page}>
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

        {isLoading && (
          <section className={s.grid} aria-label="Cars grid loading">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className={s.skeleton} aria-hidden />
            ))}
          </section>
        )}

        {!isLoading && cars.length > 0 && (
          <section className={s.grid} aria-label="Cars grid">
            {cars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </section>
        )}

        {hasAnyFilter && isEmptyAfterAllPages && (
          <div className={s.state}>
            <EmptyState />
          </div>
        )}

        {hasNextPage && (
          <div className={s.more}>
            <Button
              className={s.moreBtn}
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              aria-label="Load more cars"
            >
              {isFetchingNextPage ? "Loading…" : "Load more"}
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
