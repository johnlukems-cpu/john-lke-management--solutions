"""Financieel model John-Luke Finance Outsourcing — 36 maanden, 3 scenario's.

Alle berekeningen staan als Excel-formules in het werkboek; alleen de gele cellen zijn invoer.
Gebruik: python3 model.py <uitvoer.xlsx>
"""
import sys
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter as L
from openpyxl.chart import LineChart, BarChart, Reference
from openpyxl.worksheet.datavalidation import DataValidation

OUT = sys.argv[1]
wb = Workbook()

# ---------- opmaak ----------
INK = '161616'; GOLD = 'B08D57'
TITLE = Font(bold=True, size=15, color=INK)
SUB = Font(italic=True, size=9, color='666666')
HDR = Font(bold=True, color='FFFFFF'); HFILL = PatternFill('solid', fgColor=INK)
SEC = Font(bold=True, color=INK); SFILL = PatternFill('solid', fgColor='EDE6D6')
INP = PatternFill('solid', fgColor='FFF4CC')
BOLD = Font(bold=True)
EUR = '€ #,##0;[Red]-€ #,##0'; EUR2 = '€ #,##0.00;[Red]-€ #,##0.00'
SRD = '"SRD" #,##0'; PCT = '0.0%'; NUM = '#,##0'; NUM1 = '#,##0.0'
thin = Side(style='thin', color='D9D4C7'); BOT = Border(bottom=thin)
TOP = Border(top=Side(style='thin', color=INK))
WRAP = Alignment(wrap_text=True, vertical='top')

def hdr(ws, r, vals, c0=1):
    for i, v in enumerate(vals):
        c = ws.cell(row=r, column=c0 + i, value=v); c.font = HDR; c.fill = HFILL
        c.alignment = Alignment(horizontal='center', vertical='center', wrap_text=True)

def sec(ws, r, text, ncols):
    for c in range(1, ncols + 1):
        ws.cell(row=r, column=c).fill = SFILL
    ws.cell(row=r, column=1, value=text).font = SEC

# =====================================================================
# 1. LEESWIJZER
# =====================================================================
lw = wb.active; lw.title = 'Leeswijzer'
lw['A1'] = 'Financieel model — John-Luke Finance Outsourcing'; lw['A1'].font = TITLE
lw['A2'] = 'The smarter way forward. · Prognose 36 maanden (maand 1 = januari 2027) · drie scenario\'s'; lw['A2'].font = SUB
rows = [
    ('Doel', 'Inzicht in omzet, kosten, winst, kasstroom, personeelscapaciteit en break-even bij uurfacturatie aan Nederlandse en Belgische kantoren.'),
    ('Invoer', 'Alleen GELE cellen zijn invoer (tabbladen Aannames en Klantinstroom). Alle andere cellen zijn formules — niet overschrijven.'),
    ('Valuta', 'Omzet in EUR. Lonen en lokale kosten worden in SRD ingevoerd en via de wisselkoers (Aannames) naar EUR omgerekend.'),
    ('Wisselkoers', 'Startwaarde EUR/SRD 43,0 — afgerond op basis van CBvS gewogen gemiddelde verkoopkoers euro november 2026 (≈ 43,4, voorlopig). Bron: cbvs.sr › Statistieken › Gemiddelde maandkoersen. Controleer maandelijks.'),
    ('Minimumloon', 'Algemeen minimumuurloon Suriname SRD 61,25 per 1 juli 2026 (gov.sr, beschikking 3 juli 2026). Alle salarisaannames liggen ruim daarboven.'),
    ('Scenario\'s', 'Conservatief, Realistisch en Groei. Elk scenario heeft een eigen prognoseblad met dezelfde formules. Vergelijking op tabblad Scenario\'s; kerncijfers op Dashboard.'),
    ('Personeel', 'Medewerkers worden automatisch aangenomen zodra de vraag de capaciteit van eigenaar + team structureel overschrijdt (zie Aannames › aannamedrempel). Headcount daalt in het model niet bij klantverlies (voorzichtig).'),
    ('Capaciteit', 'Nooit 100% declarabel: declarabele uren = contracturen × declarabiliteit (standaard 65%) — ruimte voor vakantie, ziekte, training, kwaliteitscontrole en interne administratie. Nieuwe medewerkers zijn de eerste 2 maanden 50% productief.'),
    ('Winst vs kas', 'Omzet en winst worden toegerekend aan de maand van het werk. Kasontvangsten volgen 1 maand later (maandfactuur achteraf, betaaltermijn 14–30 dagen). Apparatuur is investering (kas) met afschrijving in 36 maanden (winst).'),
    ('Belasting', 'Belastingvoorziening = % van positieve maandwinst (aanname 36%, geen verliesverrekening — voorzichtig). Laten toetsen door een Surinaamse belastingadviseur (rechtsvorm bepaalt tarief).'),
    ('Status', 'ALLE bedragen zijn hypothesen/aannames, geen resultaten. Tarieven valideren in klantgesprekken; salarissen toetsen op de Surinaamse arbeidsmarkt; premies (APF, BZV) en belasting toetsen bij een adviseur.'),
]
for i, (k, v) in enumerate(rows, start=4):
    lw.cell(row=i, column=1, value=k).font = BOLD
    c = lw.cell(row=i, column=2, value=v); c.alignment = WRAP
    lw.row_dimensions[i].height = 44
lw.column_dimensions['A'].width = 16; lw.column_dimensions['B'].width = 120

