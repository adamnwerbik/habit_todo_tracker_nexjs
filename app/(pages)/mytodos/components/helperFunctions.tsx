import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { StringLiteral } from "typescript";
const sortArray = require("sort-array");
const arraySort = require("array-sort");
import sortOn from "sort-on";

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
    sortArray(ToDos);
    return ToDos;
  }
};

export const customfn = async () => {
  //const x = await delay(2000);
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

interface todo {
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

function sortByFavThenTime(data: Array<todo> | null) {
  console.log("yaya");
  sortArray(data, {
    by: "id",
    order: "desc",
  });
  console.log("yaya");
  return data;
}

function sortByFavThenTime2(data: Array<todo> | null) {
  return arraySort(data, ["is_starred", "due_day", "due_time"]);
}
