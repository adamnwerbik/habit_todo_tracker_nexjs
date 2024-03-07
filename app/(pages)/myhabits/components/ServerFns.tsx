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

export const fetcherHabitDoLog = async (habitID: string) => {
  const sb = createClient();
  let { data: HabitDoLog, error } = await sb
    .from("HabitDoLog")
    .select("*")
    .eq("habitFK", habitID);
  return HabitDoLog;
};

export async function addAHabitDoLog(
  habitID: number,
  date: string,
  checked: boolean
) {
  const sb = createClient();
  const {
    data: { user },
  } = await sb.auth.getUser();
  if (!user) {
    return;
  }
  if (checked) {
    console.log("DELETING");
    const { error } = await sb
      .from("HabitDoLog")
      .delete()
      .eq("habitFK", habitID)
      .eq("dateDone", date);
  } else {
    const { data, error } = await sb
      .from("HabitDoLog")
      .insert([{ habitFK: habitID, dateDone: date, userFK: user.id }])
      .select();
    //console.log(error);
  }
  return fetcherHabitDoLog(habitID.toString());
}

export async function deleteAHabitByID(id: number) {
  const sb = createClient();
  const { error } = await sb.from("habits").delete().eq("id", id);
}
