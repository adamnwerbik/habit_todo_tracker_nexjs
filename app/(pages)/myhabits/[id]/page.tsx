import React, { Suspense } from "react";
import HabitOverviewDash from "./components/HabitOverviewDash";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const page = async ({ params }: { params: { id: number } }) => {
  const sb = createClient();
  const {
    data: { user },
  } = await sb.auth.getUser();

  //check if user createdHabit
  const { data, error } = await sb
    .from("habits")
    .select("*")
    .eq("createdByUser", user?.id)
    .eq("id", params.id);

  // not redirect user if habitID is created by same user as logged in rn
  data?.length ? "" : redirect("/");

  const habitRepeatsEvery = data ? data[0].repeatsEveryXdays : null;

  return (
    <div>
      <HabitOverviewDash
        user={user}
        habitID={params.id}
        repeatsDays={habitRepeatsEvery}
      />
    </div>
  );
};

export default page;
