import { z } from "zod";

export class FriendshipValidation {
  // Validasi saat menambah teman (follow)
  static readonly ADD_FRIEND = z.object({
    userId: z.number().int().positive(),
    friendId: z.number().int().positive(),
  });

  // Validasi saat menghapus teman (unfollow)
  static readonly REMOVE_FRIEND = z.object({
    userId: z.number().int().positive(),
    friendId: z.number().int().positive(),
  });

  // Validasi saat mendapatkan daftar teman
  static readonly GET_FRIENDS = z.object({
    userId: z.number().int().positive(),
  });
}
