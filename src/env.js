import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    AUTH_MICROSOFT_ENTRA_ID_ID: z.string(),
    AUTH_MICROSOFT_ENTRA_ID_SECRET: z.string(),
    AUTH_MICROSOFT_ENTRA_ID_TENANT_ID: z.string(),
    AUTH_SECRET: z.string(),
    AUTH_URL: z.string(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    AUTH_DRIZZLE_URL: z.string(),
    DHL_SECRET: z.string(),
    DHL_API_KEY: z.string(),
    FEDEX_SECRET: z.string(),
    FEDEX_API_KEY: z.string(),
  },

  client: {
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    AUTH_MICROSOFT_ENTRA_ID_ID: process.env.AUTH_MICROSOFT_ENTRA_ID_ID,
    AUTH_MICROSOFT_ENTRA_ID_SECRET: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET,
    AUTH_MICROSOFT_ENTRA_ID_TENANT_ID: process.env.AUTH_MICROSOFT_ENTRA_ID_TENANT_ID,
    AUTH_SECRET: process.env.AUTH_SECRET,
    AUTH_URL: process.env.AUTH_URL,
    AUTH_DRIZZLE_URL: process.env.AUTH_DRIZZLE_URL,
    DHL_API_KEY: process.env.DHL_API_KEY,
    DHL_SECRET: process.env.DHL_SECRET,
    FEDEX_API_KEY: process.env.FEDEX_API_KEY,
    FEDEX_SECRET: process.env.FEDEX_SECRET,
  },

  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
