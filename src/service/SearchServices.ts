import { User } from '../model/UserModel';
import { Community } from '../model/CommunityModel';

class SearchServices {
    async findUserByUsername(username: string): Promise<User | null> {
        try {
            const user = await User.findOne({ username });
            return user;
        } catch (error) {
            console.error('Error finding user by username:', error);
            return null;
        }
    }

    async findCommunityByName(name: string): Promise<Community | null> {
        try {
            const community = await Community.find({ name }).limit(1).exec();
            return community;
        } catch (error) {
            console.error('Error finding community by name:', error);
            return null;
        }
    }
}

export default new SearchServices();