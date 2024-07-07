import { OrgApproval, OrgStatus, OrgType } from "./org.enum";

export interface Person {
  name: string;
  role?: string;
  email?: string;
}

export interface CreateOrganization {
  UserID: string;
  OrgType: OrgType;
  Name: string;
  RegNo: string;
  Industry: string;
  Address?: string;
  LGA: string;
  ZipPostCode?: string;
  Website?: string;
  People?: Person[];
  OrgLogo?: string;
  Status: OrgStatus;
  IsPublic: boolean;
  OrgApproval: OrgApproval;
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateOrganization {
  OrgType?: OrgType;
  RegNo?: string;
  Industry?: string;
  Address?: string;
  LGA?: string;
  ZipPostCode?: string;
  Website?: string;
  People?: Person[];
  OrgLogo?: string;
  Status?: OrgStatus;
  IsPublic?: boolean;
  OrgApproval?: OrgApproval;
  updatedAt?: string;
}
