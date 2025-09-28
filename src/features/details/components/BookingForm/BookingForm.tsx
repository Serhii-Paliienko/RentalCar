import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Button from "@components/ui/Button";
import Input from "@components/ui/Input";
import Textarea from "@components/ui/Textarea";
import ErrorText from "@components/forms/ErrorText";
import s from "./BookingForm.module.css";

type Values = {
  name: string;
  email: string;
  date: string;
  comment?: string;
};

const initialValues: Values = { name: "", email: "", date: "", comment: "" };

const Schema = Yup.object({
  name: Yup.string().trim().required("Name is required"),
  email: Yup.string().email().required("Email is required"),
  date: Yup.string().required("Date is required"),
  comment: Yup.string().max(500, "Max 500 symbols"),
});

export default function BookingForm() {
  return (
    <div className={s.card} aria-labelledby="book-title">
      <h3 id="book-title" className={s.title}>
        Book your car now
      </h3>
      <p className={s.hint}>Stay connected! We are always ready to help you.</p>

      <Formik
        initialValues={initialValues}
        onSubmit={(v) => console.log(v)}
        validationSchema={Schema}
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
            <Field
              as={Input}
              name="date"
              placeholder="Booking date"
              type="date"
            />
            <ErrorText name="date" />
          </div>

          <div className={s.row}>
            <Field
              as={Textarea}
              name="comment"
              placeholder="Comment"
              rows={4}
            />
            <ErrorText name="comment" />
          </div>

          <Button type="submit" fullWidth>
            Send
          </Button>
        </Form>
      </Formik>
    </div>
  );
}
