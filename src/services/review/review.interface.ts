import { Type } from "./review.enum";

import { OrgApproval, OrgStatus, OrgType } from "../organization/org.enum";


export interface CreateReview {
  TypeID: string;
  Type: Type;
  Description: string;
  Approval: string
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateReview {
  Type?: Type;
  Description?: string;
  Approval: string
  updatedAt?: string;
}



