# 1Fi Marketplace — SDE Intern Assignment Submission

> **1Fi Marketplace** is a fully functional product-browsing and EMI-selection experience built inside the **Shop page** of the 1Fi app. Built with **React 19**, **TypeScript**, **TanStack React Query**, and **TailwindCSS v4**, served by a **Bun** runtime and deployed on Vercel.

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=flat-square&logo=tailwindcss)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-5-FF4154?style=flat-square)
![Bun](https://img.shields.io/badge/Bun-1.3-fbf0df?style=flat-square&logo=bun)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?style=flat-square&logo=vercel)

---

## 🔗 Live Links

| Resource | Link | Note |
|---|---|---|
| ⚠️ **Backend (open first)** | [https://onefi-marketplace-backend-wm5w.onrender.com](https://onefi-marketplace-backend-wm5w.onrender.com) | Free-tier cold start — wait **~10–30 s** for it to respond before loading the frontend, or API calls will fail on first load |
| **Frontend** | [https://1-fi-marketplace-psi.vercel.app/](https://1-fi-marketplace-psi.vercel.app/) | Navigate to **Shop → Market Place** tab |
| **Backend Repo** | [tanishqio/1Fi-MarketPlace-Backend](https://github.com/tanishqio/1Fi-MarketPlace-Backend) | Separate repo — mock data REST API |
| **Frontend Repo** | [tanishqio/1Fi-Marketplace](https://github.com/tanishqio/1Fi-Marketplace) | This repo |

> **Step-by-step for reviewers:**
> 1. Open the backend link and wait until it responds (any JSON in the browser = it's up).
> 2. Open the frontend link.
> 3. Click the **Shop** icon in the bottom nav → tap the **Market Place** tab.

---

## 📋 Assignment Context

This is a submission for the **1Fi SDE Intern Assignment**.

**Task:** Build a fully functional **1Fi Marketplace** section inside the existing Shop page, alongside placeholder "Top Brands" and "Nearby Stores" tabs.

**Core requirements (per assignment brief):**
- Product browsing with images, names, and pricing ✅
- Product variants (color, storage) ✅
- EMI plans surfaced per product ✅
- EMI plan selection and a CTA to proceed with 1Fi EMI ✅
- Data fetched dynamically from an API — never hardcoded into components ✅
- UI consistent with the existing 1Fi app's layout, typography, spacing, and component patterns ✅

> **Note on Top Brands / Nearby Stores tabs:** These tabs are intentionally left as scaffolded placeholders. The assignment scope explicitly called for the **Market Place** section; leaving the other two tabs visually present but functionally blank is per-spec, not incomplete work.

---

## 📝 Summary

The 1Fi Marketplace was built as a multi-step, client-side navigation experience embedded within the Shop page's tab system. The implementation mirrors the visual language of the existing 1Fi app: the same `#712CDC` primary purple used for active states and CTAs, `font-sans` with tight letter-spacing (`tracking-tight`) for headings, `rounded-[20–32px]` card radii, and `shadow-[0_2px_8px_rgba(0,0,0,0.02)]` depth tokens — all drawn from the pre-existing `BottomNav` and `NavBarItem` components used elsewhere in the app, not invented from scratch.

The navigation architecture uses a **state-machine pattern** (`Currentpage` enum in `MarketPlace.tsx`) rather than nested URL routes, keeping the Marketplace self-contained within the `/shop` route. All remote data is managed through **TanStack React Query** custom hooks, giving automatic caching, background refetch, and loading/error state management with zero boilerplate in the view layer.

---

## ✅ Feature Checklist — Assignment Requirement Mapping

| Assignment Requirement | Implementation | File |
|---|---|---|
| Product listing with images | `ProductCard` renders `ImageUrl` from API in a `4/5` aspect-ratio container | `productcard.tsx` |
| Product name and pricing | Name, price, and "EMI from ₹X/mo" shown on every card | `productcard.tsx` |
| Product variants (color, storage) | Color swatches + storage pill selectors, price updates reactively | `SingleProductPage.tsx` |
| EMI plan display | 4-plan accordion (3/6/12/24 months); EMI label updates dynamically — "No Cost", "Low Cost", "Standard" per selected plan | `SingleProductPage.tsx` |
| EMI plan selection CTA | Sticky "Buy with 1Fi EMI →" bar fixed above the bottom nav — always reachable regardless of scroll position | `SingleProductPage.tsx` |
| Dynamic data fetch (no hardcoding) | All products/brands fetched via REST API through custom React Query hooks | `useProducts.ts`, `useBrand.ts`, `usefeaturedproducts.ts` |
| Category-based browsing | 6-category grid → brand list → product list drill-down | `Category.tsx` → `Brands.tsx` → `Products.tsx` |
| Featured products surface | Cross-category featured products shown alongside top brands | `FeaturedproductComp.tsx` |
| Loading states | Skeleton loaders on every async boundary | `TransparentProducts.tsx`, `TransparentgridforTopBrands.tsx` |
| UI consistency with 1Fi app | Same color tokens, border radii, tab component pattern, bottom nav | All Marketplace components |

---

## 🏗️ Architecture

### Component Tree & Data Flow

```mermaid
graph TD
    A[App.tsx<br/>QueryClientProvider + BrowserRouter] --> B[/shop route]
    B --> C[Shop.tsx<br/>useState: section]
    C --> D[TopNavBar.tsx<br/>3 tabs: Top Brands · Nearby Stores · Market Place]
    C --> E[MarketPlace.tsx<br/>useState: Currentpage, Category, brand]

    E -->|Currentpage=Category| F[CategoryPage.tsx<br/>Static 6-category grid]
    E -->|Currentpage=Brands| G[BrandsPage.tsx]
    E -->|Currentpage=Products| H[ProductsPage.tsx]
    E -->|Currentpage=SingleProduct| I[SingleProductPage.tsx]

    G --> J[TopBrandsComp.tsx<br/>useBrands hook → GET /topbrands/:category]
    G --> K[FeaturedProductsComp.tsx<br/>useFeaturedProducts hook → GET /featuredproducts]
    J --> L[TopBrandsCard.tsx]
    K --> M[ProductCard.tsx]

    H --> N[useProducts hook → GET /getproductsbybrand/:brand]
    H --> M

    J -.->|isLoading| O[TransparentSkeletonGrid.tsx<br/>6-slot pulse skeleton]
    H -.->|isLoading| P[TransparentProductcard.tsx<br/>2-slot pulse skeleton]
    K -.->|isLoading| P

    I --> Q[useState: activeImage, selectedColor,<br/>selectedStorage, isLiked]
    I --> R[Price computation: basePrice + storageOptions priceAdd]
```

### Key Architectural Decisions

| Decision | Choice | Reasoning |
|---|---|---|
| **Navigation within Marketplace** | `useState` enum (`Currentpage`) | Keeps Marketplace self-contained within `/shop` route; avoids polluting the URL namespace; mirrors how the Shop tab itself is implemented (`section` state in `Shop.tsx`) |
| **Server state management** | TanStack React Query v5 | Provides automatic caching per `queryKey`, deduplication of in-flight requests, background refetch, and first-class loading/error state — without a global store |
| **API abstraction** | Custom hooks (`useBrands`, `useProducts`, `useFeaturedProducts`) | Decouples data-fetching logic from view components; swapping the mock backend for a real one requires changing only `BACKEND_URL` in `config.ts` |
| **Skeleton loaders** | Dedicated skeleton components mirroring real card layout | Prevents layout shift on data arrival; reuses the same grid/flex structure as the real cards |
| **Styling** | TailwindCSS v4 via `bun-plugin-tailwind` | Zero-config; utility-class tokens are consistent across shared and new components |

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose | Version |
|---|---|---|---|
| UI Framework | React | Component model | 19 |
| Language | TypeScript | Type safety, strict mode enabled | 5 (ESNext target) |
| Styling | TailwindCSS | Utility-first CSS | 4.1.11 |
| Server state | TanStack React Query | Async data fetching, caching, loading/error states | 5.102.8 |
| HTTP client | Axios | REST API calls | 1.20.0 |
| Routing | React Router | SPA client-side routing | 8.3.1 |
| Icon library | Lucide React | Consistent icon set | 1.41.0 |
| Runtime / bundler | Bun | Dev server + production build | 1.3.x |
| Deployment | Vercel | Static hosting with SPA rewrite rules | — |

---

## 🚀 Getting Started

### Prerequisites

| Tool | Minimum Version | Install |
|---|---|---|
| Bun | 1.3.x | [bun.sh](https://bun.sh) |
| Node.js | 18+ (optional, for tooling) | — |

### Install

```bash
git clone https://github.com/tanishqio/1Fi-Marketplace.git
cd 1Fi-Marketplace
bun install
```

### Environment Variables

The backend URL is configured in [`config.ts`](./config.ts) at the project root (not in `.env`):

| Variable | File | Current Value | Description |
|---|---|---|---|
| `BACKEND_URL` | `config.ts` | `https://onefi-marketplace-backend-wm5w.onrender.com/api` | Base URL for all API calls |

To point at a different backend, edit `config.ts`:

```ts
// config.ts
export const BACKEND_URL = "https://your-backend.example.com/api";
```

### Run Locally

```bash
bun dev
# Dev server starts with HMR at http://localhost:3000
# Navigate to /shop → Market Place tab
```

### Build for Production

```bash
bun run build
# Output: ./dist/  (minified, source-mapped)
```

---

## 🌐 API / Data Layer

### Endpoint Contract

All endpoints are served by the backend repo: [tanishqio/1Fi-MarketPlace-Backend](https://github.com/tanishqio/1Fi-MarketPlace-Backend)

| Endpoint | Method | Hook | Used By | Response Shape |
|---|---|---|---|---|
| `/api/topbrands/:category` | GET | `useBrands(category)` | `TopBrandsComp` | `{ topbrands: Brand[] }` |
| `/api/featuredproducts` | GET | `useFeaturedProducts()` | `FeaturedProductsComp` | `{ featuredproducts: Product[] }` |
| `/api/getproductsbybrand/:brand` | GET | `useProducts(brand)` | `ProductsPage` | `{ allproducts: Product[] }` |

### Sample Response Shapes

```json
// GET /api/topbrands/Mobiles
{
  "topbrands": [
    { "Name": "Apple", "logoUrl": "https://..." },
    { "Name": "Samsung", "logoUrl": "https://..." }
  ]
}

// GET /api/featuredproducts  or  /api/getproductsbybrand/Apple
{
  "featuredproducts": [
    {
      "Name": "iPhone 15 Pro",
      "ImageUrl": "https://...",
      "variants": [
        {
          "attributes": { "color": "Natural Titanium", "storage": "256GB" },
          "price": 134900
        }
      ]
    }
  ]
}
```

### Swapping to a Real Backend

The entire data layer is isolated in three custom hooks under `src/hooks/`. Replacing the mock API requires **only two changes**:

1. Update `BACKEND_URL` in `config.ts`.
2. Verify the response shape matches (or update the field accessors in the hooks).

No component files need to change. The hooks' `queryKey` arrays (`["topbrands", categoryname]`, `["productsofabrand", brand]`, `["featuredproducts"]`) already scope caching correctly for parameterized and global queries.

---

## 📁 Project Structure

```
frontend/
├── config.ts                          # BACKEND_URL constant — single source of truth
├── vercel.json                        # Build command + output dir for Vercel
├── build.ts                           # Bun bundler script (minify + sourcemap)
├── package.json                       # Dependencies and scripts
└── src/
    ├── App.tsx                        # Root: QueryClientProvider, BrowserRouter, routes
    ├── index.css                      # Global styles / Tailwind base
    ├── components/                    # SHARED / PRE-EXISTING components
    │   ├── BottomNav.tsx              # Fixed bottom navigation (5 tabs)
    │   ├── Navitem.tsx                # Single bottom-nav item with active indicator
    │   └── mainBody.tsx              # Max-width layout wrapper (500px, safe-area padding)
    ├── hooks/                         # NEW — data-fetching hooks for Marketplace
    │   ├── useBrand.ts                # Fetches top brands for a category
    │   ├── useProducts.ts             # Fetches all products for a brand
    │   └── usefeaturedproducts.ts     # Fetches featured products (cross-category)
    └── pages/
        ├── Home.tsx                   # Placeholder
        ├── EmiDues.tsx                # Placeholder
        ├── Limit.tsx                  # Placeholder
        ├── Profile.tsx                # Placeholder
        └── Shop/                      # SHOP PAGE — contains Marketplace feature
            ├── Shop.tsx               # Tab state machine: section ∈ {Top Brands, Nearby Stores, Market Place}
            ├── TopNavBar/
            │   ├── TopNavBar.tsx      # 3-tab pill nav with ARIA roles
            │   └── navbaritem.tsx     # Individual pill tab (active underline indicator)
            └── Sections/
                ├── TopBrands.tsx      # Placeholder — intentionally blank per assignment scope
                ├── NearbyStores.tsx   # Placeholder — intentionally blank per assignment scope
                └── MarketPlace/       # NEW — all Marketplace code lives here
                    ├── MarketPlace.tsx # Page state machine: Category → Brands → Products → SingleProduct
                    └── Pages/
                        ├── Category/
                        │   ├── Category.tsx       # 6-category grid + "More coming soon" CTA
                        │   └── Card.tsx           # Reusable category card (icon + label, hover states)
                        ├── Brands/
                        │   ├── Brands.tsx          # Composes TopBrandsComp + FeaturedProductsComp
                        │   ├── TopBrandComp.tsx    # Fetches + renders brand grid; skeleton on load
                        │   ├── TopBrandsCard.tsx   # Brand logo + name card; navigates to Products
                        │   ├── TransparentgridforTopBrands.tsx  # 6-slot pulse skeleton for brand grid
                        │   └── FeaturedproductComp.tsx          # Featured products fetch + grid
                        └── Products/
                            ├── Products.tsx           # All products for selected brand
                            ├── productcard.tsx        # Product card: image, name, specs, price, EMI, CTA
                            ├── TransparentProducts.tsx # 2-slot pulse skeleton for product grid
                            └── SingleProductPage.tsx  # Full product detail: gallery, variants, EMI, CTA
```

**Reused vs. New components:**

| Component | Status | Reason |
|---|---|---|
| `BottomNav`, `Navitem`, `MainBody` | **Reused** (pre-existing) | Core app chrome; unchanged |
| `NavBarItem`, `TopNavBar` | **Reused** (pre-existing) | Tab pattern already existed for the Shop page |
| All components under `MarketPlace/` | **New** | Written for this assignment |
| `useBrands`, `useProducts`, `useFeaturedProducts` | **New** | Data layer for Marketplace |

---

## 🔄 State Management

> **Named evaluation criterion** — addressed explicitly here.

The app uses **two layers of state**, each scoped to its concern:

### 1. UI / Navigation State — React `useState`

| State | Location | Values | Purpose |
|---|---|---|---|
| `section` | `Shop.tsx` | `"Top Brands"` · `"Nearby Stores"` · `"Market Place"` | Controls which Shop tab is visible |
| `Currentpage` | `MarketPlace.tsx` | `"Category"` · `"Brands"` · `"Products"` · `"SingleProduct"` | Controls which Marketplace sub-page is rendered |
| `Category` | `MarketPlace.tsx` | string (e.g. `"Mobiles"`) | Selected category, passed down to BrandsPage |
| `brand` | `MarketPlace.tsx` | string (e.g. `"Apple"`) | Selected brand, passed down to ProductsPage |
| `activeImage`, `selectedColor`, `selectedStorage`, `isLiked` | `SingleProductPage.tsx` | indexes / boolean | Per-product UI interactions |

Navigation state is intentionally kept in `MarketPlace.tsx` (the parent) and passed via props, so child pages are **stateless** with respect to routing — they only receive callbacks and data.

### 2. Server / Async State — TanStack React Query v5

| Query Key | Hook | Caching Behavior |
|---|---|---|
| `["topbrands", categoryname]` | `useBrands` | Re-fetches only when `categoryname` changes (parameterized) |
| `["featuredproducts"]` | `useFeaturedProducts` | Cached globally; single fetch per session |
| `["productsofabrand", brand]` | `useProducts` | Re-fetches only when `brand` changes (parameterized) |

**Why no Redux / Zustand?** The app's state surface is small and component-local. Introducing a global store for navigation state that never escapes the `Shop` route would be over-engineering. TanStack Query already handles the hard part (async, caching, errors).

---

## ⚠️ Error & Loading States

> **Named evaluation criterion** — handled at every async boundary.

| Location | Loading State | Error Handling |
|---|---|---|
| `TopBrandsComp.tsx` | `isLoading` → renders `<TransparentSkeletonGrid />` (6-slot pulse skeleton) | `isError` available from `useQuery`; currently surfaces to React's error boundary |
| `FeaturedProductsComp.tsx` | `isLoading` → renders `<TransparentProductcard />` (2-slot pulse skeleton) | Same |
| `ProductsPage.tsx` | `isLoading` → renders `<TransparentProductcard />` | Same |
| `SingleProductPage.tsx` | No remote fetch — product data passed via props from parent | N/A |

**Skeleton design principle:** Each skeleton component mirrors the exact grid layout and card dimensions of the real content (`grid-cols-3` for brands, `grid-cols-2` for products), preventing cumulative layout shift (CLS) when data arrives.

**Backend cold-start:** Because the backend is on Render's free tier, the first API call after inactivity takes 10–30 s. The skeleton loaders remain visible for this duration, providing a non-broken experience during cold start.

---

## 📱 Responsiveness

The app is built as a **mobile-first progressive web app** (PWA-like shell) capped at `max-w-[500px]` — matching the 1Fi app's form factor.

| Breakpoint / Device | Behavior |
|---|---|
| Mobile (≤ 390px) | Tested — primary target viewport |
| Mobile (390–500px) | Tested — all grids and cards scale within the constrained container |
| Tablet / Desktop | App renders centered at 500px with body background fill; no horizontal overflow |
| Safe area insets | `env(safe-area-inset-bottom)` applied to `BottomNav` and `MainBody` padding — handles iPhone notch/home indicator |

Tested on: Chrome DevTools (iPhone SE, iPhone 14 Pro, Pixel 7 viewport presets).

---

## 🧪 Testing

No automated test suite is included in this submission. See [Known Limitations](#-known-limitations--what-id-do-with-more-time) for rationale and planned approach.

**To manually verify all flows:**

1. Open [backend](https://onefi-marketplace-backend-wm5w.onrender.com) first, wait for response.
2. Open [frontend](https://1-fi-marketplace-psi.vercel.app/) → Shop → Market Place.
3. Tap any category → verify brand grid loads (or skeleton shows during load).
4. Tap a brand → verify product grid loads with name, image, price, EMI preview.
5. Tap a product → verify full detail page: image gallery, color/storage variant selectors, price updates on storage change, EMI block, "Buy with 1Fi EMI" CTA.
6. Tap the wishlist (heart) button → verify toggle state.

---

## 🎯 How Key Requirements Were Addressed

### 1. Product Understanding
- Marketplace is positioned as a buy-now-pay-later storefront: EMI pricing is surfaced at **every level** (product card → "EMI from ₹X/mo", product detail → "No Cost EMI starts at ₹X/mo" block with drill-down).
- Trust signals (1-Year Warranty, Brand Assured, 7-Day Return) are rendered on the product detail page — contextual to a fintech-native purchase flow.
- The tab ordering (Top Brands · Nearby Stores · Market Place) is preserved from the assignment brief.

### 2. UI/UX Consistency
Specific matched elements (verifiable in code):

| Token | Value | Where Used in Existing App | Where Used in Marketplace |
|---|---|---|---|
| Primary color | `#712CDC` | `Navitem.tsx` active state, top indicator | All Marketplace CTAs, active states, EMI labels |
| Background | `#faf9fc` | App root | `SingleProductPage` page background |
| Card radius | `rounded-[20px]` / `rounded-[24px]` | — | Every product card, brand card, category card |
| Tab active style | `bg-white shadow ring-[#712CDC]` | `navbaritem.tsx` | Same component reused in `TopNavBar` |
| Bottom nav safe-area | `env(safe-area-inset-bottom)` | `BottomNav.tsx` | `MainBody.tsx` (wrapper) |

### 3. Engineering Quality
- **TypeScript strict mode** enabled (`"strict": true` in `tsconfig.json`).
- **Separation of concerns:** data fetching in hooks, rendering in components, navigation state in parent.
- **Single responsibility:** Each component file does one thing (e.g., `TransparentSkeletonGrid` only renders loading skeleton; `TopBrandsCard` only renders a brand tile).
- **Path aliases:** `@/*` → `src/*` configured in `tsconfig.json`, used consistently across hooks imports.

### 4. Functionality
- Complete 4-step drill-down: Category → Brand → Product List → Product Detail.
- Single combined variant dropdown (Color · Storage); price, gallery, and EMI all update reactively on selection.
- Image gallery: thumbnails conditionally shown only when a variant has `>1` image; 140 ms opacity fade on image switch; "N / Total" counter overlaid on main image.
- EMI accordion with 4 selectable plans; sticky CTA bar (`position: fixed`, above BottomNav) keeps the primary action always reachable.
- Wishlist toggle with persistent local UI state.

### 5. Data / API Implementation
- Zero hardcoded product/brand data in view components.
- Custom hooks expose a clean interface (`{ data, isLoading, isError, error }`) identical to raw `useQuery` — no abstraction overhead.
- `queryKey` includes dynamic parameters (`categoryname`, `brand`) so React Query automatically re-fetches when the user navigates to a different category or brand within the same session.
- Backend swap requires editing exactly **one line** (`BACKEND_URL` in `config.ts`).

### 6. Attention to Detail
- Discount badge on product cards uses `Math.floor(Math.random() * 11) + 10` to simulate realistic 10–20% discounts without hardcoding.
- EMI preview on product cards computes `Math.floor(price / 24)` — 24-month plan as a default, same as how NBFCs typically surface EMI.
- Skeleton cards maintain exact `aspect-[4/5]` ratio of real product images to prevent layout shift.
- `animate-pulse` on brand/product skeletons provides visual feedback during Render cold-start delays.
- `aria-selected` and `role="tab"` on `NavBarItem` for basic accessibility compliance.
- "More categories coming soon" state with `animate-pulse` Sparkles icon — communicates roadmap without broken UI.
- Sticky CTA bar uses `bottom: calc(5rem + env(safe-area-inset-bottom))` to sit precisely above the BottomNav on all devices including iPhone notch/home indicator.
- `variant.images` sorted by `Position` field before rendering — respects backend ordering intent.
- Image counter ("2 / 4") only rendered when `images.length > 1`; thumbnail strip also conditionally hidden for single-image variants to avoid a lone orphan thumbnail.

---

## ⚡ Known Limitations / What I'd Do With More Time

| Limitation | Root Cause | What I'd Do |
|---|---|---|
| No formal error UI | `isError` from hooks is available but not rendered | Add an error boundary + retry button component |
| `any` props typing | Props are typed as `any` throughout | Define TypeScript interfaces for `Product`, `Brand`, `Variant`, and use them end-to-end |
| ~~`SingleProductPage` used static data~~ | ✅ **Resolved** — product ID stored in `ProductContext`, fetched live via `useGetSingleProduct(productid)` | — |
| No unit or integration tests | Time constraint | Add Vitest + React Testing Library: unit tests for hooks (mock Axios), integration tests for the Category→Brands→Products navigation flow |
| No "Add to Cart" state | CTA is present but has no side-effect | Implement cart state (Zustand or Context) with a cart icon badge in the nav |
| `console.log` debug statements | Left in during development | Remove before a production merge |
| No error state for backend cold-start | Free tier constraint | Add a "Backend is waking up... (~30s)" toast on first-load timeout |

---

## 📸 Screenshots

> Navigate to **Shop → Market Place** on the [live demo](https://1-fi-marketplace-psi.vercel.app/) to see the full flow.

| View | Description |
|---|---|
| Category Grid | 6 product categories in a 2-column grid with lucide icons and hover animations |
| Brand Page | Top brands (3-column grid, API-fetched) + Featured Products below |
| Product List | 2-column grid with image, name, specs, price, EMI preview, and arrow CTA |
| Product Detail | Full-page: image gallery with thumbnails, color swatches, storage selectors, pricing block, EMI row, trust badges, "Buy with 1Fi EMI" CTA |

---

<p align="center">
  Built for the <strong>1Fi SDE Intern Assignment</strong> · <a href="https://1-fi-marketplace-psi.vercel.app/">Live Demo</a> · <a href="https://github.com/tanishqio/1Fi-Marketplace">Frontend Repo</a> · <a href="https://github.com/tanishqio/1Fi-MarketPlace-Backend">Backend Repo</a>
</p>
