import { Link } from "react-router-dom";
import s from "./NotFound.module.css";

export default function NotFound() {
  return (
    <main className={s.wrap} aria-labelledby="nf-title">
      <h1 id="nf-title" className={s.title}>
        Page not found
      </h1>
      <p className={s.text}>
        The page you are looking for doesn’t exist or was moved.
      </p>
      <Link to="/" className={s.btn}>
        Go home
      </Link>
    </main>
  );
}
