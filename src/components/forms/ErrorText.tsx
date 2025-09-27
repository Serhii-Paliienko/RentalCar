import { ErrorMessage } from "formik";
import s from "./ErrorText.module.css";

export default function ErrorText({ name }: { name: string }) {
  return (
    <ErrorMessage
      name={name}
      render={(msg) => <div className={s.error}>{msg}</div>}
    />
  );
}
