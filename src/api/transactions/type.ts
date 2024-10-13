export enum TransactionType {
  Credit = "CREDIT",
  Debit = "DEBIT",
}

export type Transaction = {
  id: string;
  fundCollectionId: string;
  expenseCollectionId?: string;
  transactionType: TransactionType;
  description: string;
  amount: number;
  date: string;
};
