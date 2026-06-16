import logging
import os
from datetime import date

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
)
from reportlab.lib.enums import TA_CENTER, TA_LEFT

logger = logging.getLogger(__name__)

DARK = colors.HexColor("#16213e")
TEAL = colors.HexColor("#4ecdc4")
LIGHT = colors.HexColor("#f0f4ff")
GRAY = colors.HexColor("#555555")
WARN = colors.HexColor("#fffbea")


def _styles():
    base = getSampleStyleSheet()
    return {
        "title": ParagraphStyle("title", fontName="Helvetica-Bold", fontSize=20,
                                textColor=colors.white, spaceAfter=4),
        "subtitle": ParagraphStyle("subtitle", fontName="Helvetica", fontSize=9,
                                   textColor=colors.HexColor("#a8b2d8"), spaceAfter=0),
        "section": ParagraphStyle("section", fontName="Helvetica-Bold", fontSize=12,
                                  textColor=DARK, spaceBefore=6, spaceAfter=6),
        "body": ParagraphStyle("body", fontName="Helvetica", fontSize=10,
                               textColor=colors.HexColor("#333333"), leading=15),
        "resume": ParagraphStyle("resume", fontName="Helvetica-Oblique", fontSize=10,
                                 textColor=colors.HexColor("#555500"), leading=15),
        "meta": ParagraphStyle("meta", fontName="Helvetica", fontSize=9,
                               textColor=GRAY),
        "kpi_label": ParagraphStyle("kpi_label", fontName="Helvetica", fontSize=8,
                                    textColor=GRAY),
        "kpi_value": ParagraphStyle("kpi_value", fontName="Helvetica-Bold", fontSize=12,
                                    textColor=DARK),
    }


def _fmt(n):
    try:
        return f"{float(n):,.0f} FCFA"
    except Exception:
        return str(n)


