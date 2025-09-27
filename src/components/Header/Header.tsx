import { NavLink, Link, type NavLinkRenderProps } from "react-router-dom";
import StyleSwitcher from "@components/StyleSwitcher/StyleSwitcher";
import s from "./Header.module.css";

export default function Header() {
  return (
    <header className={s.header} role="banner">
      <div className="container">
        <div className={s.inner}>
          <Link to="/" aria-label="RentalCar — Home">
            <svg className={s.logo} aria-hidden="true" focusable="false">
              <use href="/sprite.svg#Logo" />
            </svg>
          </Link>

          <StyleSwitcher />

          <nav className={s.nav} aria-label="Main">
            <NavLink
              to="/"
              className={({ isActive }: NavLinkRenderProps) =>
                isActive ? `${s.link} ${s.active}` : s.link
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/catalog"
              className={({ isActive }: NavLinkRenderProps) =>
                isActive ? `${s.link} ${s.active}` : s.link
              }
            >
              Catalog
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
}
