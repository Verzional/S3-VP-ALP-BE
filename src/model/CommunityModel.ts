import { prismaClient } from "../application/database"; 
import { Community } from "@prisma/client";

export class CommunityModel {
  // Mengubah Community menjadi bentuk response
  static toResponse(community: Community) {
    return {
      id: community.id,
      name: community.name,
      description: community.bio ?? null,
      createdAt: community.createdAt,
      updatedAt: community.updatedAt,
    };
  }

  // Mendapatkan komunitas berdasarkan ID
  static async findById(id: number) {
    return prismaClient.community.findUnique({
      where: { id },
      include: {
        communityTags: {
          include: {
            tag: true, // Sertakan detail tag
          },
        },
      },
    });
  }

  // Mendapatkan semua komunitas berdasarkan tagId
  static async findAllByTag(tagId: number) {
    return prismaClient.community.findMany({
      where: {
        communityTags: {
          some: {
            tagId,
          },
        },
      },
      include: {
        communityTags: {
          include: {
            tag: true, // Sertakan detail tag
          },
        },
      },
    });
  }

  // Menambahkan komunitas baru
  static async create(data: { name: string; tags: string[] }) {
    const { tags, ...communityData } = data;

    // Simpan komunitas baru
    const community = await prismaClient.community.create({
      data: communityData,
    });

    // Hubungkan tag dengan komunitas
    if (tags && tags.length > 0) {
      for (const tagName of tags) {
        let tag = await prismaClient.tag.findUnique({ where: { name: tagName } });

        // Jika tag tidak ada, buat tag baru
        if (!tag) {
          tag = await prismaClient.tag.create({ data: { name: tagName } });
        }

        // Hubungkan tag dengan komunitas
        await prismaClient.communityTag.create({
          data: {
            communityId: community.id,
            tagId: tag.id,
          },
        });
      }
    }

    return community;
  }

  // Update komunitas
  static async update(id: number, data: { name: string; tags: string[] }) {
    const { tags, ...communityData } = data;

    // Update data komunitas
    const community = await prismaClient.community.update({
      where: { id },
      data: communityData,
    });

    // Update tag (opsional)
    if (tags && tags.length > 0) {
      // Hapus semua tag lama
      await prismaClient.communityTag.deleteMany({ where: { communityId: id } });

      // Tambahkan tag baru
      for (const tagName of tags) {
        let tag = await prismaClient.tag.findUnique({ where: { name: tagName } });

        // Jika tag tidak ada, buat tag baru
        if (!tag) {
          tag = await prismaClient.tag.create({ data: { name: tagName } });
        }

        // Hubungkan tag dengan komunitas
        await prismaClient.communityTag.create({
          data: {
            communityId: id,
            tagId: tag.id,
          },
        });
      }
    }

    return community;
  }

  // Menghapus komunitas
  static async delete(id: number) {
    // Hapus relasi tag terlebih dahulu
    await prismaClient.communityTag.deleteMany({ where: { communityId: id } });

    // Hapus komunitas
    return prismaClient.community.delete({
      where: { id },
    });
  }

  // Mendapatkan semua komunitas berdasarkan nama
  static async findAllByName(name: string) {
    return prismaClient.community.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive', // Pencarian tidak case-sensitive
        },
      },
      include: {
        communityTags: {
          include: {
            tag: true, // Sertakan detail tag
          },
        },
      },
    });
  }
}

