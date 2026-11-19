#!/usr/bin/env bash
set -euo pipefail
MAP=morse-map.json
EPOCHS=${EPOCHS:-30}
[ -f "$MAP" ] || echo '{}' > "$MAP"

for f in content/posts/*.md; do
  name=$(basename "$f" .md)
  if jq -e --arg n "$name" '.[$n]' "$MAP" \
      >/dev/null; then
    echo "skip  $name (already published)"; continue
  fi
  echo "add   $name"
  out=$(morse --json -q entry add "$name" \
    --file "$f" --epochs "$EPOCHS")
  id=$(echo "$out" | jq -r '.entryId')
  tmp=$(mktemp)
  jq --arg n "$name" --arg id "$id" \
    '.[$n] = {entryId: ($id|tonumber), file: $n}' \
    "$MAP" > "$tmp" && mv "$tmp" "$MAP"
done
echo "done, $(jq length "$MAP") entries in $MAP"
