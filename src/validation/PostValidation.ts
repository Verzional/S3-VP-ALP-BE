import { z, ZodType } from "zod";

export class PostValidation {
  static readonly CREATE: ZodType = z.object({
    title: z.string().min(1).max(255),
    content: z.string().min(1).max(255),
    imageUrl: z.string().url().optional(),
    userId: z.number().int().positive(),
    communityId: z.number().int().positive(),
  });

  static readonly UPDATE: ZodType = z.object({
    title: z.string().min(1).max(255).optional(),
    content: z.string().min(1).max(255).optional(),
    imageUrl: z.string().url().optional(),
  });

  static readonly DELETE: ZodType = z.object({
    id: z.number().int().positive(),
  });

  static readonly GET: ZodType = z.object({
    id: z.number().int().positive(),
  });

  static readonly GET_BY_USER: ZodType = z.object({
    userId: z.number().int().positive(),
  });

  static readonly GET_BY_COMMUNITY: ZodType = z.object({
    communityId: z.number().int().positive(),
  });

  static readonly GET_ALL: ZodType = z.object({});
}