# =====================================================================
# 2. AANNAMES
# =====================================================================
a = wb.create_sheet('Aannames')
a['A1'] = 'Aannames (gele cellen zijn aanpasbaar)'; a['A1'].font = TITLE
a['A2'] = 'Status: hypothesen. Kolom F geeft bron of onderbouwing. Bedragen excl. btw.'; a['A2'].font = SUB
hdr(a, 4, ['Parameter', 'Eenheid', 'Conservatief', 'Realistisch', 'Groei', 'Bron / toelichting'])
REF = {}       # naam -> celadres (algemeen, kolom C)
SREF = {}      # naam -> rij (scenario, kolommen C/D/E)
r = 5

def gen(name, label, unit, val, fmt, note=''):
    global r
    a.cell(row=r, column=1, value=label); a.cell(row=r, column=2, value=unit)
    c = a.cell(row=r, column=3, value=val); c.fill = INP; c.number_format = fmt
    a.cell(row=r, column=4, value='idem (alle scenario\'s)').font = SUB
    a.cell(row=r, column=6, value=note).alignment = WRAP
    REF[name] = f"Aannames!$C${r}"; r += 1

def scen(name, label, unit, vals, fmt, note=''):
    global r
    a.cell(row=r, column=1, value=label); a.cell(row=r, column=2, value=unit)
    for j, v in enumerate(vals):
        c = a.cell(row=r, column=3 + j, value=v); c.fill = INP; c.number_format = fmt
    a.cell(row=r, column=6, value=note).alignment = WRAP
    SREF[name] = r; r += 1

sec(a, r, 'A. Valuta en lonen (Suriname)', 6); r += 1
gen('fx', 'Wisselkoers EUR → SRD (start)', 'SRD per €', 43.0, '0.00', 'CBvS gew. gem. verkoopkoers euro nov. 2026 ≈ 43,4 (voorlopig); afgerond.')
gen('fx_dep', 'Jaarlijkse koersstijging EUR/SRD', '% per jaar', 0.06, PCT, 'Aanname: SRD verzwakt geleidelijk. Gevoeligheid testen.')
gen('wage_inc', 'Jaarlijkse loonstijging in SRD', '% per jaar', 0.10, PCT, 'Aanname: inflatiecompensatie. Minimumuurloon steeg 2025→2026 van SRD 52,47 naar 61,25 (+17%).')
gen('minwage', 'Wettelijk minimumuurloon (referentie)', 'SRD per uur', 61.25, '0.00', 'gov.sr — per 1 juli 2026.')
gen('contract', 'Contracturen per fte per maand', 'uur', 173, NUM, '40 uur × 52 weken / 12.')
gen('sal_jr', 'Brutosalaris Junior Financial Administration Assistant', 'SRD/mnd', 14000, SRD, '≈ 1,3× minimumloon. Toetsen op arbeidsmarkt (indicatie markt: SRD 5.000–9.000 voor algemeen admin. werk).')
gen('sal_med', 'Brutosalaris Financial Administration Employee', 'SRD/mnd', 20000, SRD, 'Boven markt om kwaliteit en retentie te borgen.')
gen('sal_sr', 'Brutosalaris Senior Specialist / Quality Controller', 'SRD/mnd', 30000, SRD, '')
gen('sal_tl', 'Brutosalaris Team Leader', 'SRD/mnd', 40000, SRD, '')
gen('sal_co', 'Brutosalaris Client Support Coordinator', 'SRD/mnd', 22000, SRD, '')
gen('mix', 'Aandeel ervaren medewerkers in verwerkingsteam', '%', 0.5, PCT, 'Rest = junior.')
gen('oncost', 'Werkgeverslasten (pensioen APF, basiszorgverzekering e.d.)', '% van bruto', 0.10, PCT, 'Te verifiëren: APF-premie en werkgeversdeel BZV. Bronnen zijn niet eenduidig.')
gen('bonus', 'Vakantietoelage / 13e maand (reservering)', '% van bruto', 0.0833, PCT, 'Beleidskeuze; reservering 1/12.')
gen('allow', 'Vergoeding thuiswerk/vervoer/internet per fte', 'SRD/mnd', 1500, SRD, '')

sec(a, r, 'B. Capaciteit en personeelsbeleid', 6); r += 1
gen('bill_proc', 'Declarabiliteit verwerkingsmedewerker', '% contracturen', 0.65, PCT, 'Rest: verlof, ziekte, training, QC, overleg.')
gen('bill_sr', 'Declarabiliteit Senior/QC', '% contracturen', 0.45, PCT, 'Deel van de tijd is kwaliteitscontrole voor het team.')
gen('bill_tl', 'Declarabiliteit Team Leader', '% contracturen', 0.20, PCT, '')
gen('train_prod', 'Productiviteit nieuwe medewerker eerste 2 maanden', '%', 0.5, PCT, 'Inwerkperiode.')
gen('buffer', 'Aannamedrempel: overloop die eigenaar opvangt vóór nieuwe aanname', 'fte', 0.35, '0.00', 'Pas aannemen als structurele vraag > capaciteit + 0,35 fte.')
gen('thr_qc', 'Eerste Senior/QC zodra verwerkers ≥', 'aantal', 3, NUM, 'Daarna 1 senior per 5 verwerkers.')
gen('thr_tl', 'Team Leader zodra verwerkers ≥', 'aantal', 8, NUM, '')
gen('thr_co', 'Client Support Coordinator zodra actieve klanten ≥', 'aantal', 25, NUM, '')

