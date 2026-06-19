import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../api/authApi";
import type { ForgotPasswordInput } from "../types";

export function useForgotPassword() {
  return useMutation({
    mutationFn: (input: ForgotPasswordInput) => forgotPassword(input.email),
  });
}
