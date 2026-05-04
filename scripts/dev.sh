#!/usr/bin/env bash
set -euo pipefail

# Pulihkan cwd yang valid (mencegah EPERM uv_cwd saat folder hilang/dipindah atau sesi terminal rusak).
cd / 2>/dev/null || cd ~ || true

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

exec node "$ROOT/node_modules/next/dist/bin/next" dev --hostname localhost
