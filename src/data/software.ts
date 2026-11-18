/**
 * Softwarekennis — uitsluitend praktijkervaring. Wij claimen geen certificeringen of
 * partnerstatussen. Productnamen zijn merken van hun respectieve eigenaren; logo's worden
 * niet gebruikt zolang daar geen toestemming voor is.
 */
export interface Software {
  /** URL-deel voor kernpakketten: /software/<slug> */
  slug?: string;
  name: string;
  /** Soort pakket */
  type: string;
  /** Waarvoor het pakket wordt gebruikt */
  usedFor: string;
  /** Werkzaamheden die wij ermee ondersteunen */
  tasks: string[];
  /** Hoe dit een administratiekantoor helpt */
  helps: string;
}

/** Kernpakket met een eigen pagina. */
export interface CoreSoftware extends Software {
  slug: string;
  seoTitle: string;
  seoDescription: string;
  heading: string;
  /** Kort label op kaarten, bv. 'Voorheen Yuki' */
  badge?: string;
  intro: string[];
  workflows: string[];
  support: string[];
  benefits: { title: string; text: string }[];
  faq: { question: string; answer: string }[];
  /** Diensten (slugs) die bij dit pakket het meest voorkomen */
  services: string[];
}

/** Algemene afbakening voor alle pakketten. */
export const softwareScope =
  'De precieze werkzaamheden hangen af van de toegang die u verleent, de inrichting van de software en de verantwoordelijkheden die wij samen vastleggen. Wij zijn geen officiële partner of gecertificeerde reseller van de genoemde leveranciers; productnamen zijn merken van hun respectieve eigenaren.';

