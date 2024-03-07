"use client";
import React, { useState } from "react";
import { deleteAHabitByID } from "../components/ServerFns";
import { useRouter } from "next/navigation";

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
        Delete button
      </button>
    );
  }
};

export default DeleteHabitButton;
