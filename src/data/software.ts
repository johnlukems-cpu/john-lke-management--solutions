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
    name: 'Nmbrs',
    type: 'Salarisadministratie',
    usedFor: 'Online salarissoftware voor loonverwerking en HR-administratie.',
    tasks: ['Controleren van loonjournaalposten', 'Aansluiten van salarisgegevens op het grootboek', 'Signaleren van verschillen tussen salaris- en financiële administratie'],
    helps: 'Helpt de salarisadministratie en de financiële administratie op elkaar te laten aansluiten.',
  },
  {
    name: 'Exact Online',
    type: 'Online boekhouding',
    usedFor: 'Een veelgebruikt online boekhoudpakket in Nederland, voor ondernemers en kantoren.',
    tasks: ['Verwerken van inkoop- en verkoopfacturen', 'Bankverwerking en afletteren', 'Btw-controles en voorbereiding', 'Maand- en kwartaalafsluitingen'],
    helps: 'Kantoren die met Exact Online werken, kunnen verwerkingswerk direct in de bestaande administraties laten uitvoeren.',
  },
  {
    name: 'Yuki',
    type: 'Online boekhouding met automatische verwerking',
    usedFor: 'Online boekhoudplatform waarin documenten en bankmutaties grotendeels automatisch worden verwerkt.',
    tasks: ['Controleren en corrigeren van automatisch verwerkte boekingen', 'Afhandelen van uitzonderingen en twijfelgevallen', 'Btw-controles', 'Periodieke controles'],
    helps: 'Bij automatische verwerking blijft controle nodig. Wij nemen die controle en de uitzonderingen voor uw kantoor voor onze rekening.',
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
];
