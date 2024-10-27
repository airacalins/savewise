import { QueryKey } from '@tanstack/react-query';
import { AxiosError, AxiosRequestConfig } from 'axios';

export interface TEndpointResponseErrorData {
  errorCode: string;
  errorMessage: string;
}

export type TQueryError = AxiosError<TEndpointResponseErrorData | TEndpointResponseErrorData[]>;

export interface GenericMutationParams<TList, TParams> {
  func: (data: TParams) => Promise<TList>;
  cacheKey: QueryKey;
  updater?: ((oldData: TList, newData: TParams) => TList) | undefined;
  showErrorToast?: boolean;
  onSuccess?: (data: TList, variables: TParams) => Promise<unknown> | unknown;
}

export interface MutationParams<TList, TParams> extends Omit<GenericMutationParams<TList, TParams>, 'func'> {
  url: string;
  config?: AxiosRequestConfig;
}

export interface QueryParams {
  queryKey: QueryKey;
  url: string;
  params?: AxiosRequestConfig;
}
