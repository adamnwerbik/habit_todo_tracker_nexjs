import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

//components
import TodoForm from "./components/TodoForm";
import UserTodos from "./components/UserTodos";

export default async function page() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  //{user.email}
  return (
    <>
      <h1>Your todos!</h1>
      <TodoForm />
      <UserTodos />
    </>
  );
}
