"use server";
import { Habit } from "./helperFunctions";
import { createClient } from "@/utils/supabase/server";
export async function addANewHabitToSB(habitData: Habit) {
  console.log(habitData);
  const sb = createClient();
  const {
    data: { user },
  } = await sb.auth.getUser();
  if (user) {
    const { data, error } = await sb
      .from("habits")
      .insert([
        {
          habitName: habitData.habitName,
          habitDetails: habitData.habitDetails,
          repeatsEveryXdays: habitData.repeatsEveryXdays
            ? habitData.repeatsEveryXdays
            : 1,
          createdByUser: user.id,
        },
      ])
      .select();
    console.log(error);
  }
}

export async function fetchAUsersHabitsSB() {
  const sb = createClient();
  const {
    data: { user },
  } = await sb.auth.getUser();

  if (user) {
    const { data, error } = await sb
      .from("habits")
      .select("*")
      .eq("createdByUser", user.id); // Correct
    return data;
  }
}
