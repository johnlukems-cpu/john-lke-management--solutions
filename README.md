# John-Luke Finance Outsourcing — website

Bedrijfswebsite van **John-Luke Finance Outsourcing**: financiële administratie-outsourcing voor
administratie-, boekhoud- en accountantskantoren in **Nederland**, vanuit Suriname.

> The smarter way forward.

## Pagina's

| Pagina                 | Pad                                   | Belangrijkste zoekthema                         |
| ---------------------- | ------------------------------------- | ----------------------------------------------- |
| Home                   | `/`                                   | Financiële administratie uitbesteden            |
| Diensten (overzicht)   | `/diensten`                           | Administratie uitbesteden, diensten             |
| 6 dienstpagina's       | `/diensten/<slug>`                    | Per dienst (zie `src/data/services.ts`)         |
| Software (overzicht)   | `/software`                           | Softwarekennis                                  |
| 4 softwarepagina's     | `/software/<slug>`                    | Nmbrs Accounting (Yuki), AFAS Profit, AFAS SB, Exact Online |
| Nederland              | `/nederland`                          | Financiële administratie uitbesteden Nederland  |
| Over ons               | `/over-ons`                           |                                                 |
| Gegevensbescherming    | `/gegevensbescherming`                | Veilig uitbesteden, AVG                         |
| Nieuws                 | `/nieuws`, `/nieuws/<slug>`           | Kennisartikelen (zie `docs/seo-en-content.md`)  |
| Veelgestelde vragen    | `/veelgestelde-vragen`                |                                                 |
| Contact                | `/contact`                            | Kennismakingsgesprek (leadformulier)            |
| Privacyverklaring      | `/privacy` (incl. `#cookies`)         |                                                 |

Oude dienstadressen worden in `vercel.json` permanent doorgestuurd naar de nieuwe pagina's.

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
| Software (4 kernpakketten met eigen pagina + overige)  | `src/data/software.ts`                 |
| Keuzelijsten van het formulier                          | `shared/form-options.js`               |
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
naar de bezoeker). Werkt ook zonder JavaScript.

Elke aanvraag krijgt een **lead-ID** (`JL-JJMMDD-XXXX`), status *Nieuw* en een **opvolgdatum**
(volgende werkdag). De interne melding bevat alle leadgegevens plus een agenda-item (`.ics`) als
opvolgherinnering. De aanvrager ontvangt een ontvangstbevestiging (zonder telefoon of bericht).
Een succesmelding verschijnt alleen als Resend de interne melding heeft aangenomen; een mislukte
bevestiging blokkeert de aanvraag niet. Leads worden (nog) niet in een database of CRM opgeslagen. Beveiliging: zelfde-origin-controle,
maximale grootte, validatie, honeypot, minimale invultijd, rate-limit per IP en opschonen
van headerwaarden.

Stel in Vercel (*Settings → Environment Variables*) in:

| Variabele        | Doel                                                              |
| ---------------- | ----------------------------------------------------------------- |
| `RESEND_API_KEY` | API-key van [Resend](https://resend.com)                          |
| `CONTACT_TO`     | Het zakelijke e-mailadres dat de aanvragen ontvangt               |
| `RESEND_FROM`    | Afzender op een bij Resend geverifieerd domein                    |
| `SITE_URL`       | Het definitieve domein: `https://www.johnlukefinance.nl`          |
| `CONFIRMATION_EMAIL` | Optioneel: `off` zet de ontvangstbevestiging aan de aanvrager uit |

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