sec(a, r, 'C. Operationele kosten (EUR per maand tenzij anders vermeld)', 6); r += 1
gen('seat', 'Software per werkplek (M365, wachtwoordmanager, tijdregistratie, VPN/endpoint)', '€/werkplek', 45, EUR, 'Incl. werkplek eigenaar.')
gen('equip', 'Laptop, 2e scherm, headset, UPS per nieuwe medewerker', '€ eenmalig', 950, EUR, 'Investering; afschrijving 36 mnd.')
gen('train', 'Training- en certificeringskosten per nieuwe medewerker', '€ eenmalig', 300, EUR, 'Softwaretrainingen (o.a. AFAS, Exact, Nmbrs Accounting).')
gen('recruit', 'Wervingskosten per nieuwe medewerker', '€ eenmalig', 150, EUR, '')
gen('net_base', 'Internet, stroom, back-up (basis)', '€/mnd', 120, EUR, 'Incl. back-up internetlijn en noodstroom.')
gen('net_emp', 'Internet/stroom extra per medewerker', '€/mnd', 25, EUR, '')
gen('office', 'Kantoorruimte (vanaf 5 medewerkers)', '€/mnd', 650, EUR, 'Daarvoor thuiswerken/flexplek.')
gen('admin', 'Eigen boekhouding, bank, KKF, abonnementen', '€/mnd', 150, EUR, '')
gen('legal_setup', 'Juridische opzet (DPA, SCC, contracten NL/BE-review)', '€ eenmalig', 3500, EUR, 'Verdeeld over maand 1–2.')
gen('legal', 'Juridisch/compliance doorlopend', '€/mnd', 150, EUR, '')
gen('insur', 'Beroeps- en cyberaansprakelijkheidsverzekering', '€/mnd', 175, EUR, 'Offertes opvragen — dekking voor EU-klanten.')
gen('bankfee', 'Bank- en valutakosten', '% van omzet', 0.015, PCT, 'Internationale betalingen en conversie.')
gen('baddebt', 'Oninbare debiteuren', '% van omzet', 0.01, PCT, '')
gen('conting', 'Onvoorzien', '% van overige kosten', 0.07, PCT, '')
gen('tax', 'Belasting op winst (voorziening)', '% van positieve winst', 0.36, PCT, 'Aanname; toetsen bij Surinaamse adviseur (rechtsvorm).')
gen('cash0', 'Beginkas (eigen middelen)', '€', 5000, EUR, 'IN TE VULLEN door eigenaar.')

sec(a, r, 'D. Scenario-aannames', 6); r += 1
scen('rate1', 'Gemiddeld uurtarief jaar 1 (mix van niveaus)', '€/uur', [13.0, 14.5, 16.0], EUR2, 'Website: financiële administratie vanaf €12 (instap/junior). Gemiddelde ligt hoger door mix van niveaus (Document 1, §9).')
scen('rate2', 'Gemiddeld uurtarief jaar 2', '€/uur', [14.5, 17.0, 19.0], EUR2, 'Na bewezen kwaliteit; jaarlijkse tariefherziening.')
scen('rate3', 'Gemiddeld uurtarief jaar 3', '€/uur', [15.5, 19.0, 21.0], EUR2, '')
scen('h_start', 'Uren per klant in pilot-/startfase (eerste 3 mnd)', 'uur/mnd', [16, 20, 24], NUM, 'Pilot klein en laag risico.')
scen('h_mat', 'Uren per klant na opstart', 'uur/mnd', [35, 50, 65], NUM, 'Hypothese: 0,2–0,4 fte per kantoor. NOAB-benchmark: gemiddeld kantoor 6,5 fte, >12% vacatures.')
scen('churn', 'Klantverloop per maand', '%', [0.03, 0.02, 0.015], PCT, '')
scen('f1', 'Declarabele uren eigenaar per maand — jaar 1', 'uur', [110, 115, 115], NUM, 'Rest: sales, kwaliteit, management.')
scen('f2', 'Declarabele uren eigenaar per maand — jaar 2', 'uur', [90, 70, 60], NUM, 'Eigenaar schuift naar sales/QC.')
scen('f3', 'Declarabele uren eigenaar per maand — jaar 3', 'uur', [80, 50, 40], NUM, '')
scen('draw1', 'Vergoeding eigenaar (management fee) — jaar 1', '€/mnd', [600, 800, 1000], EUR, 'Niet-declarabele managementvergoeding; bovenop eventuele winst.')
scen('draw2', 'Vergoeding eigenaar — jaar 2', '€/mnd', [1000, 1500, 2000], EUR, '')
scen('draw3', 'Vergoeding eigenaar — jaar 3', '€/mnd', [1500, 2500, 3000], EUR, '')
scen('mkt', 'Marketing (LinkedIn Sales Navigator, website, content)', '€/mnd', [200, 300, 500], EUR, '')
scen('travel', 'Reis NL/BE (netwerk, klantbezoek) — per jaar in mnd 6', '€/jaar', [0, 2500, 4000], EUR, '')
a.column_dimensions['A'].width = 62; a.column_dimensions['B'].width = 16
for col in 'CDE': a.column_dimensions[col].width = 14
a.column_dimensions['F'].width = 80
a.freeze_panes = 'A5'

def S(name, k):  # scenario-celadres
    return f"Aannames!${'CDE'[k]}${SREF[name]}"

