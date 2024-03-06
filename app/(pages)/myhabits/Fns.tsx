"use server";
import { createClient } from "@/utils/supabase/server";

export async function fetchHabits() {
  const supabase = createClient();
  let { data: HabitDoLog, error } = await supabase.from("habits").select("*");
  return HabitDoLog;
}

export async function fetchLogData() {
  const supabase = createClient();
  let { data: HabitDoLog, error } = await supabase
    .from("HabitDoLog")
    .select("*");
  return HabitDoLog;
}
