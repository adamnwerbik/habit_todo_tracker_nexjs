"use client";
import { createClient } from "@/utils/supabase/client";
import React, { useState } from "react";
import useSWR from "swr";
import TodoCard from "./TodoCard";
import { MdArrowDropDown } from "react-icons/md";
import { fetcher } from "./serverFns";
import Image from "next/image";
import { BarLoader } from "react-spinners";
import TodoForm from "./TodoAdderForm";

// Types
export type Todo = {
  todoName: string;
  id: number;
  created_at?: string;
  createdByUserFK?: string;
  todoDetails?: string;
  isStarred?: boolean;
  isCompleted?: boolean;
  dateDue?: string;
  timeDue?: string;
};

const TodoOverview = () => {
  const [seeCompleted, setSeeCompleted] = useState(false);
  const { data, isLoading, error } = useSWR("userTodos", fetcher);

  //

  // If todos are loading
  if (isLoading) {
    return (
      <div className="flex flex-col items-center text-center mt-5">
        <BarLoader color="#36d7b7" />
      </div>
    );
  }
  // If there's an error
  if (error) {
    return (
      <div className="text-center">
        <p>Error getting todos - please try again later</p>
      </div>
    );
  }
  // If successfully loaded
  const completedTodosOnly: Todo[] = [];
  const incompletedTodosOnly: Todo[] = [];
  data?.filter((d: Todo) =>
    d.isCompleted ? completedTodosOnly.push(d) : incompletedTodosOnly.push(d)
  );

  return (
    <>
      <TodoForm />
      <div className="flex flex-col items-center text-center">
        {incompletedTodosOnly.map((d) => (
          <TodoCard data={d} key={d.id} />
        ))}

        {incompletedTodosOnly.length ? (
          ""
        ) : (
          <div className="flex flex-col">
            <Image
              src={"Completed-pana.svg"}
              alt="All tasks completed graphic"
              height={20}
              width={20}
              className="opacity-35 size-[300px] md:size-[400px]"
            />
            <h1>You have no pending todos! Yay!</h1>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center text-center">
        <button
          className="flex flex-row"
          onClick={(e) => {
            setSeeCompleted((prev) => !prev);
          }}
        >
          <MdArrowDropDown size={25} /> Completed todos (
          {completedTodosOnly.length})
        </button>
        {seeCompleted
          ? completedTodosOnly.map((d) => <TodoCard data={d} key={d.id} />)
          : ""}
      </div>
    </>
  );
};

export default TodoOverview;
