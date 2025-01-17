"use client";

import React from "react";
import clsx from "clsx";

const buttonVariants = {
  green:
    "bg-green-700 hover:bg-green-800 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800",
  red: "bg-red-700 hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800",

  blue: "bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
};

const Button = ({
  children,
  onClick,
  variant,
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: string;
  type?: "submit" | "button" | "reset";
}) => {
  const color =
    variant === "success"
      ? "green"
      : variant === "destructive"
        ? "red"
        : "blue";
  return (
    <button
      onClick={onClick}
      type={type}
      className={clsx(
        "focus:outline-none text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2",
        buttonVariants[color]
      )}
    >
      {children}
    </button>
  );
};

export default Button;
