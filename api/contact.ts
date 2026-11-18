/**
 * Vercel-functie voor de contactformulieren: POST /api/contact
 *
 * Eén endpoint voor het algemene contactformulier (vier categorieën) en het
 * outsourcingformulier voor kantoren in Nederland en België. Verstuurt de aanvraag per e-mail
 * via Resend (https://resend.com).
 *
 * Benodigde environment variables (Vercel → Settings → Environment Variables):
 *   RESEND_API_KEY  API-key van Resend
 *   CONTACT_TO      ontvanger, het zakelijke e-mailadres van John-Luke Finance Outsourcing
 *   RESEND_FROM     afzender op een bij Resend geverifieerd domein
 *   CONFIRMATION_EMAIL  optioneel: 'off' zet de ontvangstbevestiging aan de aanvrager uit
 *
 * Elke aanvraag krijgt een lead-ID (JL-JJMMDD-XXXX), status 'Nieuw' en een opvolgdatum
 * (volgende werkdag). De interne melding bevat een agenda-item (.ics) als opvolgherinnering.
 *
 * Accepteert JSON (fetch vanuit de pagina) en gewone formulierdata (zonder JavaScript).
 * Een succesmelding volgt alleen als Resend de e-mail daadwerkelijk heeft aangenomen.
 * Beveiliging: zelfde-origin-controle, limiet op de grootte, validatie tegen vaste
 * keuzelijsten, honeypot, minimale invultijd, rate-limit per IP en het opschonen van
 * headerwaarden.
 */
import {
  ADMIN_COUNTS,
  AI_PROCESSES,
  CATEGORIES,
  COUNTRIES,
  HOURS,
  OFFICE_TYPES,
  OUTSOURCING_TASKS,
  SOFTWARE,
  SURINAME_SERVICES,
} from '../shared/form-options.js';

const MAX_BODY = 16 * 1024;
const MIN_FILL_MS = 2500;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const hits = new Map<string, number[]>();

type Category = keyof typeof CATEGORIES;
type Options = Record<string, string>;

export interface ContactInput {
  categorie: Category;
  /** Volledige naam (bij outsourcing samengesteld uit voor- en achternaam) */
  naam: string;
  voornaam: string;
  achternaam: string;
  email: string;
  telefoon: string;
  bedrijf: string;
  bericht: string;
  akkoord: string;
  website: string;
  gestart: string;
  /** Suriname */
  dienst: string;
  /** Outsourcing (NL/BE) */
  land: string;
  urenPerMaand: string;
  typeKantoor: string;
  aantalAdministraties: string;
  werkzaamheden: string[];
  software: string[];
  softwareAnders: string;
  startdatum: string;
  /** AI & Automation */
  proces: string;
}

type Validation = { ok: true; data: ContactInput } | { ok: false; fields: string[] };

const text = (v: unknown, max: number) =>
  typeof v === 'string' ? v.replace(/\r\n?/g, '\n').trim().slice(0, max) : '';
/** Eén regel, zonder stuurtekens — voorkomt header-injectie in onderwerp/reply-to. */
const oneLine = (v: string) => v.replace(/[\u0000-\u001f\u007f]+/g, ' ').trim();
/** Alleen waarden uit de vaste keuzelijst; al het andere wordt genegeerd. */
const pick = (v: unknown, options: Options) => {
  const s = text(v, 60);
  return s in options ? s : '';
};
const pickMany = (v: unknown, options: Options) => {
  const list = Array.isArray(v) ? v : typeof v === 'string' && v ? v.split(',') : [];
  return [...new Set(list.map((x) => text(x, 60)).filter((x) => x in options))];
};

