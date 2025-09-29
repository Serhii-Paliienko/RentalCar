import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Button from "@components/ui/Button";
import Input from "@components/ui/Input";
import Textarea from "@components/ui/Textarea";
import ErrorText from "@components/forms/ErrorText";
import { toast } from "react-hot-toast";
import s from "./BookingForm.module.css";

type Values = {
  name: string;
  email: string;
  date: string;
  comment?: string;
};

const initialValues: Values = { name: "", email: "", date: "", comment: "" };

const Schema = Yup.object({
  name: Yup.string().trim().min(2, "Too short").required("Required"),
  email: Yup.string().trim().email("Invalid email").required("Required"),
  date: Yup.string().trim().required("Required"),
  comment: Yup.string().trim().max(500, "Max 500 chars"),
});

export default function BookingForm() {
  return (
    <div className={s.card}>
      <h4 className={s.title}>Book your car now</h4>
      <p className={s.hint}>Stay connected! We are always ready to help you.</p>

      <Formik<Values>
        initialValues={initialValues}
        onSubmit={(values, helpers) => {
          setTimeout(() => {
            helpers.setSubmitting(false);
            toast.success("Your booking request was sent");
            helpers.resetForm();
          }, 400);
        }}
        validateOnBlur
        validateOnChange={false}
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
