import { useEffect, useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getCars } from "@api/cars";
import type { CarsQuery, Car } from "@api/types";

/**
 * Авто-инкрементальная загрузка страниц каталога с поддержкой «строгой цены».
 * Ключ кэша — ["cars", filters, limit] (сброс при изменении фильтров — по ТЗ).
 */
export function useCarsInfinite(
  filters: Omit<CarsQuery, "page" | "limit">,
  limit = "12"
) {
  const hasAnyFilter =
    !!filters.brand?.trim() ||
    !!filters.price?.trim() ||
    !!filters.minMileage?.trim() ||
    !!filters.maxMileage?.trim();

  const query = useInfiniteQuery({
    queryKey: ["cars", filters, limit],
    queryFn: ({ pageParam = "1" }) =>
      getCars({ ...filters, page: String(pageParam), limit }),
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages
        ? String(lastPage.page + 1)
        : undefined,
    initialPageParam: "1",
    staleTime: 30_000,
    gcTime: 5 * 60_000,
  });

  const cars: Car[] = useMemo(
    () => (query.data?.pages ?? []).flatMap((p) => p.cars),
    [query.data]
  );

  const targetCount = Number.parseInt(limit, 10) || 12;

  // Авто-догрузка при активных фильтрах, пока карточек меньше limit
  useEffect(() => {
    if (!hasAnyFilter) return;
    if (cars.length >= targetCount) return;
    if (!query.hasNextPage) return;
    if (query.isFetchingNextPage || query.isLoading || query.isRefetching)
      return;

    // тянем следующую страницу; эффект переоценится после прихода данных
    query.fetchNextPage();
  }, [
    hasAnyFilter,
    cars.length,
    targetCount,
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

  return {
    cars,
    hasAnyFilter,
    isEmptyAfterAllPages,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isLoading: query.isLoading,
    isFetchingNextPage: query.isFetchingNextPage,
    isRefetching: query.isRefetching,
    error: query.error,
  };
}
