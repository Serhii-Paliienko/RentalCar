import { useQuery } from "@tanstack/react-query";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { getBrands } from "@api/cars";
import { useNavigate, useLocation } from "react-router-dom";
import { buildSearch, readFilters } from "@utils/url";
import s from "./Filters.module.css";

const Schema = Yup.object({
  brand: Yup.string().optional(),
  price: Yup.string().matches(/^\d*$/, "Only digits").optional(),
  minMileage: Yup.string().matches(/^\d*$/, "Only digits").optional(),
  maxMileage: Yup.string().matches(/^\d*$/, "Only digits").optional(),
});

export default function Filters() {
  const { data: brands } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
    staleTime: 86_400_000,
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
        // reset to page=1 on filters change
        const q = buildSearch(values);
        nav(`/catalog${q}`, { replace: true });
      }}
      onReset={() => nav("/catalog", { replace: true })}
    >
      {({ errors }) => (
        <Form className={s.form} role="search">
          <div className={s.control}>
            <label className={s.label} htmlFor="brand">
              Brand
            </label>
            <Field
              as="select"
              id="brand"
              name="brand"
              className={s.select}
              aria-invalid={!!errors.brand}
            >
              <option value="">Any</option>
              {(brands ?? []).map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </Field>
          </div>
          <div className={s.control}>
            <label className={s.label} htmlFor="price">
              Price, $/day
            </label>
            <Field
              id="price"
              name="price"
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
              className={s.input}
              aria-invalid={!!errors.minMileage}
            />
          </div>
          <div className={s.control}>
            <label className={s.label} htmlFor="maxMileage">
              Max mileage
            </label>
            <Field
              id="maxMileage"
              name="maxMileage"
              className={s.input}
              aria-invalid={!!errors.maxMileage}
            />
          </div>
          <div className={s.actions}>
            <button type="submit" className={s.button}>
              Apply
            </button>
            <button type="reset" className={s.reset}>
              Reset
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
