# Contributing to Lumina

Thank you for your interest in contributing to Lumina — an open-source event indexer and GraphQL data layer for the Stellar network. This guide covers everything you need to get started contributing to any part of the project.

---

## Table of Contents

- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Contribution Workflow](#contribution-workflow)
- [Contributing to the Frontend](#contributing-to-the-frontend)
- [Contributing to Contracts](#contributing-to-contracts)
- [Contributing to the GraphQL Server](#contributing-to-the-graphql-server)
- [Contributing to the Indexer](#contributing-to-the-indexer)
- [Contributing to the Database](#contributing-to-the-database)
- [Contributing to Documentation](#contributing-to-documentation)
- [Commit Convention](#commit-convention)
- [Pull Request Process](#pull-request-process)
- [Code of Conduct](#code-of-conduct)

---

## Project Structure

```
lumina/
├── frontend/              Next.js explorer UI (TypeScript, Tailwind CSS v4)
│   ├── app/               App Router pages (dashboard, explorer, accounts, graphql)
│   ├── components/        React components (Navbar, LiveFeed, StatCard, TransactionRow)
│   └── lib/               Horizon client, formatters, GraphQL query examples
│
├── contracts/             Soroban smart contracts (Rust)
│   └── registry/          LuminaRegistry — on-chain contract discovery manifest
│
├── graphql-server/        Apollo GraphQL API server (TypeScript)
│   └── src/               Schema, resolvers, Horizon client, server entry point
│
├── indexer/               Stellar Horizon event indexer (TypeScript)
│   └── src/               Polling loop, event processor, database writer
│
├── db/                    PostgreSQL schema and migrations
│   ├── schema.sql          Tables: ledgers, transactions, operations, accounts, contract_events
│   └── migrations/        Versioned migration files
│
├── docker/
│   └── docker-compose.yml Orchestrates all services locally
│
└── docs/                  Architecture docs and guides
```

---

## Getting Started

### Prerequisites

| Tool | Version | Purpose |
|---|---|---|
| Node.js | ≥ 18 | Frontend, GraphQL server, indexer |
| Rust | stable | Smart contract compilation |
| wasm32-unknown-unknown | via rustup | WASM target for Soroban |
| Stellar CLI | latest | Contract deployment |
| PostgreSQL | ≥ 14 | Database (or use Docker) |
| Docker + Compose | latest | Local full-stack setup |
| Git | any | Version control |

### Install Prerequisites

```bash
# Node.js (via nvm recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 20 && nvm use 20

# Rust + Soroban target
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
rustup target add wasm32-unknown-unknown

# Stellar CLI
cargo install stellar-cli --features opt

# PostgreSQL (macOS)
brew install postgresql@16 && brew services start postgresql@16
```

### Fork and Clone

```bash
git clone https://github.com/YOUR_USERNAME/Lumina.git
cd Lumina
git remote add upstream https://github.com/Lumeeena/Lumina.git
```

---

## Development Setup

### Full Stack (Recommended — Docker)

The fastest way to run everything together:

```bash
docker compose -f docker/docker-compose.yml up
```

Services started:
- PostgreSQL on `localhost:5432`
- Indexer (polling Stellar Horizon)
- GraphQL server on `http://localhost:4000/graphql`
- Frontend on `http://localhost:3000`

### Frontend Only

```bash
cd frontend
npm install
npm run dev       # http://localhost:3000
npm run build     # Verify production build
npm run lint      # TypeScript + ESLint
npm test          # Unit tests
```

### GraphQL Server

```bash
cd graphql-server
npm install
npm run dev       # http://localhost:4000/graphql
npm run build     # Compile TypeScript
```

### Indexer

```bash
cd indexer
npm install
# Requires DATABASE_URL set
DATABASE_URL=postgresql://localhost:5432/lumina npm run dev
```

### Contracts

```bash
cd contracts
cargo build --target wasm32-unknown-unknown --release
cargo test
cargo clippy
```

### Database

```bash
# Apply schema
psql $DATABASE_URL -f db/schema.sql

# Run migrations
psql $DATABASE_URL -f db/migrations/001_init.sql
```

---

## Contribution Workflow

1. **Find an issue** — Browse [open issues](https://github.com/Lumeeena/Lumina/issues) or open one describing your proposed change
2. **Comment** — Indicate you're working on it to avoid duplicated effort
3. **Create a branch** from `main`:
   ```bash
   git checkout -b feat/your-feature-name
   ```
4. **Make your changes** — follow the layer-specific guidelines below
5. **Run checks** — build, lint, and test before opening a PR
6. **Open a Pull Request** — describe what changed and why

### Branch Naming

| Prefix | Use for |
|---|---|
| `feat/` | New feature |
| `fix/` | Bug fix |
| `docs/` | Documentation only |
| `test/` | Test coverage |
| `refactor/` | Code restructuring |
| `style/` | UI/visual changes |
| `chore/` | Tooling, CI, dependencies |
| `perf/` | Performance improvement |

---

## Contributing to the Frontend

The Next.js frontend is in `frontend/`. It uses TypeScript, Tailwind CSS v4, and Lucide React icons.

### Component Guidelines

- **One component per file** — same name as the exported component
- **`'use client'`** only when you need state, effects, or browser APIs
- **Server components by default** — prefer data fetching on the server
- **No inline styles** — Tailwind classes only
- **Accessible** — `aria-label` on icon-only buttons, semantic HTML

### Color Palette

| Purpose | Class |
|---|---|
| Page background | `bg-[#030712]` |
| Card background | `bg-[#0c1222]` |
| Card border | `border-[#162032]` |
| Primary accent | `cyan-400` / `cyan-500` |
| Success / positive | `green-400` |
| Error / failure | `red-400` |
| Muted text | `text-slate-500` |
| Addresses / code | `font-mono text-xs text-cyan-400` |

### Tailwind Conventions

```tsx
// ✅ Good
<div className="p-4 rounded-xl bg-[#0c1222] border border-[#162032] hover:border-cyan-800 transition-colors">

// ❌ Avoid
<div style={{ background: '#0c1222' }}>
```

### Accessibility Requirements

- `aria-label` on all icon-only buttons and links
- All interactive elements reachable by keyboard (Tab/Enter/Escape)
- Color contrast meets WCAG AA minimum
- `<table>` with `<thead>` and `<tbody>` for data tables

### Running Frontend Tests

```bash
cd frontend
npm test                  # Unit tests with Jest
npm run test:coverage     # Coverage report
npx playwright test       # E2E tests
```

---

## Contributing to Contracts

The Soroban contract in `contracts/registry/` implements the on-chain manifest of indexed contracts.

### Adding a Contract Function

1. Edit `contracts/registry/src/lib.rs`
2. Follow existing patterns:
   - State-changing functions must call `require_auth()`
   - Return `Result<T, RegistryError>` — never use `panic!()`
   - Use `checked_add()` / `checked_sub()` for all arithmetic
   - Emit an event via `env.events().publish()` for every state change
3. Update `contracts/registry/Cargo.toml` if adding dependencies
4. Write unit tests using soroban-sdk testutils

### Writing Contract Tests

```rust
#[cfg(test)]
mod tests {
    use super::*;
    use soroban_sdk::testutils::Address as _;
    use soroban_sdk::{Address, Env};

    #[test]
    fn test_register_contract() {
        let env = Env::default();
        env.mock_all_auths();
        let contract_id = env.register(LuminaRegistry, ());
        let client = LuminaRegistryClient::new(&env, &contract_id);
        let admin = Address::generate(&env);
        // ... assertions
    }
}
```

### Building and Verifying

```bash
cd contracts
cargo build --target wasm32-unknown-unknown --release
cargo test
cargo clippy -- -D warnings
```

---

## Contributing to the GraphQL Server

The Apollo GraphQL server is in `graphql-server/`. It serves indexed Stellar data to dApps and the frontend.

### Adding a New Resolver

1. Add the type definition to `graphql-server/src/schema.graphql`
2. Add the resolver function to `graphql-server/src/resolvers.ts`
3. Currently resolvers fall back to Horizon REST API — the goal is to replace these with PostgreSQL queries once the indexer is running
4. Export any new types used by the resolver

### Resolver Pattern

```typescript
// In resolvers.ts
Query: {
  async myNewQuery(_: unknown, args: { limit?: number }) {
    // TODO: replace with db query once indexer is running
    // For now, fetch from Horizon as fallback
    const data = await horizonClient.fetchSomething(args.limit ?? 20);
    return data;
  }
}
```

### Schema Conventions

- Use `camelCase` for field names in GraphQL schema
- Every list query must support `limit: Int` and `cursor: String` for pagination
- Add descriptions (triple-quote strings) to all types and fields
- Non-nullable fields use `!`, nullable fields do not

### Running the GraphQL Server

```bash
cd graphql-server
npm install && npm run dev
# Open http://localhost:4000/graphql for Apollo Sandbox
```

---

## Contributing to the Indexer

The indexer in `indexer/src/index.ts` polls Stellar Horizon for new ledgers and writes data to PostgreSQL.

### Adding a New Data Type to Index

1. Add the table to `db/schema.sql`
2. Create a migration in `db/migrations/`
3. Add a fetch function to `indexer/src/index.ts` that reads from Horizon
4. Write the parsed data to the new table
5. Add a corresponding GraphQL resolver in `graphql-server/src/resolvers.ts`

### Indexer Architecture

```
Horizon REST API
      │  poll every 5s
      ▼
Fetch new ledger(s)
      │
      ├── GET /ledgers/:seq → INSERT INTO ledgers
      ├── GET /ledgers/:seq/transactions → INSERT INTO transactions
      ├── GET /ledgers/:seq/operations → INSERT INTO operations
      └── GET events (Soroban RPC) → INSERT INTO contract_events
```

### Error Handling Requirements

- Never let an indexer error crash the entire process
- Log errors with ledger sequence for debuggability
- Retry failed ledger fetches up to 3 times with exponential backoff
- Update a `failed_ledgers` table for manual review

---

## Contributing to the Database

The PostgreSQL schema is in `db/schema.sql`. All changes must be backward-compatible and delivered as versioned migrations.

### Adding a New Table or Column

1. Add the DDL to `db/schema.sql`
2. Create a new migration file: `db/migrations/00N_description.sql`
3. Migration files must be idempotent — use `CREATE TABLE IF NOT EXISTS` and `ADD COLUMN IF NOT EXISTS`
4. Add appropriate indexes for all foreign keys and frequently-queried columns
5. Test the migration against a fresh database and an existing database

### Migration File Format

```sql
-- Migration 00N: description
-- Applied: YYYY-MM-DD

\echo 'Running migration 00N: description...'

ALTER TABLE transactions ADD COLUMN IF NOT EXISTS memo_hash TEXT;
CREATE INDEX IF NOT EXISTS idx_transactions_memo_hash ON transactions (memo_hash);

INSERT INTO schema_migrations (version, applied_at)
VALUES ('00N_description', NOW())
ON CONFLICT (version) DO NOTHING;

\echo 'Migration 00N complete.'
```

### Index Guidelines

- Index every column used in `WHERE`, `ORDER BY`, or `JOIN` clauses
- Use `GIN` indexes for JSONB columns (`details`, `topics`)
- Use partial indexes for filtered queries (e.g., `WHERE successful = true`)

---

## Contributing to Documentation

Documentation lives in `docs/` and at the repo root.

### Standards

- Clear, direct language — explain jargon on first use
- All code examples must be complete and runnable
- Every new GraphQL type needs a description in `schema.graphql`
- Every new indexer data type needs an entry in the data types table in `README.md`

### Markdown Style

- `##` for major sections, `###` for subsections
- Tables for structured data (columns, parameters, error codes)
- Code blocks with language tags: ` ```typescript `, ` ```rust `, ` ```sql `, ` ```bash `

---

## Commit Convention

Lumina uses [Conventional Commits](https://www.conventionalcommits.org/).

### Format

```
<type>(<scope>): <short description>

[optional body]
[optional footer: Closes #issue]
```

### Types

| Type | When to Use |
|---|---|
| `feat` | New feature or capability |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Formatting, no logic change |
| `refactor` | Code restructuring |
| `test` | Adding or updating tests |
| `chore` | Build, CI, dependencies |
| `perf` | Performance improvement |

### Scopes

Use the package name: `feat(frontend):`, `fix(indexer):`, `docs(graphql):`, `test(contracts):`, `chore(db):`

### Examples

```
feat(indexer): implement ledger polling with exponential backoff
fix(frontend): handle null ledger response in StatCard
docs(graphql): add description fields to Transaction and Account types
test(contracts): add register_contract() unit tests
feat(graphql): wire transactions resolver to PostgreSQL
perf(indexer): batch insert operations in chunks of 100
```

---

## Pull Request Process

1. **Title** — follow the commit convention format
2. **Description** — explain what changed, why, and how to test it
3. **CI** — all checks must pass (build, lint, test, DB schema validation)
4. **Review** — at least one maintainer approval required
5. **Squash merge** — PRs are squash-merged to keep history clean

### Checklist Before Opening a PR

- [ ] Code builds without errors
- [ ] Tests pass (existing and new)
- [ ] Lint passes with no warnings
- [ ] Database migrations are backward-compatible
- [ ] Documentation updated for any public API changes
- [ ] No hardcoded secrets, API keys, or wallet addresses
- [ ] Conventional commit message format used

---

## Code of Conduct

Lumina is committed to a welcoming, inclusive community.

- Be respectful and constructive in all interactions
- Assume good intent from other contributors
- Focus feedback on code and ideas, never on people
- Report issues to the maintainers privately before making them public

We follow the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/).

---

## Questions?

- **GitHub Issues** — for bugs and specific task tracking
- **GitHub Discussions** — for design questions and feature proposals

Thank you for helping make Stellar network data accessible to everyone!
