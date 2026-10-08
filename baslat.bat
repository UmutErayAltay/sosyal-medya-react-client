@echo off
cd /d "%~dp0"
start "react client" cmd /k npm run dev
timeout /t 5 /nobreak >nul
start http://127.0.0.1:5173
