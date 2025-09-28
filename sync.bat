@echo off
setlocal enabledelayedexpansion

set MASTER_BRANCH=%1
if "%MASTER_BRANCH%"=="" set MASTER_BRANCH=master

echo [1/4] Pull code (rebase) from origin/%MASTER_BRANCH%
git pull --rebase origin %MASTER_BRANCH%
if errorlevel 1 exit /b 1

REM --- Node.js ---
if exist package.json (
    echo [2/4] Install Node.js dependencies
    if exist package-lock.json (
        npm ci
    ) else (
        npm install
    )
    if errorlevel 1 exit /b 1
    )

REM --- Python ---
if exist requirements.txt (
    echo [3/4] Create venv (not have) & Install Python dependencies)
    if not exist .venv/Scripts/python.exe (
        python -m venv .venv
    )
    .venv\Scripts\python -m pip install -U pip
    .venv\Scripts\pip install -r requirements.txt
    if errorlevel 1 exit /b 1
)

echo [4/4] All done.
endlocal