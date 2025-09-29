import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_NAME = "RentalCar";
const DEFAULT_TITLE = SITE_NAME;
const DEFAULT_DESC =
  "Car rentals made easy. Browse by brand, price and options. Book online with clear pricing.";

function ensureMetaByName(name: string) {
  let tag = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.name = name;
    document.head.appendChild(tag);
  }
  return tag;
}

function ensureOg(prop: string) {
  let tag = document.querySelector<HTMLMetaElement>(
    `meta[property="og:${prop}"]`
  );
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("property", `og:${prop}`);
    document.head.appendChild(tag);
  }
  return tag;
}

function ensureCanonical() {
  let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  return link;
}

export default function Seo() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    let title = DEFAULT_TITLE;
    let description = DEFAULT_DESC;

    if (pathname === "/") {
      title = `Home — ${SITE_NAME}`;
      description =
        "Find your perfect ride fast. Explore the catalog by brand, price and mileage.";
    } else if (
      pathname.startsWith("/catalog") &&
      !/\/catalog\/[^/]+/.test(pathname)
    ) {
      title = `Catalog — ${SITE_NAME}`;
      description =
        "Browse available cars. Filter by brand, price per hour and mileage range.";
    } else if (/\/catalog\/[^/]+/.test(pathname)) {
      title = `Car details — ${SITE_NAME}`;
      description =
        "Detailed specs, mileage and booking form. Reserve your car in seconds.";
    } else {
      title = `Page — ${SITE_NAME}`;
    }

    const canonicalUrl = `${location.origin}${pathname}${search || ""}`;

    document.title = title;
    ensureMetaByName("description").content = description;
    ensureMetaByName("robots").content = "index,follow";
    ensureCanonical().href = canonicalUrl;

    ensureOg("title").content = title;
    ensureOg("site_name").content = SITE_NAME;
    ensureOg("description").content = description;
    ensureOg("type").content = "website";
    ensureOg("url").content = canonicalUrl;

    ensureMetaByName("twitter:card").content = "summary_large_image";
  }, [pathname, search]);

  return null;
}
