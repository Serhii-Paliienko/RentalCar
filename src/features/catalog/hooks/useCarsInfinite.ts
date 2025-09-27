// src/features/catalog/hooks/useCarsInfinite.ts
import { useEffect, useMemo } from "react";
import {
  useInfiniteQuery,
  useQueryClient,
  type InfiniteData,
  type UseInfiniteQueryResult,
} from "@tanstack/react-query";
import { getCars } from "@api/cars";
import type { CarsQuery, CarsResponseRaw, Car } from "@api/types";

type FiltersInput = Omit<CarsQuery, "limit" | "page">;

type BaseRQ = UseInfiniteQueryResult<
  InfiniteData<CarsResponseRaw, unknown>,
  Error
>;
export type UseCarsInfiniteResult = BaseRQ & {
  cars: Car[];
  hasAnyFilter: boolean;
  isEmptyAfterAllPages: boolean;
  isUpdatingInBackground: boolean;
};

function flatCars(data: InfiniteData<CarsResponseRaw, unknown> | undefined) {
  if (!data) return [] as Car[];
  const seen = new Set<string>();
  const out: Car[] = [];
  for (const page of data.pages) {
    for (const car of page.cars) {
      if (!seen.has(car.id)) {
        seen.add(car.id);
        out.push(car);
      }
    }
  }
  return out;
}

function placeholderFromCache(
  client: ReturnType<typeof useQueryClient>,
  keyPrefix: readonly unknown[],
  cap: number
): InfiniteData<CarsResponseRaw, unknown> | undefined {
  // Находим последнее совпадение по ключу ["cars", ...]
  const entries = client
    .getQueriesData<InfiniteData<CarsResponseRaw>>({
      predicate: (q) =>
        Array.isArray(q.queryKey) && q.queryKey[0] === keyPrefix[0],
    })
    .map(([, data]) => data)
    .filter(Boolean) as InfiniteData<CarsResponseRaw, unknown>[];

  if (!entries.length) return undefined;

  // Берём последнюю (самую свежую) и обрезаем по cap
  const last = entries[entries.length - 1];
  const cars = flatCars(last).slice(0, cap);
  const pageSize = Math.max(1, last.pages[0]?.cars?.length ?? 12);
  const pages: CarsResponseRaw[] = [];
  for (let i = 0; i < Math.ceil(cars.length / pageSize); i++) {
    const slice = cars.slice(i * pageSize, (i + 1) * pageSize);
    pages.push({
      cars: slice,
      page: i + 1,
      totalPages: last.pages[last.pages.length - 1]?.totalPages ?? 1,
      totalCars: last.pages[last.pages.length - 1]?.totalCars ?? slice.length,
    });
  }
  return { pages, pageParams: pages.map((p) => p.page) };
}

/** Инфинит-кверя с серверной пагинацией и пост-строгой ценой */
export function useCarsInfinite(
  filters: FiltersInput,
  opts?: { limit?: string; instantFromCache?: boolean; placeholderCap?: number }
): UseCarsInfiniteResult {
  const limit = opts?.limit ?? "12";
  const effFilters: FiltersInput = {
    brand: filters.brand || "",
    rentalPrice: filters.rentalPrice || "",
    minMileage: filters.minMileage || "",
    maxMileage: filters.maxMileage || "",
  };
  const hasAnyFilter = !!(
    effFilters.brand ||
    effFilters.rentalPrice ||
    effFilters.minMileage ||
    effFilters.maxMileage
  );

  const client = useQueryClient();

  const queryKey = ["cars", effFilters, limit] as const;

  const q = useInfiniteQuery({
    queryKey,
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const page = String(pageParam ?? 1);
      return getCars({ ...effFilters, limit, page });
    },
    getNextPageParam: (last) => {
      return last.page < last.totalPages ? last.page + 1 : undefined;
    },
    placeholderData: opts?.instantFromCache
      ? () =>
          placeholderFromCache(client, queryKey, opts?.placeholderCap ?? 200)
      : undefined,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const cars = useMemo(() => flatCars(q.data), [q.data]);

  // Догружаем страницы при активных фильтрах, пока не набрали limit или не кончились страницы
  useEffect(() => {
    const pageSize = Number(limit) || 12;
    if (!hasAnyFilter) return;
    if (q.isFetching || q.isFetchingNextPage) return;
    if (!q.hasNextPage) return;
    if (cars.length >= pageSize) return;
    q.fetchNextPage();
  }, [
    hasAnyFilter,
    q.isFetching,
    q.isFetchingNextPage,
    q.hasNextPage,
    cars.length,
    limit,
  ]);

  const isEmptyAfterAllPages = q.status === "success" && cars.length === 0;
  const isUpdatingInBackground = q.isFetching && !q.isLoading;

  return Object.assign(q, {
    cars,
    hasAnyFilter,
    isEmptyAfterAllPages,
    isUpdatingInBackground,
  });
}
