import { useMutation } from "@tanstack/react-query";
import { signup } from "../api/authApi";
import type { RegisterInput } from "../types";

export function useRegister() {
  return useMutation({
    mutationFn: (input: RegisterInput) =>
      signup(input.name, input.email, input.password, input.rePassword, input.phone),
  });
}
