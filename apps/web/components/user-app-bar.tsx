"use client";

import AppBar from "@repo/ui/app-bar";
import { useSession } from "next-auth/react";

import { signIn, signOut } from "next-auth/react";

const UserAppBar = () => {
  const { data: session } = useSession();

  return (
    <AppBar
      user={{
        name: session?.user?.name,
        email: session?.user?.email,
        isAuthenticated: session?.user ? true : false,
      }}
      onSignIn={signIn}
      onSignOut={signOut}
    />
  );
};

export default UserAppBar;
