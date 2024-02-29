"use server";

import { createClient } from "@/utils/supabase/server";

export async function getHabitNameOffID(habitID: number) {
  const sb = await createClient();
  const {
    data: { user },
  } = await sb.auth.getUser();

  const { data, error } = await sb
    .from("habits")
    .select("name")
    .eq("id", habitID);
  return data;
}
