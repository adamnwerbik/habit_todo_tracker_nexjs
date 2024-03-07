"use client";
import React, { useState } from "react";
import { deleteAHabitByID } from "../components/ServerFns";
import { useRouter } from "next/navigation";
import { MdDeleteOutline } from "react-icons/md";

const DeleteHabitButton = (props: { id: number }) => {
  const router = useRouter();
  const [wantsToDelete, setWantsToDelete] = useState(false);
  if (wantsToDelete) {
    return (
      <button
        className="border border-gray-200 w-[150px] mx-2 rounded-md hover:bg-gray-100"
        onClick={async (e) => {
          await deleteAHabitByID(props.id);
          router.push("/myhabits");
        }}
      >
        Click to delete
      </button>
    );
  } else {
    return (
      <button
        className="border border-gray-200 w-[120px] mx-2 rounded-md hover:bg-gray-100"
        onClick={(e) => {
          setWantsToDelete(true);
        }}
      >
        <div className="flex flex-row items-center justify-center">
          <MdDeleteOutline size={20} />
          <p className="ml-1">Edit Habit</p>
        </div>
      </button>
    );
  }
};

export default DeleteHabitButton;
