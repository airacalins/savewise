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