def generate_pdf_report(client_id: str, client_name: str, data: dict, analysis: dict, output_dir: str = "reports") -> str:
    os.makedirs(output_dir, exist_ok=True)
    output_path = os.path.join(output_dir, f"{client_id}_rapport_financier.pdf")

    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        topMargin=0,
        bottomMargin=1.5 * cm,
        leftMargin=1.8 * cm,
        rightMargin=1.8 * cm,
    )

    st = _styles()
    story = []

    # ── Header ──────────────────────────────────────────────────────────────
    header_data = [[
        Paragraph("DIAGNOSTIC FINANCIER", st["title"]),
        Paragraph("INVITEFOCUS BETA — Rapport confidentiel", st["subtitle"]),
    ]]
    header_table = Table(header_data, colWidths=[doc.width])
    header_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), DARK),
        ("TOPPADDING", (0, 0), (-1, -1), 20),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 20),
        ("LEFTPADDING", (0, 0), (-1, -1), 18),
        ("RIGHTPADDING", (0, 0), (-1, -1), 18),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ]))
    story.append(header_table)
    story.append(Spacer(1, 0.4 * cm))

    # ── Meta ────────────────────────────────────────────────────────────────
    today = date.today().strftime("%d/%m/%Y")
    meta_data = [[
        Paragraph(f"<b>Entreprise :</b> {client_name}", st["meta"]),
        Paragraph(f"<b>Date :</b> {today}", st["meta"]),
        Paragraph(f"<b>Réf :</b> {client_id}", st["meta"]),
    ]]
    meta_table = Table(meta_data, colWidths=[doc.width / 3] * 3)
    meta_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), LIGHT),
        ("TOPPADDING", (0, 0), (-1, -1), 7),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
        ("LEFTPADDING", (0, 0), (-1, -1), 10),
        ("ROUNDEDCORNERS", [4, 4, 4, 4]),
    ]))
    story.append(meta_table)
    story.append(Spacer(1, 0.4 * cm))

    # ── Score ───────────────────────────────────────────────────────────────
    score_style = ParagraphStyle("score_num", fontName="Helvetica-Bold", fontSize=38,
                                 textColor=TEAL, alignment=TA_CENTER)
    score_lbl = ParagraphStyle("score_lbl", fontName="Helvetica", fontSize=9,
                               textColor=colors.HexColor("#a8b2d8"), alignment=TA_CENTER)
    score_data = [[
        Paragraph(f"{analysis['score']}/10", score_style),
        Paragraph("Score de solidité financière globale", score_lbl),
    ]]
    score_table = Table(score_data, colWidths=[doc.width * 0.25, doc.width * 0.75])
    score_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), DARK),
        ("TOPPADDING", (0, 0), (-1, -1), 12),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 12),
        ("LEFTPADDING", (0, 0), (-1, -1), 14),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ]))
    story.append(score_table)
    story.append(Spacer(1, 0.35 * cm))

    # ── Résumé ──────────────────────────────────────────────────────────────
    resume_data = [[Paragraph(f"<b>Résumé :</b> {analysis['resume']}", st["resume"])]]
    resume_table = Table(resume_data, colWidths=[doc.width])
    resume_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), WARN),
        ("TOPPADDING", (0, 0), (-1, -1), 10),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
        ("LEFTPADDING", (0, 0), (-1, -1), 14),
        ("RIGHTPADDING", (0, 0), (-1, -1), 14),
        ("BOX", (0, 0), (-1, -1), 0.5, colors.HexColor("#f0c000")),
    ]))
    story.append(resume_table)
    story.append(Spacer(1, 0.4 * cm))

    # ── KPIs ────────────────────────────────────────────────────────────────
    kpis = [
        ("Chiffre d'affaires", _fmt(data.get("revenue", 0))),
        ("Résultat net", _fmt(data.get("profit", 0))),
        ("Marge nette", f"{data.get('margin', 0):.1f}%"),
        ("Total Actif", _fmt(data.get("assets", 0))),
        ("Capitaux propres", _fmt(data.get("equity", 0))),
        ("Trésorerie", _fmt(data.get("treasury", 0))),
    ]
    kpi_cells = []
    for label, value in kpis:
        kpi_cells.append([
            Paragraph(label.upper(), st["kpi_label"]),
            Paragraph(value, st["kpi_value"]),
        ])

    col_w = doc.width / 3
    kpi_row1 = [[
        Table([kpi_cells[i]], colWidths=[col_w - 0.3 * cm])
        for i in range(3)
    ]]
    kpi_row2 = [[
        Table([kpi_cells[i + 3]], colWidths=[col_w - 0.3 * cm])
        for i in range(3)
    ]]

    for kpi_row in [kpi_row1, kpi_row2]:
        t = Table(kpi_row, colWidths=[col_w] * 3)
        t.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, -1), LIGHT),
            ("TOPPADDING", (0, 0), (-1, -1), 8),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ("LEFTPADDING", (0, 0), (-1, -1), 10),
            ("LINEAFTER", (0, 0), (1, 0), 0.5, colors.white),
            ("LINEBEFORE", (0, 0), (0, 0), 3, TEAL),
            ("LINEBEFORE", (1, 0), (1, 0), 3, TEAL),
            ("LINEBEFORE", (2, 0), (2, 0), 3, TEAL),
        ]))
        story.append(t)
        story.append(Spacer(1, 0.2 * cm))

    story.append(Spacer(1, 0.3 * cm))

    # ── Sections F1 / F2 / F3 ───────────────────────────────────────────────
    sections = [
        ("F1 — Diagnostic Financier", analysis["f1"]),
        ("F2 — Pilotage Opérationnel", analysis["f2"]),
        ("F3 — Stratégie de Croissance", analysis["f3"]),
    ]
    for title, content in sections:
        story.append(Paragraph(title, st["section"]))
        story.append(HRFlowable(width="100%", thickness=1.5, color=TEAL, spaceAfter=8))
        story.append(Paragraph(content, st["body"]))
        story.append(Spacer(1, 0.5 * cm))

    # ── Footer ───────────────────────────────────────────────────────────────
    footer_style = ParagraphStyle("footer", fontName="Helvetica", fontSize=8,
                                  textColor=GRAY, alignment=TA_CENTER)
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#eeeeee")))
    story.append(Spacer(1, 0.2 * cm))
    story.append(Paragraph(
        f"Rapport généré par INVITEFOCUS BETA — Confidentiel — {today}", footer_style
    ))

    doc.build(story)
    size_kb = os.path.getsize(output_path) // 1024
    logger.info(f"PDF generated: {output_path} ({size_kb} KB)")
    return output_path
