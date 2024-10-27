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
export const useGetFundCollections = () => {
  const url = "/collections/funds";
  const queryKey = [QUERY_KEY, "funds"];

  return useGet<Array<Collection>>({
    url,
    queryKey,
  });
};

// GET - /api/Collections/expenses
export const useGetExpensesCollections = () => {
  const url = "/collections/expenses";
  const queryKey = [QUERY_KEY, "expenses"];

  return useGet<Array<Collection>>({
    url,
    queryKey,
  });
};
