# Cart copy (Easytools)

The text customers see on the Easytools checkout pages at `cart.creativesparks.pl`, for every product, in Polish and English. Easytools serves it; this file is where it is written and reviewed.

How to use it:
- To change cart text, edit it here first, then paste it into Easytools (product → Produkt for the name, description and link; Warianty ceny for the package names and prices) and publish the product. A saved change only reaches the cart after **Publikuj**.
- After a change in Easytools made outside this file, copy it back here so the two stay the same.
- The site's own prices and package names live in `src/content/pricing/`; the variant names below must match the card names there.
- Synced with the live carts on 2026-11-18.

Parts of the cart that Easytools writes itself, not set per product: the payment form, the tax lines, the terms-and-privacy checkbox, "Zwrot bez pytań w ciągu 14 dni od zakupu" / "No-questions refund policy within 14 days of purchase", and the privacy-policy link (store settings).

## Paid: UX Design Skill

### PL — `Skill do projektowania UX`

Checkout: `https://cart.creativesparks.pl/checkout/ux-design-skill-pl` (one product; each package is a price variant with its own link, see `src/content/pricing/pl/`)

Description:

> Pyta o kontekst projektu, planuje strukturę strony, pisze prawdziwe copy.

- Plan strony z mapą stron, strukturą sekcji, narracją i makietami.
- Rozumie 16 typów stron, używa 13 frameworków UX i 50+ wzorców projektowych.
- Każda decyzja z uzasadnieniem i odrzuconymi wariantami.
- Decyzje są oznaczone poziomem pewności, więc wiesz, gdzie AI zgaduje.

Link: **» Sprawdź zawartość pakietów** → `https://agents.creativesparks.pl/ux-design-skill/`

Price variants (net prices; access 365 days):

| Variant name | Price | Crossed-out price | Available |
|---|---|---|---|
| Projektant Solo | 749 zł | — | always |
| Projektant Solo — Black Friday | 599 zł | 749 zł | 23.11.2026 00:00 – 1.12.2026 00:00 |
| Studio (do 5 osób) | 1249 zł | — | always |
| Studio (do 5 osób) — Black Friday | 999 zł | 1249 zł | 23.11.2026 00:00 – 1.12.2026 00:00 |

Old variants, still shown on the plain checkout link until the 1.4.0 release hides them: Pakiet Solo (1 użytkownik) 1299 zł, Pakiet Studio (5 użytkowników) 2499 zł, Pakiet Agencja (bez limitu) 4999 zł, and three hidden "– Przedsprzedaż" variants.

### EN — `UX Design Skill`

Checkout: `https://cart.creativesparks.pl/checkout/ux-design-skill-en`

Description:

> Starts with your project's context, plans the site's structure, then writes the real copy.

- Delivers a site plan: sitemap, section structure, narrative and wireframes.
- Every decision comes with its reasoning and the alternatives it ruled out.
- Knows 16 site types and draws on 13 UX frameworks and 50+ design patterns.
- Confidence levels on each decision show you where the AI is guessing.

Link: **» See what's in each package** → `https://agents.creativesparks.pl/en/ux-design-skill/`

Price variants (net prices; access 365 days):

| Variant name | Price | Crossed-out price | Available |
|---|---|---|---|
| Designer Solo | $229 | — | always |
| Designer Solo — Black Friday | $183 | $229 | 23.11.2026 00:00 – 1.12.2026 00:00 |
| Studio (up to 5 people) | $379 | — | always |
| Studio (up to 5 people) — Black Friday | $303 | $379 | 23.11.2026 00:00 – 1.12.2026 00:00 |

Old variants, shown on the plain checkout link until the release hides them: Solo (1 user) $379, Studio (5 users) $679, Agency (no limit) $1,499.

## Paid: Founder (own-business licence)

A separate product per language; same description and link as the UX Design Skill.

### PL — `Skill do projektowania UX dla właścicieli firm`

Checkout: `https://cart.creativesparks.pl/checkout/founder-pl`

Description, bullets and link: as in UX Design Skill PL above.

| Variant name | Price | Crossed-out price | Available |
|---|---|---|---|
| Founder | 449 zł | — | always |
| Founder — Black Friday | 359 zł | 449 zł | 23.11.2026 00:00 – 1.12.2026 00:00 |

### EN — `UX Design Skill for founders`

Checkout: `https://cart.creativesparks.pl/checkout/founder-en`

Description, bullets and link: as in UX Design Skill EN above.

| Variant name | Price | Crossed-out price | Available |
|---|---|---|---|
| Founder | $149 | — | always |
| Founder — Black Friday | $119 | $149 | 23.11.2026 00:00 – 1.12.2026 00:00 |

## Free: Website Planning Skill

