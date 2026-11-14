/**
 * Softwarekennis — uitsluitend praktijkervaring. Wij claimen geen certificeringen of
 * partnerstatussen. Productnamen zijn merken van hun respectieve eigenaren; logo's worden
 * niet gebruikt zolang daar geen toestemming voor is.
 */
export interface Software {
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

export const software: Software[] = [
  {
    name: 'AFAS Profit',
    type: 'ERP en financiële administratie',
    usedFor: 'Geïntegreerd ERP-pakket voor financiën, HRM en payroll, veel gebruikt door middelgrote organisaties en kantoren.',
    tasks: ['Verwerken van inkoop- en verkoopfacturen', 'Bankverwerking en afletteren', 'Grootboekcontroles en aansluitingen', 'Voorbereiden van periodieke afsluitingen'],
    helps: 'Kantoren met klanten in AFAS Profit kunnen verwerkings- en controlewerk overdragen zonder van werkomgeving te wisselen.',
  },
  {
    name: 'AFAS SB',
    type: 'Online boekhouding voor kleine ondernemingen',
    usedFor: 'Online boekhoudoplossing van AFAS voor kleinere ondernemingen, vaak in samenwerking met een administratiekantoor.',
    tasks: ['Verwerken van facturen en bankmutaties', 'Controleren van btw-coderingen', 'Voorbereiden van btw-gegevens', 'Controle van openstaande posten'],
    helps: 'Geschikt voor kantoren met veel kleine administraties: wij verwerken en controleren, uw kantoor beoordeelt.',
  },
  {
    name: 'Nmbrs Accounting',
    type: 'Online boekhouding',
    usedFor: 'Online boekhoudoplossing van Nmbrs voor de financiële administratie, naast de salaris- en HR-software van Nmbrs.',
    tasks: ['Verwerken van facturen en bankmutaties', 'Afletteren en aansluitingen', 'Aansluiten van salarisgegevens op het grootboek', 'Btw-controles en periodieke afsluitingen'],
    helps: 'Voor kantoren die met Nmbrs werken: financiële en salarisadministratie sluiten op elkaar aan.',
  },
  {
    name: 'Exact Online',
    type: 'Online boekhouding',
    usedFor: 'Een veelgebruikt online boekhoudpakket in Nederland, voor ondernemers en kantoren.',
    tasks: ['Verwerken van inkoop- en verkoopfacturen', 'Bankverwerking en afletteren', 'Btw-controles en voorbereiding', 'Maand- en kwartaalafsluitingen'],
    helps: 'Kantoren die met Exact Online werken, kunnen verwerkingswerk direct in de bestaande administraties laten uitvoeren.',
  },
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