# =====================================================================
# 3. KLANTINSTROOM
# =====================================================================
k = wb.create_sheet('Klantinstroom')
k['A1'] = 'Nieuwe terugkerende klanten per maand (invoer)'; k['A1'].font = TITLE
k['A2'] = 'Gebaseerd op de salesfunnel (Document 5): ± 1 nieuwe klant per 4–8 weken in jaar 1. Pas aan aan de werkelijke pipeline.'; k['A2'].font = SUB
hdr(k, 4, ['Scenario'] + [f'M{i}' for i in range(1, 37)] + ['Totaal'])
inflow = {
    0: [0,0,0,1,0,0,1,0,0,1,0,0, 1,0,1,0,1,0,0,1,0,1,0,0, 1,0,1,0,1,0,1,0,0,1,0,1],
    1: [0,0,1,0,1,0,1,0,1,0,1,1, 1,0,1,1,0,1,1,0,1,1,0,1, 1,1,0,1,1,0,1,1,1,0,1,1],
    2: [0,0,1,1,0,1,1,1,0,1,1,1, 1,1,1,0,1,1,1,1,1,1,0,1, 1,1,1,1,1,1,1,1,1,1,1,1],
}
names = ['Conservatief', 'Realistisch', 'Groei']
for s in range(3):
    rr = 5 + s
    k.cell(row=rr, column=1, value=names[s]).font = BOLD
    for m in range(36):
        c = k.cell(row=rr, column=2 + m, value=inflow[s][m]); c.fill = INP
    k.cell(row=rr, column=38, value=f'=SUM(B{rr}:AK{rr})').font = BOLD
k.column_dimensions['A'].width = 16
for m in range(2, 39): k.column_dimensions[L(m)].width = 5.5

# =====================================================================
# 4. PROGNOSE PER SCENARIO
# =====================================================================
LINES = []  # (key, label, fmt, bold)

