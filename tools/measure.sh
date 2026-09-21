#!/bin/sh
# Prints the diff of the local build vs the reference dump. The local dump must first be captured
# in a Chrome tab at 1269×732 (see .claude/skills/pixel-diff/SKILL.md).
cd "$(dirname "$0")/.." && node tools/diff.mjs tools/captures/pp-ref-dump.json tools/captures/pp-local-dump.json "$@"
