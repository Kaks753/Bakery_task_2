# Crumb & Ember — Wood-Fired Artisan Bakery

A fast, accessible, fully static marketing site for a fictional neighborhood bakery. Plain HTML + CSS + vanilla JavaScript — no build step, no dependencies.

## Structure

```
Bakery_web/
├── index.html            Home — hero, values, featured bakes, testimonials
├── products.html         Menu — filterable product grid, Baker's Choice box
├── about.html            Our story — history, values, team
├── contact.html          Visit & pre-orders — info cards, form (Formspree), FAQ
├── assets/
│   ├── css/styles.css    Design system: tokens → components → responsive
│   ├── js/main.js        Nav toggle, scroll reveal, menu filters, form validation
│   └── img/              Logo, favicon, photography (local, lazy-loaded)
├── site.webmanifest      PWA metadata
├── robots.txt
└── README.md
```

## Run locally

Any static server works:

```bash
npx serve .
# or
python -m http.server 8080
```

Then open http://localhost:8080

## Going live with the contact form

The form on `contact.html` posts to a Formspree placeholder:

1. Create a free form at [formspree.io](https://formspree.io)
2. Replace `YOUR_FORM_ID` in `contact.html` with your form ID
3. Done — submissions arrive in your inbox; the JS demo-success mode switches off automatically

## Deploying

Static site — deploys anywhere. Currently set up for **Vercel**:

```bash
vercel --prod
```

Or import the GitHub repo at vercel.com (zero config).

## Customization

- Colors/fonts live in `assets/css/styles.css` under `:root`
- Photography: swap files in `assets/img/` (keep filenames or update references)
- Brand name appears in page `<title>`/meta tags and header/footer markup
