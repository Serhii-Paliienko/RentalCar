import { useLocation } from "react-router-dom";

const SITE_NAME = "RentalCar";
const DEFAULT_TITLE = SITE_NAME;
const DEFAULT_DESC =
  "Car rentals made easy. Browse by brand, price and options. Book online with clear pricing.";

export default function Seo() {
  const { pathname, search } = useLocation();

  let title = DEFAULT_TITLE;
  let description = DEFAULT_DESC;

  if (pathname === "/") {
    title = `Home — ${SITE_NAME}`;
    description =
      "Welcome to RentalCar. Quick search, honest pricing, and a smooth booking experience.";
  } else if (pathname.startsWith("/catalog/")) {
    title = `Car details — ${SITE_NAME}`;
    description =
      "Detailed vehicle info: specs, trim, rental price, and terms. Check availability and book.";
  } else if (pathname.startsWith("/catalog")) {
    title = `Catalog — ${SITE_NAME}`;
    description =
      "Browse rental cars with filters for brand, price, mileage, and options. Find your perfect match.";
  }

  const canonical =
    typeof window !== "undefined"
      ? new URL(pathname + search, window.location.origin).toString()
      : pathname + search;

  const isKnownRoute =
    pathname === "/" ||
    pathname === "/catalog" ||
    pathname.startsWith("/catalog/");
  const robots = isKnownRoute
    ? "index, follow, max-image-preview:large"
    : "noindex, nofollow";

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:locale" content="en_US" />
      <meta name="twitter:card" content="summary_large_image" />
    </>
  );
}
