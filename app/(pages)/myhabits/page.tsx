import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import HabitAdderForm from "./components/HabitAdderForm";
import HabitVisualiser from "./components/HabitVisualiser";

//components

export default async function page() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <>
      <h1>Your habits, {user.email}!</h1>

      <HabitAdderForm />
      <HabitVisualiser data={[]} />
    </>
  );
}
