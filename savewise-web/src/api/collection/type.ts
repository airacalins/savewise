export enum CollectionType {
  Fund,
  Expense,
}

export type Collection = {
  id: string;
  name: string;
  collectionType: CollectionType;
  currentMonthTotal: number;
  yearToDateTotal: number;
};
