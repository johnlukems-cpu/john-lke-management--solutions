/**
 * HubSpot-koppeling voor websiteaanvragen.
 *
 * Elke outsourcingaanvraag wordt in HubSpot vastgelegd als:
 *   contact (op e-mailadres, bestaand contact wordt bijgewerkt)
 *   + bedrijf (op naam, bestaand bedrijf wordt hergebruikt)
 *   + deal in de pijplijn "Website-leads", fase "Nieuw", met de leadgegevens.
 *
 * Environment variables (Vercel → Settings → Environment Variables):
 *   HUBSPOT_TOKEN       verplicht om de koppeling aan te zetten: token van een HubSpot
 *                       "private app" (legacy app) met de scopes crm.objects.contacts.read/write,
 *                       crm.objects.companies.read/write en crm.objects.deals.read/write
 *   HUBSPOT_PIPELINE    optioneel, standaard 'default' (de pijplijn "Website-leads")
 *   HUBSPOT_STAGE       optioneel, standaard de fase "Nieuw"
 *   HUBSPOT_PORTAL_ID   optioneel: voor een directe link naar de deal in de e-mailmelding
 *
 * De koppeling is "best effort": lukt HubSpot niet, dan gaat de aanvraag gewoon per e-mail
 * door en staat de fout in de Vercel-logs. De token komt nooit in de browser.
 */

const API = 'https://api.hubapi.com';
const DEFAULT_STAGE = '6538103029'; // "Nieuw" in pijplijn "Website-leads"
const TIMEOUT_MS = 6000;

/**
 * @param {string} token @param {string} method @param {string} path
 * @param {Record<string, unknown>} [body] @param {AbortSignal} [signal]
 * @returns {Promise<any>}
 */
async function call(token, method, path, body, signal) {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
    signal,
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`HubSpot ${method} ${path} → ${res.status} ${text.slice(0, 300)}`);
  return text ? JSON.parse(text) : {};
}

/** Alleen gevulde waarden meesturen (HubSpot weigert lege enumeratiewaarden). */
/** @param {Record<string, string>} o */
const clean = (o) => Object.fromEntries(Object.entries(o).filter(([, v]) => v));

/**
 * @param {{ leadId: string, followUp: string, voornaam: string, achternaam: string, email: string,
 *   telefoon: string, bedrijf: string, land: string, typeKantoor: string, urenPerMaand: string,
 *   startdatum: string, software: string, diensten: string, bericht: string }} lead
 * @returns {Promise<{ dealId: string, dealUrl?: string } | null>}
 */
export async function syncLeadToHubSpot(lead) {
  const token = process.env.HUBSPOT_TOKEN;
  if (!token) return null; // koppeling (nog) niet ingesteld
  const signal = AbortSignal.timeout(TIMEOUT_MS);

  // 1. Contact aanmaken of bijwerken op e-mailadres
  const contactRes = await call(token, 'POST', '/crm/v3/objects/contacts/batch/upsert', {
    inputs: [
      {
        id: lead.email,
        idProperty: 'email',
        properties: clean({ email: lead.email, firstname: lead.voornaam, lastname: lead.achternaam, phone: lead.telefoon, company: lead.bedrijf }),
      },
    ],
  }, signal);
  const contactId = String(contactRes.results?.[0]?.id ?? '');
  if (!contactId) throw new Error('HubSpot: geen contact-ID ontvangen');

  // 2. Bedrijf zoeken op naam, anders aanmaken
  let companyId = '';
  if (lead.bedrijf) {
    const found = await call(token, 'POST', '/crm/v3/objects/companies/search', {
      filterGroups: [{ filters: [{ propertyName: 'name', operator: 'EQ', value: lead.bedrijf }] }],
      properties: ['name'],
      limit: 1,
    }, signal);
    companyId = String(found.results?.[0]?.id ?? '');
    if (!companyId) {
      const created = await call(token, 'POST', '/crm/v3/objects/companies', { properties: { name: lead.bedrijf } }, signal);
      companyId = String(created.id ?? '');
    }
    if (companyId) {
      await call(token, 'PUT', `/crm/v4/objects/contact/${contactId}/associations/default/company/${companyId}`, undefined, signal);
    }
  }

  // 3. Deal in de pijplijn "Website-leads", fase "Nieuw"
  const associations = [
    { to: { id: contactId }, types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 3 }] },
    ...(companyId ? [{ to: { id: companyId }, types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 5 }] }] : []),
  ];
  const deal = await call(token, 'POST', '/crm/v3/objects/deals', {
    properties: clean({
      dealname: `${lead.bedrijf || `${lead.voornaam} ${lead.achternaam}`} — websiteaanvraag ${lead.leadId}`,
      pipeline: process.env.HUBSPOT_PIPELINE || 'default',
      dealstage: process.env.HUBSPOT_STAGE || DEFAULT_STAGE,
      description: lead.bericht,
      jl_lead_id: lead.leadId,
      jl_land: lead.land,
      jl_type_kantoor: lead.typeKantoor,
      jl_uren_per_maand: lead.urenPerMaand,
      jl_startdatum: lead.startdatum,
      jl_opvolgdatum: lead.followUp,
      jl_software: lead.software,
      jl_diensten: lead.diensten,
    }),
    associations,
  }, signal);
  const dealId = String(deal.id ?? '');
  const portal = process.env.HUBSPOT_PORTAL_ID;
  return { dealId, dealUrl: portal && dealId ? `https://app-eu1.hubspot.com/contacts/${portal}/record/0-3/${dealId}` : undefined };
}