def build_prognose(s):
    ws = wb.create_sheet(f'Prognose {names[s]}')
    ws['A1'] = f'Maandprognose — scenario {names[s]}'; ws['A1'].font = TITLE
    ws['A2'] = 'Alle cellen zijn formules op basis van Aannames en Klantinstroom. Maand 1 = januari 2027.'; ws['A2'].font = SUB
    hdr(ws, 4, ['Regel'] + [f'M{i}' for i in range(1, 37)])
    C0 = 2  # kolom B = maand 1
    row = {}
    cur = [5]

    def add(key, label, fn, fmt=EUR, bold=False, section=None):
        if section:
            sec(ws, cur[0], section, 37); cur[0] += 1
        rr = cur[0]; row[key] = rr
        ws.cell(row=rr, column=1, value=label).font = BOLD if bold else Font()
        for m in range(36):
            col = C0 + m
            c = ws.cell(row=rr, column=col, value=fn(m, col))
            c.number_format = fmt
            if bold: c.font = BOLD
        cur[0] += 1

    def R(key, col):  # verwijzing naar regel in dezelfde kolom
        return f'{L(col)}{row[key]}'
    def P(key, col, default='0'):  # vorige maand
        return default if col == C0 else f'{L(col-1)}{row[key]}'
    yr = lambda m: m // 12  # 0,1,2
    def bycol(m, names3):
        return S(names3[yr(m)], s)

    # --- tijd
    add('month', 'Maandnummer', lambda m, c: m + 1, NUM, section='Tijd')
    add('year', 'Planjaar', lambda m, c: 2027 + m // 12, '0')
    add('wageidx', 'Loonindex SRD', lambda m, c: f'=(1+{REF["wage_inc"]})^{yr(m)}', '0.000')
    add('fx', 'Wisselkoers EUR→SRD', lambda m, c: f'={REF["fx"]}*(1+{REF["fx_dep"]})^{yr(m)}', '0.00')

    # --- klanten en vraag
    kcol = lambda c: L(c)  # Klantinstroom kolom B = maand 1 -> zelfde kolomletter
    add('new', 'Nieuwe klanten', lambda m, c: f"=Klantinstroom!{kcol(c)}{5+s}", NUM1, section='Klanten en vraag')
    add('active', 'Actieve klanten (na verloop)', lambda m, c: f'={P("active", c)}*(1-{S("churn", s)})+{R("new", c)}', NUM1, True)
    def recent(m, c):
        cols = [L(c - i) for i in range(3) if c - i >= C0]
        return '=' + '+'.join(f'{x}{row["new"]}' for x in cols)
    add('recent', 'Klanten in startfase (laatste 3 mnd)', recent, NUM1)
    add('demand', 'Gevraagde uren', lambda m, c: f'=MAX(0,{R("active", c)}-{R("recent", c)})*{S("h_mat", s)}+MIN({R("active", c)},{R("recent", c)})*{S("h_start", s)}', NUM)

    # --- team
    add('fhrs', 'Declarabele uren eigenaar', lambda m, c: f'={bycol(m, ["f1","f2","f3"])}', NUM, section='Team en capaciteit')
    pb = f'{REF["contract"]}*{REF["bill_proc"]}'
    add('proc', 'Verwerkingsmedewerkers (junior + medior)', lambda m, c: f'=MAX({P("proc", c)},MAX(0,ROUNDUP(MAX(0,{R("demand", c)}-{R("fhrs", c)})/({pb})-{REF["buffer"]},0)))', NUM)
    add('sr', 'Senior / Quality Controller', lambda m, c: f'=IF({R("proc", c)}>={REF["thr_qc"]},ROUNDUP({R("proc", c)}/5,0),0)', NUM)
    add('tl', 'Team Leader', lambda m, c: f'=IF({R("proc", c)}>={REF["thr_tl"]},1,0)', NUM)
    add('co', 'Client Support Coordinator', lambda m, c: f'=MAX({P("co", c)},IF({R("active", c)}>={REF["thr_co"]},1,0))', NUM)
    add('fte', 'Medewerkers totaal (excl. eigenaar)', lambda m, c: f'={R("proc", c)}+{R("sr", c)}+{R("tl", c)}+{R("co", c)}', NUM, True)
    add('hires', 'Nieuwe aannames', lambda m, c: f'=MAX(0,{R("fte", c)}-{P("fte", c)})', NUM)
    add('newproc', 'Nieuwe verwerkers', lambda m, c: f'=MAX(0,{R("proc", c)}-{P("proc", c)})', NUM)
    add('cap', 'Declarabele capaciteit (uren)', lambda m, c: (
        f'={R("fhrs", c)}+{R("proc", c)}*{pb}-({R("newproc", c)}+{P("newproc", c)})*{pb}*(1-{REF["train_prod"]})'
        f'+{R("sr", c)}*{REF["contract"]}*{REF["bill_sr"]}+{R("tl", c)}*{REF["contract"]}*{REF["bill_tl"]}'), NUM)
    add('hours', 'Gefactureerde uren', lambda m, c: f'=MIN({R("demand", c)},{R("cap", c)})', NUM, True)
    add('unmet', 'Niet-geleverde vraag (uren)', lambda m, c: f'={R("demand", c)}-{R("hours", c)}', NUM)
    add('util', 'Bezettingsgraad declarabele capaciteit', lambda m, c: f'=IF({R("cap", c)}=0,0,{R("hours", c)}/{R("cap", c)})', PCT)

    # --- omzet
    add('rate', 'Gemiddeld uurtarief', lambda m, c: f'={bycol(m, ["rate1","rate2","rate3"])}', EUR2, section='Winst- en verliesrekening (EUR)')
    add('rev', 'Omzet', lambda m, c: f'={R("hours", c)}*{R("rate", c)}', EUR, True)

    def labour(m, c, cnt_key, salkey):
        return (f'={R(cnt_key, c)}*(({salkey})*{R("wageidx", c)}*(1+{REF["oncost"]}+{REF["bonus"]})+{REF["allow"]})/{R("fx", c)}')
    procsal = f'({REF["mix"]}*{REF["sal_med"]}+(1-{REF["mix"]})*{REF["sal_jr"]})'
    add('c_proc', 'Loonkosten verwerkers', lambda m, c: labour(m, c, 'proc', procsal), EUR)
    add('c_sr', 'Loonkosten senior/QC', lambda m, c: labour(m, c, 'sr', REF['sal_sr']), EUR)
    add('direct', 'Directe loonkosten', lambda m, c: f'={R("c_proc", c)}+{R("c_sr", c)}', EUR, True)
    add('gp', 'Brutomarge', lambda m, c: f'={R("rev", c)}-{R("direct", c)}', EUR, True)
    add('gpm', 'Brutomarge %', lambda m, c: f'=IF({R("rev", c)}=0,0,{R("gp", c)}/{R("rev", c)})', PCT)

    add('c_ind', 'Loonkosten team leader + coördinator', lambda m, c: (
        f'=({R("tl", c)}*({REF["sal_tl"]}*{R("wageidx", c)}*(1+{REF["oncost"]}+{REF["bonus"]})+{REF["allow"]})'
        f'+{R("co", c)}*({REF["sal_co"]}*{R("wageidx", c)}*(1+{REF["oncost"]}+{REF["bonus"]})+{REF["allow"]}))/{R("fx", c)}'), EUR)
    add('c_draw', 'Vergoeding eigenaar', lambda m, c: f'={bycol(m, ["draw1","draw2","draw3"])}', EUR)
    add('c_soft', 'Software en licenties', lambda m, c: f'=({R("fte", c)}+1)*{REF["seat"]}', EUR)
    add('c_train', 'Training en werving', lambda m, c: f'={R("hires", c)}*({REF["train"]}+{REF["recruit"]})', EUR)
    add('c_net', 'Internet, stroom, back-up', lambda m, c: f'={REF["net_base"]}+{R("fte", c)}*{REF["net_emp"]}', EUR)
    add('c_off', 'Kantoorruimte', lambda m, c: f'=IF({R("fte", c)}>=5,{REF["office"]},0)', EUR)
    add('c_adm', 'Administratie en bank (vast)', lambda m, c: f'={REF["admin"]}', EUR)
    add('c_legal', 'Juridisch en compliance', lambda m, c: f'={REF["legal"]}' + (f'+{REF["legal_setup"]}/2' if m < 2 else ''), EUR)
    add('c_ins', 'Verzekeringen', lambda m, c: f'={REF["insur"]}', EUR)
    add('c_mkt', 'Marketing', lambda m, c: f'={S("mkt", s)}' + (f'+{S("travel", s)}' if m % 12 == 5 else ''), EUR)
    add('c_fee', 'Bank-/valutakosten en oninbaar', lambda m, c: f'={R("rev", c)}*({REF["bankfee"]}+{REF["baddebt"]})', EUR)
    add('c_cont', 'Onvoorzien', lambda m, c: f'=SUM({L(c)}{row["c_soft"]}:{L(c)}{row["c_fee"]})*{REF["conting"]}', EUR)
    add('opex', 'Bedrijfskosten totaal', lambda m, c: f'=SUM({L(c)}{row["c_ind"]}:{L(c)}{row["c_cont"]})', EUR, True)
    add('capex', 'Investering apparatuur', lambda m, c: f'={R("hires", c)}*{REF["equip"]}', EUR)
    add('depr', 'Afschrijving apparatuur (36 mnd)', lambda m, c: f'=SUM(${L(C0)}{row["capex"]}:{L(c)}{row["capex"]})/36', EUR)
    add('ebit', 'Bedrijfsresultaat (na vergoeding eigenaar)', lambda m, c: f'={R("gp", c)}-{R("opex", c)}-{R("depr", c)}', EUR, True)
    add('taxp', 'Belastingvoorziening', lambda m, c: f'=MAX(0,{R("ebit", c)})*{REF["tax"]}', EUR)
    add('net', 'Nettoresultaat', lambda m, c: f'={R("ebit", c)}-{R("taxp", c)}', EUR, True)
    add('cum', 'Cumulatief nettoresultaat', lambda m, c: f'={P("cum", c)}+{R("net", c)}', EUR)

    # --- kasstroom
    add('in', 'Ontvangsten klanten (1 mnd na werk)', lambda m, c: '=0' if c == C0 else f'={P("rev", c)}*(1-{REF["baddebt"]})', EUR, section='Kasstroom (EUR)')
    add('out', 'Uitgaven (kosten excl. afschrijving)', lambda m, c: f'={R("direct", c)}+{R("opex", c)}-{R("rev", c)}*{REF["baddebt"]}', EUR)
    add('capout', 'Investeringen', lambda m, c: f'={R("capex", c)}', EUR)
    add('taxout', 'Belasting betaald (3 mnd vertraging)', lambda m, c: '=0' if m < 3 else f'={L(c-3)}{row["taxp"]}', EUR)
    add('cf', 'Netto kasstroom', lambda m, c: f'={R("in", c)}-{R("out", c)}-{R("capout", c)}-{R("taxout", c)}', EUR, True)
    add('cash', 'Kassaldo einde maand', lambda m, c: '=0', EUR, True)
    rr = row['cash']
    for m in range(36):
        col = C0 + m
        prev = REF['cash0'] if col == C0 else f'{L(col-1)}{rr}'
        ws.cell(row=rr, column=col, value=f'={prev}+{L(col)}{row["cf"]}')

    # --- KPI
    add('k_revfte', 'Omzet per fte (incl. eigenaar)', lambda m, c: f'={R("rev", c)}/({R("fte", c)}+1)', EUR, section='Kengetallen')
    add('k_contr', 'Bijdrage per gefactureerd uur', lambda m, c: f'=IF({R("hours", c)}=0,0,{R("gp", c)}/{R("hours", c)})', EUR2)
    add('k_margin', 'Nettomarge', lambda m, c: f'=IF({R("rev", c)}=0,0,{R("net", c)}/{R("rev", c)})', PCT)
    add('k_be', 'Hulp: maand met positief bedrijfsresultaat', lambda m, c: f'=IF({R("ebit", c)}>0,{R("month", c)},99)', NUM)

    ws.column_dimensions['A'].width = 46
    for m in range(36): ws.column_dimensions[L(C0 + m)].width = 10.5
    ws.freeze_panes = 'B5'
    return ws.title, row

PROG = {}
for s in range(3):
    PROG[s] = build_prognose(s)

# =====================================================================
# 5. SCENARIOVERGELIJKING (jaartotalen)
# =====================================================================
sv = wb.create_sheet("Scenario's")
sv['A1'] = 'Scenariovergelijking per planjaar'; sv['A1'].font = TITLE
sv['A2'] = 'Jaar 1 = 2027 (M1–M12), jaar 2 = 2028, jaar 3 = 2029.'; sv['A2'].font = SUB
YR = [('B', 'M'), ('N', 'Y'), ('Z', 'AK')]
metrics = [
    ('Omzet', 'rev', 'sum', EUR), ('Gefactureerde uren', 'hours', 'sum', NUM),
    ('Gemiddeld uurtarief (gerealiseerd)', None, 'rate', EUR2),
    ('Directe loonkosten', 'direct', 'sum', EUR), ('Brutomarge', 'gp', 'sum', EUR),
    ('Bedrijfskosten', 'opex', 'sum', EUR), ('Bedrijfsresultaat', 'ebit', 'sum', EUR),
    ('Nettoresultaat', 'net', 'sum', EUR), ('Nettomarge', None, 'nm', PCT),
    ('Actieve klanten einde jaar', 'active', 'end', NUM1), ('Medewerkers einde jaar (excl. eigenaar)', 'fte', 'end', NUM),
    ('Kassaldo einde jaar', 'cash', 'end', EUR), ('Laagste kassaldo in jaar', 'cash', 'min', EUR),
    ('Gemiddelde bezettingsgraad', 'util', 'avg', PCT), ('Niet-geleverde vraag (uren)', 'unmet', 'sum', NUM),
]
hdr(sv, 4, ['Kengetal', 'Scenario', '2027', '2028', '2029', 'Totaal 36 mnd'])
rr = 5
SVROW = {}
for label, key, how, fmt in metrics:
    for s in range(3):
        title, row = PROG[s]
        q = f"'{title}'"
        sv.cell(row=rr, column=1, value=label if s == 0 else None).font = BOLD
        sv.cell(row=rr, column=2, value=names[s])
        cells = []
        for y, (c1, c2) in enumerate(YR):
            if how == 'sum': f = f'=SUM({q}!{c1}{row[key]}:{c2}{row[key]})'
            elif how == 'end': f = f'={q}!{c2}{row[key]}'
            elif how == 'min': f = f'=MIN({q}!{c1}{row[key]}:{c2}{row[key]})'
            elif how == 'avg': f = f'=AVERAGE({q}!{c1}{row[key]}:{c2}{row[key]})'
            elif how == 'rate': f = f'=IF(SUM({q}!{c1}{row["hours"]}:{c2}{row["hours"]})=0,0,SUM({q}!{c1}{row["rev"]}:{c2}{row["rev"]})/SUM({q}!{c1}{row["hours"]}:{c2}{row["hours"]}))'
            elif how == 'nm': f = f'=IF(SUM({q}!{c1}{row["rev"]}:{c2}{row["rev"]})=0,0,SUM({q}!{c1}{row["net"]}:{c2}{row["net"]})/SUM({q}!{c1}{row["rev"]}:{c2}{row["rev"]}))'
            c = sv.cell(row=rr, column=3 + y, value=f); c.number_format = fmt
        if how == 'sum':
            tot = f'=SUM(C{rr}:E{rr})'
        elif how in ('end',):
            tot = f'=E{rr}'
        elif how == 'min':
            tot = f'=MIN(C{rr}:E{rr})'
        elif how == 'avg':
            tot = f'=AVERAGE(C{rr}:E{rr})'
        elif how == 'rate':
            tot = f'=IF(SUM({q}!B{row["hours"]}:AK{row["hours"]})=0,0,SUM({q}!B{row["rev"]}:AK{row["rev"]})/SUM({q}!B{row["hours"]}:AK{row["hours"]}))'
        else:
            tot = f'=IF(SUM({q}!B{row["rev"]}:AK{row["rev"]})=0,0,SUM({q}!B{row["net"]}:AK{row["net"]})/SUM({q}!B{row["rev"]}:AK{row["rev"]}))'
        c = sv.cell(row=rr, column=6, value=tot); c.number_format = fmt; c.font = BOLD
        SVROW[(label, s)] = rr
        rr += 1
    for col in range(1, 7): sv.cell(row=rr - 1, column=col).border = BOT
rr += 1
sec(sv, rr, 'Break-even en financieringsbehoefte', 6); rr += 1
hdr(sv, rr, ['Kengetal', 'Scenario', 'Waarde', '', '', 'Toelichting']); rr += 1
for s in range(3):
    title, row = PROG[s]; q = f"'{title}'"
    sv.cell(row=rr, column=1, value='Eerste maand met positief bedrijfsresultaat' if s == 0 else None).font = BOLD
    sv.cell(row=rr, column=2, value=names[s])
    c = sv.cell(row=rr, column=3, value=f'=IF(MIN({q}!B{row["k_be"]}:AK{row["k_be"]})=99,"niet binnen 36 mnd","M"&MIN({q}!B{row["k_be"]}:AK{row["k_be"]}))')
    sv.cell(row=rr, column=6, value='Na vergoeding eigenaar en afschrijving.')
    SVROW[('be', s)] = rr; rr += 1
for s in range(3):
    title, row = PROG[s]; q = f"'{title}'"
    sv.cell(row=rr, column=1, value='Financieringsbehoefte (laagste kas vóór beginkas)' if s == 0 else None).font = BOLD
    sv.cell(row=rr, column=2, value=names[s])
    c = sv.cell(row=rr, column=3, value=f'=MAX(0,{REF["cash0"]}-MIN({q}!B{row["cash"]}:AK{row["cash"]}))'); c.number_format = EUR
    sv.cell(row=rr, column=6, value='Werkkapitaal + aanloopverlies dat met eigen middelen of krediet gedekt moet worden.')
    SVROW[('fin', s)] = rr; rr += 1
sv.column_dimensions['A'].width = 44; sv.column_dimensions['B'].width = 14
for col in 'CDEF': sv.column_dimensions[col].width = 16
sv.column_dimensions['F'].width = 60
sv.freeze_panes = 'A5'

# =====================================================================
# 6. BREAK-EVEN
# =====================================================================
be = wb.create_sheet('Break-even')
be['A1'] = 'Break-evenanalyse (structureel, per maand)'; be['A1'].font = TITLE
be['A2'] = 'Hoeveel declarabele uren en klanten zijn nodig om de vaste kosten te dekken? Invoer geel; rest formules.'; be['A2'].font = SUB
hdr(be, 4, ['Parameter', 'Waarde', 'Toelichting'])
items = [
    ('Uurtarief', 15.5, EUR2, 'Bijv. realistisch jaar 2', True),
    ('Kostprijs verwerkingsuur (loon / declarabele uren)', f'=(({REF["mix"]}*{REF["sal_med"]}+(1-{REF["mix"]})*{REF["sal_jr"]})*(1+{REF["oncost"]}+{REF["bonus"]})+{REF["allow"]})/{REF["fx"]}/({REF["contract"]}*{REF["bill_proc"]})', EUR2, 'Jaar-1-lonen en -koers', False),
    ('Variabele kosten per uur (bank/valuta/oninbaar)', f'=B5*({REF["bankfee"]}+{REF["baddebt"]})', EUR2, '', False),
    ('Bijdrage per uur', '=B5-B6-B7', EUR2, 'Tarief minus directe kosten', False),
    ('Vaste kosten per maand (excl. vergoeding eigenaar)', 1150, EUR, 'Software, internet, verzekering, juridisch, admin, marketing, onvoorzien — vgl. prognose', True),
    ('Gewenste vergoeding eigenaar per maand', 1500, EUR, '', True),
    ('Break-even declarabele uren (team) per maand', '=(B9+B10)/B8', NUM, 'Uren die door medewerkers worden geleverd', False),
    ('Uren per klant per maand', 40, NUM, '', True),
    ('Break-even aantal klanten (alleen teamuren)', '=B11/B12', NUM1, '', False),
    ('Ter vergelijking: eigenaar alleen, 115 uur × tarief', '=115*B5', EUR, 'Omzetplafond zonder team', False),
]
for i, (lab, val, fmt, note, inp) in enumerate(items, start=5):
    be.cell(row=i, column=1, value=lab)
    c = be.cell(row=i, column=2, value=val); c.number_format = fmt
    if inp: c.fill = INP
    be.cell(row=i, column=3, value=note)
be.column_dimensions['A'].width = 55; be.column_dimensions['B'].width = 14; be.column_dimensions['C'].width = 70
r0 = 17
be.cell(row=r0, column=1, value='Gevoeligheid: bijdrage per uur bij verschillende tarieven en wisselkoersen').font = SEC
hdr(be, r0 + 1, ['Uurtarief →', 12, 14, 16, 18, 20])
for j, fxv in enumerate([38, 43, 48, 55]):
    rr = r0 + 2 + j
    be.cell(row=rr, column=1, value=f'Koers EUR/SRD {fxv}')
    for i2 in range(5):
        col = 2 + i2
        cost = f'(({REF["mix"]}*{REF["sal_med"]}+(1-{REF["mix"]})*{REF["sal_jr"]})*(1+{REF["oncost"]}+{REF["bonus"]})+{REF["allow"]})/{fxv}/({REF["contract"]}*{REF["bill_proc"]})'
        c = be.cell(row=rr, column=col, value=f'={L(col)}{r0+1}*(1-{REF["bankfee"]}-{REF["baddebt"]})-{cost}')
        c.number_format = EUR2

# =====================================================================
# 7. PERSONEEL
# =====================================================================
pe = wb.create_sheet('Personeel')
pe['A1'] = 'Salaris- en kostprijsoverzicht per functie (jaar 1)'; pe['A1'].font = TITLE
hdr(pe, 3, ['Functie', 'Bruto SRD/mnd', 'Totale werkgeverskosten SRD/mnd', 'Kosten EUR/mnd', 'Declarabele uren/mnd', 'Kostprijs per declarabel uur', 'Bruto t.o.v. minimumloon'])
roles = [('Junior Financial Administration Assistant', 'sal_jr', 'bill_proc'),
         ('Financial Administration Employee', 'sal_med', 'bill_proc'),
         ('Senior Specialist / Quality Controller', 'sal_sr', 'bill_sr'),
         ('Team Leader', 'sal_tl', 'bill_tl'),
         ('Client Support Coordinator', 'sal_co', None)]
for i, (lab, sk, bk) in enumerate(roles, start=4):
    pe.cell(row=i, column=1, value=lab)
    pe.cell(row=i, column=2, value=f'={REF[sk]}').number_format = SRD
    pe.cell(row=i, column=3, value=f'=B{i}*(1+{REF["oncost"]}+{REF["bonus"]})+{REF["allow"]}').number_format = SRD
    pe.cell(row=i, column=4, value=f'=C{i}/{REF["fx"]}').number_format = EUR
    pe.cell(row=i, column=5, value=f'={REF["contract"]}*{REF[bk]}' if bk else 0).number_format = NUM
    pe.cell(row=i, column=6, value=f'=IF(E{i}=0,"n.v.t.",D{i}/E{i})').number_format = EUR2
    pe.cell(row=i, column=7, value=f'=B{i}/({REF["minwage"]}*{REF["contract"]})').number_format = '0.0"×"'
pe.column_dimensions['A'].width = 42
for col in 'BCDEFG': pe.column_dimensions[col].width = 20

# =====================================================================
# 8. DASHBOARD
# =====================================================================
db = wb.create_sheet('Dashboard')
db['A1'] = 'KPI-dashboard — kerncijfers per scenario'; db['A1'].font = TITLE
db['A2'] = 'Automatisch uit de prognosebladen. Gebruik maandelijks naast de werkelijke cijfers (zie Document 1, §20).'; db['A2'].font = SUB
hdr(db, 4, ['Kengetal', 'Conservatief', 'Realistisch', 'Groei'])
dash = [
    ('Omzet 2027', 'Omzet', 3, EUR), ('Omzet 2028', 'Omzet', 4, EUR), ('Omzet 2029', 'Omzet', 5, EUR),
    ('Nettoresultaat 2027', 'Nettoresultaat', 3, EUR), ('Nettoresultaat 2028', 'Nettoresultaat', 4, EUR),
    ('Nettoresultaat 2029', 'Nettoresultaat', 5, EUR), ('Nettomarge 36 mnd', 'Nettomarge', 6, PCT),
    ('Klanten einde 2029', 'Actieve klanten einde jaar', 5, NUM1), ('Medewerkers einde 2029', 'Medewerkers einde jaar (excl. eigenaar)', 5, NUM),
    ('Gerealiseerd uurtarief 36 mnd', 'Gemiddeld uurtarief (gerealiseerd)', 6, EUR2),
    ('Laagste kassaldo 36 mnd', 'Laagste kassaldo in jaar', 6, EUR), ('Kassaldo einde 2029', 'Kassaldo einde jaar', 5, EUR),
    ('Eerste maand positief bedrijfsresultaat', 'be', 3, '@'), ('Financieringsbehoefte', 'fin', 3, EUR),
]
for i, (lab, key, col, fmt) in enumerate(dash, start=5):
    db.cell(row=i, column=1, value=lab).font = BOLD
    for s in range(3):
        rowno = SVROW[(key, s)]
        c = db.cell(row=i, column=2 + s, value=f"='Scenario''s'!{L(col)}{rowno}")
        c.number_format = fmt
# grafieken: omzet en kassaldo per maand, drie scenario's
for gi, (key, title, anchor) in enumerate([('rev', 'Omzet per maand (EUR)', 'F4'), ('cash', 'Kassaldo einde maand (EUR)', 'F22')]):
    ch = LineChart(); ch.title = title; ch.height = 8; ch.width = 20
    ch.y_axis.title = 'EUR'; ch.x_axis.title = 'Maand'
    for s in range(3):
        title_s, row = PROG[s]
        ws_s = wb[title_s]
        ref = Reference(ws_s, min_col=2, max_col=37, min_row=row[key], max_row=row[key])
        ch.add_data(ref, from_rows=True, titles_from_data=False)
        ch.series[-1].tx = None
    from openpyxl.chart.series import SeriesLabel
    for s in range(3):
        ch.series[s].tx = SeriesLabel(v=names[s])
    db.add_chart(ch, anchor)
db.column_dimensions['A'].width = 34
for col in 'BCD': db.column_dimensions[col].width = 18

wb._dash_rows = None
wb.save(OUT)
print('ok', OUT)
