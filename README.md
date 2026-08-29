# Lithium WorkX

Marketing site for Lithium WorkX — dealer, supplier and manufacturer of refurbished
and second-life lithium cells, EV batteries and battery recycling. Delhi, India.

## Stack

Plain static HTML/CSS/JS. No build step, no dependencies, no framework.

## Pages

| File | Page |
|---|---|
| `index.html` | Home |
| `about.html` | About — who we are, mission & vision, why choose us, partners, testimonials |
| `products.html` | Product listing (10 products) |
| `product-*.html` | Product detail pages |
| `gallery.html` | Gallery |
| `contact.html` | Contact + map |

## Stylesheets

Loaded in this order — later files override earlier ones:

1. `css/plugins.css` — vendor bundle
2. `css/styles.css` — original template theme
3. `css/shared-components.css` — components shared between the homepage and inner
   pages (why-choose carousel, testimonials, stats strip, map, contact block)
4. `css/site-pages.css` — inner-page layouts, colour palette and site-wide polish

The section background palette lives in `:root` in `css/site-pages.css`
(`--sec-a` … `--sec-d`). Changing a value there recolours that section everywhere.

## Local preview

Open `index.html` directly, or serve the folder:

```bash
python -m http.server 8000
```

## Deploying to Vercel

No configuration needed beyond `vercel.json` in this repo. Import the repository
in Vercel and pick **Other** as the framework preset — leave the build command
empty and the output directory as the repo root.
