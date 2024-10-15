export enum TransactionType {
  Credit = "CREDIT",
  Debit = "DEBIT",
}

export type Transaction = {
  id: string;
  transactionType: TransactionType;
  date: string;
  amount: number;
  description: string;
  fundCollectionId: string;
  expenseCollectionId?: string;
};

export type AddFundRequest = Omit<Transaction, "id" | "expenseCollectionId">;

export type AddExpenseRequest = Omit<Transaction, "id">;