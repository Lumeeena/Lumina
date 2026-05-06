# Lumina

> Open-source event indexer and GraphQL data layer for the Stellar network.

![License](https://img.shields.io/badge/license-MIT-cyan)
![Stellar Ecosystem](https://img.shields.io/badge/ecosystem-Stellar-blue)
![Drips Wave](https://img.shields.io/badge/Drips-Wave%20Contributor-green)
![TypeScript](https://img.shields.io/badge/language-TypeScript-blue)
![Next.js](https://img.shields.io/badge/framework-Next.js%2016-black)
![Live Data](https://img.shields.io/badge/data-Stellar%20Mainnet-cyan)

---

## Overview

Lumina is an open-source event indexer and GraphQL data layer for the Stellar network. It fetches real-time data from Stellar Horizon, indexes transactions, operations, account states, and Soroban contract events, and exposes them through a developer-friendly query interface.

Building on Stellar currently requires direct integration with Horizon's REST API — which returns raw JSON that developers must parse, paginate, and transform themselves. Lumina abstracts this complexity. The indexer ingests Horizon event streams, normalizes them into a consistent schema, and exposes them via a GraphQL endpoint that any developer can query with a single request.

Lumina complements Stellar's own data initiatives — including Galexie and the Composable Data Platform — by adding the developer-facing query layer that makes this data usable without infrastructure overhead.

---

## Features

- **Live transaction feed** — Real-time Stellar mainnet transactions, auto-refreshed every 30 seconds
- **Account explorer** — Search any Stellar account; view balances, sequence, flags, subentries, and history
- **Transaction browser** — Browse recent transactions with filter by status (successful/failed)
- **Operation history** — Per-account operation list with type, timestamp, and visual labels
- **GraphQL playground** — Interactive query editor with 4 example queries and mock response rendering
- **Real Horizon integration** — All data fetched live from `https://horizon.stellar.org`
- **Error states** — Graceful handling of unfunded accounts, Horizon timeouts, and rate limits
- **Network stats** — Live ledger sequence, transaction count, operation count from the latest ledger
- **Copy-to-clipboard** — One-click address copying on account detail pages

---

## Architecture

```
Stellar Network
     │
     ▼
Horizon REST API (horizon.stellar.org)
     │  /transactions  /accounts  /operations  /ledgers
     │
     ▼
Lumina Data Layer (lib/horizon.ts)
     │  getRecentTransactions()
     │  getAccount()
     │  getAccountTransactions()
     │  getAccountOperations()
     │  getLatestLedger()
     │
     ▼
Next.js Pages
     │  / (dashboard)         → StatCard + LiveFeed
     │  /explorer             → search + transaction table
     │  /transactions         → full transaction browser
     │  /accounts/[address]   → account detail
     │  /graphql              → playground
     │
     ▼
Developer / End User
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Icons | Lucide React |
| Data Source | Stellar Horizon REST API |
| GraphQL (planned) | Apollo Server |
| Storage (planned) | PostgreSQL |

---

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm, yarn, or pnpm

### Installation

```bash
git clone https://github.com/Lumeeena/Lumina.git
cd Lumina
npm install
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The dashboard loads live Stellar mainnet data immediately.

---

## API Reference

### `getRecentTransactions(limit?)`

Fetches the most recent transactions from Stellar Mainnet.

```typescript
import { getRecentTransactions } from '@/lib/horizon';
const txs = await getRecentTransactions(20);
// Returns: HorizonTransaction[]
```

### `getAccount(address)`

Fetches full account details including balances, flags, and thresholds.

```typescript
import { getAccount } from '@/lib/horizon';
const account = await getAccount('GABC...1234');
// Returns: HorizonAccount | null
```

### `getAccountTransactions(address, limit?)`

```typescript
const txs = await getAccountTransactions('GABC...1234', 10);
```

### `getAccountOperations(address, limit?)`

```typescript
const ops = await getAccountOperations('GABC...1234', 10);
```

### `getLatestLedger()`

```typescript
const ledger = await getLatestLedger();
// { sequence, closed_at, transaction_count, operation_count }
```

---

## GraphQL Schema (Planned)

```graphql
type Query {
  transactions(limit: Int, order: Order, cursor: String): [Transaction!]!
  transaction(hash: String!): Transaction
  account(address: String!): Account
  operations(account: String, type: OperationType, limit: Int): [Operation!]!
  events(contractId: String!, limit: Int): [ContractEvent!]!
}

type Transaction {
  hash: String!
  ledger: Int!
  createdAt: String!
  sourceAccount: String!
  operationCount: Int!
  successful: Boolean!
  feeCharged: String!
}

type Account {
  address: String!
  sequence: String!
  subentryCount: Int!
  balances: [Balance!]!
  flags: AccountFlags!
}

type Balance {
  asset: String!
  balance: String!
  limit: String
}

type ContractEvent {
  id: String!
  contractId: String!
  ledger: Int!
  createdAt: String!
  topics: [String!]!
  value: JSON
}
```

---

## Supported Data Types

| Data Type | Status | Source |
|---|---|---|
| Transactions | Live | Horizon `/transactions` |
| Account Balances | Live | Horizon `/accounts/:id` |
| Account Operations | Live | Horizon `/accounts/:id/operations` |
| Ledger Stats | Live | Horizon `/ledgers` |
| Soroban Contract Events | Coming Soon | Horizon RPC |
| GraphQL Server | Coming Soon | Apollo Server |
| Historical Storage | Coming Soon | PostgreSQL + Galexie |
