import { z, ZodType } from "zod";

export class CommentValidation {
  static readonly CREATE: ZodType = z.object({
    content: z.string().min(1).max(255),
    userId: z.number().int().positive(),
    postId: z.number().int().positive(),
  });

  static readonly UPDATE: ZodType = z.object({
    content: z.string().min(1).max(255).optional(),
  });

  static readonly DELETE: ZodType = z.object({
    id: z.number().int().positive(),
  });

  static readonly GET: ZodType = z.object({
    id: z.number().int().positive(),
  });
}
