// CommunityService.js
import { CommunityModel } from "../model/CommunityModel";

export class CommunityService {
  static async getCommunityById(id: any) {
    const community = await CommunityModel.findById(id);
    if (!community) {
      throw new Error('Community not found');
    }
    return CommunityModel.toResponse(community);
  }

  static async getCommunitiesByTag(tagId: any) {
    const communities = await CommunityModel.findAllByTag(tagId);
    return communities.map(CommunityModel.toResponse);
  }

  static async createCommunity(data: { name: any; avatar: any; bio: any; tags: any; }) {
    const { name, avatar, bio, tags } = data;
    if (!name || !tags || tags.length === 0) {
      throw new Error('Name and at least one tag are required');
    }
    const community = await CommunityModel.create({ name, tags });
    return CommunityModel.toResponse(community);
  }

  static async updateCommunity(id: any, data: any) {
    const community = await CommunityModel.findById(id);
    if (!community) {
      throw new Error('Community not found');
    }
    const updatedCommunity = await CommunityModel.update(id, data);
    return CommunityModel.toResponse(updatedCommunity);
  }

  static async deleteCommunity(id: any) {
    const community = await CommunityModel.findById(id);
    if (!community) {
      throw new Error('Community not found');
    }
    await CommunityModel.delete(id);
    return { message: 'Community deleted successfully' };
  }
}
