import { useMemo } from "react";
import { Formik, Form, Field } from "formik";
import type { FieldProps } from "formik";
import { useQuery } from "@tanstack/react-query";
import Select from "@components/ui/Select/Select";
import Button from "@components/ui/Button";
import Input from "@components/ui/Input";
import { getBrands } from "@api/cars";
import { normalizeIntString } from "@utils/number";
import s from "./Filters.module.css";

type Values = {
  brand: string;
  rentalPrice: string;
  minMileage: string;
  maxMileage: string;
};

type Props = {
  initial?: Partial<Values>;
  onSubmit: (values: Values) => void;
};

const PRICE_OPTIONS = ["30", "40", "50", "60", "70", "80"];

export default function Filters({ initial, onSubmit }: Props) {
  const { data: brands } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
    staleTime: 60_000,
    gcTime: 600_000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: 1,
  });

  const init: Values = {
    brand: initial?.brand ?? "",
    rentalPrice: initial?.rentalPrice ?? "",
    minMileage: initial?.minMileage ?? "",
    maxMileage: initial?.maxMileage ?? "",
  };

  const brandOptions = useMemo(
    () => (brands ?? []).map((b) => ({ value: b, label: b })),
    [brands]
  );

  const priceOptions = useMemo(
    () => PRICE_OPTIONS.map((p) => ({ value: p, label: `$${p}` })),
    []
  );

  return (
    <section className={s.wrap}>
      <Formik
        initialValues={init}
        enableReinitialize
        onSubmit={(values) => {
          let min = normalizeIntString(values.minMileage);
          let max = normalizeIntString(values.maxMileage);
          if (min && max && Number(min) > Number(max)) {
            const t = min;
            min = max;
            max = t;
          }
          onSubmit({
            brand: (values.brand ?? "").trim(),
            rentalPrice: (values.rentalPrice ?? "").trim(),
            minMileage: min,
            maxMileage: max,
          });
        }}
      >
        {({ setFieldValue }) => (
          <Form className={s.form} role="search" aria-label="Catalog filters">
            <div className={s.row}>
              {/* Brand */}
              <div className={s.group}>
                <label className={s.label} htmlFor="brand">
                  Car brand
                </label>
                <div className={s.selectBox}>
                  <Field name="brand">
                    {({ field }: FieldProps<string>) => (
                      <Select
                        {...field}
                        id="brand"
                        ariaLabel="Car brand"
                        options={brandOptions}
                        placeholder="Choose a brand"
                        iconClosedId="open"
                        iconOpenId="close"
                      />
                    )}
                  </Field>
                </div>
              </div>

              {/* Price */}
              <div className={s.group}>
                <label className={s.label} htmlFor="rentalPrice">
                  Price / hour
                </label>
                <div className={s.selectBox}>
                  <Field name="rentalPrice">
                    {({ field }: FieldProps<string>) => (
                      <Select
                        {...field}
                        id="rentalPrice"
                        ariaLabel="Price per hour"
                        options={priceOptions}
                        placeholder="Choose a price"
                        iconClosedId="open"
                        iconOpenId="close"
                      />
                    )}
                  </Field>
                </div>
              </div>

              {/* Mileage */}
              <div className={s.mileage}>
                <span className={s.label}>Car mileage / km</span>
                <div
                  className={s.split}
                  role="group"
                  aria-label="Mileage range"
                >
                  <span className={s.part}>
                    <Field name="minMileage">
                      {({ field }: FieldProps<string>) => (
                        <Input
                          {...field}
                          inputMode="numeric"
                          placeholder="From"
                          aria-label="Mileage from"
                          onChange={(e) =>
                            setFieldValue(
                              "minMileage",
                              normalizeIntString(e.target.value)
                            )
                          }
                        />
                      )}
                    </Field>
                  </span>
                  <span className={s.part}>
                    <Field name="maxMileage">
                      {({ field }: FieldProps<string>) => (
                        <Input
                          {...field}
                          inputMode="numeric"
                          placeholder="To"
                          aria-label="Mileage to"
                          onChange={(e) =>
                            setFieldValue(
                              "maxMileage",
                              normalizeIntString(e.target.value)
                            )
                          }
                        />
                      )}
                    </Field>
                  </span>
                </div>
              </div>

              {/* Search */}
              <Button type="submit" className={s.searchBtn}>
                Search
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
}
