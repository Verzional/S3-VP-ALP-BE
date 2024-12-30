import { SearchUser } from '../model/UserModel';
import { CommunityModel } from '../model/CommunityModel';

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

    async findCommunityByName(name: string): Promise<CommunityModel | null> {
        try {
            const community = await CommunityModel.find({ name }).limit(1).exec();
            return community;
        } catch (error) {
            console.error('Error finding community by name:', error);
            return null;
        }
    }
}

export default new SearchServices();