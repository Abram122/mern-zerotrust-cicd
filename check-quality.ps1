# Check-Quality.ps1
# Runs the full local quality gate to mirror CI/CD checks

$ErrorActionPreference = "Stop"
$GlobalPass = $true

function Write-Header($text) {
    Write-Host "`n========================================" -ForegroundColor Cyan
    Write-Host "  $text" -ForegroundColor Cyan
    Write-Host "========================================`n" -ForegroundColor Cyan
}

function Run-Step($name, $path, $command) {
    Write-Host "Running: $name..." -NoNewline
    try {
        Set-Location $path
        Invoke-Expression $command | Out-Null
        Write-Host " [PASS]" -ForegroundColor Green
    } catch {
        Write-Host " [FAIL]" -ForegroundColor Red
        $global:GlobalPass = $false
        Write-Warning "Error in $name : $_"
    }
    Set-Location $PSScriptRoot
}

$PSScriptRoot = Get-Location

Write-Header "BACKEND QUALITY CHECKS"
Run-Step "Backend Audit" "./backend" "npm audit --audit-level=high"
Run-Step "Backend Tests" "./backend" "npm test"

Write-Header "FRONTEND QUALITY CHECKS"
Run-Step "Frontend Linting" "./frontend" "npm run lint"
Run-Step "Frontend Build" "./frontend" "npm run build"
Run-Step "Frontend Tests" "./frontend" "npm test"

Write-Header "FINAL SUMMARY"
if ($GlobalPass) {
    Write-Host "SUCCESS: Your code is ready for push!" -ForegroundColor Green -BackgroundColor Black
    exit 0
} else {
    Write-Host "FAILURE: Please fix the issues above before pushing." -ForegroundColor Red -BackgroundColor Black
    exit 1
}
