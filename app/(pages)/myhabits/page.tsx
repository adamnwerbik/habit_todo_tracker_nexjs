import { redirect } from "next/navigation";
import HabitDashboard from "./components/HabitDashboard";
import { createClient } from "@/utils/supabase/server";

//components

export default async function page() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/login");
  } else {
    return (
      <div>
        <HabitDashboard userID={user.id} />
      </div>
    );
  }
}
