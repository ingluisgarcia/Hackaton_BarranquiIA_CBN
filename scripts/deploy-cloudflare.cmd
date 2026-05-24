@echo off
set "PATH=%~dp0..\node_modules\.bin;C:\Program Files\Git\cmd;%PATH%"
cd /d "%~dp0.."

echo Verificando sesion en Cloudflare...
call wrangler whoami >nul 2>&1
if errorlevel 1 (
  echo.
  echo Inicia sesion en Cloudflare ^(se abrira el navegador^)...
  call wrangler login
)

echo.
echo Desplegando hackaton-synervia a Cloudflare Workers...
call npm run deploy

if errorlevel 1 (
  echo.
  echo Error al desplegar. Revisa las variables de entorno en el dashboard de Cloudflare.
  pause
  exit /b 1
)

echo.
echo Despliegue completado.
echo.
echo Para conectar el dominio hackaton.synervia.com:
echo   1. Ve a https://dash.cloudflare.com
echo   2. Workers ^& Pages ^> hackaton-synervia ^> Settings ^> Domains ^& Routes
echo   3. Add Custom Domain: hackaton.synervia.com
echo   4. Asegurate de que synervia.com este en tu cuenta de Cloudflare
echo.
pause
