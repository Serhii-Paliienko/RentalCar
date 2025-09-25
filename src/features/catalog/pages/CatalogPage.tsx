import { useInfiniteQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { getCars } from "@api/cars";
import type { Car } from "@api/types";
import { readFilters } from "@utils/url";

import Filters from "../components/Filters/Filters";
import CarGrid from "../components/CarGrid/CarGrid";
import LoadMore from "../components/LoadMore/LoadMore";
import s from "./CatalogPage.module.css";

const PAGE_SIZE = "12";

export default function CatalogPage() {
  const loc = useLocation();
  const filters = readFilters(loc.search);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["cars", filters, PAGE_SIZE],
      queryFn: ({ pageParam }) =>
        getCars({
          ...filters,
          page: String(pageParam ?? 1),
          limit: PAGE_SIZE,
        }),
      initialPageParam: 1,
      getNextPageParam: (last) =>
        last.page < last.totalPages ? last.page + 1 : undefined,
      staleTime: 60_000,
    });

  const items: Car[] = data?.pages.flatMap((p) => p.cars) ?? [];
  const total = data?.pages?.[0]?.totalCars ?? 0;

  return (
    <main className={s.wrap}>
      <header>
        <h1>Catalog</h1>
        <div>{total} cars</div>
      </header>

      <Filters />

      {status === "success" && items.length === 0 ? (
        <p>No cars match your filters.</p>
      ) : (
        <CarGrid cars={items} />
      )}

      {hasNextPage && (
        <LoadMore
          disabled={isFetchingNextPage}
          loading={isFetchingNextPage}
          onClick={() => fetchNextPage()}
        />
      )}
    </main>
  );
}
