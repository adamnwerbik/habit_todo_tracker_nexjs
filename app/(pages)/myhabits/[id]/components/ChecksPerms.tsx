import React from "react";
import { redirect } from "next/navigation";

const ChecksPerms = () => {
  return <div>{redirect("/")}</div>;
};

export default ChecksPerms;