export const coreSoftware: CoreSoftware[] = [
  {
    slug: 'nmbrs-accounting',
    name: 'Nmbrs Accounting',
    badge: 'Voorheen Yuki',
    type: 'Online boekhouding (Visma)',
    usedFor:
      'Online boekhoudsoftware met sterk geautomatiseerde verwerking van documenten en bank. Sinds 1 september 2026 gaat Yuki officieel verder onder de naam Nmbrs Accounting; functionaliteit en gegevens blijven gelijk.',
    tasks: ['Inkoop- en verkoopfacturen', 'Bankverwerking en aansluitingen', 'Crediteuren en debiteuren', 'Ondersteuning bij periodeafsluitingen'],
    helps: 'Voor kantoren met veel administraties in Nmbrs Accounting of de voormalige Yuki-omgeving: wij beoordelen en verwerken, uw kantoor houdt de regie.',
    seoTitle: 'Nmbrs Accounting (Yuki) ondersteuning | John-Luke',
    seoDescription:
      'Ondersteuning in Nmbrs Accounting, de nieuwe naam van Yuki: facturen, bank, aansluitingen, debiteuren, crediteuren en afsluitingen voor Nederlandse kantoren.',
    heading: 'Nmbrs Accounting-ondersteuning — ook voor de voormalige Yuki-omgeving',
    intro: [
      'Visma heeft Yuki per 1 september 2026 voortgezet onder de naam Nmbrs Accounting. Voor de dagelijkse verwerking verandert er inhoudelijk weinig: dezelfde functies en gegevens, met een nieuwe naam, vormgeving en webadres.',
      'Nmbrs Accounting verwerkt veel documenten en bankmutaties automatisch. Juist dan is menselijke controle belangrijk: automatische voorstellen beoordelen, uitzonderingen afhandelen en zorgen dat btw-coderingen en leveranciersinstellingen kloppen. Dat werk nemen wij voor uw kantoor over.',
    ],
    workflows: ['Inkoopfacturen beoordelen en verwerken', 'Verkoopfacturen verwerken', 'Bankmutaties verwerken en afletteren', 'Aansluitingen en controle van tussenrekeningen', 'Crediteuren- en debiteurenbeheer', 'Voorbereiding van periodeafsluitingen'],
    support: ['Doorlopende verwerking per administratie', 'Afhandeling van vragen en uitzonderingen', 'Controle van btw-coderingen en leveranciersinstellingen', 'Achterstanden en piekcapaciteit'],
    benefits: [
      { title: 'Automatisering met controle', text: 'Wij accepteren automatische voorstellen niet blind, maar controleren ze volgens uw instructies.' },
      { title: 'Vertrouwd na de naamswijziging', text: 'Werkte u met Yuki? Wij kennen de omgeving en de werkwijze.' },
      { title: 'Meer administraties per medewerker', text: 'Uw team richt zich op beoordeling en advies; wij verzorgen het verwerkingswerk.' },
    ],
    faq: [
      { question: 'Is Nmbrs Accounting hetzelfde als Yuki?', answer: 'Ja. Volgens Visma gaat Yuki sinds 1 september 2026 verder onder de naam Nmbrs Accounting, met dezelfde functionaliteit en gegevens. Werkt uw kantoor nog met de oude naam of het oude webadres, dan kunnen wij u daar ook gewoon in ondersteunen.' },
      { question: 'Ondersteunen jullie ook Nmbrs Payroll?', answer: 'Nee. Wij richten ons uitsluitend op de financiële administratie in Nmbrs Accounting, niet op salarisadministratie.' },
    ],
    services: ['financiele-administratie', 'debiteuren-crediteuren', 'financiele-controle', 'periode-en-jaarafsluiting'],
  },
  {
    slug: 'afas-profit',
    name: 'AFAS Profit',
    type: 'ERP en financiële administratie (AFAS Software)',
    usedFor: 'Geïntegreerd ERP-pakket voor middelgrote en grotere organisaties, met workflows, autorisaties en dimensies zoals kostenplaatsen en projecten.',
    tasks: ['Verwerking van financiële transacties', 'Grootboekcontroles', 'Crediteuren en debiteuren', 'Voorbereiding van rapportages en afsluitingen'],
    helps: 'Voor kantoren met klanten in AFAS Profit: complexer verwerkingswerk, uitgevoerd binnen de bestaande workflows.',
    seoTitle: 'AFAS Profit ondersteuning | John-Luke',
    seoDescription:
      'Ondersteuning in AFAS Profit: financiële transacties, grootboekcontroles, crediteuren, debiteuren en voorbereiding van afsluitingen binnen uw workflows.',
    heading: 'AFAS Profit-ondersteuning voor de financiële administratie',
    intro: [
      'AFAS Profit wordt gebruikt door organisaties met meer structuur in hun administratie: workflows met goedkeuringsroutes, autorisaties en dimensies zoals kostenplaatsen en projecten.',
      'Wij verwerken financiële transacties binnen die bestaande inrichting, voeren grootboekcontroles uit en bereiden rapportages en afsluitingen voor. Werk in AFAS Profit wordt bij ons uitgevoerd door ervaren medewerkers, met controle door een tweede persoon.',
    ],
    workflows: ['Verwerking van financiële transacties binnen workflows', 'Crediteurenadministratie en goedkeuringsroutes', 'Debiteurenadministratie', 'Grootboekcontroles en aansluitingen', 'Voorbereiding van rapportages', 'Ondersteuning bij periode- en jaarafsluitingen'],
    support: ['Doorlopende verwerking', 'Controle op dimensies (kostenplaats, project)', 'Afsluitchecklists en specificaties', 'Tijdelijke capaciteit bij pieken'],
    benefits: [
      { title: 'Binnen uw inrichting', text: 'Wij werken met de workflows en autorisaties die u heeft ingericht, zonder wijzigingen aan instellingen.' },
      { title: 'Ervaren medewerkers', text: 'Complexer werk gaat naar medewerkers met ervaring, met een tweede controle.' },
      { title: 'Afsluitingen voorbereid', text: 'Specificaties en aansluitingen liggen klaar voor uw beoordeling.' },
    ],
    faq: [
      { question: 'Passen jullie instellingen of workflows aan in AFAS Profit?', answer: 'Nee, niet zonder uw uitdrukkelijke opdracht. Wij werken binnen de bestaande inrichting en met de rechten die u ons geeft.' },
      { question: 'Ondersteunen jullie ook HRM en payroll in AFAS Profit?', answer: 'Nee. Onze ondersteuning richt zich op de financiële administratie.' },
    ],
    services: ['financiele-administratie', 'debiteuren-crediteuren', 'financiele-controle', 'periode-en-jaarafsluiting'],
  },
  {
    slug: 'afas-sb',
    name: 'AFAS SB',
    type: 'Online boekhouding (AFAS Software)',
    usedFor: 'Online boekhoudoplossing van AFAS voor administratie- en accountantskantoren en hun mkb-klanten, met een app voor het aanleveren van bonnetjes.',
    tasks: ['Inkoop- en verkooptransacties', 'Bankverwerking', 'Voorbereiding btw-administratie', 'Financiële controles'],
    helps: 'Voor kantoren met veel kleinere administraties in AFAS SB: wij verwerken en controleren, uw kantoor beoordeelt.',
    seoTitle: 'AFAS SB administratie uitbesteden | John-Luke',
    seoDescription:
      'AFAS SB administratie uitbesteden: inkoop, verkoop, bank, voorbereiding van de btw-administratie en financiële controles voor administratiekantoren.',
    heading: 'AFAS SB-administratie uitbesteden',
    intro: [
      'AFAS SB is de online boekhoudoplossing van AFAS voor kantoren die veel mkb-administraties bedienen. Ondernemers leveren bonnetjes en facturen vaak aan via de app; het kantoor zorgt dat alles juist wordt verwerkt.',
      'Wij nemen de verwerking en de eerste controle over: transacties boeken, bank verwerken, aangeleverde stukken op volledigheid controleren en de btw-gegevens voorbereiden voor beoordeling door uw kantoor.',
    ],
    workflows: ['Verwerking van inkooptransacties en bonnetjes', 'Verwerking van verkooptransacties', 'Bankverwerking en afletteren', 'Voorbereiding van de btw-administratie', 'Controle op ontbrekende stukken', 'Periodieke financiële controles'],
    support: ['Doorlopende verwerking per administratie', 'Btw-voorbereiding per periode', 'Opvolglijsten voor ontbrekende stukken', 'Achterstanden wegwerken'],
    benefits: [
      { title: 'Schaalbaar voor veel administraties', text: 'Een vaste werkwijze per administratie houdt de kwaliteit voorspelbaar.' },
      { title: 'Volledigheid bewaakt', text: 'Ontbrekende bonnetjes en dubbele aanlevering worden gesignaleerd.' },
      { title: 'Btw klaar voor beoordeling', text: 'De gegevens zijn aangesloten voordat de aangifteperiode begint.' },
    ],
    faq: [
      { question: 'Dienen jullie de btw-aangifte in vanuit AFAS SB?', answer: 'Nee. Wij bereiden de gegevens voor en sluiten ze aan; beoordeling en indiening blijven bij uw kantoor.' },
      { question: 'Heette AFAS SB eerder anders?', answer: 'In eerdere publicaties werd de oplossing SB+ genoemd. Wij gebruiken de naam die AFAS nu hanteert.' },
    ],
    services: ['financiele-administratie', 'financiele-controle', 'achterstanden'],
  },
  {
    slug: 'exact-online',
    name: 'Exact Online',
    type: 'Online boekhouding (Exact)',
    usedFor: 'Veelgebruikt online boekhoudpakket in Nederland, voor ondernemers en voor kantoren die meerdere administraties beheren.',
    tasks: ['Inkoop- en verkoopadministratie', 'Bankaansluiting', 'Grootboekverwerking', 'Btw-controles en rapportage'],
    helps: 'Voor kantoren die met Exact Online werken: verwerkingswerk direct in de bestaande administraties, zonder van omgeving te wisselen.',
    seoTitle: 'Exact Online ondersteuning voor kantoren | John-Luke',
    seoDescription:
      'Exact Online ondersteuning voor kantoren in Nederland: inkoop, verkoop, bankaansluitingen, grootboek, debiteuren, crediteuren en btw-controles.',
    heading: 'Exact Online-ondersteuning voor uw kantoor',
    intro: [
      'Exact Online is een van de meest gebruikte boekhoudpakketten in Nederland. Kantoren beheren er vaak tientallen tot honderden administraties in.',
      'Wij verwerken in de administraties die u ons toewijst: inkoop en verkoop, bank, grootboek en openstaande posten. Daarnaast controleren wij btw-coderingen en bereiden wij rapportages en afsluitingen voor.',
    ],
    workflows: ['Inkoop- en verkoopadministratie', 'Bankverwerking en bankaansluiting', 'Grootboekverwerking', 'Debiteuren- en crediteurenadministratie', 'Btw-controles', 'Ondersteuning bij financiële rapportages'],
    support: ['Doorlopende verwerking', 'Periodieke controles en aansluitingen', 'Voorbereiding van afsluitingen', 'Achterstanden en piekcapaciteit'],
    benefits: [
      { title: 'Direct in uw administraties', text: 'Met een persoonlijke gebruiker en alleen de rechten die nodig zijn.' },
      { title: 'Btw-codes gecontroleerd', text: 'Extra aandacht voor verlegde btw, intracommunautaire en buitenlandse transacties.' },
      { title: 'Opschaalbaar', text: 'Van een paar administraties tot een vaste verwerkingsstroom.' },
    ],
    faq: [
      { question: 'Hebben jullie een eigen Exact Online-licentie nodig?', answer: 'Nee. Wij werken met persoonlijke gebruikers in de omgeving van uw kantoor of uw klanten, met de rechten die u toekent.' },
    ],
    services: ['financiele-administratie', 'debiteuren-crediteuren', 'financiele-controle', 'periode-en-jaarafsluiting'],
  },
];

