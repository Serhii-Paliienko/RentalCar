import { useQuery } from "@tanstack/react-query";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { getBrands } from "@api/cars";
import { readFilters, buildSearch } from "@utils/url";
import { useLocation, useNavigate } from "react-router-dom";
import s from "./Filters.module.css";

const Schema = Yup.object({
  brand: Yup.string().optional(),
  price: Yup.string().optional(),
  minMileage: Yup.string().optional(),
  maxMileage: Yup.string().optional(),
});

export default function Filters() {
  const { data: brands } = useQuery({
    queryKey: ["brands"],
    queryFn: () => getBrands(),
    staleTime: 86_400_000, // 24h
  });

  const nav = useNavigate();
  const loc = useLocation();
  const initial = readFilters(loc.search);

  return (
    <Formik
      initialValues={initial}
      enableReinitialize
      validationSchema={Schema}
      onSubmit={(values) => {
        const q = buildSearch(values);
        nav(`/catalog${q}`, { replace: true });
      }}
    >
      {({ errors, resetForm }) => (
        <Form className={s.form} role="search" aria-label="Catalog filters">
          <div className={s.control}>
            <label className={s.label} htmlFor="brand">
              Brand
            </label>
            <Field as="select" id="brand" name="brand" className={s.select}>
              <option value="">All brands</option>
              {(brands ?? []).map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </Field>
          </div>

          <div className={s.control}>
            <label className={s.label} htmlFor="price">
              Price, $/day <span className={s.muted}>(exact match)</span>
            </label>
            <Field
              id="price"
              name="price"
              type="number"
              inputMode="numeric"
              min="0"
              step="1"
              className={s.input}
              aria-invalid={!!errors.price}
              placeholder="e.g. 50"
            />
          </div>

          <div className={s.control}>
            <label className={s.label} htmlFor="minMileage">
              Min mileage
            </label>
            <Field
              id="minMileage"
              name="minMileage"
              type="number"
              inputMode="numeric"
              min="0"
              step="1"
              className={s.input}
              aria-invalid={!!errors.minMileage}
              placeholder="e.g. 1 000"
            />
          </div>

          <div className={s.control}>
            <label className={s.label} htmlFor="maxMileage">
              Max mileage
            </label>
            <Field
              id="maxMileage"
              name="maxMileage"
              type="number"
              inputMode="numeric"
              min="0"
              step="1"
              className={s.input}
              aria-invalid={!!errors.maxMileage}
              placeholder="e.g. 5 000"
            />
          </div>

          <div className={s.actions}>
            <button type="submit" className={s.button}>
              Apply
            </button>
            <button
              type="button"
              className={s.reset}
              onClick={() => {
                resetForm();
                nav("/catalog", { replace: true });
              }}
            >
              Reset
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
