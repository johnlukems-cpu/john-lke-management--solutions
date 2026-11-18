# SEO-implementatierapport en contentplan

John-Luke Finance Outsourcing · november 2026

Er worden geen posities in Google beloofd en er worden geen zoekvolumes genoemd. Zoekwoorden zijn gekozen op relevantie voor de doelgroep, niet op basis van verzonnen volumecijfers. Valideer ze na livegang in Google Search Console: welke zoekopdrachten tonen de pagina's al, en met welke klikratio?

## 1. Geoptimaliseerde pagina's en zoekthema's

| Pagina | Title (≤ 65 tekens) | Primair zoekthema | Secundair |
|---|---|---|---|
| `/` | Financiële administratie uitbesteden \| NL & BE \| John-Luke | financiële administratie uitbesteden | financiële outsourcing, administratieve ondersteuning accountantskantoor |
| `/diensten` | Diensten: financiële administratie uitbesteden \| John-Luke | administratie uitbesteden | boekhouding outsourcing |
| `/diensten/financiele-administratie` | Financiële administratie uitbesteden \| John-Luke | financiële administratie uitbesteden | financiële verwerking uitbesteden, boekhouding uitbesteden |
| `/diensten/debiteuren-crediteuren` | Debiteuren- en crediteurenbeheer uitbesteden \| John-Luke | debiteurenbeheer / crediteurenbeheer uitbesteden | openstaande posten |
| `/diensten/financiele-controle` | Financiële controle en aansluitingen \| John-Luke | bankaansluiting, grootboekcontrole | btw-codecontrole |
| `/diensten/periode-en-jaarafsluiting` | Maand-, kwartaal- en jaarafsluiting uitbesteden \| John-Luke | maandafsluiting uitbesteden | jaarafsluiting voorbereiden |
| `/diensten/achterstanden` | Administratieve achterstanden wegwerken \| John-Luke | achterstand administratie wegwerken | |
| `/diensten/tijdelijke-capaciteit` | Tijdelijke administratieve capaciteit \| John-Luke | tijdelijke ondersteuning administratiekantoor | personeelstekort |
| `/software` | Software: Nmbrs Accounting (Yuki), AFAS en Exact Online | softwarekennis administratie | |
| `/software/nmbrs-accounting` | Nmbrs Accounting (Yuki) ondersteuning \| John-Luke | Nmbrs Accounting ondersteuning | Yuki administratie uitbesteden |
| `/software/afas-profit` | AFAS Profit ondersteuning \| John-Luke | AFAS Profit ondersteuning | |
| `/software/afas-sb` | AFAS SB administratie uitbesteden \| John-Luke | AFAS SB administratie / ondersteuning | |
| `/software/exact-online` | Exact Online ondersteuning voor kantoren \| John-Luke | Exact Online ondersteuning | |
| `/nederland` | Financiële administratie uitbesteden Nederland \| John-Luke | administratie uitbesteden Nederland | financiële administratie outsourcing |
| `/belgie` | Boekhoudkundige ondersteuning België \| John-Luke | boekhoudkundige ondersteuning België | financiële outsourcing België, boekhoudkantoor ondersteuning, Peppol |
| `/gegevensbescherming` | Gegevensbescherming en veilige samenwerking \| John-Luke | veilig administratie uitbesteden | AVG uitbesteding |
| `/over-ons`, `/contact`, `/veelgestelde-vragen`, `/privacy`, `/nieuws` | Unieke titels en beschrijvingen | merk, kennismaking | |

Alle pagina's hebben:

- precies één H1;
- een unieke title en meta description (70–165 tekens);
- een canonical URL, Open Graph-metadata en `og:locale nl_NL`;
- alt-teksten op alle afbeeldingen;
- een CTA "Plan een kennismakingsgesprek".

## 2. Technische verbeteringen

- **Nieuwe pagina's:** 4 softwarepagina's, Nederland, België en Gegevensbescherming. Ze staan automatisch in `sitemap-index.xml`, en `robots.txt` verwijst naar de sitemap.
- **Structured data:**
  - `ProfessionalService` (areaServed: Nederland en België);
  - `Service` per dienst, softwarepakket en landenpagina;
  - `FAQPage` op dienst-, software- en landenpagina's;
  - `BreadcrumbList`;
  - `ItemList` op de dienstenpagina.
  
  Er zijn geen reviews of ratings toegevoegd.
- **Redirects (301):** oude dienstadressen (o.a. `/diensten/btw-administratie`, `/diensten/jaarafsluiting`, `/diensten/backoffice-ondersteuning`) wijzen direct naar de nieuwe pagina's, zonder ketens.
- **Interne links:**
  - dienstpagina's → softwarepagina's;
  - softwarepagina's → bijbehorende diensten en de andere pakketten;
  - landenpagina's → software en diensten, en naar elkaar;
  - footer → Nederland, België, Gegevensbescherming en Nieuws.
- **Duplicate content:** de Nederland- en Belgiëpagina hebben eigen teksten, terminologie en FAQ's. NL: rekeningschema, btw-aangifte, Wwft. BE: dagboeken, coda, klantenlisting, Peppol, ITAA-kader.
- **Mobiel:** getest op 320–1920 px zonder horizontale overloop. Het hoofdmenu klapt onder 1024 px in; de header-CTA verschijnt vanaf 1280 px naast het menu.
- **Snelheid:**
  - de site blijft statisch (Astro);
  - afbeeldingen in AVIF/WebP met `srcset` en lazy loading;
  - geen nieuwe pakketten of scripts toegevoegd.

## 3. Ontbrekende content

