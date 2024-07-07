export interface EmailTemplate {
  slug: string;
  subject: string;
  tag: string;
  html: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SuccessRegister {
  first_name: string;
  last_name: string;
  email?: string;
}

export interface AdminSuccessRegister {
  username: string;
  // last_name: string;
  role: string;
  email?: string;
}

export interface VerificationData {
  first_name?: string;
  last_name?: string;
  email?: string;
  verification_token?: any;
  token_expiration?: any;
  link?: string;
  otp?: any;
}

export interface SubmitResetPassword {
  password: string;
  confirm_password?: string;
  id: string;
  reset_token: any;
}

export interface RequestResetPassword {
  first_name: string;
  last_name: string;
  reset_token: any;
  token_expiration: string;
  link: string;
}

export interface PaystackVerification {
  first_name: string;
  last_name: string;
  email: string;
  amount: any;
  txn_id: string;
}

export interface DeactivateEnrolee {
  first_name: string;
  last_name: string;
  policy_type: string;
}

export interface ActivateEnrolee {
  first_name: string;
  last_name: string;
  policy_type: string;
}

export interface PendingPayment {
  first_name: string;
  last_name: string;
  amount: string;
}

export interface SuccessPayment {
  first_name: string;
  last_name: string;
  amount: string;
  txn_id: string;
}

export interface InsuranceActive {
  first_name: string;
  last_name: string;
  email: string;
  skydd_memberId: any;
  policy_type: string;
  plan_type: string;
  payment_plan: string;
}
