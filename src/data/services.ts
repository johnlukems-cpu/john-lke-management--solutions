import type { IconName } from '@/data/icons';
import type { PhotoSlot } from '@/data/photos';

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Service {
  /** URL-deel: /diensten/<slug> */
  slug: string;
  /** Korte naam (navigatie, kaarten) */
  name: string;
  /** Beschrijvende ondertitel */
  subtitle: string;
  icon: IconName;
  photo: PhotoSlot;
  /** <title> — bevat de belangrijkste zoekterm */
  seoTitle: string;
  /** Meta description (±150 tekens) */
  seoDescription: string;
  /** Korte omschrijving op dienstkaarten */
  summary: string;
  /** H1 van de dienstpagina */
  heading: string;
  /** Introductie op de dienstpagina */
  intro: string[];
  /** Werkzaamheden (uit de projectopdracht) */
  tasks: string[];
  /** Wat de ondernemer eraan heeft */
  benefits: { title: string; text: string }[];
  /** Voor wie deze dienst bedoeld is */
  audience: string[];
  /** Dienstspecifieke vragen (ook als FAQPage in structured data) */
  faq: FaqItem[];
  /** Optionele afbakening (wat wij níét claimen) */
  scopeNote?: string;
}

export const services: Service[] = [
  {
    slug: 'administratie',
    name: 'Administratie',
    subtitle: 'Financiële administratie en boekhouding',
    icon: 'ledger',
    photo: 'administratie',
    seoTitle: 'Administratie en boekhouding in Suriname',
    seoDescription:
      'Boekhouding uitbesteden in Suriname? John-Luke Management Solutions verzorgt uw financiële administratie: facturen, bankmutaties, debiteuren, crediteuren en rapportages.',
    summary:
      'Inkoop- en verkoopfacturen, bankmutaties, debiteuren en crediteuren: uw financiële administratie actueel en op orde.',
    heading: 'Financiële administratie voor ondernemers in Suriname',
    intro: [
      'Een kloppende administratie is de basis van elke onderneming. Toch schuift de boekhouding vaak naar achteren, omdat klanten, personeel en de dagelijkse gang van zaken voorgaan.',
      'John-Luke Management Solutions neemt de verwerking van uw financiële administratie van u over. Wij verwerken uw facturen en bankmutaties, houden uw debiteuren en crediteuren bij en zorgen voor overzichtelijke rapportages. Zo weet u op elk moment hoe uw onderneming ervoor staat.',
    ],
    tasks: [
      'Financiële administratie',
      'Verwerken van inkoop- en verkoopfacturen',
      'Bankmutaties verwerken',
      'Debiteuren- en crediteurenadministratie',
      'Boekhoudkundige controles',
      'Financiële rapportages',
    ],
    benefits: [
      {
        title: 'Altijd een actueel overzicht',
        text: 'Door periodiek te verwerken blijft uw administratie bij en ziet u wat er binnenkomt, wat eruit gaat en wat nog openstaat.',
      },
      {
        title: 'Grip op openstaande posten',
        text: 'U ziet welke klanten nog moeten betalen en welke rekeningen u nog moet voldoen, zodat u tijdig kunt bijsturen.',
      },
      {
        title: 'Een basis voor tax en jaarrekening',
        text: 'Een bijgewerkte administratie maakt belastingwerkzaamheden en de jaarafsluiting eenvoudiger en sneller.',
      },
    ],
    audience: [
      'Zelfstandige ondernemers die geen tijd hebben voor de boekhouding',
      'Winkels en horecabedrijven met veel dagelijkse transacties',
      'Handels- en dienstverlenende bedrijven met meerdere bankrekeningen',
      'Ondernemingen die hun administratie willen professionaliseren',
    ],
    faq: [
      {
        question: 'Hoe lever ik mijn facturen en bankafschriften aan?',
        answer:
          'Dat stemmen wij af tijdens de kennismaking. Wij spreken een vaste werkwijze en vaste momenten af die passen bij uw onderneming, zodat het aanleveren zo weinig mogelijk tijd kost.',
      },
      {
        question: 'Kan ik mijn administratie in SRD én in vreemde valuta laten bijhouden?',
        answer:
          'Veel Surinaamse ondernemingen werken met SRD én met US-dollar of euro. Bespreek tijdens de kennismaking welke valuta en bankrekeningen in uw administratie voorkomen, dan nemen wij dat mee in de afspraken.',
      },
      {
        question: 'Mijn administratie loopt achter. Kunnen jullie die bijwerken?',
        answer:
          'Ja, neem contact met ons op. Wij bekijken samen met u wat er ontbreekt en spreken af hoe en in welke volgorde de achterstand wordt weggewerkt.',
      },
    ],
  },
  {
    slug: 'payroll',
    name: 'Payroll',
    subtitle: 'Salarisadministratie en loonverwerking',
    icon: 'payroll',
    photo: 'payroll',
    seoTitle: 'Payroll en salarisadministratie in Suriname',
    seoDescription:
      'Salarisadministratie uitbesteden in Suriname. John-Luke Management Solutions verzorgt loonberekeningen, loonstroken, loonmutaties en loonbelastinggerelateerd administratief werk.',
    summary:
      'Loonberekeningen, loonstroken en loonmutaties: uw salarisadministratie elke periode correct en op tijd verwerkt.',
    heading: 'Payroll en salarisadministratie in Suriname',
    intro: [
      'Uw personeel rekent erop dat het salaris op tijd en correct wordt uitbetaald. Tegelijk vraagt de salarisadministratie om nauwkeurigheid: loonberekeningen, mutaties, loonstroken en de loonbelastinggerelateerde administratie moeten kloppen.',
      'John-Luke Management Solutions verzorgt uw salarisadministratie van begin tot eind. Wij verwerken de loonmutaties die u aanlevert, maken de loonberekeningen en loonstroken en ondersteunen u bij de personeelsadministratie. U houdt tijd over voor uw mensen en uw onderneming.',
    ],
    tasks: [
      'Salarisadministratie',
      'Loonberekeningen',
      'Loonstroken',
      'Verwerking van loonmutaties',
      'Ondersteuning bij personeelsadministratie',
      'Loonbelastinggerelateerde administratieve werkzaamheden',
    ],
    benefits: [
      {
        title: 'Correcte en tijdige verwerking',
        text: 'Elke loonperiode volgens een vaste planning verwerkt, zodat uw medewerkers weten waar zij aan toe zijn.',
      },
      {
        title: 'Duidelijke loonstroken',
        text: 'Overzichtelijke loonstroken per medewerker, met de verwerkte uren, toeslagen en inhoudingen.',
      },
      {
        title: 'Overzicht voor de loonbelasting',
        text: 'De loonbelastinggerelateerde gegevens administratief voorbereid, zodat u uw verplichtingen kunt nakomen.',
      },
    ],
    audience: [
      'Bedrijven met personeel, van enkele medewerkers tot grotere teams',
      'Horeca en winkels met wisselende uren en roosters',
      'Ondernemers die voor het eerst personeel aannemen',
      'Bedrijven die de salarisverwerking willen uitbesteden',
    ],
    faq: [
      {
        question: 'Welke gegevens heeft u van mij nodig per loonperiode?',
        answer:
          'In de basis de gewerkte uren, eventuele overuren, toeslagen, verlof en wijzigingen in het personeelsbestand. Tijdens de kennismaking spreken wij precies af welke gegevens u wanneer aanlevert.',
      },
      {
        question: 'Werken jullie met wekelijkse, tweewekelijkse of maandelijkse verloning?',
        answer:
          'Wij stemmen de verwerking af op de loonperiode die uw onderneming hanteert. Bespreek uw situatie met ons, dan nemen wij die mee in het voorstel.',
      },
      {
        question: 'Kunnen jullie ook helpen als ik voor het eerst personeel aanneem?',
        answer:
          'Ja. Wij ondersteunen bij het opzetten van de personeels- en salarisadministratie, zodat u vanaf de eerste loonperiode een goede basis heeft.',
      },
    ],
  },
  {
    slug: 'tax',
    name: 'Tax',
    subtitle: 'Belastingaangiften en fiscale ondersteuning',
    icon: 'tax',
    photo: 'tax',
    seoTitle: 'Belastingaangifte en btw-ondersteuning in Suriname',
    seoDescription:
      'Hulp bij belastingaangiften in Suriname. John-Luke Management Solutions ondersteunt bij aangiften, btw-werkzaamheden en het voorbereiden en controleren van belastinggegevens.',
    summary:
      'Ondersteuning bij belastingaangiften en btw-werkzaamheden, met zorgvuldig voorbereide en gecontroleerde gegevens.',
    heading: 'Ondersteuning bij belastingaangiften in Suriname',
    intro: [
      'Fiscale verplichtingen vragen om tijdige en zorgvuldige voorbereiding. Gegevens moeten compleet zijn, aansluiten op uw administratie en op tijd klaarstaan.',
      'John-Luke Management Solutions ondersteunt u bij uw belastingaangiften en btw-gerelateerde werkzaamheden in Suriname. Wij bereiden de belastinggegevens voor op basis van uw administratie, controleren ze en zorgen dat u overzicht houdt over uw fiscale verplichtingen.',
    ],
    tasks: [
      'Ondersteuning bij belastingaangiften',
      'Btw-gerelateerde werkzaamheden',
      'Fiscale administratieve ondersteuning',
      'Voorbereiden en controleren van belastinggegevens',
      'Ondersteuning bij fiscale verplichtingen in Suriname',
    ],
    benefits: [
      {
        title: 'Op tijd voorbereid',
        text: 'Uw belastinggegevens worden tijdig voorbereid, zodat aangiften niet op het laatste moment hoeven te worden samengesteld.',
      },
      {
        title: 'Aansluitend op uw administratie',
        text: 'Omdat de gegevens uit uw eigen administratie komen, sluiten aangiften en boekhouding op elkaar aan.',
      },
      {
        title: 'Overzicht over uw verplichtingen',
        text: 'U weet welke fiscale verplichtingen voor uw onderneming gelden en welke gegevens daarvoor nodig zijn.',
      },
    ],
    audience: [
      'Ondernemers die hun aangiften zorgvuldig willen laten voorbereiden',
      'Btw-plichtige ondernemingen',
      'Bedrijven die fiscale administratie willen uitbesteden',
      'Startende ondernemers die hun fiscale verplichtingen op orde willen hebben',
    ],
    faq: [
      {
        question: 'Volgen jullie de Surinaamse belastingregels?',
        answer:
          'Ja. Onze ondersteuning is uitsluitend gericht op ondernemingen in Suriname en op de fiscale verplichtingen die daar gelden.',
      },
      {
        question: 'Wat heeft u nodig om mijn aangifte voor te bereiden?',
        answer:
          'Een bijgewerkte administratie en de onderliggende stukken. Verzorgen wij ook uw administratie, dan zijn de meeste gegevens al aanwezig.',
      },
      {
        question: 'Kan ik alleen voor btw-werkzaamheden bij jullie terecht?',
        answer:
          'Ja, u kunt ook losse fiscale werkzaamheden met ons bespreken. Wij stemmen de ondersteuning af op wat u nodig heeft.',
      },
    ],
    scopeNote:
      'Wij verzorgen de administratieve voorbereiding en ondersteuning. De verantwoordelijkheid voor de ingediende aangifte blijft bij de onderneming; bij complexe fiscale vraagstukken adviseren wij u een fiscaal specialist in te schakelen.',
  },
  {
    slug: 'jaarrekening',
    name: 'Jaarrekening',
    subtitle: 'Jaarafsluiting en jaarrekening',
    icon: 'report',
    photo: 'jaarrekening',
    seoTitle: 'Jaarrekening en jaarafsluiting in Suriname',
    seoDescription:
      'Jaarrekening laten opstellen in Suriname? John-Luke Management Solutions verzorgt jaarafsluitingen, balans en winst-en-verliesrekening en de voorbereiding voor uw accountant.',
    summary:
      'Jaarafsluiting, balans en winst-en-verliesrekening: uw boekjaar netjes afgesloten en uw gegevens klaar voor uw accountant.',
    heading: 'Jaarrekening en jaarafsluiting in Suriname',
    intro: [
      'Aan het einde van het boekjaar moet uw administratie compleet zijn en kloppen. Banken, investeerders, de belastingdienst en uw eigen onderneming vragen om betrouwbare financiële overzichten.',
      'John-Luke Management Solutions bereidt uw jaarrekening en jaarafsluiting voor. Wij stellen de balans en de winst-en-verliesrekening op, maken heldere financiële overzichten en bereiden de gegevens voor uw accountant of andere financiële adviseurs voor.',
    ],
    tasks: [
      'Voorbereiding van jaarrekeningen',
      'Jaarafsluitingen',
      'Balans en winst-en-verliesrekening',
      'Financiële overzichten',
      'Voorbereiding van gegevens voor accountants en andere financiële adviseurs',
    ],
    benefits: [
      {
        title: 'Een afgesloten boekjaar',
        text: 'Uw administratie gecontroleerd en afgesloten, zodat het nieuwe boekjaar met een schone lei begint.',
      },
      {
        title: 'Inzicht in uw resultaat',
        text: 'Een balans en winst-en-verliesrekening die laten zien hoe uw onderneming het afgelopen jaar heeft gepresteerd.',
      },
      {
        title: 'Klaar voor uw adviseur',
        text: 'Overzichtelijke, onderbouwde gegevens maken het werk van uw accountant of financiële adviseur eenvoudiger.',
      },
    ],
    audience: [
      'Ondernemingen die een jaarrekening nodig hebben voor bank of financier',
      'Bedrijven die hun boekjaar netjes willen afsluiten',
      'Ondernemers die gegevens voor hun accountant willen laten voorbereiden',
      'Middelgrote ondernemingen met uitgebreidere administraties',
    ],
    faq: [
      {
        question: 'Wanneer moet ik beginnen met de jaarafsluiting?',
        answer:
          'Hoe eerder, hoe beter. Een administratie die het hele jaar bij is, maakt de jaarafsluiting veel eenvoudiger. Neem tijdig contact op, dan plannen wij de werkzaamheden samen in.',
      },
      {
        question: 'Zijn jullie een accountantskantoor?',
        answer:
          'Nee. Wij verzorgen de voorbereiding van jaarrekeningen en jaarafsluitingen en bereiden de gegevens voor uw accountant of andere financiële adviseurs voor. Een controle- of samenstellingsverklaring van een accountant geven wij niet af.',
      },
      {
        question: 'Kunnen jullie ook een jaarrekening maken als iemand anders mijn boekhouding doet?',
        answer:
          'Ja, dat is in overleg mogelijk. Wij bekijken eerst de staat van de administratie en bespreken met u wat er nodig is.',
      },
    ],
    scopeNote:
      'John-Luke Management Solutions is geen accountantskantoor. Wij bereiden jaarrekeningen voor en leveren de gegevens aan uw accountant of financiële adviseur; een accountantsverklaring geven wij niet af.',
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
export const servicePath = (s: Service) => `/diensten/${s.slug}`;
