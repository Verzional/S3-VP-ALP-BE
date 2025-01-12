import { CommunityModel } from '../model/CommunityModel';

class RecommendService {
    async getPopularCommunities(limit: number = 7): Promise<CommunityModel[]> {
        try {
            const popularCommunities = await CommunityModel.find()
                .sort({ totalMembers: -1 })
                .limit(limit)
                .exec();
            return popularCommunities;
        } catch (error) {
            console.error('Error fetching popular communities:', error);
            throw new Error('Could not fetch popular communities');
        }
    }
}

export default new RecommendService();