export function validate(raw: Record<string, unknown>): Validation {
  const categorie = (pick(raw.categorie, CATEGORIES) || 'algemeen') as Category;
  const data: ContactInput = {
    categorie,
    naam: oneLine(text(raw.naam, 120)),
    voornaam: oneLine(text(raw.voornaam, 60)),
    achternaam: oneLine(text(raw.achternaam, 80)),
    email: oneLine(text(raw.email, 200)),
    telefoon: oneLine(text(raw.telefoon, 40)),
    bedrijf: oneLine(text(raw.bedrijf, 160)),
    bericht: text(raw.bericht, 4000),
    akkoord: text(raw.akkoord, 5),
    website: text(raw.website, 200),
    gestart: text(raw.gestart, 20),
    dienst: pick(raw.dienst, SURINAME_SERVICES),
    land: pick(raw.land, COUNTRIES),
    urenPerMaand: pick(raw.urenPerMaand, HOURS),
    typeKantoor: pick(raw.typeKantoor, OFFICE_TYPES),
    aantalAdministraties: pick(raw.aantalAdministraties, ADMIN_COUNTS),
    werkzaamheden: pickMany(raw.werkzaamheden, OUTSOURCING_TASKS),
    software: pickMany(raw.software, SOFTWARE),
    softwareAnders: oneLine(text(raw.softwareAnders, 120)),
    startdatum: /^\d{4}-\d{2}-\d{2}$/.test(text(raw.startdatum, 10)) ? text(raw.startdatum, 10) : '',
    proces: pick(raw.proces, AI_PROCESSES),
  };

  // Outsourcingformulier: voor- en achternaam vormen samen de naam
  if (categorie === 'outsourcing' && (data.voornaam || data.achternaam)) {
    data.naam = `${data.voornaam} ${data.achternaam}`.trim();
  }

  const fields: string[] = [];
  if (categorie === 'outsourcing') {
    if (data.voornaam.length < 1) fields.push('voornaam');
    if (data.achternaam.length < 2) fields.push('achternaam');
  } else if (data.naam.length < 2) fields.push('naam');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) fields.push('email');
  if (data.telefoon && !/^[\d\s()+\-.]{6,40}$/.test(data.telefoon)) fields.push('telefoon');
  if (data.akkoord !== 'ja') fields.push('akkoord');
  if (categorie === 'outsourcing') {
    if (data.bedrijf.length < 2) fields.push('bedrijf');
    if (!data.land) fields.push('land');
    if (!data.typeKantoor) fields.push('typeKantoor');
  } else if (data.bericht.length < 5) {
    fields.push('bericht');
  }
  return fields.length ? { ok: false, fields } : { ok: true, data };
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
const label = (key: string, options: Options) => (key ? options[key] : '—');
const labels = (keys: string[], options: Options) => (keys.length ? keys.map((k) => options[k]).join(', ') : '—');

export interface LeadMeta {
  /** Uniek lead-ID, bv. JL-261118-7K3Q */
  id: string;
  /** Ontvangen op (ISO) */
  receivedAt: string;
  /** Opvolgen vóór (JJJJ-MM-DD) */
  followUp: string;
}

/** Uniek, goed leesbaar lead-ID: JL-JJMMDD-XXXX. */
export function leadId(now = new Date()): string {
  const d = now.toISOString().slice(2, 10).replace(/-/g, '');
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const bytes = crypto.getRandomValues(new Uint8Array(4));
  return `JL-${d}-${[...bytes].map((b) => alphabet[b % alphabet.length]).join('')}`;
}

/** Opvolgdatum: de volgende werkdag (ma–vr). */
export function nextWorkday(now = new Date()): string {
  const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1));
  while (d.getUTCDay() === 0 || d.getUTCDay() === 6) d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
}

/** Agenda-item (.ics) als opvolgherinnering voor de eigenaar. */
export function followUpIcs(d: ContactInput, meta: LeadMeta): string {
  const day = meta.followUp.replace(/-/g, '');
  const esc = (v: string) => v.replace(/[\\;,]/g, (c) => `\\${c}`).replace(/\n/g, '\\n');
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//John-Luke Finance Outsourcing//Leads//NL',
    'BEGIN:VEVENT',
    `UID:${meta.id}@johnlukefinance.nl`,
    `DTSTAMP:${meta.receivedAt.replace(/[-:]/g, '').slice(0, 15)}Z`,
    `DTSTART;VALUE=DATE:${day}`,
    `SUMMARY:${esc(`Opvolgen lead ${meta.id} — ${d.bedrijf || d.naam}`)}`,
    `DESCRIPTION:${esc(`Contact: ${d.naam} (${d.email}${d.telefoon ? `, ${d.telefoon}` : ''})`)}`,
    'END:VEVENT',
    'END:VCALENDAR',
    '',
  ].join('\r\n');
}

