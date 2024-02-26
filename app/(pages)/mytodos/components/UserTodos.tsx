"use client";
import React from "react";
import useSWR from "swr";
import { fetcher } from "./helperFunctions";

const UserTodos = () => {
  const { data, error, isLoading, mutate } = useSWR("userTodos", fetcher);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>Loading todos...</div>;
  return (
    <div>
      <p>hello!</p>
      {data.map((e: any) => {
        return <p>{e.id}</p>;
      })}
      !
    </div>
  );
};

export default UserTodos;
