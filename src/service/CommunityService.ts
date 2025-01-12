import { prismaClient } from "../application/Database";
import { ResponseError } from "../error/ResponseError";
import { Validation } from "../validation/Validation";
import { CommunityValidation } from "../validation/CommunityValidation";
import {
  CommunityModel,
  CommunityResponse,
  CreateCommunityRequest,
} from "../model/CommunityModel";

export class CommunityService {
  static async create(
    request: CreateCommunityRequest
  ): Promise<CommunityResponse> {
    const createRequest = Validation.validate(
      CommunityValidation.CREATE,
      request
    );

    const existingCommunity = await prismaClient.community.findFirst({
      where: {
        name: createRequest.name,
      },
    });

    if (existingCommunity) {
      throw new ResponseError(400, "Community already exists");
    }

    const community = await prismaClient.community.create({
      data: {
        name: createRequest.name,
      },
    });

    return CommunityModel.toResponse(community);
  }
}
