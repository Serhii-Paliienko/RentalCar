import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import s from "./BookingForm.module.css";

const Schema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  phone: Yup.string().required("Required"),
  pickupDate: Yup.string().required("Required"),
});

export default function BookingForm({ carId }: { carId: string }) {
  return (
    <Formik
      initialValues={{ name: "", email: "", phone: "", pickupDate: "" }}
      validationSchema={Schema}
      onSubmit={async (values, { resetForm }) => {
        // No real backend per PRD — simulate success
        await new Promise((r) => setTimeout(r, 400));
        toast.success("Booking request sent!");
        resetForm();
      }}
    >
      <Form className={s.form} aria-labelledby="book-title">
        <div className={s.row}>
          <label className={s.label} htmlFor="name">
            Name
          </label>
          <Field id="name" name="name" className={s.input} />
          <ErrorMessage name="name" component="div" className={s.error} />
        </div>
        <div className={s.row}>
          <label className={s.label} htmlFor="email">
            Email
          </label>
          <Field id="email" name="email" type="email" className={s.input} />
          <ErrorMessage name="email" component="div" className={s.error} />
        </div>
        <div className={s.row}>
          <label className={s.label} htmlFor="phone">
            Phone
          </label>
          <Field id="phone" name="phone" className={s.input} />
          <ErrorMessage name="phone" component="div" className={s.error} />
        </div>
        <div className={s.row}>
          <label className={s.label} htmlFor="pickupDate">
            Pickup date
          </label>
          <Field
            id="pickupDate"
            name="pickupDate"
            type="date"
            className={s.input}
          />
          <ErrorMessage name="pickupDate" component="div" className={s.error} />
        </div>
        <button
          type="submit"
          className={s.btn}
          aria-label={`Book car ${carId}`}
        >
          Book now
        </button>
      </Form>
    </Formik>
  );
}
