import { z } from "zod";

const envSchema = z.object({
  rainbowKitProjectId: z.string().min(1, "Project ID is required"),
});

export type EnvSchema = z.infer<typeof envSchema>;

export const useEnv = (): EnvSchema => {
  const parsed = envSchema.safeParse({
    rainbowKitProjectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  });

  if (!parsed.success) {
    throw new Error(
      `Invalid environment variables: ${JSON.stringify(parsed.error.errors)}`
    );
  }

  return parsed.data;
};
