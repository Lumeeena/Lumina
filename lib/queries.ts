export interface QueryExample {
  name: string;
  description: string;
  query: string;
  mockResult: object;
}

export const QUERY_EXAMPLES: QueryExample[] = [
  {
    name: "Recent Transactions",
    description: "Fetch the last 5 transactions on the network",
    query: `query RecentTransactions {
  transactions(limit: 5, order: DESC) {
    hash
    ledger
    createdAt
    sourceAccount
    operationCount
    successful
    feeCharged
  }
}`,
    mockResult: {
      transactions: [
        { hash: "a3f2e1b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2", ledger: 52481234, createdAt: "2026-05-06T10:22:14Z", sourceAccount: "GABC...1234", operationCount: 1, successful: true, feeCharged: "100" },
        { hash: "b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5", ledger: 52481233, createdAt: "2026-05-06T10:22:09Z", sourceAccount: "GDEF...5678", operationCount: 2, successful: true, feeCharged: "200" },
      ],
    },
  },
  {
    name: "Account Balances",
    description: "Get all asset balances for an account",
    query: `query AccountBalances($address: String!) {
  account(address: $address) {
    address
    sequence
    subentryCount
    balances {
      asset
      balance
      limit
    }
  }
}`,
    mockResult: {
      account: {
        address: "GABC...1234",
        sequence: "192837465019283746",
        subentryCount: 3,
        balances: [
          { asset: "XLM", balance: "1234.5678901", limit: null },
          { asset: "USDC:GA5ZSE...KZVN", balance: "500.0000000", limit: "10000.0000000" },
        ],
      },
    },
  },
];
