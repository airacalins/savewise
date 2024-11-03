import queryClient from "../../queryClient";
import { useDelete, useGet, usePost } from "../reactQueryUtils";
import { Collection, CreateCollectionRequest } from "./type";

const QUERY_KEY = "collections";

// GET - /api/Collections
export const useGetCollections = () => {
  const url = "/collections";
  const queryKey = [QUERY_KEY];

  return useGet<Array<Collection>>({
    url,
    queryKey,
  });
};

// POST - /api/Collections
export const useCreateCollection = () => {
  const url = "/collections";
  const cacheKey = [QUERY_KEY, "create"];

  return usePost<Collection, CreateCollectionRequest>({ url, cacheKey });
};

// GET - /api/Collections/funds
export const useGetFundsCollection = () => {
  const url = "/collections/funds";
  const queryKey = [QUERY_KEY, "funds"];

  return useGet<Array<Collection>>({
    url,
    queryKey,
  });
};

// GET - /api/Collections/expenses
export const useGetExpensesCollection = () => {
  const url = "/collections/expenses";
  const queryKey = [QUERY_KEY, "expenses"];

  return useGet<Array<Collection>>({
    url,
    queryKey,
  });
};

// GET - /api/Collections/{id}
export const useGetCollectionById = (id: string) => {
  const url = `/collections/${id}`;
  const queryKey = [QUERY_KEY, id];

  return useGet<Collection>({
    url,
    queryKey,
  });
};

// DELETE - /api/Collections/{id}
export const useDeleteCollectionById = (id: string) => {
  const url = `/collections/${id}`;
  const cacheKey = [QUERY_KEY, id];

  return useDelete<unknown, unknown>({
    url,
    cacheKey,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY],
      });
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
};
