"use client";
import React, { useState } from "react";
import useSWR from "swr";
import { fetcher, todo } from "./helperFunctions";
import { ClipLoader } from "react-spinners";
import TodoCard from "./TodoCard";
import { MdArrowDropDown } from "react-icons/md";

const UserTodos = () => {
  const { data, error, isLoading } = useSWR("userTodos", fetcher);
  const [viewCompleted, setViewCompleted] = useState(false);

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
      const notCompletedTasksData = data.filter((d: todo) =>
        d.isCompleted ? false : true
      );
      const completedTasksData = data.filter((d: todo) =>
        d.isCompleted ? true : false
      );
      return (
        <div>
          <h1>Your todos:</h1>

          {notCompletedTasksData.map((d: any) => (
            <TodoCard data={d} />
          ))}

          <div>
            <div className="flex flex-row">
              <button
                onClick={(e) => {
                  setViewCompleted(!viewCompleted);
                }}
              >
                <MdArrowDropDown size={25} />
              </button>
              <p>Completed todos ({completedTasksData.length})</p>
            </div>
            {viewCompleted ? (
              <div>
                {completedTasksData.map((d: todo) => (
                  <TodoCard data={d} />
                ))}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      );
    }
  } catch (error) {}
};

export default UserTodos;
