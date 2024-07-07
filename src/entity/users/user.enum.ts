export enum UserRoles {
  ADMIN = "ADMIN",
  SUPERADMIN = "SUPERADMIN",
  WEBMASTER = "WEBMASTER",
  MEMBER = "MEMBER",
}

export enum UserStatus {
  ACTIVATED = "ACTIVATED",
  DEACTIVATED = "DEACTIVATED",
  UNVERIFIED = "UNVERIFIED",
}

export enum UserInteractionType {
  Query = "ACTIVATED",
  Feedback = "DEACTIVATED",
  Complaint = "UNVERIFIED",
}

export enum MaritalStatus {
  SINGLE = "SINGLE",
  MARRIED = "MARRIED",
  DIVORCED = "DIVORCED",
  WIDOWED = "WIDOWED",
  UNDISCLOSED = "UNDISCLOSED",
}

export enum GenderEnum {
  MALE = "Male",
  FEMALE = "Female",
  NONE = "NONE",
}

export enum RegisterType {
  FORM = 1,
  GOOGLE = 2,
}
