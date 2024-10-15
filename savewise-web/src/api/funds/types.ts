export type FundCollection = {
  id: string;
  name: string;
  initialBalance: string;
  balance: number;
};

export type FundCollectionRequest = Omit<FundCollection, "id">;
