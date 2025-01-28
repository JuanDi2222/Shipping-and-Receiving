import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "~/server/db/index";
import { env } from "~/env";
import MicrosoftEntraId from "next-auth/providers/microsoft-entra-id";
import { accounts } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    MicrosoftEntraId({
      clientId: env.AUTH_MICROSOFT_ENTRA_ID_ID,
      clientSecret: env.AUTH_MICROSOFT_ENTRA_ID_SECRET,
      issuer: "https://login.microsoftonline.com/organizations/v2.0",
      authorization: {
        params: {
          scope: "openid profile email Mail.Send User.Read offline_access",
        },
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      const [usuario] = await db.select().from(accounts).where(eq(accounts.userId, user.id));
      if ((usuario?.expires_at ? usuario.expires_at * 1000 : 0) < Date.now()) {
        try {
          const response = await fetch('https://login.microsoftonline.com/organizations/oauth2/v2.0/token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              client_id: env.AUTH_MICROSOFT_ENTRA_ID_ID,
              client_secret: env.AUTH_MICROSOFT_ENTRA_ID_SECRET,
              grant_type: 'refresh_token',
              scope: "openid profile email User.Read Mail.Send offline_access",
              refresh_token: usuario?.refresh_token || "", 
            })
          });
          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error_description || response.statusText);
          }
          const tokens = data as {
            access_token: string;
            refresh_token?: string;
            expires_in: number;
          };

          await db.update(accounts).set({
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token,
            expires_at: Math.floor(Date.now() / 1000 + tokens.expires_in),
          }).where(eq(accounts.userId, user.id));
        } catch (error) {
          console.error('Error refreshing token:', error);
          return {
            ...session,
            error: 'Token refresh failed',
          };
        }
      }
      return {
        ...session,
        user: {
          ...session.user,
          accessToken: usuario?.access_token, 
        },
      };
    }
  },
});

declare module "next-auth" {
  interface Session {
    error?: "RefreshTokenError";
    
  }
}