Granted by the site's sign-up form through `src/pages/api/subscribe.ts`; the checkout page is a second way in. The product names below are also read by the free-skill download count (`src/lib/free-skill-downloads.ts`), so a rename there must update that file too.

### PL — `Skill do planowania stron`

Checkout: `https://cart.creativesparks.pl/checkout/website-planning-skill-pl` · access 30 days

Description:

> Pyta o Twoje potrzeby i kontekst projektu, a później planuje strukturę oraz zawartość strony.

- Każda decyzja z uzasadnieniem i odrzuconymi wariantami obok.
- Plan strony z mapą stron, strukturą sekcji i wytycznymi zawartości.
- Rozumie 16 typów stron, używa 13 frameworków UX i 50+ wzorców projektowych.
- Decyzje są oznaczone poziomem pewności, więc wiesz, gdzie AI zgaduje.

Link: **» Sprawdź możliwości pełnej wersji Skilla do projektowania UX** → `https://agents.creativesparks.pl/ux-design-skill/`

Marketing checkbox:

- [ ] Zgadzam się na otrzymywanie od Creative Sparks informacji o nowościach, produktach i usługach.

### EN — `Website Planning Skill`

Checkout: `https://cart.creativesparks.pl/checkout/website-planning-skill-en` · access 30 days

Description:

> Starts by asking what you need and what your project is about, then plans your site's structure and content.

- Every decision comes with its reasoning and the alternatives it ruled out.
- Delivers a site plan: sitemap, section structure and content guidelines.
- Knows 16 site types and draws on 13 UX frameworks and 50+ design patterns.
- Confidence levels on each decision show you where the AI is guessing.

Link: **» See what the full UX Design Skill can do** → `https://agents.creativesparks.pl/en/ux-design-skill/`

Marketing checkbox:

- [ ] I agree to receive news and updates about products and services from Creative Sparks.

## Free: Homepage UX Audit Skill

### PL — `Skill do audytu UX strony głównej`

Checkout: `https://cart.creativesparks.pl/checkout/ux-audit-skill-pl` · access 60 days

Description:

> Pobiera Twoją stronę główną, odtwarza ją jako makietę i przypina wnioski wprost do sekcji.

- Wynik w jednym pliku HTML, który otwierasz w przeglądarce.
- Każdy wniosek porównuje stan obecny ze standardem dla Twojego typu strony.
- Rozumie 16 typów stron, od portfolio po SaaS i marketplace.
- Wnioski są oznaczone poziomem pewności, więc wiesz, gdzie AI zgaduje.

Link: **» Sprawdź możliwości pełnej wersji Skilla do projektowania UX** → `https://agents.creativesparks.pl/ux-design-skill/`

Marketing checkbox:

- [ ] Zgadzam się na otrzymywanie od Creative Sparks informacji o nowościach, produktach i usługach.

### EN — `Homepage UX Audit Skill`

Checkout: `https://cart.creativesparks.pl/checkout/ux-audit-skill-en` · access 60 days

Description:

> Takes your homepage URL, rebuilds the page as a wireframe and pins its findings directly to each section.

- Delivers one HTML file you open in your browser.
- Each finding compares what's on the page with the standard for your site type.
- Knows 16 site types, from portfolios to SaaS and marketplaces.
- Confidence levels on each finding show you where the AI is guessing.

Link: **» See what the full UX Design Skill can do** → `https://agents.creativesparks.pl/en/ux-design-skill/`

Marketing checkbox:

- [ ] I agree to receive news and updates about products and services from Creative Sparks.

## Not listed

- `UX Design Lead NGO` — a draft product, not on sale.

## Live carts that differ from this file (2026-11-18)

Each line is a change to make in Easytools so the cart matches the text above.

- Website Planning Skill PL: the description repeats "Każda decyzja z uzasadnieniem i odrzuconymi wariantami obok." at the end of its first paragraph; the link reads "Sprawdź możliwości pełnej wersji UX Design Skill"; the marketing checkbox lacks "o" ("informacji nowościach").
- Website Planning Skill EN: the link goes to the Polish page (`/ux-design-skill/`).
- Homepage UX Audit Skill PL and EN: no marketing checkbox.
- Homepage UX Audit Skill EN: the variant is named "Pakiet Solo (1 użytkownik)" and shows under the product name.
- Paid products: no marketing checkbox (the earlier copy had one) — keep off or add, owner's call.
- Every cart: the privacy-policy link goes to `creativesparks.pl/ux-design-agent/polityka-prywatnosci`, which redirects to the agency's general policy, not the skill's (`agents.creativesparks.pl/ux-design-skill/polityka-prywatnosci/`, `/en/ux-design-skill/privacy-policy/`).
