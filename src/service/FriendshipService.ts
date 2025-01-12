import { FriendshipModel } from "../model/FriendshiipModel";

export class FriendshipService {
  // Menambahkan teman (follow)
  static async addFriend(userId: number, friendId: number): Promise<boolean> {
    try {
      // Cek apakah sudah ada hubungan pertemanan
      const result = await FriendshipModel.addFriend(userId, friendId);
      return result;
    } catch (error) {
      console.error("Error in adding friend:", error);
      throw new Error("Unable to add friend.");
    }
  }

  // Menghapus teman (unfollow)
  static async removeFriend(userId: number, friendId: number): Promise<boolean> {
    try {
      // Cek apakah hubungan pertemanan ada dan dapat dihapus
      const result = await FriendshipModel.removeFriend(userId, friendId);
      return result;
    } catch (error) {
      console.error("Error in removing friend:", error);
      throw new Error("Unable to remove friend.");
    }
  }

  // Mendapatkan daftar teman
  static async getFriends(userId: number) {
    try {
      const friends = await FriendshipModel.getFriends(userId);
      return friends;
    } catch (error) {
      console.error("Error in fetching friends:", error);
      throw new Error("Unable to fetch friends.");
    }
  }
}
