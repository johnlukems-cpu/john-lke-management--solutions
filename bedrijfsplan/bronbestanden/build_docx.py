import sys, subprocess, pathlib, copy
from docx import Document
from docx.shared import Pt, RGBColor, Cm
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

base = pathlib.Path(sys.argv[1]); out = pathlib.Path(sys.argv[2]); out.mkdir(exist_ok=True)
ref = base / 'reference.docx'
subprocess.run(['pandoc', '-o', str(ref), '--print-default-data-file', 'reference.docx'], check=True)
d = Document(ref)
INK = RGBColor(0x16, 0x16, 0x16); GOLD = RGBColor(0x8A, 0x6A, 0x2E)
for name in ['Normal', 'Body Text', 'First Paragraph', 'Compact']:
    sts = [x for x in d.styles if x.name == name]
    if sts:
        st = sts[0]; st.font.name = 'Calibri'; st.font.size = Pt(10.5)
for name, size, col in [('Title', 24, INK), ('Subtitle', 13, GOLD), ('Heading 1', 16, INK), ('Heading 2', 13, GOLD), ('Heading 3', 11.5, INK), ('Date', 10, GOLD)]:
    sts = [x for x in d.styles if x.name == name]
    if sts:
        st = sts[0]; st.font.name = 'Calibri'; st.font.size = Pt(size); st.font.color.rgb = col; st.font.bold = name != 'Subtitle' and name != 'Date'
for sec in d.sections:
    sec.left_margin = sec.right_margin = Cm(2); sec.top_margin = sec.bottom_margin = Cm(2)
d.save(ref)

def style_tables(path):
    doc = Document(path)
    for t in doc.tables:
        tbl = t._tbl
        tblPr = tbl.tblPr
        borders = OxmlElement('w:tblBorders')
        for edge in ('top', 'left', 'bottom', 'right', 'insideH', 'insideV'):
            e = OxmlElement(f'w:{edge}'); e.set(qn('w:val'), 'single'); e.set(qn('w:sz'), '4'); e.set(qn('w:color'), 'CFC8B8'); borders.append(e)
        tblPr.append(borders)
        for ri, row in enumerate(t.rows):
            for cell in row.cells:
                for p in cell.paragraphs:
                    for r in p.runs:
                        r.font.size = Pt(9)
                        if ri == 0: r.font.bold = True; r.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
                if ri == 0:
                    tcPr = cell._tc.get_or_add_tcPr(); shd = OxmlElement('w:shd')
                    shd.set(qn('w:val'), 'clear'); shd.set(qn('w:color'), 'auto'); shd.set(qn('w:fill'), '161616'); tcPr.append(shd)
    # voettekst
    for sec in doc.sections:
        p = sec.footer.paragraphs[0] if sec.footer.paragraphs else sec.footer.add_paragraph()
        p.text = 'John-Luke Finance Outsourcing · The smarter way forward. · Vertrouwelijk'
        for r in p.runs: r.font.size = Pt(8); r.font.color.rgb = GOLD
    doc.save(path)

for md in sorted(base.glob('*.md')):
    target = out / (md.stem + '.docx')
    subprocess.run(['pandoc', str(md), '-o', str(target), '--reference-doc', str(ref)], check=True)
    style_tables(target)
    print('ok', target.name)
