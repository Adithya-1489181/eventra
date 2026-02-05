#!/bin/bash

# Eventra Client - Quick Start Script

echo "🎉 Setting up Eventra Client..."

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Please edit .env with your Firebase credentials before continuing!"
    echo "Press any key when ready..."
    read -n 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Clear any existing build
echo "🧹 Cleaning up..."
rm -rf build

echo "✅ Setup complete!"
echo ""
echo "🚀 To start the development server, run:"
echo "   npm start"
echo ""
echo "📚 For more information, see:"
echo "   - CLIENT_README.md (comprehensive documentation)"
echo "   - SETUP_COMPLETE.md (what's been built)"
echo ""
echo "Happy coding! 🎨"
