export interface CreateProject {
  UserID: string;
  OrgID: string;
  Headline?: string;
  FullName?: string;
  ShortDescription?: string;
  LGA: string;
  IsGroupProject: boolean;
  IsPublic: boolean;
  Website?: string;
  Image?: string;
  StartDate: Date;
  ProjectType: "NEW_PROJECT" | "TRANSITION";
  GHGProgram: "LASEPA" | "FOREST_CARBON_CODE";
  Sector: string;
  ProjectStatus:
  | "DRAFT"
  | "CONCEPT"
  | "DEVELOPMENT"
  | "VALIDATION"
  | "VALIDATED";
  ProjectApproval:
  | "ACCEPTED"
  | "REJECTED"
  | "PENDING"
}

export interface UpdateProject {
  ID: string; // UUID
  OrgID: string;
  UserID: string;
  Headline?: string;
  FullName?: string;
  ShortDescription?: string;
  LGA: string;
  IsGroupProject?: boolean;
  IsPublic?: boolean;
  Website?: string;
  Image?: string;
  StartDate?: Date;
  ProjectType?: "NEW_PROJECT" | "TRANSITION";
  GHGProgram?: "LASEPA" | "FOREST_CARBON_CODE";
  Sector?: string;
  ProjectStatus?:
  | "DRAFT"
  | "CONCEPT"
  | "DEVELOPMENT"
  | "VALIDATION"
  | "VALIDATED";
  ProjectApproval?:
  | "ACCEPTED"
  | "REJECTED"
  | "PENDING";
}
