#!/bin/bash
set -e

# Build client
cd packages/client
NODE_ENV=production npx rspack build

# Copy to root for Vercel
cd ../..
cp -r packages/client/build ./build

echo "Build completed successfully!"
