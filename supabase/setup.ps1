# Supabase CLI Setup and Seeding Script
# This script helps you set up and seed your Supabase database

Write-Host "🚀 Supabase Database Setup Script" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

# Check if Supabase CLI is installed
Write-Host "📋 Checking for Supabase CLI..." -ForegroundColor Yellow
$supabaseCli = Get-Command supabase -ErrorAction SilentlyContinue

if (-not $supabaseCli) {
    Write-Host "❌ Supabase CLI not found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install Supabase CLI first:" -ForegroundColor Yellow
    Write-Host "npm install -g supabase" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Or using Scoop (Windows):" -ForegroundColor Yellow
    Write-Host "scoop bucket add supabase https://github.com/supabase/scoop-bucket.git" -ForegroundColor Cyan
    Write-Host "scoop install supabase" -ForegroundColor Cyan
    exit 1
}

Write-Host "✅ Supabase CLI found: $($supabaseCli.Version)" -ForegroundColor Green
Write-Host ""

# Check if .env.local exists
if (-not (Test-Path "../.env.local")) {
    Write-Host "⚠️  Warning: .env.local not found in project root" -ForegroundColor Yellow
    Write-Host "Make sure your environment variables are set up." -ForegroundColor Yellow
    Write-Host ""
}

# Menu
Write-Host "Select an option:" -ForegroundColor Cyan
Write-Host "1. Link to remote Supabase project" -ForegroundColor White
Write-Host "2. Push migrations to remote" -ForegroundColor White
Write-Host "3. Seed remote database" -ForegroundColor White
Write-Host "4. Reset remote database (migrations + seeds)" -ForegroundColor White
Write-Host "5. Start local Supabase (for testing)" -ForegroundColor White
Write-Host "6. Stop local Supabase" -ForegroundColor White
Write-Host "7. Generate TypeScript types" -ForegroundColor White
Write-Host "8. Exit" -ForegroundColor White
Write-Host ""

$choice = Read-Host "Enter your choice (1-8)"

switch ($choice) {
    "1" {
        Write-Host ""
        Write-Host "🔗 Linking to remote project..." -ForegroundColor Yellow
        supabase link --project-ref bdteruwmfewuidtgkjib
    }
    "2" {
        Write-Host ""
        Write-Host "📤 Pushing migrations to remote..." -ForegroundColor Yellow
        supabase db push --linked
    }
    "3" {
        Write-Host ""
        Write-Host "🌱 Seeding remote database..." -ForegroundColor Yellow
        Write-Host "Running 001_profile_and_skills.sql..." -ForegroundColor Gray
        supabase db execute --file ./seeds/001_profile_and_skills.sql --linked
        Write-Host "Running 002_education_and_experience.sql..." -ForegroundColor Gray
        supabase db execute --file ./seeds/002_education_and_experience.sql --linked
        Write-Host "Running 003_certifications.sql..." -ForegroundColor Gray
        supabase db execute --file ./seeds/003_certifications.sql --linked
        Write-Host "Running 004_projects.sql..." -ForegroundColor Gray
        supabase db execute --file ./seeds/004_projects.sql --linked
        Write-Host "Running 005_gallery.sql..." -ForegroundColor Gray
        supabase db execute --file ./seeds/005_gallery.sql --linked
        Write-Host "✅ Seeding complete!" -ForegroundColor Green
    }
    "4" {
        Write-Host ""
        Write-Host "⚠️  WARNING: This will reset your remote database!" -ForegroundColor Red
        $confirm = Read-Host "Type 'yes' to confirm"
        if ($confirm -eq "yes") {
            Write-Host "🔄 Resetting remote database..." -ForegroundColor Yellow
            supabase db reset --linked
        } else {
            Write-Host "❌ Reset cancelled" -ForegroundColor Yellow
        }
    }
    "5" {
        Write-Host ""
        Write-Host "🏁 Starting local Supabase..." -ForegroundColor Yellow
        Write-Host "This will start local PostgreSQL, Auth, Storage, and Studio" -ForegroundColor Gray
        supabase start
    }
    "6" {
        Write-Host ""
        Write-Host "🛑 Stopping local Supabase..." -ForegroundColor Yellow
        supabase stop
    }
    "7" {
        Write-Host ""
        Write-Host "⚙️  Generating TypeScript types..." -ForegroundColor Yellow
        supabase gen types typescript --linked > ../lib/database.types.ts
        Write-Host "✅ Types generated at lib/database.types.ts" -ForegroundColor Green
    }
    "8" {
        Write-Host ""
        Write-Host "👋 Goodbye!" -ForegroundColor Cyan
        exit 0
    }
    default {
        Write-Host ""
        Write-Host "❌ Invalid choice" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "✅ Done!" -ForegroundColor Green
