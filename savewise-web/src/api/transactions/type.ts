export type FundTransaction = {
  id: string;
  date: string;
  amount: number;
  description: string;
  fundCollectionId: string;
};

export type CreateFundTransactionRequest = {
  date: string;
  description: string;
  amount: number;
  fundCollectionId: string;
};

export type Transaction = {
  id: string;
  date: string;
  amount: number;
  description: string;
  fundCollectionId: string;
  expenseCollectionId?: string;
};

export type AddFundRequest = Omit<Transaction, "id" | "expenseCollectionId">;

export type AddExpenseTransactionRequest = Omit<Transaction, "id">;

export type UpdateExpenseTransactionRequest = Omit<
  Transaction,
  "id" | "expenseCollectionId" | "transactionType"
>;
