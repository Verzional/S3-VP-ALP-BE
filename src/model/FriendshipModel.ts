import { prismaClient } from "../application/database";

export class FriendshipModel {
  // Menambahkan teman (follow)
  static async addFriend(userId: number, friendId: number): Promise<boolean> {
    try {
      // Mengecek apakah hubungan sudah ada (sudah saling berteman)
      const existingFriendship = await prismaClient.friendship.findUnique({
        where: {
          userId_friendId: {
            userId,
            friendId,
          },
        },
      });

      if (existingFriendship) {
        throw new Error("You are already friends.");
      }

      // Membuat relasi persahabatan (follow)
      await prismaClient.friendship.create({
        data: {
          userId,
          friendId,
        },
      });
      return true;
    } catch (error) {
      console.error("Error adding friend:", error);
      return false;
    }
  }

  // Menghapus teman (unfollow)
  static async removeFriend(userId: number, friendId: number): Promise<boolean> {
    try {
      // Menghapus relasi persahabatan (unfollow)
      await prismaClient.friendship.delete({
        where: {
          userId_friendId: {
            userId,
            friendId,
          },
        },
      });
      return true;
    } catch (error) {
      console.error("Error removing friend:", error);
      return false;
    }
  }

  // Mendapatkan daftar teman berdasarkan userId
  static async getFriends(userId: number) {
    const friends = await prismaClient.friendship.findMany({
      where: {
        userId,
      },
      include: {
        friend: true, // Menyertakan data teman
      },
    });
    return friends.map((friendship: { friend: { id: any; username: any; avatar: any; }; }) => ({
      id: friendship.friend.id,
      username: friendship.friend.username,
      avatar: friendship.friend.avatar,
    }));
  }
}