export function buildEmail(d: ContactInput, meta?: LeadMeta) {
  const rows: [string, string][] = meta
    ? [['Lead-ID', meta.id], ['Ontvangen', meta.receivedAt.slice(0, 16).replace('T', ' ') + ' UTC'], ['Status', 'Nieuw'], ['Opvolgen vóór', meta.followUp], ['Categorie', CATEGORIES[d.categorie]]]
    : [['Categorie', CATEGORIES[d.categorie]]];
  if (d.categorie === 'outsourcing') {
    const software = [labels(d.software.filter((s) => s !== 'anders'), SOFTWARE)];
    if (d.software.includes('anders')) software.push(`Anders: ${d.softwareAnders || 'niet gespecificeerd'}`);
    rows.push(
      ['Bedrijfsnaam', d.bedrijf],
      ['Voornaam', d.voornaam || '—'],
      ['Achternaam', d.achternaam || '—'],
      ['E-mail', d.email],
      ['Telefoon', d.telefoon || '—'],
      ['Land', label(d.land, COUNTRIES)],
      ['Type kantoor', label(d.typeKantoor, OFFICE_TYPES)],
      ['Aantal administraties', label(d.aantalAdministraties, ADMIN_COUNTS)],
      ['Gewenste ondersteuning', labels(d.werkzaamheden, OUTSOURCING_TASKS)],
      ['Geschatte uren per maand', label(d.urenPerMaand, HOURS)],
      ['Boekhoudsoftware', software.filter((s) => s !== '—').join(' · ') || '—'],
      ['Gewenste startdatum', d.startdatum || '—'],
    );
  } else {
    rows.push(
      ['Naam', d.naam],
      ['Bedrijfsnaam', d.bedrijf || '—'],
      ['E-mail', d.email],
      ['Telefoon / WhatsApp', d.telefoon || '—'],
    );
    if (d.categorie === 'suriname') rows.push(['Dienst', label(d.dienst, SURINAME_SERVICES)]);
    if (d.categorie === 'ai') rows.push(['Proces', label(d.proces, AI_PROCESSES)]);
  }

  const who = d.categorie === 'outsourcing' ? d.bedrijf : `${d.naam}${d.bedrijf ? ` (${d.bedrijf})` : ''}`;
  const subject = oneLine(`${meta ? `[${meta.id}] ` : ''}Nieuwe lead — ${who}${d.land ? ` (${COUNTRIES[d.land as keyof typeof COUNTRIES]})` : ''}`).slice(0, 180);
  const message = d.bericht || '—';
  const textBody = `${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\n${d.categorie === 'outsourcing' ? 'Aanvullend bericht' : 'Bericht'}:\n${message}\n`;
  const html = `<div style="font-family:Arial,sans-serif;font-size:15px;color:#161616">
<h2 style="font-family:Georgia,serif;font-weight:normal">Nieuwe aanvraag via de website</h2>
<table cellpadding="6" style="border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="color:#55555b;vertical-align:top">${k}</td><td><strong>${escapeHtml(v)}</strong></td></tr>`)
    .join('')}</table>
