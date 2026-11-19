#!/usr/bin/env bash
# Compares src/recipe/import.sh with the script on the docs recipe. The page's
# copy may differ from the docs only by long lines wrapped with a backslash:
# with those joined again it must be the docs' script, byte for byte.
# Needs the network, so it is run by hand, not by CI.
set -euo pipefail

DOCS=https://docs.morsecms.xyz/import-a-site.md
here=$(cd "$(dirname "$0")" && pwd)
work=$(mktemp -d)
trap 'rm -rf "$work"' EXIT

# The docs page as Markdown; the script is the fenced bash block that opens with the shebang.
curl -fsS "$DOCS" | awk '
  /^```bash$/ { fence = 1; next }
  /^```$/ { if (keep) exit; fence = 0; next }
  fence && /^#!\/usr\/bin\/env bash$/ { keep = 1 }
  keep { print }
' > "$work/docs.sh"
[ -s "$work/docs.sh" ] || { echo "FAIL: no script found at $DOCS" >&2; exit 1; }

# Join each "\<newline><indent>" back into one space.
awk '
  joining { sub(/^ +/, ""); joining = 0 }
  /\\$/ { sub(/ \\$/, ""); printf "%s ", $0; joining = 1; next }
  { print }
' "$here/../../src/recipe/import.sh" > "$work/page.sh"

diff -u "$work/docs.sh" "$work/page.sh"
echo "the page's script is the docs' script, re-wrapped"
