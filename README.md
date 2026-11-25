# Marché Tropical: online store redesign

A redesign of [marchetropical.lu](https://www.marchetropical.lu), the African, Caribbean and Asian grocery in Remich, Luxembourg. It is a working front end demo: browse, search, filter, add to cart, save items and go through checkout.

**Open `index.html` in any browser.** It is a single self contained file, so it also works as is on GitHub Pages (Settings, Pages, deploy from the `main` branch).

> Demo only: orders, sign in and forms are not connected to the shop yet. The live store runs on Odoo, so this design would be moved into an Odoo website theme, where the real product catalogue and photos replace the demo data.

## What's in it

* Home: editorial hero, shop by kitchen (African, Caribbean, Asian), aisles, popular products with tabs, bulk buys, a delivery zone checker, shop hours and newsletter sign up
* Search with live suggestions, results with department, price and brand filters, sorting and pages
* Product pages with gallery, details and a buy box (delivery day, quantity, add to cart, buy now, wishlist)
* Cart with quantity steppers, save for later and a free delivery progress bar
* One page checkout using the real delivery rules from the terms of sale (section 7.1): eight zones with minimum orders, fees and free delivery thresholds, and Tuesday and Thursday delivery with 17:00 cutoffs
* Wishlist, account, our store, delivery, contact and terms pages
* Responsive from phone to desktop; cart, wishlist and chosen area are kept in the browser

## Content

* 80 real products with their names, brands, prices and photos from the current shop
* Brand colours from the logo: orange `#FF6500` and green `#0F6D1E`; typeface Inter
* Delivery zones, fees, hours, address and legal details from the current site

## Project layout

```
index.html        built page, open this
build.py          rebuilds index.html from src/ and data/
src/              base.css, theme.css, body.html, app.js, packshot.js
data/             products.json, images.json (embedded product photos), logo.json
assets/logo.png   the Marché Tropical logo
```

After editing anything in `src/` or `data/`, run `python3 build.py`.

## Product photos

Product photos are the shop's own catalogue images, loaded live from the Odoo store (`/web/image/product.template/<id>/image_512`), so they always match what is in the shop. If a photo cannot load, for example offline or inside a sandbox that blocks other websites, the page falls back to an illustrative image from two openly licensed sets, both dedicated to the public domain under CC0 1.0:

* [ingredient-icons](https://github.com/EBf-Studio/ingredient-icons) by Marmalade (npm `@ingredient-icons/core`)
* [Ingredient Atlas](https://github.com/ionmesca/ingredient-atlas) (personal care images)

Products without a fallback photo use a drawn pack illustration (`src/packshot.js`).
