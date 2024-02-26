"use client";
import React from "react";
import useSWR from "swr";
import { fetcher } from "./helperFunctions";

const UserTodos = () => {
  const { data, error, isLoading } = useSWR("userTodos", fetcher);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>Loading todos...</div>;
  try {
    if (data) {
      return (
        <div>
          <h1>Your data:</h1>
          {data.map((d: any) => (
            <div key={d.id}>
              {d.id} - {d.name} - {d.is_starred ? "****" : ""} - {d.due_date} -{" "}
              {d.due_time}
            </div>
          ))}
        </div>
      );
    }
  } catch (error) {}
};

export default UserTodos;
