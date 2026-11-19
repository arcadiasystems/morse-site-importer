#!/usr/bin/env bash
# Checks src/recipe/import.sh, the script the page shows and copies:
#
#   1. it parses (bash -n); shellcheck's findings are printed where it is installed;
#   2. a first run publishes one entry per file and writes the map;
#   3. a second run publishes nothing and leaves the map as it was;
#   4. a new file is the only thing a later run publishes;
#   5. a run that stops halfway is finished by running it again;
#   6. the two logs match the ones shown on the page.
#
# The runs use test/recipe/bin/morse, a stand-in that sends nothing and prints
# what the real CLI prints. This proves the bash and the map, not the network.
set -euo pipefail

here=$(cd "$(dirname "$0")" && pwd)
script=$here/../../src/recipe/import.sh
work=$(mktemp -d)
trap 'rm -rf "$work"' EXIT

fail() {
  echo "FAIL: $1" >&2
  exit 1
}

expect() {
  # expect <what> <expected> <actual>
  [ "$2" = "$3" ] || fail "$1: expected '$2', got '$3'"
  echo "ok    $1"
}

# A folder of three posts, a stand-in on PATH, and a place for its records.
new_site() {
  site=$work/$1
  mkdir -p "$site/content/posts" "$site/standin"
  for name in hello-world second-post third-post; do
    printf -- '---\ntitle: %s\n---\n\nA short post.\n' "$name" > "$site/content/posts/$name.md"
  done
  cp "$script" "$site/import.sh"
  chmod +x "$site/import.sh"
}

run_import() {
  (cd "$site" && PATH="$here/bin:$PATH" STANDIN_DIR="$site/standin" EPOCHS=30 ./import.sh)
}

calls() {
  if [ -f "$site/standin/calls.log" ]; then wc -l < "$site/standin/calls.log" | tr -d ' '; else echo 0; fi
}

bash -n "$script"
echo "ok    bash -n"
# The script is the docs' text and is not edited here, so shellcheck reports
# and does not fail the check: a finding belongs in the docs recipe first.
if ! command -v shellcheck >/dev/null; then
  echo "skip  shellcheck (not installed)"
elif shellcheck "$script"; then
  echo "ok    shellcheck"
else
  echo "note  shellcheck has findings, printed above"
fi

new_site twice
first=$(run_import)
expect "first run: the log on the page" "add   hello-world
add   second-post
add   third-post
done, 3 entries in morse-map.json" "$first"
expect "first run: one entry add per file" 3 "$(calls)"
expect "first run: the call the CLI received" \
  "--json -q entry add hello-world --file content/posts/hello-world.md --epochs 30" \
  "$(head -1 "$site/standin/calls.log")"
expect "first run: the map" \
  '{"hello-world":{"entryId":0,"file":"hello-world"},"second-post":{"entryId":1,"file":"second-post"},"third-post":{"entryId":2,"file":"third-post"}}' \
  "$(jq -c . "$site/morse-map.json")"

before=$(cksum < "$site/morse-map.json")
second=$(run_import)
expect "second run: the log on the page" "skip  hello-world (already published)
skip  second-post (already published)
skip  third-post (already published)
done, 3 entries in morse-map.json" "$second"
expect "second run: no entry add" 3 "$(calls)"
expect "second run: the map is unchanged" "$before" "$(cksum < "$site/morse-map.json")"

printf 'A fourth post.\n' > "$site/content/posts/a-new-post.md"
third=$(run_import)
expect "new file: the only line that says add" "add   a-new-post" "$(echo "$third" | grep '^add')"
expect "new file: one more entry add" 4 "$(calls)"
expect "new file: its id in the map" 3 "$(jq '.["a-new-post"].entryId' "$site/morse-map.json")"

new_site halfway
if (cd "$site" && PATH="$here/bin:$PATH" STANDIN_DIR="$site/standin" STANDIN_FAIL_AT=2 ./import.sh) > "$work/halfway.log" 2>&1; then
  fail "a failed entry add must stop the script"
fi
echo "ok    stopped run: the script exits when entry add fails"
expect "stopped run: the map holds what was published" '{"hello-world":{"entryId":0,"file":"hello-world"}}' \
  "$(jq -c . "$site/morse-map.json")"
resumed=$(run_import)
expect "resumed run: picks up where it stopped" "skip  hello-world (already published)
add   second-post
add   third-post
done, 3 entries in morse-map.json" "$resumed"
expect "resumed run: no entry was published twice" \
  '{"hello-world":0,"second-post":1,"third-post":2}' "$(jq -c 'map_values(.entryId)' "$site/morse-map.json")"

echo "recipe check passed"
