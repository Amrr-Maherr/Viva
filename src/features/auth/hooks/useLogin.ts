import { useMutation } from "@tanstack/react-query";
import { login } from "../api/authApi";
import type { LoginInput } from "../types";

export function useLogin() {
  return useMutation({
    mutationFn: (input: LoginInput) => login(input.email, input.password),
  });
}
