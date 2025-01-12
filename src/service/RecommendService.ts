import { prismaClient } from '../application/database';
import { CommunityModel } from '../model/CommunityModel';
import { LikeModel } from '../model/LikeModel';

class RecommendService {
    async getPopularCommunities(limit: number = 7): Promise<CommunityModel[]> {
        try {
            const popularCommunities = await CommunityModel.findAll({
                order: [['totalMembers', 'DESC']], // Sort by 'totalMembers' in descending order
                limit: limit, // Limit the number of results
            });
            return popularCommunities;
        } catch (error) {
            console.error('Error fetching popular communities:', error);
            throw new Error('Could not fetch popular communities');
        }
    }

    static async getMostLikedPosts(limit: number = 7): Promise<{ postId: number; totalLikes: number }[]> {
        const posts = await prismaClient.like.groupBy({
          by: ['postId'],
          _count: {
            postId: true,
          },
          orderBy: {
            _count: {
              postId: 'desc',
            },
          },
          take: limit,
        });
    
        return posts.map(post => ({
          postId: post.postId,
          totalLikes: post._count.postId,
        }));
      }
    
}

export default new RecommendService();