import { useMutation } from "@tanstack/react-query";
import { updateMe } from "../api/userApi";
import type { UpdateProfileInput } from "../types";

export function useUpdateProfile() {
  return useMutation({
    mutationFn: (input: UpdateProfileInput) =>
      updateMe(input.name, input.email, input.phone),
  });
}
