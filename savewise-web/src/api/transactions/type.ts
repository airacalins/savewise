export enum TransactionType {
  Debit = "Debit",
  Credit = "Credit",
}
export type Transaction = {
  id: string;
  date: string;
  amount: number;
  description: string;
  fundCollectionId: string;
  expenseCollectionId?: string;
  transactionType: TransactionType;
};

export type FundTransaction = {
  id: string;
  date: string;
  amount: number;
  description: string;
  fundCollectionId: string;
};

export type ExpenseTransaction = {
  id: string;
  date: string;
  amount: number;
  description: string;
  fundCollectionId: string;
  expenseCollectionId: string;
};

export type CreateFundTransactionRequest = Omit<FundTransaction, "id">;

export type UpdateFundTransactionRequest = Omit<FundTransaction, "id">;

export type CreateExpenseTransactionRequest = Omit<ExpenseTransaction, "id">;

export type UpdateExpenseTransactionRequest = Omit<
  Transaction,
  "id" | "expenseCollectionId" | "transactionType"
>;
