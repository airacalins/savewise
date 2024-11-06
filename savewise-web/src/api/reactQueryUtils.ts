import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";

import {
  GenericMutationParams,
  MutationParams,
  QueryParams,
  TQueryError,
} from "./types";
import { request } from "../utils/agent";
import { showErrorToast } from "../utils/toast";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleError = (error: any) => {
  if (
    error !== undefined &&
    error.data !== undefined &&
    Array.isArray(error.data) &&
    error.data.length > 0
  ) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error.data.forEach((err: any) => showErrorToast(err.errorMessage));
  } else {
    const errorMessage =
      typeof error?.error === "string"
        ? error?.error
        : error?.statusText ?? "An error occured";
    console.log(
      JSON.stringify(error?.data?.errorMessage ?? errorMessage, null, 2)
    );
  }
};

export const useGenericMutation = <TList, TParams>({
  func,
  cacheKey,
  updater,
  showErrorToast = true,
  onSuccess,
}: GenericMutationParams<TList, TParams>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: func,
    onMutate: async (newData) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: cacheKey });

      // Snapshot the previous value
      const previousData = queryClient.getQueryData<TList>(cacheKey);

      // Optimistically update to the new value
      if (previousData !== undefined) {
        queryClient.setQueryData<TList>(
          cacheKey,
          updater
            ? updater(previousData, newData)
            : { ...previousData, ...newData }
        );
      }

      // Return a context object with the snapshotted value
      return { previousData };
    },
    onSuccess,
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (error, _, context) => {
      if (showErrorToast) handleError(error);
      if (context && Boolean(context?.previousData))
        queryClient.setQueryData<TList>(cacheKey, context.previousData);
    },
  });
};

export const useGet = <TQueryFnData, TError extends TQueryError = TQueryError>({
  queryKey,
  url,
  params,
  config,
}: QueryParams & {
  config?: UseQueryOptions<TQueryFnData, TError, TQueryFnData>;
}) =>
  useQuery<TQueryFnData, TError>({
    queryKey,
    queryFn: async () => await request.get(url, params),
    retry: 2,
    ...config,
  });

export const usePut = <TList, TParams = unknown>({
  url,
  cacheKey,
  updater,
  onSuccess,
  showErrorToast,
  ...params
}: MutationParams<TList, TParams>) =>
  useGenericMutation<TList, TParams>({
    func: async (data) => await request.put(url, data),
    cacheKey,
    updater,
    onSuccess,
    showErrorToast,
    ...params,
  });

export const usePost = <TList, TParams>({
  url,
  cacheKey,
  updater,
  onSuccess,
  config,
  showErrorToast,
}: MutationParams<TList, TParams>) =>
  useGenericMutation<TList, TParams>({
    func: async (data) => await request.post(url, data, config),
    cacheKey,
    updater,
    onSuccess,
    showErrorToast,
  });

export const useDelete = <TList, TParams>({
  url,
  cacheKey,
  updater,
  onSuccess,
  showErrorToast,
}: MutationParams<TList, TParams>) =>
  useGenericMutation<TList, TParams>({
    func: async (data) => await request.delete(url, { params: data }),
    cacheKey,
    updater,
    onSuccess,
    showErrorToast,
  });

export const useDownloadMutation = <TParams>({ url }: { url: string }) => {
  return useMutation<ArrayBuffer, TQueryError, TParams>({
    mutationFn: async (data: TParams) =>
      await request.get(url, { params: data, responseType: "arraybuffer" }),
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (error) => {
      handleError(error);
    },
  });
};
