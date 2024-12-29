import { Post } from "@prisma/client";

export interface PostResponse {
    id: number;
    title: string;
    content: string;
    mediaUrl?: string | null;
    communityId: number;
    userId: number;
    tagId?: number | null;
    createdAt: Date;
    updatedAt: Date;
}