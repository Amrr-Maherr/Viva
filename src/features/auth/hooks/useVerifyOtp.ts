import { useMutation } from "@tanstack/react-query";
import { verifyResetCode } from "../api/authApi";
import type { VerifyOtpInput } from "../types";

export function useVerifyOtp() {
  return useMutation({
    mutationFn: (input: VerifyOtpInput) => verifyResetCode(input.resetCode),
  });
}
