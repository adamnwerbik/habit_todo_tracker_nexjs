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
  return await fetchAUsersHabitsSB();
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

export async function addAHabitDoLog(
  habitID: number,
  dateDone: string,
  checked: boolean
) {
  const sb = createClient();
  const {
    data: { user },
  } = await sb.auth.getUser();

  if (checked) {
    console.log("DELETING");

    const { error } = await sb
      .from("habitDoLog")
      .delete()
      .eq("habitDoneFK", habitID)
      .eq("dateDone", dateDone);
  } else {
    const { data, error } = await sb
      .from("habitDoLog")
      .insert([{ habitDoneFK: habitID, dateDone: dateDone }])
      .select();
    console.log(error);
  }
  return fetcher(habitID.toString());
}

const fetcher = async (habitID: string) => {
  const sb = createClient();
  let { data: habitDoLog, error } = await sb
    .from("habitDoLog")
    .select("*")
    .eq("habitDoneFK", habitID);
  return habitDoLog;
};
