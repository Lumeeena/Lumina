# Lumina

> Open-source event indexer and GraphQL data layer for the Stellar network.

![License](https://img.shields.io/badge/license-MIT-cyan)
![Stellar Ecosystem](https://img.shields.io/badge/ecosystem-Stellar-blue)
![TypeScript](https://img.shields.io/badge/language-TypeScript-blue)
![Rust](https://img.shields.io/badge/language-Rust-orange)

---

## Overview

Lumina is an open-source event indexer and GraphQL data layer for the Stellar network. It polls Stellar Horizon for new ledgers, indexes transactions, operations, accounts, and Soroban contract events into PostgreSQL, and serves them via an Apollo GraphQL API — all queryable from a polished Next.js explorer frontend.

The **Lumina Registry** is an on-chain Soroban contract that lets any project register their contract address for priority indexing. This creates a decentralized, permissionless index manifest — the Lumina indexer polls the Registry to discover what to index next.

---

## Repository Structure

```
lumina/
├── frontend/              # Next.js explorer UI
│   ├── app/               # App Router pages
│   ├── components/        # React components
│   ├── lib/               # Horizon client + formatters
│   └── package.json
│
├── contracts/             # Soroban smart contracts (Rust)
│   ├── registry/          # LuminaRegistry — on-chain contract index
│   │   └── src/lib.rs
│   └── Cargo.toml
│
├── graphql-server/        # Apollo GraphQL API server
│   ├── src/
│   │   ├── schema.graphql # Full typed schema
│   │   ├── resolvers.ts   # Resolver stubs (wired to Horizon; TODO: PostgreSQL)
│   │   ├── horizon.ts     # Horizon HTTP client (server-side copy)
│   │   └── index.ts       # Server entrypoint
│   └── package.json
│
├── indexer/               # Stellar Horizon event indexer → PostgreSQL
│   ├── src/
│   │   └── index.ts       # Poll loop: new ledgers → transactions → operations → events
│   └── package.json
│
├── db/                    # PostgreSQL schema + migrations
│   ├── schema.sql         # Tables: ledgers, transactions, operations, accounts, contract_events
│   └── migrations/
│       └── 001_init.sql
│
├── docker/
│   └── docker-compose.yml # Runs all 4 services together
│
├── .github/
│   └── workflows/ci.yml   # CI for frontend, graphql-server, indexer, contracts, DB
│
└── README.md
```

---

## How It Works

```
Stellar Network
      │
      ▼
Horizon REST API  ←────────────── Soroban RPC (for contract events)
      │
      ▼
┌─────────────────────────────┐
│   Lumina Indexer (indexer/) │  ← polls every 5 seconds
│   Ledgers → Transactions    │
│   Operations → Events       │
└────────────┬────────────────┘
             │ writes
             ▼
       PostgreSQL (db/)
             │ reads
             ▼
┌─────────────────────────────┐
│ Apollo GraphQL Server       │  ← graphql-server/
│ (graphql-server/)           │
└────────────┬────────────────┘
             │ serves
             ▼
┌─────────────────────────────┐
│ Next.js Explorer Frontend   │  ← frontend/
│ Live feed, account search,  │
│ GraphQL playground          │
└─────────────────────────────┘

           +
┌─────────────────────────────┐
│ Lumina Registry (contracts/)│  ← on Stellar/Soroban
│ Projects register contracts │
│ Indexer discovers & indexes │
└─────────────────────────────┘
```

---

## Lumina Registry Contract

The Registry is a Soroban contract that acts as an on-chain manifest of which contracts Lumina indexes. Any project can call `register_contract()` to add their contract to the index.

```rust
// Register your contract for Lumina indexing
registry.register_contract(
    owner,
    contract_id,
    "My Protocol",
    "A DeFi protocol on Stellar"
)
```

The Lumina indexer polls `get_contract_count()` and fetches new entries, then begins indexing events from those contracts automatically.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16, TypeScript, Tailwind CSS v4 |
| GraphQL API | Apollo Server 4, TypeScript |
| Indexer | Node.js, TypeScript, node-fetch |
| Contracts | Soroban (Rust), soroban-sdk v22 |
| Database | PostgreSQL 16 |
| Orchestration | Docker Compose |
| CI | GitHub Actions |

---

## Getting Started

### Prerequisites
- Node.js 18+, Rust (stable), Docker + Docker Compose

### Run with Docker (recommended)

```bash
git clone https://github.com/Lumeeena/Lumina.git
cd Lumina
docker compose -f docker/docker-compose.yml up
```

- Explorer: http://localhost:3000
- GraphQL: http://localhost:4000/graphql
- PostgreSQL: localhost:5432

### Run locally (development)

```bash
# Frontend
cd frontend && npm install && npm run dev

# GraphQL server
cd graphql-server && npm install && npm run dev

# Indexer
cd indexer && npm install && npm run dev

# Contracts
cd contracts && cargo build --target wasm32-unknown-unknown --release
```

---

## Roadmap

- [ ] Wire GraphQL resolvers to PostgreSQL (replace Horizon fallback)
- [ ] Implement the indexer poll loop with full DB writes
- [ ] Soroban contract event indexing via RPC
- [ ] Deploy Lumina Registry to Stellar testnet
- [ ] Webhook subscriptions (Server-Sent Events)
- [ ] Self-hosted deployment guide
- [ ] Custom indexer schemas (like subgraphs)

---

## Contributing

We welcome contributions across all layers — frontend, contracts, GraphQL server, indexer, and database. See [CONTRIBUTING.md](./CONTRIBUTING.md) for a full guide.

Good first issues:
- Wire a GraphQL resolver to the PostgreSQL `transactions` table
- Implement one indexer loop iteration (fetch ledger → write to DB)
- Write Rust tests for the Registry contract
- Add a `Dockerfile` for each service
- Add cursor-based pagination to the transactions page

---

## License

MIT — free to use, modify, and distribute.
