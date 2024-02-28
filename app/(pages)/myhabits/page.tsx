import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import HabitAdderForm from "./components/HabitAdderForm";
import HabitVisualiser from "./components/HabitVisualiser";
import { HabitHeader, HabitRow } from "./components/HabitRow";
import { add } from "date-fns";
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

  return (
    <>
      <h1>Your habits, {user.email}!</h1>

      <HabitAdderForm />
      <br></br>
      <HabitHeader startingDate={dateToday} />
      <HabitRow startingDate={dateToday} habitName="A" habitID={1} />
      <HabitRow startingDate={dateToday} habitName="B" habitID={2} />
      <HabitRow startingDate={dateToday} habitName="C" habitID={3} />
    </>
  );
}
