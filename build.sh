#!/bin/bash
echo "Forcing npm usage for build..."
export USE_NPM=true
export DISABLE_PNPM=true
npm install
npm run build