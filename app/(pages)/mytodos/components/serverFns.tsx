"use server";

import { createClient } from "@/utils/supabase/server";
import { Todo } from "./TodoOverview";
import { SortByStarThenDateDueThenTime } from "./TodoCard";

export const fetcher: any = async (url: string) => {
  const sb = createClient();
  const {
    data: { user },
  } = await sb.auth.getUser();
  let { data: todos, error } = await sb
    .from("todos")
    .select("*")
    .eq("createdByUserFK", user?.id);
  return SortByStarThenDateDueThenTime(todos);
};

export async function deleteATodoFromSB(id: number) {
  const sb = createClient();
  const { error } = await sb.from("todos").delete().eq("id", id);
  console.log(error);
  return await fetcher();
}

export async function setATodoAsFavourite(id: number) {
  const sb = createClient();
  const { data, error } = await sb
    .from("todos")
    .update({ isStarred: true })
    .eq("id", id)
    .select();
  console.log(data);
  console.log(error);
  return await fetcher();
}

export async function setATodoAsUnFavourite(id: number) {
  const sb = createClient();
  const { data, error } = await sb
    .from("todos")
    .update({ isStarred: false })
    .eq("id", id)
    .select();
  return await fetcher();
}

export async function setATodoAsUnComplete(id: number) {
  const sb = createClient();
  const { data, error } = await sb
    .from("todos")
    .update({ isCompleted: false })
    .eq("id", id)
    .select();
  return await fetcher();
}

export async function setATodoAsComplete(id: number) {
  const sb = createClient();
  const { data, error } = await sb
    .from("todos")
    .update({ isCompleted: true })
    .eq("id", id)
    .select();
  return await fetcher();
}

export async function addATaskToSB(todo: Todo) {
  const sb = createClient();
  const {
    data: { user },
  } = await sb.auth.getUser();
  console.log(todo);
  const { data, error } = await sb
    .from("todos")
    .insert([
      {
        //Issues with isStarred from form component :(
        todoName: todo.todoName,
        todoDetails: todo.todoDetails,
        dateDue: todo.dateDue ? todo.dateDue : null,
        timeDue: todo.timeDue ? todo.timeDue : null,
        isStarred: todo.isStarred,
        createdByUserFK: user?.id,
      },
    ])
    .select();
  console.log(error);
  return await fetcher();
}
