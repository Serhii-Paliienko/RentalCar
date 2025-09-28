import { Formik, Form, Field } from "formik";
import type { FieldProps } from "formik";
import { useQuery } from "@tanstack/react-query";
import Input from "@components/ui/Input";
import Select from "@components/ui/Select/Select";
import Button from "@components/ui/Button";
import { getBrands } from "@api/cars";
import s from "./Filters.module.css";

type Values = {
  brand: string;
  rentalPrice: string;
  minMileage: string;
  maxMileage: string;
};

export default function Filters({
  onSubmit,
  initial,
}: {
  onSubmit?: (values: Values) => void;
  initial?: Values;
}) {
  const { data: brands = [] } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
    staleTime: 60_000,
    gcTime: 10 * 60_000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: 1,
  });

  const init: Values = initial ?? {
    brand: "",
    rentalPrice: "",
    minMileage: "",
    maxMileage: "",
  };

  return (
    /* 16px gap под хедером по макету */
    <div className={`container ${s.wrap}`} data-gap="16">
      <Formik
        enableReinitialize
        initialValues={init}
        onSubmit={(v) => onSubmit?.(v)}
      >
        <Form className={s.form} role="search" aria-label="Cars filter">
          <div className={s.row}>
            {/* Brand */}
            <Field name="brand">
              {({ field }: FieldProps) => (
                <Select {...field} aria-label="Car brand">
                  <option value="">Choose a brand</option>
                  {brands.map((b: string) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </Select>
              )}
            </Field>

            {/* Price (per hour) */}
            <Field name="rentalPrice">
              {({ field }: FieldProps) => (
                <Select {...field} aria-label="Price / 1 hour">
                  <option value="">Choose a price</option>
                  {Array.from({ length: 20 }, (_, i) => (i + 1) * 10).map(
                    (p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    )
                  )}
                </Select>
              )}
            </Field>

            {/* Mileage */}
            <div className={s.mileageGroup} aria-label="Car mileage / km">
              <Field name="minMileage">
                {({ field }: FieldProps) => (
                  <Input {...field} placeholder="From" inputMode="numeric" />
                )}
              </Field>
              <Field name="maxMileage">
                {({ field }: FieldProps) => (
                  <Input {...field} placeholder="To" inputMode="numeric" />
                )}
              </Field>
            </div>

            {/* Search */}
            <Button type="submit" className={s.searchBtn}>
              Search
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
