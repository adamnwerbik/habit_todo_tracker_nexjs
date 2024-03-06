"use server";
import { createClient } from "@/utils/supabase/server";

export async function fetchHabits() {
  const supabase = createClient();
  let { data: HabitDoLog, error } = await supabase.from("habits").select("*");
  return HabitDoLog;
}

export async function fetchLogData(habitID: string) {
  const supabase = createClient();
  let { data: HabitDoLog, error } = await supabase
    .from("HabitDoLog")
    .select("*");
  //.eq("habitFK", habitID);
  return HabitDoLog;
}
