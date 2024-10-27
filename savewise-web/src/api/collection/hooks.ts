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
