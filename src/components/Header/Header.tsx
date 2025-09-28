import { NavLink, Link, type NavLinkRenderProps } from "react-router-dom";
import { useLayoutEffect, useRef } from "react";
import StyleSwitcher from "@components/StyleSwitcher/StyleSwitcher";
import s from "./Header.module.css";

/** Фича-флаг: переключатель тем по умолчанию скрыт */
const THEMES_ENABLED = import.meta.env.VITE_FEATURE_THEMES === "on";

/**
 * Считаем реальную вертикальную «занятость» хедера:
 *   высота коробки + внешний margin-bottom => --header-total
 */
export default function Header() {
  const headerRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const setVars = () => {
      const rect = el.getBoundingClientRect();
      const styles = getComputedStyle(el);
      const mb = Math.max(parseFloat(styles.marginBottom) || 0, 0);
      const box = rect.height;
      const total = box + mb;
      const root = document.documentElement;
      root.style.setProperty("--header-box", `${box}px`);
      root.style.setProperty("--header-gap", `${mb}px`);
      root.style.setProperty("--header-total", `${total}px`);
    };

    setVars();
    const ro = new ResizeObserver(setVars);
    ro.observe(el);
    const mo = new MutationObserver(setVars);
    mo.observe(el, { attributes: true, attributeFilter: ["class", "style"] });
    window.addEventListener("resize", setVars);

    return () => {
      ro.disconnect();
      mo.disconnect();
      window.removeEventListener("resize", setVars);
    };
  }, []);

  return (
    <header ref={headerRef} className={s.header} role="banner">
      <div className="container">
        <div className={s.inner}>
          <Link to="/" aria-label="RentalCar — Home">
            <svg className={s.logo} aria-hidden="true" focusable="false">
              <use href="/sprite.svg#Logo" />
            </svg>
          </Link>

          {THEMES_ENABLED ? <StyleSwitcher /> : null}

          <nav aria-label="Main" className={s.nav}>
            <NavLink
              to="/"
              className={({ isActive }: NavLinkRenderProps) =>
                isActive ? `${s.link} ${s.active}` : s.link
              }
              end
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
