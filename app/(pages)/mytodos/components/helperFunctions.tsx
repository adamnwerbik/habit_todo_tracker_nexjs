import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { StringLiteral } from "typescript";
const arraySort = require("array-sort");

function delay(t: number) {
  return new Promise((resolve) => setTimeout(resolve, t));
}

export const fetcher = async () => {
  //const x = await delay(2000);
  const sb = createClient();
  const {
    data: { user },
  } = await sb.auth.getUser();
  if (user) {
    let { data: ToDos, error } = await sb
      .from("ToDos")
      .select("*")
      .eq("created_by", user.id);
    console.log(ToDos);
    return sortByFavThenTime2(ToDos);
  }
};

export async function getUserTodosFromSB(user: User) {
  console.log(user.id);
}

export interface todo {
  id: number;
  name?: string;
  details?: string;
  due_date?: string;
  due_time?: string;
  is_starred?: boolean;
}

export async function addTodoToSB(formInputs: any) {
  console.log("ADDING");
  const sb = createClient();
  const {
    data: { user },
  } = await sb.auth.getUser();
  if (user) {
    console.log(user.email);
    const { data, error } = await sb
      .from("ToDos")
      .insert([
        {
          created_by: user.id,
          name: formInputs.taskName,
          details: formInputs.taskDetails,
          due_date: formInputs.dueDate ? formInputs.dueDate : null,
          due_time: formInputs.dueTime ? formInputs.dueTime : null,
          is_starred: formInputs.isStarred,
        },
      ])
      .select();
    return await fetcher();
  } else {
  }
}

export function sortByFavThenTime2(data: Array<todo> | null) {
  arraySort(data, ["due_time"]);
  arraySort(data, ["due_date"]);
  return arraySort(data, ["is_starred"], { reverse: true });
}
