import { useEffect, useMemo, useRef, useState } from "react";
import Button from "@components/ui/Button";
import s from "./Hero.module.css";

const HERO_SLIDES: Array<{
  id: string;
  base1440: string;
  base2880: string;
  alt?: string;
}> = [
  {
    id: "slide-1",
    base1440: "hero-1440",
    base2880: "hero-2880",
    alt: "",
  },
];

const AUTOPLAY_MS = 5000;

export default function Hero() {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<number | null>(null);

  const slides = useMemo(() => HERO_SLIDES, []);
  const total = slides.length;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (total <= 1 || media.matches) return;

    const start = () => {
      stop();
      timerRef.current = window.setInterval(() => {
        setIndex((i) => (i + 1) % total);
      }, AUTOPLAY_MS);
    };
    const stop = () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };

    start();
    const onChange = () => {
      stop();
      if (!media.matches) start();
    };
    media.addEventListener?.("change", onChange);

    return () => {
      stop();
      media.removeEventListener?.("change", onChange);
    };
  }, [total]);

  return (
    <section className={s.hero} role="region" aria-label="Hero">
      {/* Слайды как фон */}
      <div className={s.slides} aria-hidden="true">
        {slides.map((slide, i) => (
          <picture
            key={slide.id}
            className={s.slide}
            data-active={i === index || undefined}
          >
            <source
              srcSet={`${slide.base2880}.avif`}
              type="image/avif"
              media="(min-width: 1800px)"
            />
            <source
              srcSet={`${slide.base2880}.webp`}
              type="image/webp"
              media="(min-width: 1800px)"
            />
            <source
              srcSet={`${slide.base2880}.jpg`}
              media="(min-width: 1800px)"
            />
            <source srcSet={`${slide.base1440}.avif`} type="image/avif" />
            <source srcSet={`${slide.base1440}.webp`} type="image/webp" />
            <img src={`${slide.base1440}.jpg`} alt={slide.alt ?? ""} />
          </picture>
        ))}
      </div>

      {/* Dots (фича) — показываем только если слайдов > 1 */}
      {total > 1 && (
        <div className={s.dots} role="tablist" aria-label="Hero slides">
          {slides.map((slide, i) => {
            const active = i === index;
            return (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={active}
                aria-label={`Go to slide ${i + 1}`}
                className={active ? s.dotActive : s.dot}
                onClick={() => setIndex(i)}
              />
            );
          })}
        </div>
      )}

      {/* Контент по сетке */}
      <div className="container">
        <div className={s.inner}>
          <div className={s.block}>
            <h1 className={s.title}>Find your perfect rental car</h1>
            <p className={s.subtitle}>
              Reliable and budget-friendly rentals for any journey
            </p>

            <div className={s.actions}>
              {/* НИЧЕГО в Button не меняем — просто даём атрибут для локальной стилизации CTA */}
              <Button as="a" href="/catalog" data-cta="hero">
                View Catalog
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
