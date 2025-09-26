import { useEffect, useMemo } from "react";
import {
  useInfiniteQuery,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";
import { getCars } from "@api/cars";
import type { CarsQuery, Car, CarsResponse } from "@api/types";

type Options = {
  /** Сколько карточек считаем «страницей» в UI (по умолчанию "12") */
  limit?: string;
  /** Мгновенно показать placeholder из кэша, пока идёт сетевой запрос */
  instantFromCache?: boolean;
  /** Ограничение на объём placeholder-а из кэша (чтобы не раздувать память) */
  placeholderCap?: number;
};

/** безопасный парс чисел из строк с любыми символами */
function num(v?: string) {
  const n = v ? Number.parseInt(v.replace(/[^\d]/g, ""), 10) : NaN;
  return Number.isFinite(n) ? n : undefined;
}

/** локальная проверка соответствия фильтрам (та же логика, что и у бэка + строгая цена) */
function matchesFilters(c: Car, f: Omit<CarsQuery, "page" | "limit">) {
  if (f.brand && c.brand.trim() !== f.brand.trim()) return false;
  const p = num(f.price);
  if (p !== undefined && Number(c.rentalPrice) !== p) return false; // strict price
  const min = num(f.minMileage);
  const max = num(f.maxMileage);
  if (min !== undefined && c.mileage < min) return false;
  if (max !== undefined && c.mileage > max) return false;
  return true;
}

/** собираем placeholder из уже закешированных страниц других запросов */
function buildPlaceholderFromCache(
  qc: ReturnType<typeof useQueryClient>,
  filters: Omit<CarsQuery, "page" | "limit">,
  limit: number,
  cap: number
): InfiniteData<CarsResponse> | undefined {
  const all = qc.getQueriesData<InfiniteData<CarsResponse>>({
    queryKey: ["cars"],
    type: "active",
  });
  if (!all.length) return undefined;

  const merged: Car[] = [];
  const seen = new Set<string>();
  for (const [, data] of all) {
    if (!data) continue;
    for (const page of data.pages) {
      for (const car of page.cars) {
        if (!seen.has(car.id)) {
          seen.add(car.id);
          merged.push(car);
          if (merged.length >= cap) break;
        }
      }
      if (merged.length >= cap) break;
    }
    if (merged.length >= cap) break;
  }
  if (!merged.length) return undefined;

  const filtered = merged.filter((c) => matchesFilters(c, filters));
  const page: CarsResponse = {
    cars: filtered.slice(0, limit),
    page: 1,
    totalPages: 1,
    totalCars: filtered.length,
  };

  return { pages: [page], pageParams: ["1"] };
}

/**
 * Бесконечная загрузка каталога:
 * - backend-пагинация и фильтры
 * - строгая цена дорезается в api.getCars
 * - optional: мгновенный placeholder из кэша + фоновой рефетч
 * - автодогрузка при активных фильтрах, чтобы добрать limit
 */
export function useCarsInfinite(
  filters: Omit<CarsQuery, "page" | "limit">,
  opts: Options = {}
) {
  const limitStr = opts.limit ?? "12";
  const limit = Number.parseInt(limitStr, 10) || 12;
  const instantFromCache = opts.instantFromCache ?? true;
  const placeholderCap = opts.placeholderCap ?? 200;

  const hasAnyFilter =
    !!filters.brand?.trim() ||
    !!filters.price?.trim() ||
    !!filters.minMileage?.trim() ||
    !!filters.maxMileage?.trim();

  const qc = useQueryClient();

  const query = useInfiniteQuery({
    queryKey: ["cars", filters, limitStr],
    queryFn: ({ pageParam = "1" }) =>
      getCars({ ...filters, page: String(pageParam), limit: String(limit) }),
    getNextPageParam: (last) =>
      last.page < last.totalPages ? String(last.page + 1) : undefined,
    initialPageParam: "1",

    // хотим показать placeholder из кэша, НО всегда подтверждаем сетью при смене фильтров
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
    staleTime: 60_000,
    gcTime: 10 * 60_000,

    placeholderData: instantFromCache
      ? () => buildPlaceholderFromCache(qc, filters, limit, placeholderCap)
      : undefined,
  });

  // Склейка страниц
  const cars: Car[] = useMemo(
    () => (query.data?.pages ?? []).flatMap((p) => p.cars),
    [query.data]
  );

  // Автодогрузка при активных фильтрах, чтобы заполнить «страницу»
  useEffect(() => {
    if (!hasAnyFilter) return;
    if (cars.length >= limit) return;
    if (!query.hasNextPage) return;
    if (query.isFetchingNextPage || query.isLoading || query.isRefetching)
      return;

    query.fetchNextPage();
  }, [
    hasAnyFilter,
    cars.length,
    limit,
    query.hasNextPage,
    query.isFetchingNextPage,
    query.isLoading,
    query.isRefetching,
    query.fetchNextPage,
  ]);

  const isEmptyAfterAllPages =
    !!query.data &&
    (query.data.pages?.length ?? 0) > 0 &&
    cars.length === 0 &&
    !query.hasNextPage &&
    !query.isFetchingNextPage;

  const isUpdatingInBackground = query.isRefetching || query.isFetchingNextPage;

  return {
    cars,
    hasAnyFilter,
    isEmptyAfterAllPages,
    isUpdatingInBackground,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isLoading: query.isLoading,
    isFetchingNextPage: query.isFetchingNextPage,
    isRefetching: query.isRefetching,
    error: query.error,
  };
}
