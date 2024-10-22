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
