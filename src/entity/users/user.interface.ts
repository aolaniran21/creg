export interface ICreateUser {
  first_name: string;
  last_name: string;
  gender: "Male" | "Female" | "NONE";
  ref_code_or_email?: string;
  phone?: string;
  credential_id?: string;
}

export interface ICredential {
  email: string;
  password?: string;
  confirm_password?: string;
  verification_token?: string;
  user_id?: string;
  verification_token_expiration?: string;
  reset_token?: string;
  reset_token_expiration?: string;
  user_role: "ADMIN" | "SUPERADMIN" | "WEBMASTER" | "MEMBER";
  is_verified: boolean;
  is_google: boolean;
}

export interface ILoginUser {
  id?: string;
  cred_id?: string;
  first_name?: string;
  last_name?: string;
  gender?: "Male" | "Female" | "NONE";
  ref_code_or_email?: string;
  phone?: string;
  email?: string;
  is_verified: boolean;
  is_google: boolean;
  is_subscribed?: boolean;
  accessToken?: string,
  refreshToken?: string,
  expiresIn?: Date,
  refreshTokenExpiresIn?: Date,
  number_of_organizations?: string
}

export interface IUpdateUser {
  first_name?: string;
  last_name?: string;
  gender?: "Male" | "Female" | "NONE";
  phone?: string;
  email?: string;
  password?: string;
  confirm_password?: string;
}

export interface IUser {
  id?: number;
  first_name: string;
  email: string;
}
