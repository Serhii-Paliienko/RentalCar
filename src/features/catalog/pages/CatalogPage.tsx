import { useLocation } from "react-router-dom";
import { readFilters } from "@utils/url";
import { useCarsInfinite } from "@features/catalog/hooks/useCarsInfinite";
import CarCard from "@features/catalog/components/CarCard/CarCard";
import Filters from "@features/catalog/components/Filters/Filters";
import NoResults from "@shared/NoResults/NoResults";
import s from "./CatalogPage.module.css";

export default function CatalogPage() {
  const loc = useLocation();
  const filters = readFilters(loc.search);

  const {
    cars,
    hasAnyFilter,
    isEmptyAfterAllPages,
    isUpdatingInBackground,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    isRefetching,
    error,
  } = useCarsInfinite(
    {
      brand: filters.brand || "",
      price: filters.price || "",
      minMileage: filters.minMileage || "",
      maxMileage: filters.maxMileage || "",
    },
    {
      limit: "12",
      instantFromCache: true,
      placeholderCap: 200,
    }
  );

  if (error) {
    return (
      <main className={s.wrap}>
        <Filters />
        <div className={s.state} role="status" aria-live="polite">
          Something went wrong. Try again.
        </div>
      </main>
    );
  }

  return (
    <main className={s.wrap}>
      <Filters />

      {isUpdatingInBackground && (
        <div className={s.state} role="status" aria-live="polite">
          Updating results…
        </div>
      )}

      {isLoading && (
        <ul className={s.grid} aria-busy="true" aria-live="polite">
          {Array.from({ length: 12 }).map((_, i) => (
            <li key={i} className={s.skeleton} />
          ))}
        </ul>
      )}

      {!isLoading && cars.length > 0 && (
        <ul className={s.grid} aria-live="polite">
          {cars.map((c) => (
            <li key={c.id} data-car-id={c.id}>
              <CarCard car={c} />
            </li>
          ))}
        </ul>
      )}

      {!isLoading && isEmptyAfterAllPages && <NoResults />}

      {!isLoading && !isEmptyAfterAllPages && hasNextPage && (
        <div className={s.moreWrap}>
          <button
            type="button"
            className={s.moreBtn}
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage || isRefetching}
            aria-busy={isFetchingNextPage || isRefetching}
            aria-label="Load more cars"
          >
            {isFetchingNextPage ? "Loading…" : "Load more"}
          </button>
        </div>
      )}
      {hasAnyFilter && !isLoading && !isEmptyAfterAllPages && !hasNextPage && (
        <div className={s.state} role="note" aria-live="polite">
          End of results.
        </div>
      )}
    </main>
  );
}
