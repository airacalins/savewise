export enum CollectionType {
  Fund = "Fund",
  Expense = "Expense",
}

export type Collection = {
  id: string;
  name: string;
  collectionType: CollectionType;
  currentMonthTotal: number;
  yearToDateTotal: number;
};

export type CreateCollectionRequest = {
  name: string;
  collectionType: CollectionType;
};

export type UpdateCollectionRequest = {
  name: string;
};
