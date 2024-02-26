"use client";

import { useSWRConfig } from "swr";
import React from "react";

const TodoForm = () => {
  const { mutate } = useSWRConfig();
  return (
    <div>
      <button
        className="p-3 bg-red-200"
        onClick={(e) => {
          mutate("userTodos", []);
          //console.log("yaya");
        }}
      >
        CLICK
      </button>
    </div>
  );
};

export default TodoForm;
