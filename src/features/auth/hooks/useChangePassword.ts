import { useMutation } from "@tanstack/react-query";
import { changeMyPassword } from "../api/userApi";
import type { ChangePasswordInput } from "../types";

export function useChangePassword() {
  return useMutation({
    mutationFn: (input: ChangePasswordInput) =>
      changeMyPassword(input.currentPassword, input.newPassword, input.confirmPassword),
  });
}
