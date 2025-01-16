import NextAuth from "next-auth";

import Google from "next-auth/providers/google";

import { prisma } from "@repo/db/prisma";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET_KEY,
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const userExists = await prisma.merchant.findFirst({
        where: { email: user.email },
      });

      if (userExists) return true;

      try {
        const merchant = await prisma.merchant.create({
          data: {
            name: user.name,
            email: user.email,
            auth_type: account.provider[0]
              .toUpperCase()
              .concat(account.provider.slice(1)),
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
