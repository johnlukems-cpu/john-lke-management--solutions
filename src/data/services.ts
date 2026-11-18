import type { IconName } from '@/data/icons';
import type { PhotoSlot } from '@/data/photos';

export interface FaqItem {
  question: string;
  answer: string;
}

/** Een outsourcingdienst voor administratie- en accountantskantoren in Nederland. */
export interface Service {
  /** URL-deel: /diensten/<slug> (gelijk aan de formulierwaarde) */
  slug: string;
  name: string;
  subtitle: string;
  icon: IconName;
  photo: PhotoSlot;
  /** 'standaard' = vast onderdeel van het aanbod; 'op-aanvraag' = projectmatig of seizoensgebonden */
  availability: 'standaard' | 'op-aanvraag';
  /** Starttarief per uur in euro's; leeg = tarief op aanvraag */
  priceFromHourly?: number;
  seoTitle: string;
  seoDescription: string;
  /** Korte omschrijving op kaarten */
  summary: string;
  /** H1 van de dienstpagina */
  heading: string;
  intro: string[];
  /** Werkzaamheden die standaard worden uitgevoerd */
  tasks: string[];
  /** Aanvullende werkzaamheden, in overleg */
  onRequest?: string[];
  benefits: { title: string; text: string }[];
  faq: FaqItem[];
  /** Afbakening van verantwoordelijkheden */
  scopeNote?: string;
}

