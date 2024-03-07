"use client";
import React, { useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import DeleteHabitButton from "./DeleteHabitButton";
import EditHabitButton from "./EditHabitButton";

function HabitEditDeleteBtns(props: { id: number }) {
  return (
    <div className="flex flex-col  items-center justify-center">
      <DeleteHabitButton id={props.id} />
      <EditHabitButton id={props.id} />
    </div>
  );
}

export default HabitEditDeleteBtns;