export const softwarePath = (s: { slug: string }) => `/software/${s.slug}`;

/** Overige pakketten waarmee wij bekend zijn (geen kernspecialisatie). */
export const software: Software[] = [
  ...coreSoftware,
  {
    name: 'Online Boekhouden',
    type: 'Online boekhouding',
    usedFor: 'Nederlands online boekhoudpakket voor ondernemers en administratiekantoren.',
    tasks: ['Verwerken van inkoop- en verkoopfacturen', 'Bankverwerking en afletteren', 'Btw-controles en voorbereiding', 'Periodieke controles'],
    helps: 'Kantoren met klanten in Online Boekhouden kunnen de verwerking en controle direct in die administraties laten uitvoeren.',
  },
  {
    name: 'Zenvoices',
    type: 'Factuurverwerking (crediteuren)',
    usedFor: 'Software voor het digitaal inlezen, coderen en goedkeuren van inkoopfacturen.',
    tasks: ['Controleren en coderen van ingelezen inkoopfacturen', 'Voorbereiden van facturen voor goedkeuring', 'Signaleren van dubbele of afwijkende facturen'],
    helps: 'Versnelt de crediteurenverwerking: wij zorgen dat facturen correct gecodeerd klaarstaan voor goedkeuring.',
  },
  {
    name: 'Basecone',
    type: 'Documentverwerking',
    usedFor: 'Platform voor het digitaal aanleveren, herkennen en verwerken van facturen en bonnen.',
    tasks: ['Controleren van herkende documenten', 'Coderen en doorboeken naar het boekhoudpakket', 'Opvolgen van ontbrekende of onleesbare documenten'],
    helps: 'Zorgt voor een vlotte doorstroom van aangeleverde documenten naar de administratie.',
  },
  {
    name: 'Zoho Books',
    type: 'Online boekhouding',
    usedFor: 'Internationaal online boekhoudpakket, onder meer gebruikt door kleinere ondernemingen.',
    tasks: ['Verwerken van facturen en bankmutaties', 'Afletteren en aansluitingen', 'Periodieke rapportages'],
    helps: 'Ook voor klanten die buiten de gangbare Nederlandse pakketten werken, kunnen wij de verwerking verzorgen.',
  },
  {
    name: 'QuickBooks',
    type: 'Online boekhouding',
    usedFor: 'Internationaal veelgebruikt online boekhoudpakket, ook in Nederland beschikbaar.',
    tasks: ['Verwerken van facturen en bankmutaties', 'Afletteren en aansluitingen', 'Btw-controles', 'Periodieke rapportages'],
    helps: 'Klanten van uw kantoor die met QuickBooks werken, kunnen wij op dezelfde gestructureerde manier ondersteunen.',
  },
];

/** Automatisering en AI — praktische kennis, geen partnerschap met de leveranciers. */
export const automation = {
  intro:
    'Naast de verwerking helpen wij kantoren met het automatiseren van terugkerende administratieve processen. Wij hebben praktische kennis van Claude AI en zetten AI-hulpmiddelen alleen in waar ze aantoonbaar tijd besparen.',
  items: [
    'Automatiseren van terugkerende administratieve taken en workflows',
    'Slimmer inrichten van factuur- en documentverwerking',
    'Inzet van Claude AI voor bijvoorbeeld controlelijsten, samenvattingen en werkinstructies',
    'Advies over waar automatisering in uw kantoor het meeste oplevert',
  ],
  safeguards:
    'Altijd met menselijke controle op de uitkomst, alleen met toestemming van uw kantoor en zonder klantgegevens te delen zonder duidelijke afspraken over gegevensverwerking.',
};

/** Overige pakketten (geen eigen pagina). */
export const otherSoftware = software.filter((s) => !s.slug);
