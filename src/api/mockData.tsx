import { Account, IlliquidAccount, Security, Transaction } from "../models/Types";

// Mock Accounts Data
export const mockAccounts: Account[] = [
    {
      id: 1,
      name: "Primary Checking",
      number: "****1234",
      type: "Checking",
      currency: "USD",
      balance: 12345.67
    },
    {
      id: 2,
      name: "High Yield Savings",
      number: "****5678",
      type: "Savings",
      currency: "USD",
      balance: 87654.32
    },
    {
      id: 3,
      name: "Investment Portfolio",
      number: "****9012",
      type: "Brokerage",
      currency: "USD",
      balance: 543210.98
    },
    {
      id: 4,
      name: "401(k)",
      number: "****3456",
      type: "Retirement",
      currency: "USD",
      balance: 987654.32
    }
  ];
  
  // Mock Illiquid Accounts Data
  export const mockIlliquidAccounts: IlliquidAccount[] = [
    {
      id: 101,
      name: "Downtown Commercial Property",
      type: "Real Estate",
      currency: "USD",
      balance: 2500000,
      investedAmout: 1750000,
      totalCommitment: 2000000,
      nav: "2.3M",
      distribution: "120K/year"
    },
    {
      id: 102,
      name: "Tech Startup Fund",
      type: "Private Equity",
      currency: "USD",
      balance: 750000,
      investedAmout: 500000,
      totalCommitment: 1000000,
      nav: "850K",
      distribution: "0"
    },
    {
      id: 103,
      name: "Residential Complex",
      type: "Real Estate",
      currency: "USD",
      balance: 3750000,
      investedAmout: 3500000,
      totalCommitment: 3500000,
      nav: "4.1M",
      distribution: "210K/year"
    }
  ];
  
  // Mock Securities Data
  export const mockSecurities: Record<number, Security[]> = {
    3: [
      {
        logo: 'https://logo.clearbit.com/nvidia.com',
        name: 'Nvidia',
        description: 'Preference shares',
        quantity: '10,579',
        price: '$ 109',
        trend: '-3.8%',
        trendDirection: 'down',
        amount: '$ 1,150,000',
        date: '03/04/2025'
      },
      {
        logo: 'https://logo.clearbit.com/adobe.com',
        name: 'Adobe',
        description: 'Ordinary shares',
        quantity: '8,672',
        price: '$ 213',
        trend: '+13.8%',
        trendDirection: 'up',
        amount: '$ 1,850,000',
        date: '29/03/2025'
      },
      {
        logo: 'https://logo.clearbit.com/apple.com',
        name: 'Apple',
        description: 'Voting shares',
        quantity: '5,000',
        price: '$ 500',
        trend: '+6.2%',
        trendDirection: 'up',
        amount: '$ 2,500,000',
        date: '10/03/2025'
      },
      {
        logo: 'https://logo.clearbit.com/google.com',
        name: 'Google',
        description: 'Cumulative preference shares',
        quantity: '3,783',
        price: '$ 238',
        trend: '+6.9%',
        trendDirection: 'up',
        amount: '$ 900,000',
        date: '18/02/2025'
      }
    ],
    4: [
      {
        logo: 'https://logo.clearbit.com/vanguard.com',
        name: 'Vanguard Total Market ETF',
        description: 'Index fund',
        quantity: '15,230',
        price: '$ 45',
        trend: '+4.2%',
        trendDirection: 'up',
        amount: '$ 685,350',
        date: '25/03/2025'
      },
      {
        logo: 'https://logo.clearbit.com/fidelity.com',
        name: 'Fidelity 500 Index Fund',
        description: 'Index fund',
        quantity: '12,875',
        price: '$ 63',
        trend: '+3.5%',
        trendDirection: 'up',
        amount: '$ 811,125',
        date: '25/03/2025'
      }
    ]
  };

export const mockTransactions: Transaction[] = [
    {
      date: '03/04/2025',
      quantity: 2500,
      amount: 500.00,
      currency: 'USD',
      direction: 'Buy',
      senderRecipient: 'John Doe',
      description: 'Buy for diversification'
    },
    {
      date: '29/03/2025',
      quantity: 500,
      amount: -50.00,
      currency: 'USD',
      direction: 'Seil',
      senderRecipient: 'James Smith',
      description: 'Seil because of major news event'
    },
    {
      date: '10/03/2025',
      quantity: 1000,
      amount: 200.00,
      currency: 'USD',
      direction: 'Buy',
      senderRecipient: 'Michael Williams',
      description: 'Buy for low entry point'
    },
    {
      date: '18/02/2025',
      quantity: 2000,
      amount: 300.00,
      currency: 'USD',
      direction: 'Buy',
      senderRecipient: 'David Miller',
      description: 'Buy for diversification'
    }
  ];