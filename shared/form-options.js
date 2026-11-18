/**
 * Keuzelijsten van de contactformulieren.
 * Gedeeld door de website (src/components/ContactForm.astro) én de serverfunctie
 * (api/contact.ts), zodat wat bezoekers kunnen kiezen en wat de server accepteert
 * altijd gelijk blijft. Pas opties uitsluitend hier aan.
 */

/** Waarvoor neemt de bezoeker contact op? */
export const CATEGORIES = {
  suriname: 'Financiële diensten Suriname',
  outsourcing: 'Financiële outsourcing Nederland',
  ai: 'AI & Automation',
  algemeen: 'Algemene vraag',
};

/** Diensten voor de Surinaamse markt (sleutels = slugs van de dienstpagina's). */
export const SURINAME_SERVICES = {
  administratie: 'Administratie',
  payroll: 'Payroll',
  tax: 'Tax',
  jaarrekening: 'Jaarrekening',
  advies: 'Advies',
  meerdere: 'Meerdere diensten / weet ik nog niet',
};

export const OFFICE_TYPES = {
  administratiekantoor: 'Administratiekantoor',
  accountantskantoor: 'Accountantskantoor',
  boekhoudkantoor: 'Boekhoudkantoor',
  'financiele-dienstverlener': 'Financiële dienstverlener',
  onderneming: 'Onderneming (eigen administratie)',
  anders: 'Anders',
};

export const ADMIN_COUNTS = {
  '1-5': '1 – 5 administraties',
  '6-20': '6 – 20 administraties',
  '21-50': '21 – 50 administraties',
  '50+': 'Meer dan 50 administraties',
  onbekend: 'Nog niet bekend',
};

export const OUTSOURCING_TASKS = {
  'financiele-administratie': 'Verwerking financiële administratie',
  'debiteuren-crediteuren': 'Crediteuren- en debiteurenbeheer',
  'financiele-controle': 'Financiële controle en aansluitingen',
  'periode-en-jaarafsluiting': 'Periode- en jaarafsluiting',
  achterstanden: 'Achterstanden wegwerken',
  'tijdelijke-capaciteit': 'Tijdelijke capaciteit',
  automatisering: 'Automatisering van administratieve processen (o.a. Claude AI)',
};

/** Land van het kantoor. */
export const COUNTRIES = {
  nederland: 'Nederland',
  anders: 'Ander land',
};

/** Geschatte ondersteuning per maand. */
export const HOURS = {
  'tot-20': 'Minder dan 20 uur per maand',
  '20-40': '20 – 40 uur per maand',
  '40-80': '40 – 80 uur per maand',
  '80-160': '80 – 160 uur per maand',
  '160-plus': 'Meer dan 160 uur per maand',
  onbekend: 'Nog niet bekend',
};

export const SOFTWARE = {
  nmbrs: 'Nmbrs Accounting',
  yuki: 'Voormalige Yuki-omgeving',
  'afas-profit': 'AFAS Profit',
  'afas-sb': 'AFAS SB',
  'exact-online': 'Exact Online',
  'online-boekhouden': 'Online Boekhouden',
  zenvoices: 'Zenvoices',
  basecone: 'Basecone',
  'zoho-books': 'Zoho Books',
  quickbooks: 'QuickBooks',
  anders: 'Anders',
};

export const AI_PROCESSES = {
  facturen: 'Factuurverwerking',
  documenten: 'Documentherkenning en gegevensverwerking',
  rapportages: 'Rapportages en data-analyse',
  workflows: 'Workflows en terugkerende taken',
  assistent: 'AI-assistent voor zakelijke processen',
  advies: 'Advies: wat kan AI voor mij betekenen?',
};
