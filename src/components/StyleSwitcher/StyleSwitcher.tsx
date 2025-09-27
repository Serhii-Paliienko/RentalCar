import { useEffect, useState } from "react";
import s from "./StyleSwitcher.module.css";

type ThemeKey = "default" | "alt1" | "alt2";
const STORAGE_KEY = "rental:theme";

export default function StyleSwitcher() {
  const [theme, setTheme] = useState<ThemeKey>("default");

  useEffect(() => {
    const saved = (localStorage.getItem(STORAGE_KEY) as ThemeKey) || "default";
    setTheme(saved);
    document.documentElement.dataset.theme = saved;
  }, []);

  const apply = (next: ThemeKey) => {
    setTheme(next);
    document.documentElement.dataset.theme = next;
    localStorage.setItem(STORAGE_KEY, next);
  };

  return (
    <div className={s.switch} role="group" aria-label="Theme switcher">
      {(["default", "alt1", "alt2"] as ThemeKey[]).map((key) => (
        <button
          key={key}
          type="button"
          className={`${s.dot} ${theme === key ? s.active : ""}`}
          aria-pressed={theme === key}
          aria-label={key}
          onClick={() => apply(key)}
        />
      ))}
    </div>
  );
}
