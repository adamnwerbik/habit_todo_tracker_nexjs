"use client";
import React, { useState } from "react";
import useSWR from "swr";
import { fetcher } from "./helperFunctions";
import { ClipLoader } from "react-spinners";
import TodoCard from "./TodoCard";

const UserTodos = () => {
  const { data, error, isLoading } = useSWR("userTodos", fetcher);
  const [viewCompleted, setViewCompleted] = useState(false)

  if (error) return <div>failed to load</div>;
  if (isLoading)
    return (
      <div className="items-center text-center py-5">
        <ClipLoader color="#36d7b7" />
        <p>loading todos....</p>
      </div>
    );
  try {
    if (data) {
      return (
        <div>
          <h1>Your todos:</h1>
          {data.map((d: any) => (
            <TodoCard data={d} />
          ))}

          <div>
            <h1>Completed todos ()</h1>
            {viewCompleted ? <div>"COMP"</div> : }
          </div>
        </div>
      );
    }
  } catch (error) {}
};

export default UserTodos;
