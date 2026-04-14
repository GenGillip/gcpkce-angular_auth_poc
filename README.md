# Genesys Cloud PKCE Auth POC

Angular app demonstrating the Genesys Cloud OAuth [PKCE authorization flow](https://developer.genesys.cloud/authorization/platform-auth/use-pkce) using the `purecloud-platform-client-v2` JavaScript SDK.

After authentication it calls:
- `GET /api/v2/users/me`
- `GET /api/v2/organizations/me`

## Prerequisites

- Node.js (v22+)
- A Genesys Cloud OAuth client configured with:
  - Grant Type: **Code Authorization**
  - Authorized Redirect URI: `http://localhost:4200/`

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy the example environment file and fill in your values:
   ```bash
   cp src/environments/environment.example.ts src/environments/environment.ts
   cp src/environments/environment.example.ts src/environments/environment.prod.ts
   ```

3. Edit `src/environments/environment.ts` with your Genesys Cloud OAuth client ID and region:
   ```typescript
   export const environment = {
     production: false,
     genesysCloud: {
       clientId: 'your-actual-client-id',
       region: 'mypurecloud.com',
     },
   };
   ```

4. Start the dev server:
   ```bash
   ng serve
   ```

5. Open `http://localhost:4200/` and click **Log in to Genesys Cloud**.

## Build

```bash
ng build
```

Build artifacts are output to `dist/`.
