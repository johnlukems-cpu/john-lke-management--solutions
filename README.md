# John-Luke Finance Outsourcing — website

Bedrijfswebsite van **John-Luke Finance Outsourcing**: administratie, payroll, tax en
jaarrekening voor kleine en middelgrote ondernemingen in Suriname.

> Uw financiële administratie. Onze zorg. Uw ruimte om te groeien.

## Pagina's

| Pagina              | Pad                         | Belangrijkste zoekterm                       |
| ------------------- | --------------------------- | -------------------------------------------- |
| Home                | `/`                         | Administratiekantoor Suriname                |
| Diensten            | `/diensten`                 | Administratieve dienstverlening Suriname     |
| Administratie       | `/diensten/administratie`   | Boekhouding / administratie Suriname         |
| Payroll             | `/diensten/payroll`         | Payroll / salarisadministratie Suriname      |
| Tax                 | `/diensten/tax`             | Belastingaangifte Suriname                   |
| Jaarrekening        | `/diensten/jaarrekening`    | Jaarrekening Suriname                        |
| Advies              | `/diensten/advies`          | Financieel / administratief advies Suriname  |
| AI & Automation     | `/diensten/ai-automation`   | Automatisering administratie Suriname        |
| Over ons            | `/over-ons`                 |                                              |
| Veelgestelde vragen | `/veelgestelde-vragen`      |                                              |
| Contact             | `/contact`                  | (formulier, WhatsApp, e-mail, telefoon)      |
| Privacyverklaring   | `/privacy`                  |                                              |

## Techniek

- **Astro 7** — elke pagina wordt bij de build een statische HTML-pagina (snel, goed vindbaar).
- **Tailwind CSS 4** — huisstijl in `src/styles/global.css` (zwart/antraciet, wit, lichtgrijs, goud).
- **Fonts** Inter + Fraunces, zelf gehost (geen externe requests).
- **Contactformulier** via de Vercel-functie `api/contact.ts` en Resend (e-mail).
- **Hosting** Vercel (`vercel.json`: build, beveiligingsheaders, nette URL's).
- Vereist **Node.js 22.23.4 of hoger** (zie `.nvmrc`).

```bash
npm install       # afhankelijkheden installeren
npm run dev       # ontwikkelserver → http://localhost:4321
npm run build     # typecheck + productie-build → dist/ + CSP-controle
npm run preview   # gebouwde site bekijken
```

## Waar pas ik wat aan?

| Wat                                                     | Waar                                   |
| ------------------------------------------------------- | -------------------------------------- |
| **E-mail, telefoon, WhatsApp, adres, KKF, social media** | `src/config/site.ts`                   |
| De zes diensten (teksten, werkzaamheden, FAQ, SEO)     | `src/data/services.ts`                 |
| Waarom wij, werkwijze, doelgroepen, algemene FAQ        | `src/data/content.ts`                  |
| Navigatie                                               | `src/data/navigation.ts`               |
| **Foto's**                                              | `src/assets/photos/` (zie README daar) |
| Kleuren en typografie                                   | `src/styles/global.css`                |
| Logo                                                    | `src/assets/brand/`                    |

### Contactgegevens

Alle contactgegevens staan in `src/config/site.ts` en zijn nu **leeg (`null`)**, omdat ze nog
niet zijn aangeleverd. Er wordt niets verzonnen. Zodra u een gegeven invult, verschijnt het
automatisch in de footer, de contactsectie, de structured data en — bij een WhatsApp-nummer —
de zwevende WhatsApp-knop en de WhatsApp-knoppen op de dienstpagina's.

### Foto's

Plaats foto's in `src/assets/photos/` met de bestandsnamen uit `src/assets/photos/README.md`
(`hero.jpg`, `intro.jpg`, `administratie.jpg`, `payroll.jpg`, `tax.jpg`, `jaarrekening.jpg`,
`advies.jpg`, `automation.jpg`, `werkwijze.jpg`). Ze worden bij de build automatisch geoptimaliseerd (AVIF/WebP, 480–1600 px).
Zolang een foto ontbreekt, toont de site een neutraal vlak in de huisstijl.

## Logo

`src/assets/brand/logo-origineel.webp` is het aangeleverde, officiële logo (handdruk, John-Luke, — FINANCE OUTSOURCING —). Daarvan zijn
zonder vormwijziging twee transparante varianten afgeleid:

- `logo-zwart.png` — voor lichte achtergronden (header, hero, over ons)
- `logo-wit.png` — voor donkere achtergronden (footer)

Favicon, app-iconen (`public/`) en de deelafbeelding `public/og-image.png` zijn uit hetzelfde
logo gemaakt.

## Contactformulier en e-mail

Bezoeker → `POST /api/contact` → Resend → e-mail naar `CONTACT_TO` (antwoorden gaat direct
naar de bezoeker). Werkt ook zonder JavaScript. Beveiliging: zelfde-origin-controle,
maximale grootte, validatie, honeypot, minimale invultijd, rate-limit per IP en opschonen
van headerwaarden.

Stel in Vercel (*Settings → Environment Variables*) in:

| Variabele        | Doel                                                              |
| ---------------- | ----------------------------------------------------------------- |
| `RESEND_API_KEY` | API-key van [Resend](https://resend.com)                          |
| `CONTACT_TO`     | Het zakelijke e-mailadres dat de aanvragen ontvangt               |
| `RESEND_FROM`    | Afzender op een bij Resend geverifieerd domein                    |
| `SITE_URL`       | Optioneel: het definitieve domein, bijv. `https://www.uwdomein.sr` |

Zonder deze variabelen geeft het formulier een nette foutmelding (HTTP 503) en wordt er niets
verstuurd.

## SEO

- Unieke title, meta description, canonical en Open Graph per pagina.
- Eén `<h1>` per pagina; aparte, geoptimaliseerde pagina per dienst.
- JSON-LD: `ProfessionalService` (areaServed: Suriname), `WebSite`, `Service`,
  `BreadcrumbList`, `ItemList` en `FAQPage` — alleen met ingevulde gegevens.
- `sitemap-index.xml` en `robots.txt` worden automatisch gegenereerd.

## Beveiliging

`vercel.json` zet een strikte Content-Security-Policy (`script-src 'self'` plus één hash),
HSTS, `X-Frame-Options`, `Referrer-Policy` en `Permissions-Policy`. Na elke build controleert
`scripts/check-csp.mjs` of elk inline script in de CSP staat; anders faalt de build.

## Checklist vóór livegang

- [ ] Contactgegevens invullen in `src/config/site.ts` (e-mail, telefoon, WhatsApp, eventueel adres en KKF)
- [ ] Foto's aanleveren in `src/assets/photos/`
- [ ] Repository koppelen aan een Vercel-project en de environment variables instellen
- [ ] Resend-domein verifiëren en een testinzending doen vanaf de preview-URL
- [ ] Eigen domein koppelen in Vercel en `SITE_URL` instellen
- [ ] Privacyverklaring laten nalezen
- [ ] Sitemap indienen in Google Search Console en een Google Bedrijfsprofiel aanmaken
