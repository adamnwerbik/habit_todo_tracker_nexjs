"use client";
import { redirect } from "next/navigation";
import React from "react";
import { useRouter } from "next/navigation";

export default function SignUpButton() {
  const router = useRouter();

  return (
    <button
      className="border border-gray-400 bg-white py-3 px-20 rounded-md hover:bg-gray-200 font-2xl"
      onClick={(e) => router.push("/login")}
    >
      Sign Up
    </button>
  );
}
