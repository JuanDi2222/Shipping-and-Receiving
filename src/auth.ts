import NextAuth from "next-auth"
import Entra from "next-auth/providers/microsoft-entra-id"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "~/server/db/index"
import { env } from "~/env";
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    Entra({
      clientId: env.AUTH_MICROSOFT_ENTRA_ID_ID,
      clientSecret: env.AUTH_MICROSOFT_ENTRA_ID_SECRET,
      tenantId: env.AUTH_MICROSOFT_ENTRA_ID_TENANT_ID,
    }),
  ],
})