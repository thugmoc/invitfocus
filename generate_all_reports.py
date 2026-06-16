"""
INVITEFOCUS BETA — Main report generation pipeline.

Usage:
    python generate_all_reports.py --client TEST_001 --name "Entreprise Test" --file data.xlsx
    python generate_all_reports.py --demo         # Run with fake data (no Excel, no Airtable)
    python generate_all_reports.py --batch batch.txt
"""
import argparse
import json
import logging
import os
import sys
from pathlib import Path

from dotenv import load_dotenv

load_dotenv()

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[
        logging.StreamHandler(sys.stdout),
        logging.FileHandler("invitefocus.log", encoding="utf-8"),
    ],
)
logger = logging.getLogger(__name__)


def run_pipeline(client_id: str, client_name: str, excel_file: str | None, output_dir: str = "reports") -> str:
    from extract_data import extract_financial_data
    from claude_analysis import generate_financial_diagnosis
    from generate_report import generate_pdf_report

    if excel_file:
        logger.info(f"[{client_id}] Extracting data from {excel_file}")
        data = extract_financial_data(excel_file)
    else:
        logger.info(f"[{client_id}] No Excel file — using demo data")
        data = {
            "revenue": 85_000_000,
            "expenses": 62_000_000,
            "profit": 23_000_000,
            "margin": 27.1,
            "assets": 120_000_000,
            "liabilities": 45_000_000,
            "equity": 75_000_000,
            "treasury": 18_500_000,
        }

    logger.info(f"[{client_id}] Calling Claude API...")
    analysis = generate_financial_diagnosis(data, client_name=client_name)
    logger.info(f"[{client_id}] Score: {analysis['score']}/10")

    logger.info(f"[{client_id}] Generating PDF...")
    pdf_path = generate_pdf_report(client_id, client_name, data, analysis, output_dir)
    logger.info(f"[{client_id}] Done -> {pdf_path}")
    return pdf_path


def main():
    parser = argparse.ArgumentParser(description="INVITEFOCUS report generator")
    parser.add_argument("--client", help="Client ID (e.g. CLIENT_001)")
    parser.add_argument("--name", help="Client company name")
    parser.add_argument("--file", help="Path to client Excel file")
    parser.add_argument("--output", default="reports", help="Output directory for PDFs")
    parser.add_argument("--batch", help="Text file with one client per line: ID|Name|ExcelPath")
    parser.add_argument("--demo", action="store_true", help="Run demo with fake data")
    parser.add_argument("--from-supabase", action="store_true",
                         help="Fetch clients with status='analyzing' from Supabase and process them")
    args = parser.parse_args()

    if not os.environ.get("ANTHROPIC_API_KEY"):
        logger.error("ANTHROPIC_API_KEY not set. Add it to your .env file.")
        sys.exit(1)

    results = []

    if args.demo:
        logger.info("=== DEMO MODE ===")
        pdf = run_pipeline("DEMO_001", "Entreprise Demo SARL", None, args.output)
        results.append({"client_id": "DEMO_001", "status": "ok", "pdf": pdf})

    elif args.from_supabase:
        from supabase_client import get_clients_ready_for_analysis, save_report, upload_pdf_to_storage
        from extract_data import extract_financial_data
        from claude_analysis import generate_financial_diagnosis
        from generate_report import generate_pdf_report

        clients = get_clients_ready_for_analysis()
        logger.info(f"Found {len(clients)} client(s) ready for analysis")

        for c in clients:
            cid, cname = c["id"], c["company"]
            try:
                # NOTE: financial data extraction from uploaded docs is not yet wired;
                # plug in real Excel parsing once document download from Storage is added.
                data = {
                    "revenue": 0, "expenses": 0, "profit": 0, "margin": 0,
                    "assets": 0, "liabilities": 0, "equity": 0, "treasury": 0,
                }
                analysis = generate_financial_diagnosis(data, client_name=cname)
                pdf_path = generate_pdf_report(cid, cname, data, analysis, args.output)
                pdf_url = upload_pdf_to_storage(pdf_path, cid)
                save_report(cid, pdf_url, analysis, data)
                results.append({"client_id": cid, "status": "ok", "pdf": pdf_url})
            except Exception as e:
                logger.error(f"[{cid}] FAILED: {e}")
                results.append({"client_id": cid, "status": "error", "error": str(e)})

    elif args.batch:
        batch_file = Path(args.batch)
        if not batch_file.exists():
            logger.error(f"Batch file not found: {args.batch}")
            sys.exit(1)
        lines = [l.strip() for l in batch_file.read_text(encoding="utf-8").splitlines() if l.strip()]
        for line in lines:
            parts = line.split("|")
            if len(parts) < 2:
                logger.warning(f"Skipping invalid line: {line}")
                continue
            cid, cname = parts[0].strip(), parts[1].strip()
            excel = parts[2].strip() if len(parts) > 2 else None
            try:
                pdf = run_pipeline(cid, cname, excel, args.output)
                results.append({"client_id": cid, "status": "ok", "pdf": pdf})
            except Exception as e:
                logger.error(f"[{cid}] FAILED: {e}")
                results.append({"client_id": cid, "status": "error", "error": str(e)})

    elif args.client and args.name:
        try:
            pdf = run_pipeline(args.client, args.name, args.file, args.output)
            results.append({"client_id": args.client, "status": "ok", "pdf": pdf})
        except Exception as e:
            logger.error(f"[{args.client}] FAILED: {e}")
            results.append({"client_id": args.client, "status": "error", "error": str(e)})

    else:
        parser.print_help()
        sys.exit(1)

    print("\n=== RÉSULTATS ===")
    ok = [r for r in results if r["status"] == "ok"]
    err = [r for r in results if r["status"] == "error"]
    print(f"Succès : {len(ok)} | Erreurs : {len(err)}")
    for r in results:
        icon = "OK" if r["status"] == "ok" else "ERREUR"
        detail = r.get("pdf", r.get("error", ""))
        print(f"  {icon} {r['client_id']} — {detail}")


if __name__ == "__main__":
    main()
