import apiClient from '../api/apiClient';
import { ENDPOINTS } from '../api/endpoints';
import { mockAccounts, mockIlliquidAccounts, mockSecurities, mockTransactions } from '../api/mockData';
import { Account, IlliquidAccount, Security, Transaction } from '../models/Types';

// Utility to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock implementation flag (set to false to use real API)
const USE_MOCK_API = true;

export const accountService = {
  // Get all accounts
  getAccounts: async (): Promise<Account[]> => {
    if (USE_MOCK_API) {
      // Simulate API delay
      await delay(800);
      return [...mockAccounts];
    } else {
      return (await apiClient.get<Account[]>(ENDPOINTS.ACCOUNTS.BASE)).data;
    }
  },

  // Get account by ID
  getAccountById: async (accountId: number): Promise<Account> => {
    if (USE_MOCK_API) {
      await delay(500);
      const account = mockAccounts.find(acc => acc.id === accountId);
      if (!account) {
        throw new Error(`Account with ID ${accountId} not found`);
      }
      return { ...account };
    } else {
      return (await apiClient.get<Account>(ENDPOINTS.ACCOUNTS.BY_ID(accountId))).data;
    }
  },

  // Get securities for a specific account
  getAccountSecurities: async (accountId: number): Promise<Security[]> => {
    if (USE_MOCK_API) {
      await delay(700);
      const securities = mockSecurities[accountId];
      if (!securities) {
        // Return empty array if no securities found for this account
        return [];
      }
      return [...securities];
    } else {
      return (await apiClient.get<Security[]>(ENDPOINTS.ACCOUNTS.SECURITIES(accountId))).data;
    }
  },

  getAccountTransactions: async (accountId: number): Promise<Transaction[]> => {
    if (USE_MOCK_API) {
      await delay(700);
      const transactions = mockTransactions;
      if (!transactions) {
        // Return empty array if no securities found for this account
        return [];
      }
      return [...transactions];
    } else {
      return (await apiClient.get<Transaction[]>(ENDPOINTS.ACCOUNTS.TRANSACTIONS(accountId))).data;
    }
  },

  // Get all illiquid accounts
  getIlliquidAccounts: async () => {
    if (USE_MOCK_API) {
      await delay(800);
      return [...mockIlliquidAccounts];
    } else {
      return (await apiClient.get<IlliquidAccount[]>(ENDPOINTS.ILLIQUID_ACCOUNTS.BASE)).data;
    }
  },

  // Get illiquid account by ID
  getIlliquidAccountById: async (accountId: number): Promise<IlliquidAccount> => {
    if (USE_MOCK_API) {
      await delay(500);
      const account = mockIlliquidAccounts.find(acc => acc.id === accountId);
      if (!account) {
        throw new Error(`Illiquid account with ID ${accountId} not found`);
      }
      return { ...account };
    } else {
      return (await apiClient.get<IlliquidAccount>(ENDPOINTS.ILLIQUID_ACCOUNTS.BY_ID(accountId))).data;
    }
  },
};