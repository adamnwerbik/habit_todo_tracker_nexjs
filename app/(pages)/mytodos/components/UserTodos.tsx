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
            <p>
              {d.id} - {d.name}{" "}
            </p>
          ))}
        </div>
      );
    }
  } catch (error) {}
};

export default UserTodos;
