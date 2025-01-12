import { Community } from "@prisma/client";

export interface CommunityResponse {
  id: number;
  name: string;
}

export interface CreateCommunityRequest {
  name: string;
}

export interface UpdateCommunityRequest {
  name: string;
  updatedAt: Date;
}

export class CommunityModel {
  static toResponse(community: Community): CommunityResponse {
    return {
      id: community.id,
      name: community.name,
    };
  }
}
