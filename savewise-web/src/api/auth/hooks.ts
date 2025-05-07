import { usePost } from "../reactQueryUtils";
import {
  LoginUserResponse,
  LoginUserRequest,
  RegisterUserRequest,
} from "./type";

const QUERY_KEY = "auth";

// POST - /api/Register
export const useRegisterUser = () => {
  const url = "/register";
  const cacheKey = [QUERY_KEY, "register"];

  return usePost<RegisterUserRequest, unknown>({
    url,
    cacheKey,
  });
};

// POST - api/login
export const useLoginUser = () => {
  const url = "/login";
  const cacheKey = [QUERY_KEY, "login"];

  return usePost<LoginUserResponse, LoginUserRequest>({
    url,
    cacheKey,
  });
};
