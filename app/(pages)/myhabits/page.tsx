import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import HabitAdderForm from "./components/HabitAdderForm";
import HabitVisualiser from "./components/HabitVisualiser";
import { HabitHeader, HabitRow } from "./components/HabitRow";
import { add } from "date-fns";
import { fetchAUsersHabitsSB } from "./components/serverFunctions";

//components

export default async function page() {
  // SB client and redirect if not logged in
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/login");
  }

  //Set starting date for components below
  const dateToday = add(new Date(), { days: -0 });
  const userHabits = await fetchAUsersHabitsSB();
  return (
    <>
      <h1>Your habits, {user.email}!</h1>

      <HabitAdderForm />
      <br></br>
      <HabitHeader startingDate={dateToday} />
      {userHabits
        ? userHabits.map((h: any) => {
            return (
              <HabitRow
                key={h.id}
                startingDate={dateToday}
                habitName={h.habitName}
                habitID={h.id}
              />
            );
          })
        : ""}
    </>
  );
}
