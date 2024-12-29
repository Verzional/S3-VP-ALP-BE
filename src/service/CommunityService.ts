import { prismaClient } from "../application/Database";
import {
  CommunityModel,
  CommunityResponse,
  CreateCommunityRequest,
} from "../model/CommunityModel";
import { CommunityValidation } from "../validation/CommunityValidation";
import { Validation } from "../validation/Validation";

export class CommunityService {
  static async createCommunity(
    request: CreateCommunityRequest
  ): Promise<CommunityResponse> {
    const CreateCommunityRequest = Validation.validate(
      CommunityValidation.CREATE,
      request
    );

    const community = await prismaClient.community.create({
      data: {
        name: CreateCommunityRequest.name,
      },
    });

    return CommunityModel.toResponse(community);
  }
}
