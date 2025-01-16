import NextAuth from "next-auth";

import Credentials from "next-auth/providers/credentials";

import { prisma } from "@repo/db/prisma";

import { compareSync, hashSync } from "bcrypt-ts-edge";

const authConfig = {
  providers: [
    Credentials({
      credentials: {
        number: {
          type: "text",
          placeholder: "Enter your number",
          label: "Number",
        },
        password: {
          type: "password",
          placeholder: "Enter your password",
          label: "Password",
        },
      },

      async authorize(credentials: { number: string; password: string }) {
        if (credentials === null) return null;

        const { number, password } = credentials;

        const user = await prisma.user.findFirst({
          where: {
            number,
          },
        });

        if (user) {
          const isMatch = compareSync(password, user.password);

          if (!isMatch) {
            return null;
          }

          return {
            id: user.id.toString(),
            number: user.number,
            name: user.name,
            email: user.email,
          };
        }

        try {
          const newUser = await prisma.user.create({
            data: {
              number,
              password: hashSync(password, 10),
            },
          });

          return {
            id: newUser.id.toString(),
            number: newUser.number,
            name: newUser.name,
            email: newUser.email,
          };
        } catch (err) {
          console.log(err);
        }
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      console.log("authorized control");

      return !!auth?.user;
    },
    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    },
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
