import { Link } from "react-router-dom";
import s from "./NotFound.module.css";

export default function NotFound() {
  return (
    <main className={s.wrap}>
      <div className={s.code}>404</div>
      <p className={s.msg}>Page not found.</p>
      <p>
        <Link to="/catalog">Go to catalog</Link>
      </p>
    </main>
  );
}
