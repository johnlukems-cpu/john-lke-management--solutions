# Nieuwsberichten toevoegen

1. Zet de afbeelding in `src/assets/nieuws/` (bijv. `mijn-bericht.jpg`). De afbeelding wordt
   automatisch geoptimaliseerd en nooit bijgesneden.
2. Maak in deze map een bestand `mijn-bericht.md` (de bestandsnaam wordt de URL:
   `/nieuws/mijn-bericht`). Kopieer de bovenkant van een bestaand bericht en pas aan:

```markdown
---
title: Titel van het bericht
seoTitle: Titel voor Google | John-Luke Finance Outsourcing   # optioneel
description: Korte omschrijving voor Google (±150 tekens).
intro: Eén of twee zinnen voor de nieuwskaart.
date: 2026-12-01
category: Nieuws / Actualiteiten
image: ../../assets/nieuws/mijn-bericht.jpg
imageAlt: Beschrijving van de afbeelding.
keywords:
  - zoekwoord 1
draft: false        # true = nog niet publiceren
---

Tekst van het bericht. **Vet** en [links](/contact) zijn mogelijk.
```

Het nieuwste bericht verschijnt automatisch bovenaan op `/nieuws` en op de homepage.
