import { UserProfile, getAllUsers } from '../model/UserModel'; 
import { CommunityModel } from '../model/CommunityModel';

class SearchServices {
    async findUserByUsername(username: string): Promise<UserProfile | null> {
        try {
            const users = await getAllUsers();
            const user = users.find(user => user.username === username) || null;
            return user;
        } catch (error) {
            console.error('Error finding user by username:', error);
            return null;

        }
    }

    async findCommunityByName(name: string): Promise<CommunityModel | null> {
        try {
            const communities = await CommunityModel.findAllByName(name);
            const community = communities.find(community => community.name === name) || null;
            return community;
        } catch (error) {
            console.error('Error finding community by name:', error);
            return null;
        }
    }
}

export default new SearchServices();
