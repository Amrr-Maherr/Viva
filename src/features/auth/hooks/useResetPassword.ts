import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../api/authApi";
import type { ResetPasswordInput } from "../types";

export function useResetPassword() {
  return useMutation({
    mutationFn: (input: ResetPasswordInput) =>
      resetPassword(input.email, input.newPassword),
  });
}
