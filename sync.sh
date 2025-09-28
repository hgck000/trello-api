#!/usr/bin/env zsh
set -euo pipefail

MASTER_BRANCH=${1:-master}

echo "[1/4] Pull code (rebase) từ origin/$MASTER_BRANCH"
git pull --rebase origin "$MASTER_BRANCH"

# --- Node.js ---
if [ -f package.json ]; then
  echo "[2/4] Cài deps Node.js"
  if [ -f package-lock.json ]; then
    npm ci
  else
    npm install
  fi
fi

# --- Python ---
if [ -f requirements.txt ]; then
  echo "[3/4] Tạo venv (nếu chưa có) & cài deps Python"
  if [ ! -d ".venv" ]; then
    python3 -m venv .venv
  fi
  . .venv/bin/activate
  python -m pip install -U pip
  pip install -r requirements.txt
fi

echo "[4/4] Done ✔"
