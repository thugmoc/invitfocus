import os
import sys

try:
    from anthropic import Anthropic
except Exception as e:
    print("Import error:", e)
    sys.exit(1)

print("Imported anthropic OK")

api_key = os.environ.get("ANTHROPIC_API_KEY")
if not api_key:
    print("No ANTHROPIC_API_KEY set — skipping API call. Set it and re-run to test.")
    sys.exit(0)

client = Anthropic(api_key=api_key)
print("Created Anthropic client; ready to call API (not executing calls here).")