export const services: Service[] = [
  {
    slug: 'financiele-administratie',
    name: 'Verwerking financiële administratie',
    subtitle: 'Facturen, bank, codering en grootboek',
    icon: 'ledger',
    photo: 'administratie',
    availability: 'standaard',
    priceFromHourly: 12,
    seoTitle: 'Financiële administratie uitbesteden | John-Luke',
    seoDescription:
      'Financiële administratie uitbesteden: wij verwerken inkoop- en verkoopfacturen, bank en grootboek voor kantoren in Nederland, in uw eigen software.',
    summary:
      'Inkoop- en verkoopfacturen, bankmutaties en grootboekboekingen verwerkt volgens de werkwijze van uw kantoor.',
    heading: 'Verwerking van de financiële administratie',
    intro: [
      'De dagelijkse verwerking van facturen en bankmutaties neemt in veel kantoren een groot deel van de beschikbare uren in beslag. Uren die uw medewerkers liever besteden aan controle, advies en klantcontact.',
      'Wij nemen de verwerking over: in uw eigen boekhoudsoftware, volgens uw rekeningschema, coderingsafspraken en werkinstructies. U behoudt het overzicht en de eindverantwoordelijkheid; wij leveren capaciteit en nauwkeurigheid.',
    ],
    tasks: [
      'Verwerken van inkoopfacturen',
      'Verwerken van verkoopfacturen',
      'Verwerken van bankmutaties',
      'Coderen van financiële transacties',
      'Grootboekverwerking',
      'Verwerken van administratieve documenten',
    ],
    benefits: [
      { title: 'Meer capaciteit', text: 'Uw medewerkers worden ontlast van terugkerend verwerkingswerk en houden tijd over voor controle en advies.' },
      { title: 'Volgens uw werkwijze', text: 'Wij werken in uw software, met uw rekeningschema en uw coderingsafspraken.' },
      { title: 'Voorspelbare doorlooptijd', text: 'Vaste verwerkingsmomenten per administratie, zodat u weet wanneer de administratie bij is.' },
    ],
    faq: [
      { question: 'Werken jullie in onze software of in een eigen omgeving?', answer: 'Altijd in de software van uw kantoor of uw klanten, met de toegang die u verleent. Zo blijft de administratie bij u en heeft u op elk moment inzicht in de verwerking.' },
      { question: 'Hoe gaan jullie om met twijfelgevallen bij het coderen?', answer: 'Twijfelgevallen boeken wij niet op aanname. Wij leggen ze vast en stemmen ze met uw kantoor af, volgens een vooraf afgesproken werkwijze.' },
    ],
  },
  {
    slug: 'debiteuren-crediteuren',
    name: 'Crediteuren- en debiteurenbeheer',
    subtitle: 'Openstaande posten, betalingen en opvolging',
    icon: 'payroll',
    photo: 'payroll',
    availability: 'standaard',
    seoTitle: 'Debiteuren- en crediteurenbeheer uitbesteden | John-Luke',
    seoDescription:
      'Debiteuren- en crediteurenbeheer uitbesteden: betalingen matchen, openstaande facturen bewaken en open saldi rapporteren voor uw kantoor.',
    summary:
      'Leveranciers- en klantadministratie bijgewerkt, betalingen gematcht en openstaande posten bewaakt.',
    heading: 'Crediteuren- en debiteurenbeheer',
    intro: [
      'Een betrouwbaar overzicht van openstaande posten is de basis voor goed debiteuren- en crediteurenbeheer. Toch blijven afletteren en het uitzoeken van verschillen vaak liggen.',
      'Wij houden de subadministraties actueel: betalingen matchen, openstaande facturen bewaken en open saldi rapporteren. Zo kunnen u en uw klanten op juiste cijfers sturen.',
    ],
    tasks: [
      'Leveranciersadministratie',
      'Klantadministratie',
      'Matchen van betalingen',
      'Bewaken van openstaande facturen',
      'Rapportage van open saldi',
      'Administratieve opvolglijsten voor uw kantoor',
    ],
    benefits: [
      { title: 'Actuele openstaande posten', text: 'Een betrouwbaar overzicht van wat er nog openstaat, per debiteur en crediteur.' },
      { title: 'Verschillen snel zichtbaar', text: 'Onduidelijke betalingen en verschillen worden gesignaleerd en met onderbouwing voorgelegd.' },
      { title: 'Betere basis voor afsluitingen', text: 'Schone subadministraties maken maand- en jaarafsluitingen sneller.' },
    ],
    faq: [
      { question: 'Benaderen jullie ook debiteuren van onze klanten?', answer: 'Standaard niet: wij verzorgen de administratieve kant en leveren een opvolglijst aan. Contact met debiteuren of crediteuren loopt via uw kantoor, tenzij daar uitdrukkelijk andere afspraken over worden gemaakt.' },
      { question: 'Voeren jullie betalingen uit?', answer: 'Nee. Wij kunnen een betaalvoorstel voorbereiden, maar het uitvoeren en accorderen van betalingen blijft bij uw kantoor of uw klant.' },
    ],
  },
  {
    slug: 'financiele-controle',
    name: 'Financiële controle en aansluitingen',
    subtitle: 'Bank, grootboek, btw-codering en tussenrekeningen',
    icon: 'shield',
    photo: 'tax',
    availability: 'standaard',
    seoTitle: 'Financiële controle en aansluitingen | John-Luke',
    seoDescription:
      'Bankaansluitingen, grootboekcontroles, btw-codecontrole, dubbele facturen en tussenrekeningen: periodieke administratieve controles voor uw kantoor.',
    summary:
      'Bankaansluitingen, grootboek- en btw-codecontroles, dubbele facturen en ontbrekende documenten gesignaleerd.',
    heading: 'Financiële controle en aansluitingen',
    intro: [
      'Fouten die vroeg worden gevonden, zijn goedkoop. Fouten die pas bij de aangifte of de jaarafsluiting opduiken, kosten tijd en vertrouwen.',
      'Wij voeren periodieke controles uit op de administratie en leggen elke bevinding met een voorstel aan uw kantoor voor. U beslist over correcties; wij zorgen dat niets ongemerkt blijft liggen.',
    ],
    tasks: [
      'Bankaansluitingen',
      'Grootboekcontroles',
      'Controle van btw-coderingen',
      'Controle op dubbele facturen',
      'Bewaken van tussenrekeningen',
      'Signaleren van ontbrekende documenten',
    ],
    onRequest: ['Voorbereiden en aansluiten van gegevens voor de btw-aangifte, ter beoordeling door uw kantoor'],
    benefits: [
      { title: 'Problemen vroeg zichtbaar', text: 'Verschillen en fouten komen per periode boven, niet pas bij de jaarafsluiting.' },
      { title: 'Elke bevinding onderbouwd', text: 'U ontvangt een controlerapport met bevindingen en voorstellen; u beslist over correcties.' },
      { title: 'Vaste checklist', text: 'Iedere controle volgt dezelfde werkwijze, zodat de kwaliteit voorspelbaar is.' },
    ],
    faq: [
      { question: 'Dienen jullie de btw-aangifte in?', answer: 'Nee. Wij controleren de btw-coderingen en kunnen de gegevens voor de aangifte voorbereiden en aansluiten. De fiscale beoordeling en de indiening blijven bij uw kantoor.' },
      { question: 'Corrigeren jullie fouten zelf?', answer: 'In een open periode en binnen de afgesproken werkinstructie herstellen wij onze eigen verwerking. Correcties in afgesloten periodes of na een aangifte leggen wij altijd eerst aan u voor.' },
    ],
    scopeNote:
      'Wij verzorgen administratieve controles en voorbereiding. De fiscale beoordeling, correctiebesluiten en de indiening van aangiften blijven de verantwoordelijkheid van uw kantoor; dat leggen wij vooraf vast. Wij voeren geen wettelijke controle (audit) uit.',
  },
  {
    slug: 'periode-en-jaarafsluiting',
    name: 'Periode- en jaarafsluiting',
    subtitle: 'Maand, kwartaal en voorbereiding van het jaarwerk',
    icon: 'report',
    photo: 'jaarrekening',
    availability: 'standaard',
    seoTitle: 'Maand-, kwartaal- en jaarafsluiting uitbesteden | John-Luke',
    seoDescription:
      'Ondersteuning bij maand-, kwartaal- en jaarafsluitingen: checklists, specificaties, aansluitingen en openstaande punten, klaar voor uw beoordeling.',
    summary:
      'Maand- en kwartaalafsluitingen en de jaarafsluiting voorbereid, met specificaties en openstaande punten.',
    heading: 'Ondersteuning bij periode- en jaarafsluitingen',
    intro: [
      'Afsluitingen vragen tijd op precies de momenten dat het in uw kantoor al druk is. Voorbereidend werk zoals aansluitingen en specificaties schuift dan snel door.',
      'Wij bereiden maand-, kwartaal- en jaarafsluitingen voor volgens uw afsluitkalender: alles verwerkt, aangesloten en gespecificeerd, met een overzicht van de openstaande punten voor uw beoordeling.',
    ],
    tasks: [
      'Voorbereiden van maandafsluitingen',
      'Voorbereiden van kwartaalafsluitingen',
      'Voorbereiden van de jaarafsluiting',
      'Opstellen van specificaties',
      'Financiële aansluitingen',
      'Overzichten van openstaande punten',
    ],
    benefits: [
      { title: 'Afsluitingen op tijd', text: 'De voorbereiding ligt klaar wanneer uw kantoor gaat beoordelen.' },
      { title: 'Navolgbare dossiers', text: 'Specificaties en aansluitingen zo opgebouwd dat uw kantoor ze snel kan beoordelen.' },
      { title: 'Capaciteit in het seizoen', text: 'Extra handen precies wanneer de druk het hoogst is.' },
    ],
    faq: [
      { question: 'Stellen jullie de jaarrekening samen?', answer: 'Nee. Wij verzorgen de administratieve voorbereiding. Waarderingen, fiscale keuzes, het samenstellen van de jaarrekening en eventuele verklaringen blijven bij uw kantoor. Wij geven geen accountantsverklaring af.' },
    ],
    scopeNote:
      'Wij bereiden afsluitingen administratief voor. De beoordeling, het samenstellen van de jaarrekening en eventuele verklaringen blijven de verantwoordelijkheid van uw kantoor.',
  },
  {
    slug: 'achterstanden',
    name: 'Achterstanden wegwerken',
    subtitle: 'Projectmatig bijwerken van administraties',
    icon: 'layers',
    photo: 'automation',
    availability: 'op-aanvraag',
    seoTitle: 'Administratieve achterstanden wegwerken | John-Luke',
    seoDescription:
      'Administratieve achterstanden projectmatig weggewerkt: achterstallige administraties, open facturen en onbekende bankposten, met planning en voortgang.',
    summary:
      'Achterstallige administraties, open facturen en onbekende bankposten projectmatig bijgewerkt.',
    heading: 'Administratieve achterstanden wegwerken',
    intro: [
      'Een achterstand groeit sneller dan hij krimpt. Hoe langer die blijft liggen, hoe moeilijker het wordt om ontbrekende stukken en onbekende posten nog uit te zoeken.',
      'Wij werken achterstanden projectmatig weg: met een afgesproken planning, prioriteiten en dagelijkse voortgang. U ontvangt een bijgewerkte administratie en een rapport van de punten die uw beoordeling nodig hebben.',
    ],
    tasks: [
      'Verwerken van achterstallige administraties',
      'Wegwerken van openstaande facturen',
      'Uitzoeken van niet-gematchte bankmutaties',
      'Signaleren van administratieve inconsistenties',
      'Rapport van openstaande punten',
    ],
    benefits: [
      { title: 'Duidelijke planning', text: 'Vooraf afgesproken omvang, prioriteiten en einddatum.' },
      { title: 'Zichtbare voortgang', text: 'U ziet dagelijks of wekelijks hoe ver de verwerking is.' },
      { title: 'Daarna bijblijven', text: 'Na het project kan de verwerking doorlopen, zodat er geen nieuwe achterstand ontstaat.' },
    ],
    faq: [
      { question: 'Hoe lang duurt het om een achterstand weg te werken?', answer: 'Dat hangt af van het aantal administraties, de periode en de beschikbaarheid van stukken. Na een korte inventarisatie geven wij een planning en een urenraming.' },
    ],
    scopeNote:
      'Correcties van eerdere verwerking voeren wij uit volgens de instructies van uw kantoor. Besluiten over aanpassingen in afgesloten periodes blijven bij uw kantoor.',
  },
  {
    slug: 'tijdelijke-capaciteit',
    name: 'Tijdelijke capaciteit',
    subtitle: 'Extra handen bij pieken, vacatures en uitval',
    icon: 'users',
    photo: 'advies',
    availability: 'op-aanvraag',
    seoTitle: 'Tijdelijke administratieve capaciteit | John-Luke',
    seoDescription:
      'Flexibele extra capaciteit voor de financiële administratie bij piekperiodes, openstaande vacatures, ziekte of seizoensdrukte in uw kantoor.',
    summary:
      'Flexibele extra capaciteit bij piekperiodes, openstaande vacatures, ziekte of seizoensdrukte.',
    heading: 'Tijdelijke administratieve capaciteit',
    intro: [
      'Ziekte, vertrek van een medewerker, een nieuwe grote klant of de jaarwerkperiode: de werklast in een kantoor is zelden gelijkmatig.',
      'Wij bieden flexibele capaciteit voor de financiële administratie. Tijdelijk tijdens piekperiodes of als overbrugging bij een openstaande vacature, met dezelfde werkwijze en kwaliteitscontrole als bij vaste verwerking.',
    ],
    tasks: [
      'Flexibele extra capaciteit',
      'Ondersteuning bij tijdelijke werkdruk',
      'Seizoensgebonden administratieve ondersteuning',
      'Ondersteuning bij personeelstekort',
    ],
    onRequest: ['Automatisering van terugkerende administratieve processen, onder meer met Claude AI'],
    benefits: [
      { title: 'Flexibel inzetbaar', text: 'Capaciteit die meebeweegt met de werklast van uw kantoor.' },
      { title: 'Snel op te starten', text: 'Na een korte onboarding in uw systemen en werkwijze kunnen wij aan de slag.' },
      { title: 'Geen extra vaste formatie', text: 'U betaalt voor de afgesproken ondersteuning, zonder wervingstraject of vaste personeelslasten.' },
    ],
    faq: [
      { question: 'Hoe snel kunnen jullie starten?', answer: 'Dat hangt af van de omvang en van de beschikbare capaciteit op dat moment. Na de kennismaking en de toegang tot uw systemen spreken wij een concrete startdatum af.' },
    ],
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
export const servicePath = (s: Service) => `/diensten/${s.slug}`;

/** Tariefweergave: 'Vanaf €12 per uur' of 'Tarief op aanvraag'. */
export const priceLabel = (s: Service) => (s.priceFromHourly ? `Vanaf €${s.priceFromHourly} per uur` : 'Tarief op aanvraag');
