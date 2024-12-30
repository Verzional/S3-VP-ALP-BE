import { SearchUser } from '../model/UserModel';
import { SearchCommunity } from '../model/CommunityModel';

class SearchServices {
    async findUserByUsername(username: string): Promise<SearchUser | null> {
        try {
            const user = await SearchUser.findOne({ username });
            return user;
        } catch (error) {
            console.error('Error finding user by username:', error);
            return null;
        }
    }

    async findCommunityByName(name: string): Promise<SearchCommunity | null> {
        try {
            const community = await SearchCommunity.find({ name }).limit(1).exec();
            return community;
        } catch (error) {
            console.error('Error finding community by name:', error);
            return null;
        }
    }
}

export default new SearchServices();