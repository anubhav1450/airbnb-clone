#!/bin/sh
# Builds the submission zip (code + docs + diagram); excludes node_modules, dist, raw captures and local dumps.
cd "$(dirname "$0")/.." || exit 1
OUT="${1:-../airbnb-clone-submission.zip}"
rm -f "$OUT"
zip -qr "$OUT" . -x "node_modules/*" "dist/*" ".git/*" "tools/captures/img/*" "tools/captures/pp-local*" "tools/captures/*.txt" "tools/captures/fontsamples.json" ".DS_Store"
echo "wrote $OUT"; unzip -l "$OUT" | tail -1
