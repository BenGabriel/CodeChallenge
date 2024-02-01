export type UserType = {
  email: string;
  name: string;
  phone: string;
  pin?: string;
};
export type TransactionType = {
  accountName: string;
  accountNumber: string;
  amount: string;
  bank: string | undefined;
  type: string;
  date: number;
};

export type WalletType = {
  balance: number;
};

export type NotificationType = {
  title: string;
  data: string;
  body: string;
};
