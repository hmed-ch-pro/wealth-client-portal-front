
export interface orgSettings {
    name: string;
    logo: string;
    portalMode: string;
}


export interface personalSettings {
    fullName: string;
    phoneNumber: string;
    emailAddress: string;
    password: string;
}


export interface Account {
    id: number;
    name: string;
    number: string;
    type: "Checking" | "Savings" | "Brokerage" | "Retirement";
    currency: string;
    balance: number;
}


export interface IlliquidAccount {
    id: number;
    name: string;
    type: "Real Estate" | "Private Equity";
    currency: string;
    balance: number;
    investedAmout: number;
    totalCommitment: number;
    nav : string;
    distribution: string;
  }


  // src/models/Security.ts
export interface Security {
    logo: string;
    name: string;
    description: string;
    quantity: string;
    price: string;
    trend: string;
    trendDirection: 'up' | 'down';
    amount: string;
    date: string;
  }

export interface Transaction {
    date: string;
    quantity: number;
    amount: number;
    currency: string;
    direction: string;
    senderRecipient: string;
    description: string;
}