# Cart copy (Easytools)

The text customers see on the Easytools checkout pages at `cart.creativesparks.pl`, for every product, in Polish and English. Easytools serves it; this file is where it is written and reviewed.

How to use it:
- To change cart text, edit it here first, then paste it into Easytools (product → Produkt for the name, description and link; Warianty ceny for the package names and prices) and publish the product. A saved change only reaches the cart after **Publikuj**.
- Changes tried out in Easytools first are fine; copy them back here the same day so the two stay the same. When the two differ, the live cart is the newer version.
- The site's own prices and package names live in `src/content/pricing/`; the variant names below must match the card names there.
- Synced with the live carts on 2026-11-18.

Terms and privacy links (since 2026-11-18): each product sets its own under Koszyk → Regulamin i zwroty, overriding the store's default (Ustawienia sklepu → Strony prawne). Polish products link `https://agents.creativesparks.pl/ux-design-skill/regulamin/` and `/ux-design-skill/polityka-prywatnosci/`; English products `/en/ux-design-skill/terms/` and `/en/ux-design-skill/privacy-policy/`. The store default points to the Polish policy. The site and the cart carry no separate data note: the terms and the privacy policy hold it.

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
| Solo Designer | 749 zł | — | always |
| Solo Designer — Black Friday | 649 zł | 749 zł | 23.11.2026 00:00 – 1.12.2026 00:00 |
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
| Solo Designer | $229 | — | always |
| Solo Designer — Black Friday | $183 | $229 | 23.11.2026 00:00 – 1.12.2026 00:00 |
| Studio (up to 5 people) | $379 | — | always |
| Studio (up to 5 people) — Black Friday | $303 | $379 | 23.11.2026 00:00 – 1.12.2026 00:00 |

Old variants, shown on the plain checkout link until the release hides them: Solo (1 user) $379, Studio (5 users) $679, Agency (no limit) $1,499.

## Paid: Founder (own-business licence)

A separate product per language; same description and link as the UX Design Skill, plus a closing licence line so the buyer sees the limit before paying.

### PL — `Skill do projektowania UX dla właścicieli firm`

Checkout: `https://cart.creativesparks.pl/checkout/founder-pl`

Description, bullets and link: as in UX Design Skill PL above, then a closing paragraph after the bullets:

> Licencja Founder: do projektowania stron Twojej własnej firmy. Nie obejmuje pracy dla klientów. Do tego wybierz Solo Designer lub Studio.

| Variant name | Price | Crossed-out price | Available |
|---|---|---|---|
| Founder | 449 zł | — | always |
| Founder — Black Friday | 359 zł | 449 zł | 23.11.2026 00:00 – 1.12.2026 00:00 |

### EN — `UX Design Skill for founders`

Checkout: `https://cart.creativesparks.pl/checkout/founder-en`

Description, bullets and link: as in UX Design Skill EN above, then a closing paragraph after the bullets:

> Founder license: for designing your own business's websites. It does not cover client work. For that, choose Solo Designer or Studio.

| Variant name | Price | Crossed-out price | Available |
|---|---|---|---|
| Founder | $149 | — | always |
| Founder — Black Friday | $119 | $149 | 23.11.2026 00:00 – 1.12.2026 00:00 |

## Free: Website Planning Skill

The site does not send people to these carts: its sign-up form grants the skill through the Easytools API (`src/pages/api/subscribe.ts`), and marketing consent comes from the form's own wording, not from the cart checkbox. The cart page is still public, and the product name below is what the access email and the customer portal show. The free-skill download count (`src/lib/free-skill-downloads.ts`) matches orders by these product names, so a rename must update that file too.

### PL — `Skill do planowania stron`

Checkout: `https://cart.creativesparks.pl/checkout/website-planning-skill-pl` · access 60 days

Description:

> Pyta o Twoje potrzeby i kontekst projektu, a później planuje strukturę oraz zawartość strony. Każda decyzja z uzasadnieniem i odrzuconymi wariantami obok.

- Plan strony z mapą stron, strukturą sekcji i wytycznymi zawartości.
- Rozumie 16 typów stron, używa 13 frameworków UX i 50+ wzorców projektowych.
- Każda decyzja z uzasadnieniem i odrzuconymi wariantami.
- Decyzje są oznaczone poziomem pewności, więc wiesz, gdzie AI zgaduje.

Link: **» Sprawdź możliwości pełnej wersji UX Design Skill** → `https://agents.creativesparks.pl/ux-design-skill/`

Marketing checkbox:

- [ ] Zgadzam się na otrzymywanie od Creative Sparks informacji nowościach, produktach i usługach.

### EN — `Website Planning Skill`

Checkout: `https://cart.creativesparks.pl/checkout/website-planning-skill-en` · access 60 days

Description:

> Starts by asking what you need and what your project is about, then plans your site's structure and content.

- Every decision comes with its reasoning and the alternatives it ruled out.
- Delivers a site plan: sitemap, section structure and content guidelines.
- Knows 16 site types and draws on 13 UX frameworks and 50+ design patterns.
- Confidence levels on each decision show you where the AI is guessing.

Link: **» See what the full UX Design Skill can do** → `https://agents.creativesparks.pl/ux-design-skill/`

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

Marketing checkbox: none.

### EN — `Homepage UX Audit Skill`

Checkout: `https://cart.creativesparks.pl/checkout/ux-audit-skill-en` · access 60 days · variant name shown under the product name: "Pakiet Solo (1 użytkownik)"

Description:

> Takes your homepage URL, rebuilds the page as a wireframe and pins its findings directly to each section.

- Delivers one HTML file you open in your browser.
- Each finding compares what's on the page with the standard for your site type.
- Knows 16 site types, from portfolios to SaaS and marketplaces.
- Confidence levels on each finding show you where the AI is guessing.

Link: **» See what the full UX Design Skill can do** → `https://agents.creativesparks.pl/en/ux-design-skill/`

Marketing checkbox: none.

## Not listed

- `UX Design Lead NGO` — a draft product, not on sale.

## Open points in the live carts (2026-11-18)

The text above is what the live carts show. These look like slips rather than choices; each is fixed in Easytools and then here.

- Website Planning Skill PL: the marketing checkbox lacks "o" ("informacji nowościach" → "informacji o nowościach").
- Website Planning Skill PL: "Każda decyzja z uzasadnieniem i odrzuconymi wariantami" appears twice, at the end of the description and as the third bullet.
- Website Planning Skill EN: "See what the full UX Design Skill can do" links to the Polish page; the audit cart links to `/en/ux-design-skill/`.
- Homepage UX Audit Skill EN: the variant is named in Polish ("Pakiet Solo (1 użytkownik)") and shows under the product name.
- The two free PL carts name the paid skill differently in their link: "UX Design Skill" (planning) and "Skilla do projektowania UX" (audit).
