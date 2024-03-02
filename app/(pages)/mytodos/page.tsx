import React from "react";
import TodoOverview from "./components/TodoOverview";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

const page = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/login");
  }
  return (
    <div className="text-center items-center">
      <h1>Your todos</h1>
      <TodoOverview />
    </div>
  );
};

export default page;
