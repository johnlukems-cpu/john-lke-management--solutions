import type { IconName } from '@/data/icons';
import type { FaqItem } from '@/data/services';

/** Waarom ondernemers voor John-Luke kiezen — geen beloftes over resultaten. */
export const reasons: { icon: IconName; title: string; text: string }[] = [
  {
    icon: 'handshake',
    title: 'Persoonlijk en betrokken',
    text: 'U heeft een vast aanspreekpunt dat uw onderneming kent. U hoeft uw situatie niet telkens opnieuw uit te leggen.',
  },
  {
    icon: 'layers',
    title: 'Alles onder één dak',
    text: 'Administratie, payroll, tax en jaarrekening sluiten op elkaar aan, omdat ze vanuit één administratie worden verzorgd.',
  },
  {
    icon: 'shield',
    title: 'Zorgvuldig en vertrouwelijk',
    text: 'Wij gaan nauwkeurig en discreet om met uw financiële gegevens en die van uw personeel.',
  },
  {
    icon: 'chat',
    title: 'Begrijpelijke taal',
    text: 'Wij leggen uit wat uw cijfers betekenen, zonder onnodig vakjargon, zodat u onderbouwd kunt beslissen.',
  },
  {
    icon: 'calendar',
    title: 'Duidelijke afspraken',
    text: 'Vooraf staat vast welke werkzaamheden wij uitvoeren, wat u aanlevert en wanneer u iets van ons hoort.',
  },
  {
    icon: 'sprout',
    title: 'Gericht op Suriname',
    text: 'Onze dienstverlening is volledig afgestemd op de Surinaamse zakelijke praktijk, in SRD en volgens de lokale regels.',
  },
];

/** Werkwijze in vier stappen. */
export const steps: { title: string; text: string }[] = [
  {
    title: 'Kennismaking',
    text: 'In een vrijblijvend gesprek bespreken wij uw onderneming, uw administratie en wat u uit handen wilt geven.',
  },
  {
    title: 'Voorstel op maat',
    text: 'U ontvangt een helder voorstel in SRD, met een duidelijke afbakening van de werkzaamheden.',
  },
  {
    title: 'Overdracht en opstart',
    text: 'Wij spreken af hoe u stukken aanlevert en zetten uw administratie op of nemen die zorgvuldig over.',
  },
  {
    title: 'Doorlopende zorg',
    text: 'Wij verwerken uw administratie periodiek en houden u op de hoogte van uw cijfers en verplichtingen.',
  },
];

/** Voor welke bedrijven wij werken. */
export const audiences = {
  klein: {
    title: 'Kleine ondernemingen',
    icon: 'store' as IconName,
    items: [
      { icon: 'user' as IconName, label: 'Zelfstandige ondernemers' },
      { icon: 'store' as IconName, label: 'Winkels' },
      { icon: 'briefcase' as IconName, label: 'Dienstverlenende bedrijven' },
      { icon: 'utensils' as IconName, label: 'Horecabedrijven' },
      { icon: 'sprout' as IconName, label: 'Startende ondernemingen' },
    ],
  },
  middelgroot: {
    title: 'Middelgrote ondernemingen',
    icon: 'building' as IconName,
    items: [
      { icon: 'users' as IconName, label: 'Bedrijven met personeel' },
      { icon: 'truck' as IconName, label: 'Handelsbedrijven' },
      { icon: 'building' as IconName, label: 'Dienstverlenende organisaties' },
      { icon: 'layers' as IconName, label: 'Ondernemingen met uitgebreidere administraties' },
    ],
  },
};

/** Algemene veelgestelde vragen (homepage + FAQ-pagina). */
export const generalFaq: FaqItem[] = [
  {
    question: 'Voor welke ondernemingen werkt John-Luke Management Solutions?',
    answer:
      'Wij werken voor kleine en middelgrote ondernemingen in Suriname: van zelfstandige ondernemers, winkels, horeca en starters tot handelsbedrijven en organisaties met personeel en een uitgebreidere administratie.',
  },
  {
    question: 'Kan ik één dienst afnemen, of moet ik alles uitbesteden?',
    answer:
      'U kiest zelf. U kunt bijvoorbeeld alleen uw salarisadministratie uitbesteden, of uw volledige administratie inclusief tax en jaarrekening. Wij stemmen de dienstverlening af op wat u nodig heeft.',
  },
  {
    question: 'Wat kost het?',
    answer:
      'De kosten hangen af van de omvang en complexiteit van uw administratie en van de diensten die u afneemt. Na een kennismaking ontvangt u een helder voorstel in SRD, zodat u vooraf weet waar u aan toe bent.',
  },
  {
    question: 'Hoe verloopt de eerste kennismaking?',
    answer:
      'U neemt contact op via het formulier, WhatsApp of e-mail. Wij plannen een gesprek waarin wij uw onderneming en wensen bespreken. De kennismaking is vrijblijvend.',
  },
  {
    question: 'Hoe gaan jullie om met mijn financiële gegevens?',
    answer:
      'Vertrouwelijk. Uw gegevens en die van uw personeel worden uitsluitend gebruikt voor de werkzaamheden die wij voor u uitvoeren.',
  },
  {
    question: 'Mijn administratie is niet op orde. Kan ik toch bij jullie terecht?',
    answer:
      'Ja. Juist dan is het verstandig om contact op te nemen. Wij bekijken samen met u wat er nodig is om uw administratie weer bij te werken.',
  },
];
