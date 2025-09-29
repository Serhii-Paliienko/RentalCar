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

type Options = {
  limit: string;
  instantFromCache?: boolean;
  placeholderCap?: number;
};

type Return = BaseRQ & {
  cars: Car[];
  hasAnyFilter: boolean;
  isEmptyAfterAllPages: boolean;
  isUpdatingInBackground: boolean;
};

function dedupById(list: Car[]): Car[] {
  const seen = new Set<string>();
  const out: Car[] = [];
  for (const c of list) {
    if (!seen.has(c.id)) {
      seen.add(c.id);
      out.push(c);
    }
  }
  return out;
}

export function useCarsInfinite(
  filters: FiltersInput,
  { limit, instantFromCache = true, placeholderCap = 200 }: Options
): Return {
  const qc = useQueryClient();

  const hasAnyFilter =
    !!filters.brand ||
    !!filters.rentalPrice ||
    !!filters.minMileage ||
    !!filters.maxMileage;

  const placeholderData: InfiniteData<CarsResponseRaw> | undefined =
    instantFromCache
      ? (() => {
          const cached = qc.getQueryData<
            InfiniteData<CarsResponseRaw, unknown>
          >(["cars", filters, limit]);
          if (cached) return cached;
          const any = qc.getQueriesData<InfiniteData<CarsResponseRaw>>({
            queryKey: ["cars"],
          });
          const flat = any.flatMap(([, d]) =>
            d ? d.pages.flatMap((p) => p.cars) : []
          );
          if (flat.length === 0) return undefined;
          const cap = Math.max(0, Math.min(placeholderCap, flat.length));
          const capped = flat.slice(0, cap);
          return {
            pageParams: [1],
            pages: [
              {
                cars: capped,
                totalCars: capped.length,
                page: 1,
                totalPages: 1,
              },
            ],
          };
        })()
      : undefined;

  const q = useInfiniteQuery({
    queryKey: ["cars", filters, limit],
    initialPageParam: 1,
    placeholderData,
    queryFn: async ({ pageParam }) => {
      const page =
        typeof pageParam === "number" ? pageParam : Number(pageParam || 1);
      return getCars({
        ...filters,
        limit,
        page: String(page),
      });
    },
    getNextPageParam: (lastPage) => {
      const page = Number(lastPage?.page ?? 1);
      const totalPages = Number(lastPage?.totalPages ?? 1);
      return page < totalPages ? page + 1 : undefined;
    },
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 60_000,
    gcTime: 600_000,
  }) as BaseRQ;

  const cars = useMemo(() => {
    const list = q.data?.pages.flatMap((p) => p.cars ?? []) ?? [];
    return dedupById(list);
  }, [q.data]);

  const desiredMinCount = Number(limit) || 0;

  useEffect(() => {
    if (!hasAnyFilter) return;
    if (!q.hasNextPage) return;
    if (q.isFetchingNextPage) return;
    if (cars.length >= desiredMinCount) return;
    q.fetchNextPage();
  }, [
    hasAnyFilter,
    q.hasNextPage,
    q.isFetchingNextPage,
    q.fetchNextPage,
    cars.length,
    desiredMinCount,
  ]);

  const isEmptyAfterAllPages = Boolean(
    q.status === "success" &&
      cars.length === 0 &&
      (q.data?.pages?.length ?? 0) > 0 &&
      !q.hasNextPage
  );

  const isUpdatingInBackground = q.isFetching && !q.isLoading;
  const merged: Return = {
    ...q,
    cars,
    hasAnyFilter,
    isEmptyAfterAllPages,
    isUpdatingInBackground,
  };

  return merged;
}
