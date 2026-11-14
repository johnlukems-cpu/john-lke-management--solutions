import type { IconName } from '@/data/icons';
import type { PhotoSlot } from '@/data/photos';

export interface FaqItem {
  question: string;
  answer: string;
}

/** Een outsourcingdienst voor Nederlandse administratie- en accountantskantoren. */
export interface Service {
  /** URL-deel: /diensten/<slug> (gelijk aan de formulierwaarde) */
  slug: string;
  name: string;
  subtitle: string;
  icon: IconName;
  photo: PhotoSlot;
  /** 'standaard' = vast onderdeel van het aanbod; 'op-aanvraag' = projectmatig of seizoensgebonden */
  availability: 'standaard' | 'op-aanvraag';
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
    name: 'Financiële administratie',
    subtitle: 'Verwerking van facturen, bank en grootboek',
    icon: 'ledger',
    photo: 'administratie',
    availability: 'standaard',
    seoTitle: 'Financiële administratie uitbesteden | Outsourcing voor administratiekantoren',
    seoDescription:
      'Financiële administratie uitbesteden: wij verwerken inkoop- en verkoopfacturen, bankmutaties en grootboekboekingen voor Nederlandse administratie- en accountantskantoren.',
    summary:
      'Inkoop- en verkoopfacturen, bankmutaties en grootboekboekingen verwerkt volgens de werkwijze van uw kantoor.',
    heading: 'Financiële administratie uitbesteden',
    intro: [
      'De dagelijkse verwerking van facturen en bankmutaties neemt in veel kantoren een groot deel van de beschikbare uren in beslag. Uren die uw medewerkers liever besteden aan controle, advies en klantcontact.',
      'Wij nemen de verwerking van financiële administraties van uw kantoor over: in uw eigen boekhoudsoftware, volgens uw rekeningschema, coderingsafspraken en werkinstructies. U behoudt het overzicht en de eindverantwoordelijkheid; wij leveren capaciteit en nauwkeurigheid.',
    ],
    tasks: [
      'Verwerken van inkoopfacturen',
      'Verwerken van verkoopfacturen',
      'Verwerken van bankmutaties',
      'Debiteurenadministratie',
      'Crediteurenadministratie',
      'Grootboekverwerking',
      'Coderen en verwerken van financiële transacties',
      'Controleren van administratieve aansluitingen',
    ],
    onRequest: ['Verwerken van administratieve achterstanden'],
    benefits: [
      { title: 'Meer capaciteit', text: 'Uw medewerkers worden ontlast van terugkerend verwerkingswerk en houden tijd over voor controle en advies.' },
      { title: 'Volgens uw werkwijze', text: 'Wij werken in uw software, met uw rekeningschema en uw coderingsafspraken.' },
      { title: 'Voorspelbare doorlooptijd', text: 'Vaste verwerkingsmomenten per administratie, zodat u weet wanneer de administratie bij is.' },
    ],
    faq: [
      { question: 'Werken jullie in onze software of in een eigen omgeving?', answer: 'Altijd in de software van uw kantoor of uw klanten, met de toegang die u verleent. Zo blijft de administratie bij u en heeft u op elk moment inzicht in de verwerking.' },
      { question: 'Hoe gaan jullie om met twijfelgevallen bij het coderen?', answer: 'Twijfelgevallen boeken wij niet op aanname. Wij leggen ze vast en stemmen ze met uw kantoor af, volgens een vooraf afgesproken werkwijze.' },
      { question: 'Kunnen jullie ook een achterstand wegwerken?', answer: 'Ja, dat is mogelijk als afgebakend project op aanvraag. Wij spreken vooraf de omvang, planning en prioriteit af.' },
    ],
  },
  {
    slug: 'btw-administratie',
    name: 'Btw-administratie',
    subtitle: 'Voorbereiding en controle van btw-gegevens',
    icon: 'tax',
    photo: 'tax',
    availability: 'standaard',
    seoTitle: 'Btw-administratie uitbesteden | Ondersteuning voor administratiekantoren',
    seoDescription:
      'Btw-administratie uitbesteden: wij bereiden btw-administraties voor, controleren btw-coderingen en aansluitingen en leveren de gegevens voor de btw-aangifte aan uw kantoor.',
    summary:
      'Btw-coderingen en aansluitingen gecontroleerd en de gegevens voor de btw-aangifte voorbereid voor uw kantoor.',
    heading: 'Btw-administratie uitbesteden',
    intro: [
      'Rond de btw-deadlines loopt de werkdruk in veel kantoren op. Coderingen moeten kloppen, aansluitingen moeten sluiten en de onderliggende documentatie moet compleet zijn.',
      'Wij bereiden de btw-administratie voor, controleren btw-coderingen en aansluitingen en zetten de gegevens voor de aangifte voor uw kantoor klaar. Met praktijkervaring in Nederlandse btw-processen signaleren wij afwijkingen tijdig.',
    ],
    tasks: [
      'Voorbereiden van btw-administraties',
      'Controleren van btw-coderingen',
      'Controleren van btw-aansluitingen',
      'Ondersteuning bij Nederlandse btw-processen',
      'Voorbereiden van gegevens voor btw-aangiften',
      'Controleren van administratieve documentatie',
    ],
    benefits: [
      { title: 'Rust rond de deadlines', text: 'De voorbereiding is gedaan voordat de aangifteperiode begint, zodat uw kantoor zich op de beoordeling kan richten.' },
      { title: 'Afwijkingen tijdig zichtbaar', text: 'Wij signaleren afwijkende coderingen en verschillen en leggen ze met onderbouwing aan u voor.' },
      { title: 'Aansluitend op de administratie', text: 'De btw-gegevens sluiten aan op het grootboek, omdat ze uit dezelfde verwerking komen.' },
    ],
    faq: [
      { question: 'Dienen jullie de btw-aangifte in?', answer: 'Nee. Wij bereiden de gegevens voor en controleren ze. De fiscale beoordeling en de indiening van de aangifte blijven bij uw kantoor, zoals wij dat ook in de samenwerkingsafspraken vastleggen.' },
      { question: 'Hebben jullie ervaring met Nederlandse btw-regels?', answer: 'Wij hebben praktijkervaring met de verwerking van btw in Nederlandse administraties, zoals de gebruikelijke tarieven en coderingen. Bij bijzondere fiscale situaties stemmen wij altijd af met uw kantoor.' },
    ],
    scopeNote:
      'Wij verzorgen de administratieve voorbereiding en controle. De fiscale beoordeling en de indiening van btw-aangiften blijven de verantwoordelijkheid van uw kantoor; dat leggen wij vooraf contractueel vast.',
  },
  {
    slug: 'debiteuren-crediteuren',
    name: 'Debiteuren en crediteuren',
    subtitle: 'Openstaande posten en afletteren',
    icon: 'payroll',
    photo: 'payroll',
    availability: 'standaard',
    seoTitle: 'Debiteuren- en crediteurenadministratie uitbesteden',
    seoDescription:
      'Debiteuren- en crediteurenadministratie uitbesteden: wij verwerken openstaande posten, controleren betalingen, afletteren bankmutaties en signaleren verschillen voor uw kantoor.',
    summary:
      'Openstaande posten bijgewerkt, betalingen afgeletterd en verschillen tijdig gesignaleerd.',
    heading: 'Debiteuren- en crediteurenadministratie uitbesteden',
    intro: [
      'Een betrouwbaar overzicht van openstaande posten is de basis voor goed debiteuren- en crediteurenbeheer. Toch blijven afletteren en het uitzoeken van verschillen vaak liggen.',
      'Wij houden de openstaande posten van de administraties van uw kantoor actueel: betalingen controleren, bankmutaties afletteren en verschillen signaleren, zodat u en uw klanten op juiste cijfers kunnen sturen.',
    ],
    tasks: [
      'Verwerken van openstaande posten',
      'Controleren van betalingen',
      'Afletteren van bankmutaties',
      'Controleren van openstaande facturen',
      'Signaleren van verschillen',
      'Ondersteunen bij debiteuren- en crediteurenbeheer',
    ],
    benefits: [
      { title: 'Actuele openstaande posten', text: 'Een betrouwbaar overzicht van wat er nog openstaat, per debiteur en crediteur.' },
      { title: 'Verschillen snel opgelost', text: 'Onduidelijke betalingen en verschillen worden gesignaleerd en met onderbouwing voorgelegd.' },
      { title: 'Betere basis voor afsluitingen', text: 'Schone subadministraties maken maand- en jaarafsluitingen sneller.' },
    ],
    faq: [
      { question: 'Benaderen jullie ook debiteuren van onze klanten?', answer: 'Standaard niet: wij verzorgen de administratieve kant. Contact met debiteuren of crediteuren loopt via uw kantoor, tenzij daar uitdrukkelijk andere afspraken over worden gemaakt.' },
    ],
  },
  {
    slug: 'maand-kwartaalafsluitingen',
    name: 'Maand- en kwartaalafsluitingen',
    subtitle: 'Periodieke controle en rapportage',
    icon: 'report',
    photo: 'automation',
    availability: 'standaard',
    seoTitle: 'Maand- en kwartaalafsluitingen uitbesteden | Administratieve backoffice',
    seoDescription:
      'Maand- en kwartaalafsluitingen uitbesteden: grootboekcontroles, bankaansluitingen, controle van tussenrekeningen en balansposten en periodieke rapportages voor uw kantoor.',
    summary:
      'Grootboek, bank, tussenrekeningen en balansposten gecontroleerd en periodieke rapportages voorbereid.',
    heading: 'Maand- en kwartaalafsluitingen uitbesteden',
    intro: [
      'Periodieke afsluitingen zorgen ervoor dat administraties op orde blijven en dat de jaarafsluiting geen verrassingen oplevert. Maar ze vragen juist tijd op momenten dat het in uw kantoor al druk is.',
      'Wij voeren de periodieke controles uit en bereiden de rapportages voor. Afwijkingen leggen wij vast en stemmen wij met uw kantoor af.',
    ],
    tasks: [
      'Controleren van grootboekrekeningen',
      'Bankaansluitingen',
      'Crediteuren- en debiteurencontroles',
      'Controle van tussenrekeningen',
      'Controleren van balansposten',
      'Voorbereiden van periodieke rapportages',
      'Signaleren van afwijkingen',
    ],
    benefits: [
      { title: 'Administraties blijven op orde', text: 'Fouten en verschillen worden periodiek gevonden in plaats van pas bij de jaarafsluiting.' },
      { title: 'Rapportages op tijd', text: 'Periodieke rapportages liggen klaar voor beoordeling door uw kantoor.' },
      { title: 'Vaste werkwijze', text: 'Iedere afsluiting volgt dezelfde checklist, zodat de kwaliteit voorspelbaar is.' },
    ],
    faq: [
      { question: 'Welke rapportages kunnen jullie voorbereiden?', answer: 'Standaardrapportages uit de boekhoudsoftware, zoals een balans, winst-en-verliesrekening en overzichten van openstaande posten, aangevuld met een korte toelichting op afwijkingen. Specifieke formats stemmen wij met u af.' },
    ],
  },
  {
    slug: 'jaarafsluiting',
    name: 'Jaarafsluiting',
    subtitle: 'Voorbereiding van jaarwerk en dossiers',
    icon: 'layers',
    photo: 'jaarrekening',
    availability: 'op-aanvraag',
    seoTitle: 'Jaarafsluiting uitbesteden | Ondersteuning bij jaarwerk voor accountantskantoren',
    seoDescription:
      'Ondersteuning bij jaarwerk: wij bereiden administratieve jaarafsluitingen, balansspecificaties, aansluitingen en dossiers voor Nederlandse accountants- en administratiekantoren voor.',
    summary:
      'Administratieve jaarafsluitingen, balansspecificaties en dossiers voorbereid voor beoordeling door uw kantoor.',
    heading: 'Ondersteuning bij de jaarafsluiting',
    intro: [
      'In het jaarwerkseizoen is capaciteit schaars. Voorbereidend werk zoals aansluitingen en balansspecificaties neemt veel tijd in beslag, terwijl uw medewerkers nodig zijn voor beoordeling en klantgesprekken.',
      'Wij bereiden de administratieve jaarafsluiting voor: grootboekrekeningen controleren, balansspecificaties opstellen, financiële gegevens aansluiten en het dossier klaarzetten voor uw beoordeling.',
    ],
    tasks: [
      'Voorbereiden van administratieve jaarafsluitingen',
      'Controleren van grootboekrekeningen',
      'Voorbereiden van balansspecificaties',
      'Aansluitingen van financiële gegevens',
      'Voorbereiden van administratieve dossiers',
      'Ondersteuning bij jaarwerkzaamheden',
    ],
    benefits: [
      { title: 'Capaciteit in het seizoen', text: 'Extra handen precies wanneer de druk het hoogst is.' },
      { title: 'Navolgbare dossiers', text: 'Specificaties en aansluitingen zo opgebouwd dat uw kantoor ze snel kan beoordelen.' },
      { title: 'Uw uren naar beoordeling', text: 'Voorbereidend werk uit handen, zodat uw team zich op beoordeling en advies richt.' },
    ],
    faq: [
      { question: 'Stellen jullie de jaarrekening samen?', answer: 'Wij verzorgen de administratieve voorbereiding. Het samenstellen en de beoordeling van de jaarrekening blijven bij uw kantoor. Wij geven geen accountantsverklaring af.' },
    ],
    scopeNote:
      'Wij bereiden het jaarwerk administratief voor. De beoordeling, het samenstellen van de jaarrekening en eventuele verklaringen blijven de verantwoordelijkheid van uw kantoor.',
  },
  {
    slug: 'backoffice-ondersteuning',
    name: 'Backoffice-ondersteuning',
    subtitle: 'Piekcapaciteit, achterstanden en structurele ondersteuning',
    icon: 'users',
    photo: 'advies',
    availability: 'op-aanvraag',
    seoTitle: 'Administratieve backoffice uitbesteden | Flexibele capaciteit voor kantoren',
    seoDescription:
      'Administratieve backoffice-ondersteuning voor Nederlandse kantoren: tijdelijke capaciteitsuitbreiding, achterstanden wegwerken en structurele ondersteuning bij terugkerende werkzaamheden.',
    summary:
      'Tijdelijke capaciteit tijdens piekperiodes, achterstanden wegwerken of structurele ondersteuning.',
    heading: 'Administratieve backoffice-ondersteuning',
    intro: [
      'Ziekte, vertrek van een medewerker, een nieuwe grote klant of een achterstand: de werklast in een administratiekantoor is zelden gelijkmatig.',
      'Wij bieden flexibele backoffice-capaciteit. Tijdelijk tijdens piekperiodes, als project om een achterstand weg te werken, of structureel voor terugkerende werkzaamheden.',
    ],
    tasks: [
      'Administratieve ondersteuning tijdens piekperiodes',
      'Tijdelijke capaciteitsuitbreiding',
      'Verwerken van achterstanden',
      'Structurele ondersteuning bij terugkerende werkzaamheden',
      'Ondersteuning bij implementatie van administratieve processen',
      'Automatisering van terugkerende administratieve processen, onder meer met Claude AI',
    ],
    benefits: [
      { title: 'Flexibel inzetbaar', text: 'Capaciteit die meebeweegt met de werklast van uw kantoor.' },
      { title: 'Snel op te starten', text: 'Na een korte onboarding in uw systemen en werkwijze kunnen wij aan de slag.' },
      { title: 'Geen vaste personeelslasten', text: 'U betaalt voor de afgesproken ondersteuning, niet voor extra vaste formatie.' },
    ],
    faq: [
      { question: 'Hoe snel kunnen jullie starten?', answer: 'Dat hangt af van de omvang en van de beschikbare capaciteit op dat moment. Na de kennismaking en de toegang tot uw systemen spreken wij een concrete startdatum af.' },
    ],
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
export const servicePath = (s: Service) => `/diensten/${s.slug}`;