- **Officiële softwarelogo's** zijn niet gebruikt: er is geen toestemming en er zijn geen eigen bestanden. De kaarten zijn tekstueel.
- **Klantcases en referenties** zijn er nog niet. Voeg ze alleen toe met schriftelijke toestemming van de klant.
- **Nieuwsbericht International Accounting Day:** de flyer toont nog de oude naam "Finance & Advies".
- **Belgiëpagina:** laat de tekst toetsen door een Belgische jurist of het ITAA voordat er actief geacquireerd wordt (businessplan, Document 6, punt B4).
- **LinkedIn-bedrijfspagina:** in te vullen in `src/config/site.ts` (`social.linkedin`) zodra die bestaat.

## 4. Openstaande technische punten

- **Google Search Console:** domein verifiëren en de sitemap indienen. Bing Webmaster Tools idem.
- **`hreflang`:** niet toegepast, want er is één Nederlandstalige versie voor NL en BE. Pas overwegen bij aparte `nl-BE`-pagina's.
- **Core Web Vitals:** meten na livegang met PageSpeed Insights of het CrUX-rapport. Lokaal zijn geen veldgegevens beschikbaar.
- **Google Bedrijfsprofiel:** aanmaken met het adres in Zanderij. Overweeg of dat zinvol is voor een B2B-dienst die op NL/BE gericht is.

## 5. Contentplan: 20 artikelideeën

Publiceer in `src/content/nieuws/` (zie de README daar). Elk artikel linkt naar ten minste één dienst- of softwarepagina en eindigt met "Plan een kennismakingsgesprek".

| # | Titel (werktitel) | Thema | Interne link |
|---|---|---|---|
| 1 | Financiële administratie uitbesteden: wanneer is het zinvol voor uw kantoor? | Outsourcing | /diensten/financiele-administratie |
| 2 | Vacature al maanden open? Vijf manieren om capaciteit te organiseren | Personeelstekort | /diensten/tijdelijke-capaciteit |
| 3 | Wat kantoren vragen voordat ze uitbesteden — en onze antwoorden | Outsourcing | /gegevensbescherming |
| 4 | Uitbesteden aan Suriname: taal, tijdzone en samenwerking in de praktijk | Suriname | /over-ons |
| 5 | Yuki heet nu Nmbrs Accounting: wat verandert er voor administratiekantoren? | Software | /software/nmbrs-accounting |
| 6 | Automatische boekingsvoorstellen controleren: waarom blind accepteren risico's geeft | Automatisering / kwaliteit | /software/nmbrs-accounting |
| 7 | Exact Online: btw-codes die vaak misgaan bij buitenlandse diensten | Software / btw | /software/exact-online |
| 8 | AFAS SB en bonnetjes uit de app: volledigheid bewaken zonder extra werk | Software | /software/afas-sb |
| 9 | Werken binnen AFAS Profit-workflows: dimensies en goedkeuringsroutes goed boeken | Software | /software/afas-profit |
| 10 | Het vier-ogenprincipe in financiële verwerking: hoe het werkt en wat het oplevert | Kwaliteitscontrole | /diensten/financiele-controle |
| 11 | Dubbele inkoopfacturen: hoe ze ontstaan en hoe u ze vangt | Kwaliteitscontrole | /diensten/financiele-controle |
| 12 | Een achterstand in de administratie wegwerken: een stappenplan | Achterstanden | /diensten/achterstanden |
| 13 | Checklist maandafsluiting voor administratiekantoren | Maandafsluiting | /diensten/periode-en-jaarafsluiting |
| 14 | De jaarafsluiting voorbereiden: begin in het vierde kwartaal | Afsluiting | /diensten/periode-en-jaarafsluiting |
| 15 | Hoeveel verwerkingscapaciteit heeft uw kantoor écht nodig? Een rekenvoorbeeld | Capaciteit | /contact |
| 16 | Peppol in België: wat verandert er in de verwerking van aankoopfacturen? | België / e-facturatie | /belgie |
| 17 | Veilig uitbesteden: wat hoort in een verwerkersovereenkomst? | Gegevensbescherming | /gegevensbescherming |
| 18 | Bankaansluiting per periode: waarom het de basis van een betrouwbare administratie is | Kwaliteitscontrole | /diensten/financiele-controle |
| 19 | Automatisering in de administratie: bankregels, herkenning en waar AI wel en niet past | Automatisering | /software |
| 20 | Van pilot naar vaste samenwerking: zo verloopt uitbesteden in vier stappen | Outsourcing | /#werkwijze |

## 6. Aanbevelingen voor de komende 90 dagen

1. **Week 1–2:** site live na akkoord; Search Console en Bing instellen; sitemap indienen; de indexering van de 7 nieuwe pagina's controleren.
2. **Week 2–4:** LinkedIn-bedrijfspagina aanmaken en in de site koppelen; artikelen 5, 1 en 16 publiceren (actueel: naamswijziging Yuki, Peppol).
3. **Maand 2:** artikelen 2, 10, 13 en 17 publiceren (twee per maand is voldoende), elk gedeeld via LinkedIn.
4. **Maand 2–3:** in Search Console kijken welke zoekopdrachten vertoningen geven; titles en descriptions bijschaven bij een lage klikratio.
5. **Maand 3:** eerste geanonimiseerde casus publiceren als een klant schriftelijk toestemming geeft; daarna eventueel een aparte casuspagina.
6. **Doorlopend:** geen zoekwoorden stapelen; elk nieuw artikel krijgt een eigen onderwerp, zodat pagina's niet met elkaar concurreren.
