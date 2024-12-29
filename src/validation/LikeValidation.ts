import { z, ZodType } from "zod";

export class LikeValidation {
  static readonly CREATE: ZodType = z.object({
    userId: z.number().int().positive(),
    postId: z.number().int().positive(),
  });

  static readonly UPDATE: ZodType = z.object({
    userId: z.number().int().positive().optional(),
    postId: z.number().int().positive().optional(),
  });

  static readonly DELETE: ZodType = z.object({
    id: z.number().int().positive(),
  });
}
