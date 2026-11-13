/**
 * Vercel-functie voor de contactformulieren: POST /api/contact
 *
 * Eén endpoint voor het algemene contactformulier (vier categorieën) en het
 * outsourcingformulier voor Nederlandse kantoren. Verstuurt de aanvraag per e-mail
 * via Resend (https://resend.com).
 *
 * Benodigde environment variables (Vercel → Settings → Environment Variables):
 *   RESEND_API_KEY  API-key van Resend
 *   CONTACT_TO      ontvanger, het zakelijke e-mailadres van John-Luke Finance & Advies
 *   RESEND_FROM     afzender op een bij Resend geverifieerd domein
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
  naam: string;
  email: string;
  telefoon: string;
  bedrijf: string;
  bericht: string;
  akkoord: string;
  website: string;
  gestart: string;
  /** Suriname */
  dienst: string;
  /** Outsourcing Nederland */
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
    email: oneLine(text(raw.email, 200)),
    telefoon: oneLine(text(raw.telefoon, 40)),
    bedrijf: oneLine(text(raw.bedrijf, 160)),
    bericht: text(raw.bericht, 4000),
    akkoord: text(raw.akkoord, 5),
    website: text(raw.website, 200),
    gestart: text(raw.gestart, 20),
    dienst: pick(raw.dienst, SURINAME_SERVICES),
    typeKantoor: pick(raw.typeKantoor, OFFICE_TYPES),
    aantalAdministraties: pick(raw.aantalAdministraties, ADMIN_COUNTS),
    werkzaamheden: pickMany(raw.werkzaamheden, OUTSOURCING_TASKS),
    software: pickMany(raw.software, SOFTWARE),
    softwareAnders: oneLine(text(raw.softwareAnders, 120)),
    startdatum: /^\d{4}-\d{2}-\d{2}$/.test(text(raw.startdatum, 10)) ? text(raw.startdatum, 10) : '',
    proces: pick(raw.proces, AI_PROCESSES),
  };

  const fields: string[] = [];
  if (data.naam.length < 2) fields.push('naam');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) fields.push('email');
  if (data.telefoon && !/^[\d\s()+\-.]{6,40}$/.test(data.telefoon)) fields.push('telefoon');
  if (data.akkoord !== 'ja') fields.push('akkoord');
  if (categorie === 'outsourcing') {
    if (data.bedrijf.length < 2) fields.push('bedrijf');
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

export function buildEmail(d: ContactInput) {
  const rows: [string, string][] = [['Categorie', CATEGORIES[d.categorie]]];
  if (d.categorie === 'outsourcing') {
    const software = [labels(d.software.filter((s) => s !== 'anders'), SOFTWARE)];
    if (d.software.includes('anders')) software.push(`Anders: ${d.softwareAnders || 'niet gespecificeerd'}`);
    rows.push(
      ['Bedrijfsnaam', d.bedrijf],
      ['Contactpersoon', d.naam],
      ['E-mail', d.email],
      ['Telefoon', d.telefoon || '—'],
      ['Type kantoor', label(d.typeKantoor, OFFICE_TYPES)],
      ['Aantal administraties', label(d.aantalAdministraties, ADMIN_COUNTS)],
      ['Gewenste werkzaamheden', labels(d.werkzaamheden, OUTSOURCING_TASKS)],
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
  const subject = oneLine(`[${CATEGORIES[d.categorie]}] Aanvraag via website — ${who}`).slice(0, 180);
  const message = d.bericht || '—';
  const textBody = `${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\n${d.categorie === 'outsourcing' ? 'Toelichting' : 'Bericht'}:\n${message}\n`;
  const html = `<div style="font-family:Arial,sans-serif;font-size:15px;color:#161616">
<h2 style="font-family:Georgia,serif;font-weight:normal">Nieuwe aanvraag via de website</h2>
<table cellpadding="6" style="border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="color:#55555b;vertical-align:top">${k}</td><td><strong>${escapeHtml(v)}</strong></td></tr>`)
    .join('')}</table>
<p style="color:#55555b;margin-top:20px">${d.categorie === 'outsourcing' ? 'Toelichting' : 'Bericht'}:</p>
<p style="white-space:pre-wrap;border-left:2px solid #b39250;padding-left:12px">${escapeHtml(message)}</p>
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
  if (!result.ok) return reply(422, { ok: false, error: 'invalid', fields: result.fields });
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

  const { subject, text: textBody, html } = buildEmail(data);
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to: [to], reply_to: data.email, subject, text: textBody, html }),
    });
    if (!res.ok) {
      console.error('Resend-fout', res.status, await res.text());
      return reply(502, { ok: false, error: 'send_failed' });
    }
  } catch (err) {
    console.error('Resend onbereikbaar', err);
    return reply(502, { ok: false, error: 'send_failed' });
  }

  return reply(200, { ok: true });
}
