# PowerShell script to set up .env file
# This script helps create and configure the .env file

Write-Host "=== Environment Setup Script ===" -ForegroundColor Green
Write-Host ""

# Check if .env exists
if (Test-Path .env) {
    Write-Host ".env file already exists." -ForegroundColor Yellow
    $overwrite = Read-Host "Do you want to overwrite it? (y/n)"
    if ($overwrite -ne "y" -and $overwrite -ne "Y") {
        Write-Host "Setup cancelled." -ForegroundColor Yellow
        exit 0
    }
}

Write-Host ""
Write-Host "MongoDB Connection Setup" -ForegroundColor Cyan
Write-Host ""

# Ask for MongoDB connection type
Write-Host "Choose MongoDB connection type:"
Write-Host "1. Local MongoDB (mongodb://localhost:27017)"
Write-Host "2. MongoDB Atlas (mongodb+srv://...)"
$choice = Read-Host "Enter choice (1 or 2)"

$mongodbUri = ""

if ($choice -eq "1") {
    Write-Host ""
    $dbName = Read-Host "Enter database name (default: crud-db)"
    if ([string]::IsNullOrWhiteSpace($dbName)) {
        $dbName = "crud-db"
    }
    $mongodbUri = "mongodb://localhost:27017/$dbName"
    Write-Host "Using local MongoDB: $mongodbUri" -ForegroundColor Green
} elseif ($choice -eq "2") {
    Write-Host ""
    Write-Host "Enter your MongoDB Atlas connection string:" -ForegroundColor Yellow
    Write-Host "Format: mongodb+srv://username:password@cluster.mongodb.net/database-name?retryWrites=true&w=majority" -ForegroundColor Gray
    $mongodbUri = Read-Host "Connection string"
    
    if ([string]::IsNullOrWhiteSpace($mongodbUri)) {
        Write-Host "Error: Connection string cannot be empty!" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "Invalid choice. Exiting." -ForegroundColor Red
    exit 1
}

# Ask for port
Write-Host ""
$port = Read-Host "Enter server port (default: 5000)"
if ([string]::IsNullOrWhiteSpace($port)) {
    $port = "5000"
}

# Ask for environment
Write-Host ""
$env = Read-Host "Enter environment (default: development)"
if ([string]::IsNullOrWhiteSpace($env)) {
    $env = "development"
}

# Create .env file
Write-Host ""
Write-Host "Creating .env file..." -ForegroundColor Cyan

$envContent = @"
# Server Configuration
PORT=$port

# MongoDB Configuration
MONGODB_URI=$mongodbUri

# Environment
NODE_ENV=$env
"@

$envContent | Out-File -FilePath .env -Encoding utf8 -NoNewline

Write-Host ""
Write-Host "✅ .env file created successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Configuration:" -ForegroundColor Cyan
Write-Host "  PORT: $port"
Write-Host "  MONGODB_URI: $mongodbUri"
Write-Host "  NODE_ENV: $env"
Write-Host ""
Write-Host "You can now start the server with: npm run dev" -ForegroundColor Yellow

