/**
 * Vercel-functie voor het contactformulier: POST /api/contact
 *
 * Verstuurt de aanvraag per e-mail via Resend (https://resend.com).
 * Benodigde environment variables (Vercel → Settings → Environment Variables):
 *   RESEND_API_KEY  API-key van Resend
 *   CONTACT_TO      ontvanger, het zakelijke e-mailadres van John-Luke Management Solutions
 *   RESEND_FROM     afzender op een bij Resend geverifieerd domein
 *
 * Accepteert JSON (fetch vanuit de pagina) en gewone formulierdata (zonder JavaScript).
 * Beveiliging: zelfde-origin-controle, limiet op de grootte, validatie, honeypot,
 * minimale invultijd, eenvoudige rate-limit per IP en het opschonen van headerwaarden.
 */

const SERVICES: Record<string, string> = {
  administratie: 'Administratie',
  payroll: 'Payroll',
  tax: 'Tax',
  jaarrekening: 'Jaarrekening',
  meerdere: 'Meerdere diensten / weet ik nog niet',
};
const SUBJECTS: Record<string, string> = {
  kennismaking: 'Kennismaking plannen',
  vraag: 'Vraag',
};

const MAX_BODY = 16 * 1024;
const MIN_FILL_MS = 2500;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const hits = new Map<string, number[]>();

export interface ContactInput {
  onderwerp: string;
  naam: string;
  bedrijf: string;
  email: string;
  telefoon: string;
  dienst: string;
  bericht: string;
  akkoord: string;
  website: string;
  gestart: string;
}

type Validation = { ok: true; data: ContactInput } | { ok: false; fields: string[] };

const clean = (v: unknown, max: number) =>
  typeof v === 'string' ? v.replace(/\r\n?/g, '\n').trim().slice(0, max) : '';
/** Eén regel, zonder stuurtekens — voorkomt header-injectie in onderwerp/reply-to. */
const oneLine = (v: string) => v.replace(/[\u0000-\u001f\u007f]+/g, ' ').trim();

export function validate(raw: Record<string, unknown>): Validation {
  const data: ContactInput = {
    onderwerp: clean(raw.onderwerp, 20),
    naam: oneLine(clean(raw.naam, 120)),
    bedrijf: oneLine(clean(raw.bedrijf, 160)),
    email: oneLine(clean(raw.email, 200)),
    telefoon: oneLine(clean(raw.telefoon, 40)),
    dienst: clean(raw.dienst, 20),
    bericht: clean(raw.bericht, 4000),
    akkoord: clean(raw.akkoord, 5),
    website: clean(raw.website, 200),
    gestart: clean(raw.gestart, 20),
  };
  const fields: string[] = [];
  if (data.naam.length < 2) fields.push('naam');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) fields.push('email');
  if (data.bericht.length < 5) fields.push('bericht');
  if (data.akkoord !== 'ja') fields.push('akkoord');
  if (data.telefoon && !/^[\d\s()+\-.]{6,40}$/.test(data.telefoon)) fields.push('telefoon');
  if (!(data.onderwerp in SUBJECTS)) data.onderwerp = 'vraag';
  if (data.dienst && !(data.dienst in SERVICES)) data.dienst = '';
  return fields.length ? { ok: false, fields } : { ok: true, data };
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export function buildEmail(d: ContactInput) {
  const rows: [string, string][] = [
    ['Onderwerp', SUBJECTS[d.onderwerp]],
    ['Naam', d.naam],
    ['Bedrijfsnaam', d.bedrijf || '—'],
    ['E-mail', d.email],
    ['Telefoon / WhatsApp', d.telefoon || '—'],
    ['Dienst', d.dienst ? SERVICES[d.dienst] : '—'],
  ];
  const subject = oneLine(
    `${SUBJECTS[d.onderwerp]} via website — ${d.naam}${d.bedrijf ? ` (${d.bedrijf})` : ''}`,
  ).slice(0, 180);
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\nBericht:\n${d.bericht}\n`;
  const html = `<div style="font-family:Arial,sans-serif;font-size:15px;color:#161616">
<h2 style="font-family:Georgia,serif;font-weight:normal">Nieuwe aanvraag via de website</h2>
<table cellpadding="6" style="border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="color:#55555b">${k}</td><td><strong>${escapeHtml(v)}</strong></td></tr>`)
    .join('')}</table>
<p style="color:#55555b;margin-top:20px">Bericht:</p>
<p style="white-space:pre-wrap;border-left:2px solid #b39250;padding-left:12px">${escapeHtml(d.bericht)}</p>
</div>`;
  return { subject, text, html };
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

export async function POST(request: Request): Promise<Response> {
  const wantsJson = (request.headers.get('content-type') ?? '').includes('application/json');
  const reply = (status: number, body: Record<string, unknown>) => {
    if (wantsJson) {
      return new Response(JSON.stringify(body), {
        status,
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
      });
    }
    // Zonder JavaScript: terug naar het formulier met een melding
    const flag = status < 300 ? 'verzonden=1' : 'fout=1';
    return new Response(null, { status: 303, headers: { Location: `/contact?${flag}#formulier` } });
  };

  if (!sameOrigin(request)) return reply(403, { ok: false, error: 'forbidden' });

  const length = Number(request.headers.get('content-length') ?? 0);
  if (length > MAX_BODY) return reply(413, { ok: false, error: 'too_large' });

  let raw: Record<string, unknown>;
  try {
    const body = await request.text();
    if (body.length > MAX_BODY) return reply(413, { ok: false, error: 'too_large' });
    raw = wantsJson ? JSON.parse(body) : Object.fromEntries(new URLSearchParams(body));
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) throw new Error('invalid');
  } catch {
    return reply(400, { ok: false, error: 'bad_request' });
  }

  const ip = (request.headers.get('x-forwarded-for') ?? 'onbekend').split(',')[0].trim();
  if (rateLimited(ip)) return reply(429, { ok: false, error: 'rate_limited' });

  const result = validate(raw);
  if (!result.ok) return reply(422, { ok: false, error: 'invalid', fields: result.fields });
  const data = result.data;

  // Spam: honeypot ingevuld of formulier onwaarschijnlijk snel ingevuld → stil "succes"
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

  const { subject, text, html } = buildEmail(data);
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to: [to], reply_to: data.email, subject, text, html }),
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
