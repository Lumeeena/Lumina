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
