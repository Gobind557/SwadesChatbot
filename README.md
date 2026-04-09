# SwadesChatbot

SwadesChatbot is a full-stack AI-powered customer support platform built with a multi-agent architecture. It routes user queries to specialized support, order, and billing agents, persists conversations in PostgreSQL, and uses Hono RPC for end-to-end type safety across the monorepo.

## Why This Project Stands Out

- Multi-agent customer support flow with specialized routing
- End-to-end typed API communication using Hono RPC
- PostgreSQL persistence with Drizzle ORM
- Monorepo structure for clean frontend/backend sharing
- Lightweight React + Vite frontend for fast iteration

## Core Flow

User Message -> Router Agent -> Specialized Agent -> Tool -> Database -> Response

## Tech Stack

- Monorepo: Turborepo
- Frontend: React + Vite
- Backend: Hono + Node
- Database: PostgreSQL
- ORM: Drizzle ORM
- Shared API typing: Hono RPC

## Architecture

The app follows a modular request pipeline:

- Controller layer handles HTTP requests and validation
- Service layer manages chat flow, persistence, and orchestration
- Router agent decides which specialized agent should respond
- Specialized agents handle support, order, and billing queries
- Tools encapsulate database access and domain-specific lookups

## Project Structure

```text
apps/
  server/     Hono backend
  web/        React frontend

packages/
  api/        Shared AppType exports
  config/     Shared runtime configuration
  db/         Drizzle schema, client, migrations, seed data
```

## Features

- Send customer chat messages through `POST /api/chat/messages`
- Route queries to support, order, or billing logic
- Store conversations and assistant replies in PostgreSQL
- Inspect saved conversations through chat endpoints
- Share types between backend and frontend

## API Overview

- `POST /api/chat/messages` - send a message
- `GET /api/chat/conversations` - list conversations
- `GET /api/chat/conversations/:id` - get one conversation with messages
- `DELETE /api/chat/conversations/:id` - delete one conversation
- `GET /api/agents` - list registered agents
- `GET /api/agents/:type/capabilities` - inspect agent capabilities
- `GET /api/health` - health check

## Example Response

```json
{
  "response": "I'm here to help with your general queries. How can I assist you?",
  "agent": "support",
  "reasoning": "General support query detected",
  "conversationId": 1
}
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Create the environment file

```bash
cp .env.example .env
```

Update `DATABASE_URL` inside `.env` with your PostgreSQL connection string.

### 3. Create the database

Create a PostgreSQL database named `customer_support`.

### 4. Run migrations

```bash
cd packages/db
npx drizzle-kit generate
npx drizzle-kit migrate
```

### 5. Seed sample data

```bash
cd packages/db
npx tsx seed.ts
```

### 6. Start the app

```bash
npm run dev
```

## Local URLs

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`

## Development Notes

- `.env` is local-only and should not be committed
- Schema exports live in `packages/db`
- Shared app typing is re-exported from `packages/api`
- The current router uses keyword-based deterministic logic

## Roadmap

- Replace keyword routing with LLM-based intent classification
- Add streaming responses
- Add authentication and session ownership
- Improve frontend UI and conversation history browsing
- Add tests for routing and service behavior

## License

This project is available for learning, experimentation, and further extension.
