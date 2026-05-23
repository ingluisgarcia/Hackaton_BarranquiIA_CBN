@echo off
set "PATH=C:\Program Files\Git\cmd;C:\Program Files\GitHub CLI;%PATH%"
cd /d "%~dp0.."

echo Verificando sesion en GitHub...
gh auth status >nul 2>&1
if errorlevel 1 (
  echo.
  echo Inicia sesion en GitHub ^(se abrira el navegador^)...
  gh auth login -h github.com -p https -w
)

echo.
echo Creando repositorio Hackaton_2026...
gh repo create Hackaton_2026 --public --source=. --remote=origin --push --description "Synervia - Plataforma Hackaton 2026"

if errorlevel 1 (
  echo.
  echo Error al crear el repositorio.
  pause
  exit /b 1
)

echo.
echo Listo! Repositorio publicado.
gh repo view --web
pause
