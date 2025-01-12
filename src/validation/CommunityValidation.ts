import { z, ZodType } from "zod";

export class CommunityValidation {
  static readonly CREATE: ZodType = z.object({
    name: z.string().min(1).max(255, "Name must be between 1 and 255 characters"),
    avatar: z.string().url().optional(), // URL untuk avatar, opsional
    bio: z.string().max(500, "Bio cannot exceed 500 characters").optional(), // Bio opsional
    tags: z.array(z.string().min(1).max(50)).nonempty("At least one tag is required"), // Minimal 1 tag
  });

  static readonly UPDATE: ZodType = z.object({
    name: z.string().min(1).max(255).optional(),
    avatar: z.string().url().optional(),
    bio: z.string().max(500).optional(),
    tags: z.array(z.string().min(1).max(50)).optional(),
  });

  static readonly DELETE: ZodType = z.object({
    id: z.number().int().positive("Community ID must be a positive integer"),
  });

  static readonly GET: ZodType = z.object({
    id: z.number().int().positive("Community ID must be a positive integer"),
  });

  static readonly FIND_BY_TAG: ZodType = z.object({
    tagId: z.number().int().positive("Tag ID must be a positive integer"),
  });
}
