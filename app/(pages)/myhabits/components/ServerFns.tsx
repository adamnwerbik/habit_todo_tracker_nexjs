"use server";

import { createClient } from "@/utils/supabase/server";

export type Habit = {
  habitName: string;
  habitDetails?: string;
  id?: number;
  createdByUserFK?: number;
  repeatsEveryXdays: number;
};
export async function addANewHabitToSB(formInputs: Habit) {
  const sb = createClient();
  const {
    data: { user },
  } = await sb.auth.getUser();
  const { data, error } = await sb
    .from("habits")
    .insert([
      {
        habitName: formInputs.habitName,
        habitDetails: formInputs.habitDetails,
        createdByUserFK: user?.id,
        repeatsEveryXdays: formInputs.repeatsEveryXdays
          ? formInputs.repeatsEveryXdays
          : 1,
      },
    ])
    .select();
  return await fetcher();
}

export const fetcher: any = async (url: string) => {
  const sb = createClient();
  const {
    data: { user },
  } = await sb.auth.getUser();
  let { data: habits, error } = await sb
    .from("habits")
    .select("*")
    .eq("createdByUserFK", user?.id);
  return habits;
};