<p style="color:#55555b;margin-top:20px">${d.categorie === 'outsourcing' ? 'Aanvullend bericht' : 'Bericht'}:</p>
<p style="white-space:pre-wrap;border-left:2px solid #b39250;padding-left:12px">${escapeHtml(message)}</p>
</div>`;
  return { subject, text: textBody, html };
}

/** Ontvangstbevestiging voor de aanvrager (geen gevoelige details, alleen een samenvatting). */
export function buildConfirmation(d: ContactInput, meta: LeadMeta) {
  const first = d.voornaam || d.naam.split(' ')[0] || '';
  const items: [string, string][] = [
    ['Referentie', meta.id],
    ['Kantoor', d.bedrijf || '—'],
    ['Gewenste ondersteuning', labels(d.werkzaamheden, OUTSOURCING_TASKS)],
    ['Software', labels(d.software.filter((s) => s !== 'anders'), SOFTWARE)],
  ];
  const subject = oneLine(`Ontvangstbevestiging van uw aanvraag — John-Luke Finance Outsourcing (${meta.id})`);
  const intro = `Beste ${first},\n\nHartelijk dank voor uw aanvraag. Wij hebben deze goed ontvangen en nemen binnen één werkdag contact met u op om een kennismakingsgesprek in te plannen.`;
  const outro = 'Heeft u in de tussentijd een vraag? Beantwoord dan gewoon deze e-mail.\n\nMet vriendelijke groet,\n\nJagernath John\nJohn-Luke Finance Outsourcing\nThe smarter way forward.\n\nU ontvangt deze e-mail omdat u het contactformulier op onze website heeft ingevuld. Heeft u dat niet gedaan? Dan kunt u dit bericht negeren.';
  const textBody = `${intro}\n\n${items.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\n${outro}\n`;
  const html = `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#161616;max-width:560px">
<p>Beste ${escapeHtml(first)},</p>
<p>Hartelijk dank voor uw aanvraag. Wij hebben deze goed ontvangen en nemen <strong>binnen één werkdag</strong> contact met u op om een kennismakingsgesprek in te plannen.</p>
<table cellpadding="6" style="border-collapse:collapse;margin:16px 0">${items
    .map(([k, v]) => `<tr><td style="color:#55555b;vertical-align:top">${k}</td><td><strong>${escapeHtml(v)}</strong></td></tr>`)
    .join('')}</table>
<p>Heeft u in de tussentijd een vraag? Beantwoord dan gewoon deze e-mail.</p>
<p>Met vriendelijke groet,<br><br>Jagernath John<br>John-Luke Finance Outsourcing<br><em style="color:#8a6a2e">The smarter way forward.</em></p>
<p style="color:#8a8a8f;font-size:12px;margin-top:24px">U ontvangt deze e-mail omdat u het contactformulier op onze website heeft ingevuld. Heeft u dat niet gedaan? Dan kunt u dit bericht negeren.</p>
</div>`;
  return { subject, text: textBody, html };
}

function rateLimited(ip: string, now = Date.now()): boolean {
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_MAX;
}

function sameOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return true; // sommige browsers sturen geen Origin bij een gewone formulierpost
  const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host');
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

/** Formulierdata (zonder JavaScript) → object; herhaalde velden worden een lijst. */
function formToObject(body: string): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, value] of new URLSearchParams(body)) {
    const prev = out[key];
    out[key] = prev === undefined ? value : Array.isArray(prev) ? [...prev, value] : [prev, value];
  }
  return out;
}

export async function POST(request: Request): Promise<Response> {
  const wantsJson = (request.headers.get('content-type') ?? '').includes('application/json');
  const referer = request.headers.get('referer');
  const reply = (status: number, body: Record<string, unknown>) => {
    if (wantsJson) {
      return new Response(JSON.stringify(body), {
        status,
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
      });
    }
    // Zonder JavaScript: terug naar de pagina met het formulier, met een melding
    let back = '/contact';
    try {
      const path = referer ? new URL(referer).pathname : '';
      // Alleen een eigen pad ("/…"), nooit "//host" — anders een open redirect
      if (/^\/(?!\/)[\w\-/.]*$/.test(path)) back = path;
    } catch {
      /* standaard /contact */
    }
    const flag = status < 300 ? 'verzonden=1' : 'fout=1';
    return new Response(null, { status: 303, headers: { Location: `${back}?${flag}#formulier` } });
  };

  if (!sameOrigin(request)) return reply(403, { ok: false, error: 'forbidden' });

  const length = Number(request.headers.get('content-length') ?? 0);
  if (length > MAX_BODY) return reply(413, { ok: false, error: 'too_large' });

  let raw: Record<string, unknown>;
  try {
    const body = await request.text();
    if (body.length > MAX_BODY) return reply(413, { ok: false, error: 'too_large' });
    raw = wantsJson ? JSON.parse(body) : formToObject(body);
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) throw new Error('invalid');
  } catch {
    return reply(400, { ok: false, error: 'bad_request' });
  }

  const ip = (request.headers.get('x-forwarded-for') ?? 'onbekend').split(',')[0].trim();
  if (rateLimited(ip)) return reply(429, { ok: false, error: 'rate_limited' });

  const result = validate(raw);
  // 'in'-controle werkt ook als Vercel zonder strict-modus typecheckt
  if ('fields' in result) return reply(422, { ok: false, error: 'invalid', fields: result.fields });
  const data = result.data;

  // Spam: honeypot ingevuld of formulier onwaarschijnlijk snel ingevuld → stil negeren
  const started = Number(data.gestart);
  if (data.website || (started && Date.now() - started < MIN_FILL_MS)) {
    return reply(200, { ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  const from = process.env.RESEND_FROM;
  if (!apiKey || !to || !from) {
    console.error('Contactformulier: RESEND_API_KEY, CONTACT_TO of RESEND_FROM ontbreekt.');
    return reply(503, { ok: false, error: 'not_configured' });
  }

  const meta: LeadMeta = { id: leadId(), receivedAt: new Date().toISOString(), followUp: nextWorkday() };
  const { subject, text: textBody, html } = buildEmail(data, meta);
  const send = (payload: Record<string, unknown>) =>
    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, ...payload }),
    });

  // 1. Interne melding (verplicht): alleen succes als Resend deze aanneemt
  try {
    const attachments =
      data.categorie === 'outsourcing'
        ? [{ filename: `opvolgen-${meta.id}.ics`, content: Buffer.from(followUpIcs(data, meta)).toString('base64') }]
        : undefined;
    const res = await send({ to: [to], reply_to: data.email, subject, text: textBody, html, ...(attachments && { attachments }) });
    if (!res.ok) {
      console.error('Resend-fout', res.status, await res.text());
      // Alleen de statuscode van Resend teruggeven (geen details), voor diagnose
      return reply(502, { ok: false, error: `send_failed_${res.status}` });
    }
  } catch (err) {
    console.error('Resend onbereikbaar', err);
    return reply(502, { ok: false, error: 'send_failed' });
  }

  // 2. Ontvangstbevestiging aan de aanvrager (best effort: de lead is al binnen)
  if (process.env.CONFIRMATION_EMAIL !== 'off') {
    try {
      const c = buildConfirmation(data, meta);
      const res = await send({ to: [data.email], reply_to: to, subject: c.subject, text: c.text, html: c.html });
      if (!res.ok) console.error('Bevestiging niet verzonden', res.status, await res.text());
    } catch (err) {
      console.error('Bevestiging niet verzonden', err);
    }
  }

  return reply(200, { ok: true, lead: meta.id });
}
