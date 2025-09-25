import { useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { getCars } from "@api/cars";
import type { CatalogFilters } from "@api/types";
import { readFilters } from "@utils/url";
import Loader from "@components/Loader/Loader";
import Filters from "../components/Filters/Filters";
import CarGrid from "../components/CarGrid/CarGrid";
import LoadMore from "../components/LoadMore/LoadMore";
import s from "./CatalogPage.module.css";

const PAGE_SIZE = "12";

function keyOfFilters(
  f: Required<
    Pick<CatalogFilters, "brand" | "price" | "minMileage" | "maxMileage">
  >
) {
  return `b=${f.brand}|p=${f.price}|min=${f.minMileage}|max=${f.maxMileage}`;
}

export default function CatalogPage() {
  const loc = useLocation();
  const filters = readFilters(loc.search);
  const filtersKey = keyOfFilters(filters);

  const query = useInfiniteQuery({
    queryKey: ["cars", filtersKey, PAGE_SIZE],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      getCars({
        ...filters,
        limit: PAGE_SIZE,
        page: String(pageParam),
      }),
    getNextPageParam: (last) =>
      last.page < last.totalPages ? last.page + 1 : undefined,
    staleTime: 60_000,
    gcTime: 5 * 60_000,
    refetchOnWindowFocus: false,
  });

  const items = useMemo(
    () => (query.data ? query.data.pages.flatMap((p) => p.cars) : []),
    [query.data]
  );
  const total = query.data?.pages?.[0]?.totalCars ?? 0;

  return (
    <main className={s.wrap}>
      <header className={s.header}>
        <h1 className={s.title}>Catalog</h1>
        <div className={s.count} aria-live="polite">
          {total} cars
        </div>
      </header>

      <Filters />

      {query.status === "pending" && (
        <div className={s.loaderWrap}>
          <Loader label="Loading cars…" />
        </div>
      )}

      {query.status === "error" && (
        <p role="alert" className={s.error}>
          Failed to load cars. Please try again.
        </p>
      )}

      {query.status === "success" && (
        <>
          <CarGrid cars={items} />
          {query.hasNextPage && (
            <div className={s.more}>
              <LoadMore
                disabled={query.isFetchingNextPage}
                onClick={() => query.fetchNextPage()}
              >
                {query.isFetchingNextPage ? "Loading…" : "Load more"}
              </LoadMore>
            </div>
          )}
        </>
      )}
    </main>
  );
}
