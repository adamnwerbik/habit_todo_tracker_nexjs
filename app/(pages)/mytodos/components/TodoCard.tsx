import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { RiCheckboxBlankCircleLine } from "react-icons/ri";
import { RiCheckboxCircleLine } from "react-icons/ri";

import { GoStar, GoStarFill } from "react-icons/go";
import {
  deleteATaskFromSB,
  markATaskAsCompleteSB,
  markATaskAsFavouriteSB,
  markATaskAsUnCompleteSB,
  markATaskAsUnFavouriteSB,
  todo,
} from "./helperFunctions";
import useSWR, { useSWRConfig } from "swr";
import toast from "react-hot-toast";
import { parse, format } from "date-fns";

function TodoCard(props: any) {
  const today = new Date();
  const date = today.getDate();
  const { mutate } = useSWRConfig();
  const { data } = useSWR("userTodos");

  async function handleDeleteClick() {
    try {
      await mutate("userTodos", deleteATaskFromSB(props.data.id), {
        optimisticData: data.filter((d: todo) =>
          d.id == props.data.id ? false : true
        ),
        rollbackOnError: true,
      });
      toast.success("Successfully deleted");
    } catch (error) {
      toast.error("Something went wrong deleting task");
    }
  }

  async function handleClickToComplete() {
    try {
      await mutate("userTodos", markATaskAsCompleteSB(props.data.id), {
        optimisticData: data.filter((d: todo) =>
          d.id == props.data.id ? false : true
        ),
        rollbackOnError: true,
        revalidate: true,
      });
      toast.success("Completed!");
    } catch (error) {
      toast.error("Something went wrong deleting task");
    }
  }
  async function handleClickToUnComplete() {
    try {
      await mutate("userTodos", markATaskAsUnCompleteSB(props.data.id), {
        optimisticData: data.filter((d: todo) =>
          d.id == props.data.id ? false : true
        ),
        rollbackOnError: true,
        revalidate: true,
      });
      toast.success("Marked not complete!");
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  async function handleClickToFavourite() {
    try {
      await mutate("userTodos", markATaskAsFavouriteSB(props.data.id), {
        optimisticData: data.filter((d: todo) =>
          d.id == props.data.id ? false : true
        ),
        rollbackOnError: true,
        revalidate: true,
      });
      toast.success("Starred!");
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  async function handleClickToUnFavourite() {
    try {
      await mutate("userTodos", markATaskAsUnFavouriteSB(props.data.id), {
        optimisticData: data.filter((d: todo) =>
          d.id == props.data.id ? false : true
        ),
        rollbackOnError: true,
        revalidate: true,
      });
      toast.success("Unstarred!");
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="overflow-hidden max-w-sm min-w-96 min-h-16 m-2 flex flex-row bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <div className="bg-white w-2/12 items-center flex justify-center">
        {props.data.isCompleted ? (
          <RiCheckboxCircleLine onClick={(e) => handleClickToUnComplete()} />
        ) : (
          <RiCheckboxBlankCircleLine onClick={(e) => handleClickToComplete()} />
        )}
      </div>
      <div className="bg-white w-8/12 flex flex-col text-center justify-center">
        <h3 className="font-medium">{props.data.name}</h3>
        <p className="italic">{props.data.details}</p>
        <p>
          {props.data.due_date
            ? props.data.due_time
              ? `Due by ${format(props.data.due_date, "do MMM yyyy")} at ${
                  props.data.due_time
                }`
              : `Due by ${format(props.data.due_date, "do MMM yyyy")}`
            : ""}
        </p>
      </div>
      <div className="bg-white w-2/12 items-center flex flex-col justify-center">
        {props.data.is_starred ? (
          <GoStarFill
            className="m-auto"
            fill="orange"
            onClick={(e) => handleClickToUnFavourite()}
          />
        ) : (
          <GoStar
            className="m-auto"
            onClick={(e) => handleClickToFavourite()}
          />
        )}
        <AiOutlineDelete
          className="m-auto"
          onClick={(e) => handleDeleteClick()}
        />
      </div>
    </div>
  );
}

export default TodoCard;
