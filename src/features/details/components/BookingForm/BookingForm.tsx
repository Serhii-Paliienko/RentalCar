import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Button from "@components/ui/Button";
import Input from "@components/ui/Input";
import ErrorText from "@components/forms/ErrorText";
import s from "./BookingForm.module.css";

type Values = {
  name: string;
  email: string;
  date: string;
};

const initialValues: Values = { name: "", email: "", date: "" };

const Schema = Yup.object({
  name: Yup.string().trim().required("Name is required"),
  email: Yup.string().email("Invalid email").required("E-mail is required"),
  date: Yup.string().trim().required("Booking date is required"),
});

export default function BookingForm() {
  const handleSubmit = (values: Values) => {
    console.log("booking submit", values);
  };

  return (
    <Formik<Values>
      initialValues={initialValues}
      validationSchema={Schema}
      onSubmit={handleSubmit}
    >
      <Form className={s.form} noValidate>
        <div className={s.row}>
          <Field as={Input} name="name" placeholder="Name*" />
          <ErrorText name="name" />
        </div>

        <div className={s.row}>
          <Field as={Input} name="email" placeholder="Email*" type="email" />
          <ErrorText name="email" />
        </div>

        <div className={s.row}>
          <Field as={Input} name="date" placeholder="Date" type="date" />
          <ErrorText name="date" />
        </div>

        <Button type="submit" fullWidth>
          Book now
        </Button>
      </Form>
    </Formik>
  );
}
