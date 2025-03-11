import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    AUTH_MICROSOFT_ENTRA_ID_ID: z.string(),
    AUTH_MICROSOFT_ENTRA_ID_SECRET: z.string(),
    AUTH_MICROSOFT_ENTRA_ID_TENANT_ID: z.string(),
    AUTH_SECRET: z.string(),
    AUTH_URL: z.string(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    DHL_SECRET: z.string(),
    DHL_API_KEY: z.string(),
    FEDEX_SECRET: z.string(),
    FEDEX_API_KEY: z.string(),
    POSTGRES_URL: z.string(),
    POSTGRES_USER: z.string(),
    POSTGRES_PASSWORD: z.string(),
    POSTGRES_HOST: z.string(),
    POSTGRES_PRISMA_URL: z.string(),
    POSTGRES_URL_NO_SSL: z.string(),
    POSTGRES_URL_NON_POOLING: z.string(),
    POSTGRES_DATABASE: z.string(),
  },

  client: {
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    AUTH_MICROSOFT_ENTRA_ID_ID: process.env.AUTH_MICROSOFT_ENTRA_ID_ID,
    AUTH_MICROSOFT_ENTRA_ID_SECRET: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET,
    AUTH_MICROSOFT_ENTRA_ID_TENANT_ID: process.env.AUTH_MICROSOFT_ENTRA_ID_TENANT_ID,
    AUTH_SECRET: process.env.AUTH_SECRET,
    AUTH_URL: process.env.AUTH_URL,
    DHL_API_KEY: process.env.DHL_API_KEY,
    DHL_SECRET: process.env.DHL_SECRET,
    FEDEX_API_KEY: process.env.FEDEX_API_KEY,
    FEDEX_SECRET: process.env.FEDEX_SECRET,
    POSTGRES_URL: process.env.POSTGRES_URL,
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    POSTGRES_HOST: process.env.POSTGRES_HOST,
    POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL,
    POSTGRES_URL_NO_SSL: process.env.POSTGRES_URL_NO_SSL,
    POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING,
    POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,
  },

  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
