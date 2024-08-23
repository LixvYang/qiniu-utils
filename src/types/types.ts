import { z } from "zod";

export const formDataSchema = z.object({
  ak: z.string().min(1, "Access Key is required"),
  sk: z.string().min(1, "Secret Key is required"),
  method: z.string().min(1, "Method is required"),
  url: z.string().url("Invalid URL"),
  body: z.string().optional(),
});
