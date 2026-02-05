# Eventra Client - Quick Start Script (Windows)

Write-Host "🎉 Setting up Eventra Client..." -ForegroundColor Green

# Check if .env exists
if (-not (Test-Path .env)) {
    Write-Host "📝 Creating .env file from template..." -ForegroundColor Yellow
    Copy-Item .env.example .env
    Write-Host "⚠️  Please edit .env with your Firebase credentials!" -ForegroundColor Red
    Write-Host "Press any key when ready..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
}

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Cyan
npm install

# Clear any existing build
Write-Host "🧹 Cleaning up..." -ForegroundColor Cyan
if (Test-Path build) {
    Remove-Item -Recurse -Force build
}

Write-Host "✅ Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 To start the development server, run:" -ForegroundColor Yellow
Write-Host "   npm start" -ForegroundColor White
Write-Host ""
Write-Host "📚 For more information, see:" -ForegroundColor Yellow
Write-Host "   - CLIENT_README.md (comprehensive documentation)" -ForegroundColor White
Write-Host "   - SETUP_COMPLETE.md (what's been built)" -ForegroundColor White
Write-Host ""
Write-Host "Happy coding! 🎨" -ForegroundColor Magenta
