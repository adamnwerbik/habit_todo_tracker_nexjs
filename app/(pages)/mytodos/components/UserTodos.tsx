"use client";
import React, { useState } from "react";
import useSWR from "swr";
import { fetcher, todo } from "./helperFunctions";
import { ClipLoader } from "react-spinners";
import TodoCard from "./TodoCard";
import { MdArrowDropDown } from "react-icons/md";
import Image from "next/image";

const UserTodos = () => {
  const { data, error, isLoading } = useSWR("userTodos", fetcher);
  const [viewCompleted, setViewCompleted] = useState(false);

  if (error) return <div>failed to load</div>;
  if (isLoading)
    return (
      <div className="items-center text-center py-5">
        <ClipLoader color="#358960" />
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
        <>
          {notCompletedTasksData.length ? (
            notCompletedTasksData.map((d: any) => (
              <TodoCard data={d} key={d.id} />
            ))
          ) : data.length ? (
            <div className="text-center mb-3">
              <Image
                src={"Completed-pana.svg"}
                alt="All tasks completed graphic"
                height={400}
                width={400}
                className="opacity-35"
              />
              <h1>You have no outstanding tasks! Yay!</h1>
            </div>
          ) : (
            <div className="mt-2">
              <p>You have no todos. Add some with the form above!</p>
            </div>
          )}

          <div className="min-w-[400px]">
            <div className="flex flex-row text-left">
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
        </>
      );
    }
  } catch (error) {}
};

export default UserTodos;
