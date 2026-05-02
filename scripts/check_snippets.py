import json
import subprocess
import sys
import tempfile
from pathlib import Path


OBJECT_DIR = Path.cwd() / "data" / "objects"
errors = []


for path in sorted(OBJECT_DIR.glob("*.json")):
    obj = json.loads(path.read_text(encoding="utf-8"))
    snippet = obj.get("code_snippet") or {}
    language = str(snippet.get("language", "")).lower()
    code = snippet.get("code", "")

    if language != "python":
        continue

    with tempfile.NamedTemporaryFile("w", suffix=".py", delete=False, encoding="utf-8") as handle:
        handle.write(code)
        temp_path = handle.name

    try:
        subprocess.run(
            [sys.executable, temp_path],
            check=True,
            capture_output=True,
            text=True,
            timeout=5,
        )
    except subprocess.TimeoutExpired:
        errors.append(f"{path.name}: Python snippet timed out after 5 seconds.")
    except subprocess.CalledProcessError as exc:
        message = exc.stderr.strip() or exc.stdout.strip() or str(exc)
        errors.append(f"{path.name}: Python snippet failed: {message}")
    finally:
        Path(temp_path).unlink(missing_ok=True)


if errors:
    print("OEMO snippet checks failed:", file=sys.stderr)
    for error in errors:
        print(f"- {error}", file=sys.stderr)
    sys.exit(1)

print("OEMO snippet checks passed.")
