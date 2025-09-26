import { NavLink } from "react-router-dom";
import s from "./Header.module.css";

export default function Header() {
  return (
    <header className={s.header} role="banner" aria-label="Site header">
      <div className={s.inner}>
        <NavLink to="/" className={s.logo} aria-label="RentalCar home">
          RentalCar
        </NavLink>

        <nav className={s.nav} aria-label="Main navigation">
          <ul className={s.list}>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  [s.link, isActive ? s.active : ""].join(" ")
                }
                end
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/catalog"
                className={({ isActive }) =>
                  [s.link, isActive ? s.active : ""].join(" ")
                }
              >
                Catalog
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
