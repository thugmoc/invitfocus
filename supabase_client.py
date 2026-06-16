import os
from supabase import create_client, Client

_client: Client | None = None


def get_client() -> Client:
    """Returns a Supabase client using the service_role key (full admin access)."""
    global _client
    if _client is None:
        url = os.environ.get("SUPABASE_URL")
        key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
        if not url or not key:
            raise EnvironmentError("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set")
        _client = create_client(url, key)
    return _client


def get_clients_ready_for_analysis():
    """Fetch all clients with status='validating' (ready to generate a report)."""
    sb = get_client()
    res = sb.table("clients").select("*").eq("status", "analyzing").execute()
    return res.data


def get_client_documents(client_id: str):
    sb = get_client()
    res = sb.table("documents").select("*").eq("client_id", client_id).execute()
    return res.data


def save_report(client_id: str, pdf_url: str, analysis: dict, financial_data: dict):
    sb = get_client()
    sb.table("reports").insert({
        "client_id": client_id,
        "pdf_url": pdf_url,
        "score": analysis["score"],
        "f1": analysis["f1"],
        "f2": analysis["f2"],
        "f3": analysis["f3"],
        "resume": analysis["resume"],
        "financial_data": financial_data,
    }).execute()
    sb.table("clients").update({"status": "delivered", "report_url": pdf_url}).eq("id", client_id).execute()


def upload_pdf_to_storage(local_path: str, client_id: str) -> str:
    """Upload a PDF to the 'reports' bucket and return its public URL."""
    sb = get_client()
    file_name = os.path.basename(local_path)
    storage_path = f"{client_id}/{file_name}"

    with open(local_path, "rb") as f:
        sb.storage.from_("reports").upload(
            storage_path, f, {"content-type": "application/pdf", "upsert": "true"}
        )

    return sb.storage.from_("reports").get_public_url(storage_path)
