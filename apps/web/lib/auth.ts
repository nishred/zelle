import NextAuth from "next-auth";

import Credentials from "next-auth/providers/credentials";

import prisma from "@repo/db/prisma";

import { compareSync, hashSync } from "bcrypt-ts-edge";

import { User } from "next-auth";

import { NextAuthResult } from "next-auth";

import { NextAuthConfig } from "next-auth";

// export interface User {
//   id?: string;
//   name?: string | null;
//   email?: string | null;
//   image?: string | null;
// }

const authConfig: NextAuthConfig = {
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

      async authorize(
        credentials: Partial<Record<"number" | "password", unknown>>
      ) {
        if (credentials === null) return null;

        const { number, password } = credentials;

        const user = await prisma.user.findFirst({
          where: {
            number: number as string,
          },
        });

        if (user) {
          const isMatch = compareSync(password as string, user.password);

          if (!isMatch) {
            return null;
          }

          return {
            id: user.id.toString(),
            image: null,
            name: user.name ? user.email : null,
            email: user.email ? user.email : null,
          };
        }

        try {
          const newUser = await prisma.$transaction(async (tx) => {
            const newUser = await prisma.user.create({
              data: {
                number: number as string,
                password: hashSync(password as string, 10),
              },
            });

            return newUser;
          });

          return {
            id: newUser.id.toString(),
            name: newUser.name,
            email: newUser.email,
            image: null,
          };
        } catch (err) {
          console.log(err);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    authorized({ auth }) {
      console.log("authorized control");

      return !!auth?.user;
    },

    async session({ session, token }) {
      session.user.id = token.sub as string;
      return session;
    },
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
}: NextAuthResult = NextAuth(authConfig);
