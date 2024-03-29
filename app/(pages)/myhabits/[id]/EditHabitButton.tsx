"use client";
import React, { useState } from "react";
import HabitEditForm from "./HabitEditForm";
import { MdOutlineModeEdit } from "react-icons/md";

const EditHabitButton = (props: { id: number }) => {
  const [wantsToEdit, setWantsToEdit] = useState(false);
  return wantsToEdit ? (
    <HabitEditForm id={props.id} onCancel={(e) => setWantsToEdit(false)} />
  ) : (
    <button
      className="border border-gray-200 w-[120px] rounded-md hover:bg-gray-100"
      onClick={(e) => {
        setWantsToEdit(true);
        console.log("edit");
      }}
    >
      <div className="flex flex-row items-center justify-center">
        <MdOutlineModeEdit size={20} />
        <p className="ml-1">Edit</p>
      </div>
    </button>
  );
};

export default EditHabitButton;
