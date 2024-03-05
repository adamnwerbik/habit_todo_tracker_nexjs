import React from "react";
import HabitSummary from "./HabitSummary";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Habit } from "../components/ServerFns";

const page = async ({ params }: { params: { id: number } }) => {
  const sb = createClient();
  const {
    data: { user },
  } = await sb.auth.getUser();

  let { data: habits, error } = await sb
    .from("habits")
    .select("*")
    .eq("id", params.id);

  if (error) {
    redirect("/myhabits");
  }
  if (habits && user) {
    if (habits[0].createdByUserFK !== user.id) {
      redirect("/myhabits");
    }
  }

  return (
    <div
      className="flex flex-col text-center max-w-full"
      style={{ scrollbarWidth: "none" }}
    >
      {habits ? (
        <HabitSummary habitID={params.id} habitData={habits} />
      ) : (
        <div>NO DATA</div>
      )}
    </div>
  );
};

export default page;
