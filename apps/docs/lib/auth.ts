import NextAuth, { NextAuthConfig } from "next-auth";

import Google from "next-auth/providers/google";

import prisma from "@repo/db/prisma";


const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET_KEY,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      const userExists = await prisma.merchant.findFirst({
        where: { email: user?.email ? user.email : undefined },
      });

      if (userExists) return true;

      try {
        await prisma.merchant.create({
          data: {
            name: user.name,
            email: user.email as string,
            auth_type:
              account?.provider === undefined
                ? null
                : (account.provider[0]
                    ?.toUpperCase()
                    .concat(account.provider.slice(1)) as "Google" | "Github"),
          },
        });

        return true;
      } catch (err) {
        console.log(err);

        return false;
      }
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);

