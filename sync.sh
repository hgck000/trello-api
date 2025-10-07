#!/usr/bin/env bash
set -euo pipefail

if [ ! -f package.json ]; then
  echo "❌ No package.json found. Run this at repo root."
  exit 1
fi

echo "[1/2] Install dependencies"

if [ -f yarn.lock ]; then
  # Prefer Yarn if lockfile exists
  if command -v corepack >/dev/null 2>&1; then
    corepack enable >/dev/null 2>&1 || true
    corepack prepare yarn@stable --activate >/dev/null 2>&1 || true
  fi
  echo "→ yarn install --frozen-lockfile"
  yarn install --frozen-lockfile

  echo "[2/2] Start dev"
  if yarn run -T dev >/dev/null 2>&1; then
    exec yarn dev
  else
    echo "❌ Missing 'dev' script in package.json"
    exit 1
  fi

elif [ -f package-lock.json ]; then
  echo "→ npm ci"
  npm ci

  echo "[2/2] Start dev"
  if npm run -s dev >/dev/null 2>&1; then
    exec npm run dev
  else
    echo "❌ Missing 'dev' script in package.json"
    exit 1
  fi

else
  echo "→ npm install"
  npm install

  echo "[2/2] Start dev"
  if npm run -s dev >/dev/null 2>&1; then
    exec npm run dev
  else
    echo "❌ Missing 'dev' script in package.json"
    exit 1
  fi
fi
