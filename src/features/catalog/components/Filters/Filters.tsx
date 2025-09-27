import { Formik, Form, Field } from "formik";
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
  initial,
  onSubmit,
}: {
  initial: Values;
  onSubmit?: (v: Values) => void;
}) {
  const { data: brands } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
  });

  const prices = ["30", "40", "50", "60", "70", "80"];

  return (
    <div className={s.wrap}>
      <Formik
        initialValues={initial}
        enableReinitialize
        onSubmit={(v) => onSubmit?.(v)}
      >
        <Form className={s.form}>
          <div className={s.row}>
            <Field as={Select} name="brand" ariaLabel="Car brand">
              <option value="">Choose a brand</option>
              {(brands ?? []).map((b: string) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </Field>

            <Field as={Select} name="rentalPrice" ariaLabel="Price / 1 hour">
              <option value="">Choose a price</option>
              {prices.map((p) => (
                <option key={p} value={p}>
                  To ${p}
                </option>
              ))}
            </Field>

            <div className={s.range}>
              <Field
                as={Input}
                name="minMileage"
                placeholder="From"
                inputMode="numeric"
              />
              <Field
                as={Input}
                name="maxMileage"
                placeholder="To"
                inputMode="numeric"
              />
            </div>

            <Button type="submit">Search</Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
