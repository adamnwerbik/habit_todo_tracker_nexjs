"use client";
import React from "react";
import { IoMdAddCircleOutline } from "react-icons/io";

const HabitAdderForm = () => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
      }}
      className="flex flex-row text-center justify-center items-center border-gray-200 border rounded-md bg-gray-200 px-2 shadow-sm hover:bg-gray-300"
    >
      <IoMdAddCircleOutline />
      <p className="ml-2">Add a habit</p>
    </button>
  );
};

export default HabitAdderForm;
