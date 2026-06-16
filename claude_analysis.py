import json
import logging
import os
from anthropic import Anthropic

logger = logging.getLogger(__name__)

MODEL = "claude-opus-4-20250514"
MAX_TOKENS = 1500


def generate_financial_diagnosis(data: dict, client_name: str = "l'entreprise") -> dict:
    """Call Claude API for F1/F2/F3 financial analysis. Returns dict with f1/f2/f3/score."""
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        raise EnvironmentError("ANTHROPIC_API_KEY not set")

    client = Anthropic(api_key=api_key)

    prompt = f"""Tu es un expert financier senior spécialisé dans les PME africaines.
Analyse cette entreprise ({client_name}) et fournis un diagnostic structuré.

DONNÉES FINANCIÈRES :
- Chiffre d'affaires : {data['revenue']:,.0f} FCFA
- Charges totales : {data['expenses']:,.0f} FCFA
- Résultat net : {data['profit']:,.0f} FCFA
- Marge nette : {data['margin']:.1f}%
- Total Actif : {data['assets']:,.0f} FCFA
- Total Passif : {data['liabilities']:,.0f} FCFA
- Capitaux propres : {data['equity']:,.0f} FCFA
- Trésorerie : {data['treasury']:,.0f} FCFA

INSTRUCTIONS :
Réponds UNIQUEMENT en JSON valide, sans texte avant ni après, avec exactement ce format :
{{
  "f1": "DIAGNOSTIC FINANCIER : [3-4 phrases sur les risques, forces et faiblesses clés]",
  "f2": "PILOTAGE OPÉRATIONNEL : [3-4 recommandations immédiates et actionnables]",
  "f3": "STRATÉGIE CROISSANCE : [3-4 axes stratégiques à moyen/long terme]",
  "score": [note de 1 à 10 basée sur la solidité financière globale],
  "resume": "[1 phrase résumant la situation de l'entreprise]"
}}"""

    logger.info(f"Calling Claude API for {client_name}...")
    message = client.messages.create(
        model=MODEL,
        max_tokens=MAX_TOKENS,
        messages=[{"role": "user", "content": prompt}],
    )

    raw = message.content[0].text.strip()
    logger.info(f"Claude response received ({len(raw)} chars)")

    try:
        result = json.loads(raw)
    except json.JSONDecodeError:
        start = raw.find("{")
        end = raw.rfind("}") + 1
        if start >= 0 and end > start:
            result = json.loads(raw[start:end])
        else:
            raise ValueError(f"Claude returned non-JSON response: {raw[:200]}")

    for key in ["f1", "f2", "f3", "score", "resume"]:
        if key not in result:
            raise ValueError(f"Missing key '{key}' in Claude response")

    return result
