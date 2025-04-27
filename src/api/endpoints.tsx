// src/api/endpoints.ts
export const ENDPOINTS = {
    ACCOUNTS: {
      BASE: '/accounts',
      BY_ID: (id: number): string => `/accounts/${id}`,
      SECURITIES: (id: number): string => `/accounts/${id}/securities`,
      TRANSACTIONS: (id: number): string => `/accounts/${id}/transactions`,
      SECURITIETRANSACTIONS: (id: number): string => `/accounts/${id}/transactions`

    },
    ILLIQUID_ACCOUNTS: {
      BASE: '/illiquid-accounts',
      BY_ID: (id: number): string => `/illiquid-accounts/${id}`,
      TRANSACTIONS: (id: number): string => `/accounts/${id}/transactions`
    }
  };