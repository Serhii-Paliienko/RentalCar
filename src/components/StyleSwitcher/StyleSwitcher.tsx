import { useEffect, useState } from "react";
import s from "./StyleSwitcher.module.css";

type ThemeKey = "light" | "dark" | "neutral";
const STORAGE_KEY = "rental:theme";

export default function StyleSwitcher() {
  const [theme, setTheme] = useState<ThemeKey>("light");

  useEffect(() => {
    const saved = (localStorage.getItem(STORAGE_KEY) as ThemeKey) || "light";
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
      {(["light", "dark", "neutral"] as ThemeKey[]).map((key) => (
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
