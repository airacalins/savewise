export enum CollectionType {
  Fund = "FUND",
  Expense = "EXPENSE",
}

export type Collection = {
  id: string;
  name: string;
  collectionType: CollectionType;
  currentMonthTotal: number;
  yearToDateTotal: number;
};

export type FundCollectionRequest = Omit<Collection, "id">;

export type AddExpenseCollectionRequest = Pick<Collection, "name">;

export type Expense = {
  id: string;
  date: string;
  description: string;
  amount: number;
  expenseCollectionId: string;
  fundId: string;
};

export type AddExpenseRequest = Omit<Expense, "id">;
