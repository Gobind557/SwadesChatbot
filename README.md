# Customer Support System

A fullstack AI-ready customer support system built with multi-agent architecture, deterministic routing, and Hono RPC for end-to-end type safety.

## Tech Stack

- **Monorepo**: Turborepo
- **Backend**: Hono (Bun runtime)
- **Frontend**: React (Vite)
- **Database**: PostgreSQL + Drizzle ORM
- **API Typing**: Hono RPC

## Architecture

Controller → Service → Agent → Tool → DB

- **Router Agent**: Hardcoded keyword-based routing (support, order, billing, fallback)
- **Agents**: SupportAgent, OrderAgent, BillingAgent
- **Tools**: Database-driven tools for fetching data
- **Service Layer**: ChatService handles context, routing, execution, persistence

## Project Structure

```
apps/
  web/          # React frontend
  server/       # Hono backend
packages/
  api/          # Shared AppType
  db/           # Drizzle schema & client
  config/       # Configuration
```

## Setup

1. **Install PostgreSQL** and create a database named `customer_support`.

2. **Copy environment variables**:

   ```bash
   cp .env.example .env
   ```

   Update `DATABASE_URL` with your PostgreSQL connection string.

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Run migrations**:

   ```bash
   cd packages/db
   npx drizzle-kit generate
   npx drizzle-kit migrate
   ```

5. **Seed the database**:

   ```bash
   cd packages/db
   npx tsx seed.ts
   ```

6. **Start development servers**:
   ```bash
   npm run dev
   ```

- **Frontend**: `http://localhost:5173`
- **Backend**: `http://localhost:3000`

## API Endpoints

- `POST /api/chat/messages` - Send a chat message
- `GET /api/chat/conversations` - List conversations
- `GET /api/chat/conversations/:id` - Get conversation details
- `DELETE /api/chat/conversations/:id` - Delete conversation
- `GET /api/agents` - List agents
- `GET /api/agents/:type/capabilities` - Get agent capabilities
- `GET /api/health` - Health check

## Response Format

```json
{
  "response": "string",
  "agent": "support" | "order" | "billing",
  "reasoning": "string"
}
```

## Future Enhancements

- Replace hardcoded router with LLM-based routing
- Add streaming responses
- Implement rate limiting
- Add authentication
