export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}

export interface ForgotPasswordInput {
  email: string;
}

export interface VerifyOtpInput {
  resetCode: string;
}

export interface ResetPasswordInput {
  email: string;
  newPassword: string;
}

export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UpdateProfileInput {
  name: string;
  email: string;
  phone: string;
}
