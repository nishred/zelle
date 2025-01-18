"use client";
import AppBar from "@repo/ui/app-bar";
import { signIn, signOut, useSession } from "next-auth/react";

const HomePage = () => {
  const { data: session } = useSession();

  const handleSignIn = () => {
    signIn(undefined, { redirectTo: "/" });
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
    <>
      <AppBar
        user={{
          name: session?.user?.name,
          email: session?.user?.email,
          isAuthenticated: session?.user ? true : false,
        }}
        onSignIn={!session?.user ? handleSignIn : undefined}
        onSignOut={session?.user && handleSignOut}
      />
    </>
  );
};

export default HomePage;
