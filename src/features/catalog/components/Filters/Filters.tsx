import { Formik, Form, Field } from "formik";
import type { FieldProps } from "formik";
import { useQuery } from "@tanstack/react-query";
import Input from "@components/ui/Input";
import Select from "@components/ui/Select/Select";
import Button from "@components/ui/Button";
import { getBrands } from "@api/cars";
/**
 * В проекте уже есть утилита чисел — @utils/number
 * normalizeIntString: оставляет только цифры
 * normalizeRange: если min > max — свапает
 */
import { normalizeIntString, normalizeRange } from "@utils/number";
import s from "./Filters.module.css";

type Values = {
  brand: string;
  rentalPrice: string;
  minMileage: string;
  maxMileage: string;
};

type Props = {
  initial: Values;
  onSubmit: (v: Values) => void;
};

export default function Filters({ initial, onSubmit }: Props) {
  const brandsQ = useQuery({
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

  return (
    <div className={s.wrap}>
      <Formik
        initialValues={init}
        enableReinitialize
        onSubmit={(values) => {
          const { min, max } = normalizeRange(
            values.minMileage,
            values.maxMileage
          );
          onSubmit({
            brand: values.brand,
            rentalPrice: values.rentalPrice,
            minMileage: min,
            maxMileage: max,
          });
        }}
      >
        <Form className={s.form} aria-label="Filters form">
          <div className={s.row}>
            {/* Brand */}
            <Field name="brand">
              {({ field }: FieldProps<string>) => (
                <Select {...field} ariaLabel="Car brand" title="Car brand">
                  <option value="">Choose a brand</option>
                  {Array.isArray(brandsQ.data) &&
                    brandsQ.data.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                </Select>
              )}
            </Field>

            {/* Price per hour */}
            <Field name="rentalPrice">
              {({ field }: FieldProps<string>) => (
                <Select
                  {...field}
                  ariaLabel="Price per hour"
                  title="Price per hour"
                >
                  <option value="">Choose a price</option>
                  <option value="30">$30</option>
                  <option value="40">$40</option>
                  <option value="50">$50</option>
                  <option value="60">$60</option>
                  <option value="70">$70</option>
                  <option value="80">$80</option>
                </Select>
              )}
            </Field>

            {/* Mileage From–To (единый контрол с перегородкой) */}
            <div className={s.mileage} aria-label="Car mileage, km">
              <Field name="minMileage">
                {({ field, form }: FieldProps<string>) => (
                  <Input
                    {...field}
                    className={s.field}
                    placeholder="From"
                    inputMode="numeric"
                    pattern="\d*"
                    onChange={(e) =>
                      form.setFieldValue(
                        field.name,
                        normalizeIntString(e.currentTarget.value)
                      )
                    }
                    aria-label="Mileage from"
                  />
                )}
              </Field>

              <span className={s.divider} aria-hidden />

              <Field name="maxMileage">
                {({ field, form }: FieldProps<string>) => (
                  <Input
                    {...field}
                    className={s.field}
                    placeholder="To"
                    inputMode="numeric"
                    pattern="\d*"
                    onChange={(e) =>
                      form.setFieldValue(
                        field.name,
                        normalizeIntString(e.currentTarget.value)
                      )
                    }
                    aria-label="Mileage to"
                  />
                )}
              </Field>
            </div>

            <Button
              type="submit"
              className={s.searchBtn}
              aria-label="Apply filters"
            >
              Search
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
