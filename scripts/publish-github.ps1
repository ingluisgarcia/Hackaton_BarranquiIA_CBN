$env:PATH = "C:\Program Files\Git\cmd;C:\Program Files\GitHub CLI;" + $env:PATH

Set-Location (Split-Path $PSScriptRoot -Parent)

gh auth status 2>$null
if ($LASTEXITCODE -ne 0) {
  Write-Host "Inicia sesion en GitHub..."
  gh auth login -h github.com -p https -w
}

gh repo create Hackaton_2026 --public --source=. --remote=origin --push --description "Synervia - Plataforma Hackaton 2026"

if ($LASTEXITCODE -eq 0) {
  gh repo view --web
}
