import type { IconName } from '@/data/icons';
import type { FaqItem } from '@/data/services';

/** Onderscheidend vermogen — praktijkervaring, geen certificeringen of verzonnen resultaten. */
export const reasons: { icon: IconName; title: string; text: string }[] = [
  { icon: 'briefcase', title: 'Praktijkervaring met administraties', text: 'Meer dan 3 jaar ervaring met Nederlandse administraties en btw, en meer dan 10 jaar ervaring in administratie.' },
  { icon: 'layers', title: 'Flexibele capaciteit', text: 'Ondersteuning die meebeweegt met uw werklast: structureel, tijdens piekperiodes of als project.' },
  { icon: 'handshake', title: 'Persoonlijke, langdurige samenwerking', text: 'Een vast aanspreekpunt dat uw kantoor, uw klanten en uw werkwijze kent. Wij bouwen op samenwerkingen voor de lange termijn.' },
  { icon: 'ledger', title: 'Kennis van uw software', text: 'Gespecialiseerd in Nmbrs Accounting (voorheen Yuki), AFAS Profit, AFAS SB en Exact Online; daarnaast bekend met onder meer Online Boekhouden, Zenvoices, Basecone, Zoho Books en QuickBooks.' },
  { icon: 'automation', title: 'Automatisering en AI', text: 'Wij helpen terugkerende administratieve processen te automatiseren en hebben praktische kennis van Claude AI — altijd met menselijke controle.' },
  { icon: 'check', title: 'Gestructureerde werkprocessen', text: 'Vaste checklists per werkzaamheid, zodat de kwaliteit voorspelbaar is.' },
  { icon: 'shield', title: 'Kwaliteitscontroles', text: 'Controle op boekingen, btw-coderingen, aansluitingen en dubbele facturen, met vastgelegde correcties.' },
  { icon: 'chat', title: 'Vertrouwelijk', text: 'Zorgvuldige omgang met financiële gegevens, met afspraken over toegang, beveiliging en gegevensverwerking.' },
  { icon: 'globe', title: 'Ondersteuning vanuit Suriname', text: 'Nederlandstalig, met een werkdag die overlapt met de middag in Nederland.' },
];

/** Werkwijze van kennismaking tot vaste samenwerking. */
export const steps: { title: string; text: string }[] = [
  { title: 'Kennismaking', text: 'Een vrijblijvend gesprek over uw kantoor, uw software en de capaciteit die u zoekt.' },
  { title: 'Inventarisatie van uw werkzaamheden', text: 'Wij brengen samen in kaart welke administraties, taken, volumes en deadlines u wilt uitbesteden, en wat bij uw kantoor blijft.' },
  { title: 'Inrichting en veilige toegang', text: 'Afspraken over verantwoordelijkheden en gegevensverwerking, persoonlijke accounts met tweestapsverificatie en werkinstructies per administratie. Desgewenst starten wij met een afgebakende pilot.' },
  { title: 'Verwerking en kwaliteitscontrole', text: 'De verwerking start volgens vaste planning, met controle door een tweede persoon, wekelijkse terugkoppeling en een periodiek kwaliteitsoverzicht.' },
];

/** Vertrouwen en waarde (homepage). */
export const trustPoints: { icon: IconName; title: string; text: string }[] = [
  { icon: 'layers', title: 'Flexibele verwerkingscapaciteit', text: 'Structureel, tijdens piekperiodes of als project — capaciteit die meebeweegt met de werklast van uw kantoor.' },
  { icon: 'ledger', title: 'Ervaring met verschillende boekhoudplatformen', text: 'Nmbrs Accounting (voorheen Yuki), AFAS Profit, AFAS SB en Exact Online, en daarnaast andere gangbare pakketten.' },
  { icon: 'report', title: 'Dagelijkse financiële administratie', text: 'Facturen, bank, debiteuren, crediteuren en aansluitingen: het terugkerende werk dat uw kantoor draaiende houdt.' },
  { icon: 'handshake', title: 'Persoonlijke begeleiding', text: 'Een vast aanspreekpunt dat uw kantoor, uw werkwijze en uw administraties kent.' },
  { icon: 'shield', title: 'Kwaliteitscontrole', text: 'Werk wordt gecontroleerd door een tweede persoon, met vaste checklists en vastgelegde correcties.' },
  { icon: 'globe', title: 'Samenwerking op afstand', text: 'Nederlandstalig, met een werkdag die overlapt met de middag in Nederland en veilige toegang tot uw systemen.' },
];

/** Veelvoorkomende capaciteitsproblemen (homepage). */
export const problems: { icon: IconName; title: string }[] = [
  { icon: 'layers', title: 'Administratieve achterstanden' },
  { icon: 'users', title: 'Personeelstekorten en openstaande vacatures' },
  { icon: 'clock', title: 'Toenemende werkdruk' },
  { icon: 'calendar', title: 'Drukte rond maand- en kwartaalafsluitingen' },
  { icon: 'chat', title: 'Te weinig tijd voor klantrelaties en advies' },
  { icon: 'briefcase', title: 'Tijdelijke capaciteitsproblemen door ziekte of groei' },
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
  { question: 'Voor welke kantoren werkt John-Luke Finance Outsourcing?', answer: 'Voor Nederlandse administratie-, boekhoud- en accountantskantoren en financiële dienstverleners die financiële administratieve werkzaamheden willen uitbesteden — structureel of tijdelijk.' },
  { question: 'Hoe werkt ondersteuning op afstand vanuit Suriname?', answer: 'Wij werken in de (online) software van uw kantoor of uw klanten, met de toegang die u verleent. Communicatie verloopt via e-mail, telefoon of videobellen. Nederlands is in Suriname de officiële taal.' },
  { question: 'Wat is het tijdsverschil met Nederland?', answer: 'Suriname loopt in de winter 4 uur en in de zomer 5 uur achter op Nederland. Onze werkdag overlapt met uw middag; werk dat u ’s middags aanlevert, kan dezelfde dag nog worden opgepakt.' },
  { question: 'Hoe gaan jullie om met de gegevens van onze klanten?', answer: 'Vertrouwelijk. Wij werken uitsluitend met de gegevens die nodig zijn voor de opdracht, met persoonlijke accounts en tweestapsverificatie, en leggen afspraken over gegevensverwerking en internationale doorgifte vooraf contractueel vast.' },
  { question: 'Wat kost outsourcing?', answer: 'Financiële administratie verzorgen wij vanaf €12 per uur. Voor de overige diensten maken wij een voorstel op maat. Het definitieve tarief hangt af van de werkzaamheden, het aantal administraties, het volume en de looptijd. Wij werken met een uurtarief, een vast maandbedrag of een tarief per administratie, en bouwen bij voorkeur aan een langdurige samenwerking. Na de kennismaking ontvangt u een voorstel; een pilot is mogelijk.' },
  { question: 'Wie is verantwoordelijk voor de eindcontrole en de aangiften?', answer: 'Uw kantoor. Wij verzorgen de verwerking en de voorbereidende controles; beoordeling, fiscale keuzes en indiening van aangiften blijven bij uw kantoor. Dat leggen wij vooraf vast.' },
];
