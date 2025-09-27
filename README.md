# RentalCar — React + Vite SPA

**Live:** [https://rental-car-three-xi.vercel.app/](https://rental-car-three-xi.vercel.app/)

A fast, accessible car‑rental catalog with **backend filtering**, **infinite pagination**, **favorites**, and a **booking form**.

---

## TL;DR

```bash
# Node 20+, npm 10+
npm ci
npm run dev

# build & preview
npm run build
npm run preview
```

---

## Features

- **Pages & Routing**

  - `/` Home → “View Catalog”
  - `/catalog` Catalog with filters & “Load more”
  - `/catalog/:id` Car details + booking form
  - 404 catch‑all **and** error boundary (`errorElement`)

- **Backend Filters (per TЗ)**

  - Brand (single)
  - **Price**: UI shows **strict N** (backend returns a superset `≤ N`, UI narrows to `=== N`)
  - Mileage `min` / `max` (auto‑swap if `min > max`)

- **Pagination**

  - Backend pagination with **Load more**
  - UX smoothing: when strict price is active and a fetched page has no exact hits, we **skip empty pages** (or show “searching further…”) — back‑end pagination is preserved

- **Favorites**

  - Toggle on card, persisted in `localStorage` under `rental:favs`

- **Form**

  - Details page includes **booking form** (Formik + Yup) with friendly errors and a success toast

- **UX & A11y**

  - Skeleton/loader, `role="status"` + `aria-live`
  - Images `loading="lazy"`, visible focus, `cursor: pointer`
  - Mileage displays as `5 000 km`

---

## Tech Stack

- **React 18**, **Vite**
- **React Router**
- **Axios** (API layer with Error Adapter)
- **React Query 5** (server cache; no noisy refetch)
- **Formik + Yup** (forms/validation)
- **CSS Modules only** (normalize: `modern-normalize`, design tokens in `:root`)
- Aliases via **vite-tsconfig-paths**

---

## Scripts

- `dev` — start Vite dev server
- `build` — type‑check + production build
- `preview` — local static preview (port 4173)
- `lint` — ESLint

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

---

## Project Structure

```txt
src/
  api/         # axios instance, endpoints, types
  app/         # providers (React Query, Toast), router
  components/  # shared UI (Header, Loader, etc.)
  features/    # catalog, details
  pages/       # Home, NotFound
  shared/      # NoResults and small shared bits
  store/       # favorites (persist)
  styles/      # tokens.css, globals.css
  utils/       # formatters, url helpers
  vite-env.d.ts
```

**Aliases** (`tsconfig.json → paths`):
`@app/*, @api/*, @components/*, @features/*, @pages/*, @shared/*, @store/*, @utils/*, @styles/*`

---

## API (used)

**Base URL:** `https://car-rental-api.goit.global`

- `GET /cars?brand=&rentalPrice=&minMileage=&maxMileage=&limit=&page=` → `{ cars[], totalCars, page, totalPages }`
- `GET /cars/{id}` → car details
- `GET /brands` → `string[]`

**Notes**

- `rentalPrice` arrives as **string** (e.g., `"50"`); UI treats it **numerically**
- `minMileage`/`maxMileage` sanitized; if `min > max`, values are swapped before request
- Error Adapter normalizes axios errors to `{ code, message, details }` (UI never sees raw axios errors)

---

## Data & Caching

- React Query keys:

  - `['cars', filters, limit]` — infinite list (resets on filter change)
  - `['car', id]` — details
  - `['brands']` — dictionary (raised `staleTime`)

- **No auto‑refetch** on focus/reconnect/mount (sane defaults)
- Placeholder from cache can show instantly while network confirms result

---

## Filters & Pagination

- **Filtering is performed on backend** per TЗ
- **Strict price**: UI narrows backend superset `≤ N` to `=== N`
- Infinite pagination (Load more) respects active filters
- With strict price, empty pages can be auto‑skipped for smoother UX

---

## Favorites

- Toggle on card; persisted via `localStorage` under `rental:favs`
- Survives reload; marks favorites on the list

---

## Accessibility & SEO

- Loader/NoResults: `role="status"`, `aria-live="polite"`
- Buttons/interactive: `cursor: pointer`, visible focus
- Images: `loading="lazy"`, `alt` set
- `index.html`: `<meta name="description">`, `<meta name="color-scheme" content="light dark">`
- (Optional) Per‑page meta via `react-helmet-async`

---

## Environment & Secrets

- No secrets in repo
- If env needed: only `VITE_*` vars with demo values in `.env.example`

---

## Reviewer / QA Notes

- **Strict price:** UI narrows to `=== N`; backend returns `≤ N`. Auto‑skips of empty pages are **by design** and OK for TЗ
- **Pagination:** “Load more” requests `page=2,3…` with active filters; duplicates guarded on merge
- **404 & errors:** both catch‑all `*` (no‑match) **and** `errorElement` (error boundary) are present
- **A11y:** loaders with ARIA, focus visible, lazy images

---

## Author

Serhii Paliienko — Frontend Developer.
Have questions or suggestions? Please open an issue in the repository.
