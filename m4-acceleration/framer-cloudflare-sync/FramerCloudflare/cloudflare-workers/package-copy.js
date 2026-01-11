{
  "name": "9bit-integrator",
  "version": "1.0.0",
  "description": "Cloudflare Worker for 9Bit Studios integrations",
  "main": "src/worker.js",
  "scripts": {
    "build": "npm run format",
    "dev": "wrangler dev",
    "deploy:staging": "wrangler deploy --env staging",
    "deploy:production": "wrangler deploy --env production",
    "deploy:staging:script": "./scripts/deploy-staging.sh",
    "deploy:production:script": "./scripts/deploy-production.sh",
    "format": "prettier --write '**/*.{js,css,json,md}'",
    "test": "node test-fetch.js",
    "test:framer": "node test-framer-integration.js",
    "test:m4": "node test-m4-optimization.js",
    "test:pixel": "node test-pixel-preview.js",
    "setup-dns": "node scripts/setup-dns.js",
    "check-dns": "node scripts/check-dns.js",
    "logs": "wrangler tail --format=pretty"
  },
  "author": "9Bit Studios",
  "license": "UNLICENSED",
  "private": true,
  "devDependencies": {
    "dotenv": "^16.5.0",
    "node-fetch": "^2.7.0",
    "prettier": "^2.8.8",
    "wrangler": "^4.14.4"
  },
  "dependencies": {
    "itty-router": "^4.0.14"
  }
}
