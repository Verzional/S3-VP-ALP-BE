import { z, ZodType } from "zod";

export class PostValidation {
  static readonly CREATE: ZodType = z.object({
    title: z.string().min(1).max(255),
    content: z.string().min(1).max(255),
    userId: z.number().int().positive(),
    communityId: z.number().int().positive(),
  });

  static readonly UPDATE: ZodType = z.object({
    title: z.string().min(1).max(255).optional(),
    content: z.string().min(1).max(255).optional(),
  });
}
