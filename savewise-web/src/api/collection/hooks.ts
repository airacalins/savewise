import { useGet } from "../reactQueryUtils";
import { Collection } from "./type";

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
