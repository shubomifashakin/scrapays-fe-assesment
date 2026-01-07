# Scrapays Frontend Assessment

Frontend repository for the Scrapays assessment

## Features

- Secure authentication with Auth0
- Book management interface with CRUD operations
- GraphQL client for data management

## Directories

- [src/](src) - Main application source code
  - `components/` - UI components
  - `pages/` - Page components
  - `data-service/` - Graphql and data management logic
  - `types/` - TypeScript type definitions

## Tech Stack

- React 19
- TypeScript
- Vite (build tool)
- Chakra UI (component library)
- Apollo Client (GraphQL client)
- Auth0 React SDK (authentication)
- React Router (routing)

## Getting Started

- Clone the repository
- Install dependencies: npm i
- Set up environment variables (create .env file)

```
VITE_AUTH0_DOMAIN=YOUR_AUTH0_DOMAIN
VITE_AUTH0_CLIENT_ID=YOUR_AUTH0_CLIENT_ID
VITE_AUTH0_AUDIENCE=YOUR_AUTH0_AUDIENCE
VITE_GRAPHQL_URL=YOUR_GRAPHQL_URL
```

- Start the development server: npm run dev
