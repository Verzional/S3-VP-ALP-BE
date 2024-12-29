import { z, ZodType } from "zod";

export class CommunityValidation {
  static readonly CREATE: ZodType = z.object({
    name: z.string().min(1).max(255),
  });

  static readonly UPDATE: ZodType = z.object({
    name: z.string().min(1).max(255).optional(),
  });
}
