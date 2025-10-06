#!/bin/bash
# Flutter Build Fix Script for Linux/Mac
# Fixes the "_$ProductFromJson not found" error

echo "========================================"
echo "Flutter Build Fix Script"
echo "========================================"
echo ""

echo "Step 1/4: Cleaning Flutter project..."
flutter clean
if [ $? -ne 0 ]; then
    echo "ERROR: Flutter clean failed!"
    exit 1
fi
echo "✓ Clean completed"
echo ""

echo "Step 2/4: Getting dependencies..."
flutter pub get
if [ $? -ne 0 ]; then
    echo "ERROR: Flutter pub get failed!"
    exit 1
fi
echo "✓ Dependencies installed"
echo ""

echo "Step 3/4: Running code generation..."
flutter pub run build_runner build --delete-conflicting-outputs
if [ $? -ne 0 ]; then
    echo "ERROR: Code generation failed!"
    exit 1
fi
echo "✓ Code generated successfully"
echo ""

echo "Step 4/4: Build complete! You can now run your app with:"
echo "flutter run -d <device-id>"
echo ""
