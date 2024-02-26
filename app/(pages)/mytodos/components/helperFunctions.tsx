import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

function delay(t: number) {
  return new Promise((resolve) => setTimeout(resolve, t));
}

export const fetcher = async () => {
  const sb = createClient();
  const {
    data: { user },
  } = await sb.auth.getUser();
  if (user) {
    let { data: ToDos, error } = await sb
      .from("ToDos")
      .select("*")
      .eq("created_by", user.id);
    return ToDos;
  }
};

export const customfn = async () => {
  const x = await delay(2000);
  return [
    {
      userId: 1,
      id: 1,
      title: "delectus aut autem",
      completed: false,
    },
    {
      userId: 1,
      id: 2,
      title: "quis ut nam facilis et officia qui",
      completed: false,
    },
  ];
};

export async function getUserTodosFromSB(user: User) {
  console.log(user.id);
}

export async function addTodoToSB() {}
