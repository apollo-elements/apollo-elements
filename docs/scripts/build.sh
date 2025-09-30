#!/bin/bash

# Apollo Elements Documentation Build Script
# This script orchestrates the complete build process including Lit-SSR

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging functions
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Configuration
DOCS_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
HUGO_ENV="${HUGO_ENV:-development}"
NODE_ENV="${NODE_ENV:-development}"

# Export environment variables
export HUGO_ENV
export NODE_ENV

cd "$DOCS_DIR"

log_info "Starting Apollo Elements documentation build..."
log_info "Environment: $HUGO_ENV"
log_info "Working directory: $DOCS_DIR"

# Check dependencies
check_dependencies() {
    log_info "Checking dependencies..."

    # Check for Hugo
    if ! command -v hugo &> /dev/null; then
        log_error "Hugo is not installed. Please install Hugo Extended."
        exit 1
    fi

    # Check Hugo version and extended support
    HUGO_VERSION=$(hugo version)
    if [[ ! $HUGO_VERSION == *"extended"* ]]; then
        log_error "Hugo Extended is required for asset processing."
        exit 1
    fi

    # Check for Node.js
    if ! command -v node &> /dev/null; then
        log_error "Node.js is not installed."
        exit 1
    fi

    # Check for npm
    if ! command -v npm &> /dev/null; then
        log_error "npm is not installed."
        exit 1
    fi

    log_success "All dependencies are available"
}

# Install npm dependencies
install_dependencies() {
    log_info "Installing npm dependencies..."

    if [ ! -d "node_modules" ]; then
        npm install
    else
        npm ci --production=false
    fi

    log_success "npm dependencies installed"
}

# Clean previous builds
clean_build() {
    log_info "Cleaning previous build artifacts..."

    rm -rf public/
    rm -rf resources/
    rm -rf static/_lit-ssr/

    log_success "Build artifacts cleaned"
}

# Run Lit-SSR build
build_lit_ssr() {
    log_info "Running Lit-SSR build..."

    if [ -f "scripts/lit-ssr-build.js" ]; then
        node scripts/lit-ssr-build.js
        log_success "Lit-SSR build completed"
    else
        log_warning "Lit-SSR build script not found, skipping..."
    fi
}

# Update Hugo modules
update_hugo_modules() {
    log_info "Updating Hugo modules..."

    hugo mod get
    hugo mod tidy

    log_success "Hugo modules updated"
}

# Run Hugo build
build_hugo() {
    log_info "Running Hugo build..."

    local hugo_flags=""

    # Set flags based on environment
    if [ "$HUGO_ENV" = "production" ]; then
        hugo_flags="--minify --gc"
        log_info "Building for production with minification"
    else
        hugo_flags="--buildDrafts --buildFuture"
        log_info "Building for development with drafts"
    fi

    # Run Hugo build
    hugo $hugo_flags

    log_success "Hugo build completed"
}

# Validate build output
validate_build() {
    log_info "Validating build output..."

    if [ ! -d "public" ]; then
        log_error "Build output directory 'public' not found"
        exit 1
    fi

    # Check for essential files
    if [ ! -f "public/index.html" ]; then
        log_error "index.html not found in build output"
        exit 1
    fi

    # Check for asset files
    if [ ! -d "public/_assets" ] && [ ! -d "public/assets" ]; then
        log_warning "No assets directory found in build output"
    fi

    # Get build statistics
    local file_count=$(find public -type f | wc -l)
    local total_size=$(du -sh public | cut -f1)

    log_success "Build validation passed"
    log_info "Generated $file_count files, total size: $total_size"
}

# Run linting (optional)
run_lint() {
    if [ "$HUGO_ENV" != "production" ]; then
        log_info "Running linters..."

        # Lint CSS
        if command -v stylelint &> /dev/null; then
            npm run lint:css || log_warning "CSS linting issues found"
        fi

        # Lint JavaScript
        if command -v eslint &> /dev/null; then
            npm run lint:js || log_warning "JavaScript linting issues found"
        fi
    fi
}

# Main build process
main() {
    local start_time=$(date +%s)

    check_dependencies
    install_dependencies

    if [ "${1:-}" = "--clean" ]; then
        clean_build
    fi

    run_lint
    update_hugo_modules
    build_lit_ssr
    build_hugo
    validate_build

    local end_time=$(date +%s)
    local duration=$((end_time - start_time))

    log_success "Build completed successfully in ${duration}s"

    if [ "$HUGO_ENV" = "development" ]; then
        log_info "To serve locally, run: hugo server"
    fi
}

# Handle script arguments
case "${1:-}" in
    --help|-h)
        echo "Apollo Elements Documentation Build Script"
        echo ""
        echo "Usage: $0 [OPTIONS]"
        echo ""
        echo "Options:"
        echo "  --clean    Clean build artifacts before building"
        echo "  --help     Show this help message"
        echo ""
        echo "Environment Variables:"
        echo "  HUGO_ENV   Set to 'production' for production builds (default: development)"
        echo "  NODE_ENV   Node.js environment (default: development)"
        exit 0
        ;;
    *)
        main "$@"
        ;;
esac