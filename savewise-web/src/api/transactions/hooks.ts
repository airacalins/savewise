import { useGet, usePost } from "../reactQueryUtils";
import {
  CreateFundTransactionRequest,
  FundTransaction,
  Transaction,
} from "./type";

const QUERY_KEY = "collections";

// GET - /api/Transactions/funds/{fundCollectionId}
export const useGetFundTransactions = (fundCollectionId: string) => {
  const url = `/transactions/funds/${fundCollectionId}`;
  const queryKey = [QUERY_KEY, "funds", fundCollectionId];

  return useGet<Array<FundTransaction>>({
    url,
    queryKey,
  });
};

// POST - /api/Transactions/funds
export const useCreateFundTransaction = () => {
  const url = "/transactions/funds";
  const cacheKey = [QUERY_KEY, "funds", "create"];

  return usePost<FundTransaction, CreateFundTransactionRequest>({
    url,
    cacheKey,
  });
};

// GET - /api/Transactions/{id}
export const useGetTransaction = (id: string) => {
  const url = `/transactions/${id}`;
  const queryKey = [QUERY_KEY, id];

  return useGet<Transaction>({
    url,
    queryKey,
  });
};
