import Button from "./button";
import React from "react";

const AppBar = ({
  user,
  onSignIn,
  onSignOut,
}: {
  user: {
    name?: string | null;
    email?: string | null;
    isAuthenticated: boolean;
  };

  onSignIn?: () => void;

  onSignOut?: () => void;
}) => {
  return (
    <div className="border-b py-2 border-solid border-slate-300 flex justify-between px-2">
      <img
        src={
          "https://pwebassets.paytm.com/commonwebassets/paytmweb/header/images/logo.svg"
        }
        height={40}
        width={130}
        alt="logo"
      />

      <Button
        variant={user.isAuthenticated ? "destructive" : "success"}
        onClick={user.isAuthenticated ? onSignOut : onSignIn}
      >
        {user.isAuthenticated ? "Logout" : "Login"}
      </Button>
    </div>
  );
};

export default AppBar;

