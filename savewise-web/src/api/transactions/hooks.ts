import queryClient from "../../queryClient";
import { useDelete, useGet, usePost, usePut } from "../reactQueryUtils";
import {
  CreateFundTransactionRequest,
  FundTransaction,
  Transaction,
  UpdateFundTransactionRequest,
} from "./type";

const QUERY_KEY = "transactions";

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

// PUT - /api/Transactions/{id}
export const useUpdateTransaction = (id: string) => {
  const url = `/transactions/${id}`;
  const cacheKey = [QUERY_KEY, id];

  return usePut<unknown, UpdateFundTransactionRequest>({
    url,
    cacheKey,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
};

// DELETE - /api/Transactions/{id}
export const useDeleteTransaction = (id: string) => {
  const url = `/transactions/${id}`;
  const cacheKey = [QUERY_KEY, id];

  return useDelete<unknown, unknown>({
    url,
    cacheKey,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
};
