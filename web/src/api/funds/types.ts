enum TransactionType {
  Credit = "CREDIT",
  Debit = "DEBIT",
}

export type FundCollection = {
  id: string;
  name: string;
  balance: number;
};

export type Transaction = {
  id: string;
  fundCollectionId: string;
  expenseCollectionId: string;
  name: string;
  transactionType: TransactionType[];
  amount: number;
};
