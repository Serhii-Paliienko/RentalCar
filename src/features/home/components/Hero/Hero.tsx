import Button from "@components/ui/Button";
import s from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={s.hero} role="region" aria-label="Hero">
      {/* full-bleed background */}
      <picture className={s.media} aria-hidden="true">
        {/* 2x (≈2880px) */}
        <source
          srcSet="/images/hero/hero-2880.avif"
          type="image/avif"
          media="(min-width: 1800px)"
        />
        <source
          srcSet="/images/hero/hero-2880.webp"
          type="image/webp"
          media="(min-width: 1800px)"
        />
        <source
          srcSet="/images/hero/hero-2880.jpg"
          media="(min-width: 1800px)"
        />
        {/* 1x (≈1440px) */}
        <source srcSet="/images/hero/hero-1440.avif" type="image/avif" />
        <source srcSet="/images/hero/hero-1440.webp" type="image/webp" />
        <img src="/images/hero/hero-1440.jpg" alt="" />
      </picture>

      {/* ВАЖНО: никаких дополнительных пустых .container здесь не нужно */}
      <div className={s.inner}>
        <h1 className={s.title}>Find your perfect rental car</h1>
        <p className={s.subtitle}>
          Reliable and budget-friendly rentals for any journey
        </p>

        <div className={s.actions}>
          <Button as="a" href="/catalog">
            View Catalog
          </Button>
        </div>
      </div>
    </section>
  );
}
