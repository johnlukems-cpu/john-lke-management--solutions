import type { IconName } from '@/data/icons';
import type { FaqItem } from '@/data/services';

/** Onderscheidend vermogen — praktijkervaring, geen certificeringen of verzonnen resultaten. */
export const reasons: { icon: IconName; title: string; text: string }[] = [
  { icon: 'briefcase', title: 'Praktijkervaring met Nederlandse administraties', text: 'Meer dan 3 jaar ervaring met Nederlandse administraties en btw, en meer dan 10 jaar ervaring in administratie.' },
  { icon: 'layers', title: 'Flexibele capaciteit', text: 'Ondersteuning die meebeweegt met uw werklast: structureel, tijdens piekperiodes of als project.' },
  { icon: 'handshake', title: 'Persoonlijke samenwerking', text: 'Een vast aanspreekpunt dat uw kantoor, uw klanten en uw werkwijze kent.' },
  { icon: 'ledger', title: 'Kennis van uw software', text: 'Ervaring met onder meer AFAS, Exact Online, Yuki, Nmbrs, Zenvoices, Basecone en Zoho Books.' },
  { icon: 'check', title: 'Gestructureerde werkprocessen', text: 'Vaste checklists per werkzaamheid, zodat de kwaliteit voorspelbaar is.' },
  { icon: 'shield', title: 'Kwaliteitscontroles', text: 'Controle op boekingen, btw-coderingen, aansluitingen en dubbele facturen, met vastgelegde correcties.' },
  { icon: 'chat', title: 'Vertrouwelijk', text: 'Zorgvuldige omgang met financiële gegevens, met afspraken over toegang, beveiliging en gegevensverwerking.' },
  { icon: 'globe', title: 'Ondersteuning vanuit Suriname', text: 'Nederlandstalig, met een werkdag die overlapt met de Nederlandse middag.' },
  { icon: 'sprout', title: 'Gebouwd op langdurige samenwerking', text: 'Wij investeren in het leren kennen van uw kantoor en klanten, en groeien stap voor stap met u mee.' },
];

/** Werkwijze van kennismaking tot vaste samenwerking. */
export const steps: { title: string; text: string }[] = [
  { title: 'Kennismaking', text: 'Wij bespreken uw kantoor, de administraties, de software en de werkzaamheden die u wilt uitbesteden.' },
  { title: 'Voorstel en afspraken', text: 'U ontvangt een voorstel met afbakening, planning, tarief en afspraken over verantwoordelijkheden en gegevensverwerking.' },
  { title: 'Pilot en onboarding', text: 'Wij starten met een afgebakende pilot: toegang tot uw systemen, werkinstructies en een eerste set administraties.' },
  { title: 'Vaste samenwerking', text: 'Na evaluatie volgt een vaste werkwijze met vaste verwerkingsmomenten, kwaliteitscontroles en periodieke terugkoppeling.' },
];

/** Praktijkervaring (Over ons) — door de eigenaar opgegeven. */
export const experience = [
  'Meer dan 10 jaar ervaring in administratie',
  'Meer dan 3 jaar ervaring met Nederlandse administraties en btw',
  'Praktijkervaring met financiële outsourcing voor Nederlandse klanten',
  'Ervaring met verschillende boekhoud- en administratiesystemen',
];

/** Algemene veelgestelde vragen (homepage + FAQ-pagina). */
export const generalFaq: FaqItem[] = [
  { question: 'Voor welke kantoren werkt John-Luke Finance Outsourcing?', answer: 'Voor Nederlandse administratiekantoren, accountantskantoren, boekhoudkantoren en financiële dienstverleners die financiële administratieve werkzaamheden willen uitbesteden — structureel of tijdelijk.' },
  { question: 'Hoe werkt ondersteuning op afstand vanuit Suriname?', answer: 'Wij werken in de (online) software van uw kantoor of uw klanten, met de toegang die u verleent. Communicatie verloopt via e-mail, telefoon of videobellen. Nederlands is in Suriname de officiële taal.' },
  { question: 'Wat is het tijdsverschil met Nederland?', answer: 'Suriname loopt 4 uur achter op Nederland in de winter en 5 uur in de zomer. Onze werkdag overlapt met de Nederlandse middag; werk dat u ’s middags aanlevert, kan dezelfde dag nog worden opgepakt.' },
  { question: 'Hoe gaan jullie om met de gegevens van onze klanten?', answer: 'Vertrouwelijk. Wij werken uitsluitend met de gegevens die nodig zijn voor de opdracht, met persoonlijke accounts en tweestapsverificatie, en leggen afspraken over gegevensverwerking en internationale doorgifte vooraf contractueel vast.' },
  { question: 'Wat kost outsourcing?', answer: 'Onze tarieven starten vanaf €12 per uur. Het definitieve tarief hangt af van de werkzaamheden, het aantal administraties, het volume en de looptijd. Wij werken met een uurtarief, een vast maandbedrag of een tarief per administratie, en bouwen bij voorkeur aan een langdurige samenwerking. Na de kennismaking ontvangt u een voorstel; een pilot is mogelijk.' },
  { question: 'Wie is verantwoordelijk voor de eindcontrole en de aangiften?', answer: 'Uw kantoor. Wij verzorgen de verwerking en de voorbereidende controles; beoordeling, fiscale keuzes en indiening van aangiften blijven bij uw kantoor. Dat leggen wij vooraf vast.' },
];
