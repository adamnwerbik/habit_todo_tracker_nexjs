import React from "react";
import { Todo } from "./TodoOverview";
import { format } from "date-fns";
import { AiOutlineDelete } from "react-icons/ai";
import {
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleLine,
  RiCheckboxCircleFill,
} from "react-icons/ri";
import { GoStar, GoStarFill } from "react-icons/go";
import useSWR, { useSWRConfig } from "swr";
import { createClient } from "@/utils/supabase/client";
import {
  deleteATodoFromSB,
  setATodoAsComplete,
  setATodoAsFavourite,
  setATodoAsUnComplete,
  setATodoAsUnFavourite,
} from "./serverFns";
import toast from "react-hot-toast";
const arraySort = require("array-sort");

export function SortByStarThenDateDueThenTime(data: Todo[] | null) {
  arraySort(data, ["timeDue"]);
  arraySort(data, ["dateDue"]);
  return arraySort(data, ["isStarred"], { reverse: true });
}

const TodoCard = (props: { data: Todo }) => {
  const { data } = useSWR("userTodos");
  const { mutate } = useSWRConfig();

  //Works as expected wrt optimistic UI
  async function handleDeleteClick() {
    try {
      await mutate("userTodos", deleteATodoFromSB(props.data.id), {
        optimisticData: data.filter((d: Todo) =>
          d.id == props.data.id ? false : true
        ),
        rollbackOnError: true,
        revalidate: true,
      });
      toast.success("Task deleted!");
    } catch (error) {
      toast.error("There was an error. Try again.");
    }
  }

  //Works as expected wrt optimistic UI
  async function handleClickToUnComplete() {
    try {
      await mutate("userTodos", setATodoAsUnComplete(props.data.id), {
        optimisticData: SortByStarThenDateDueThenTime([
          ...data.filter((d: Todo) => (d.id == props.data.id ? false : true)),
          {
            todoName: props.data.todoName,
            isStarred: props.data.isStarred,
            todoDetails: props.data.todoDetails,
            isCompleted: false,
            dateDue: props.data.dateDue,
            timeDue: props.data.timeDue,
          },
        ]),
        rollbackOnError: true,
        revalidate: true,
      });
      toast.success("Task mark incomplete!");
    } catch (error) {
      toast.error("There was an error. Try again.");
    }
  }

  //Works as expected wrt optimistic UI
  async function handleClickToComplete() {
    try {
      await mutate("userTodos", setATodoAsComplete(props.data.id), {
        optimisticData: SortByStarThenDateDueThenTime([
          ...data.filter((d: Todo) => (d.id == props.data.id ? false : true)),
          {
            todoName: props.data.todoName,
            isStarred: props.data.isStarred,
            todoDetails: props.data.todoDetails,
            isCompleted: true,
            dateDue: props.data.dateDue,
            timeDue: props.data.timeDue,
          },
        ]),
        rollbackOnError: true,
        revalidate: true,
      });
      toast.success("Task mark completed!");
    } catch (error) {
      toast.error("There was an error. Try again.");
    }
  }

  //Works as expected wrt optimistic UI
  async function handleClickToUnFavourite() {
    try {
      await mutate("userTodos", setATodoAsUnFavourite(props.data.id), {
        optimisticData: SortByStarThenDateDueThenTime([
          ...data.filter((d: Todo) => (d.id == props.data.id ? false : true)),
          {
            todoName: props.data.todoName,
            isStarred: false,
            todoDetails: props.data.todoDetails,
            isCompleted: props.data.isCompleted,
            dateDue: props.data.dateDue,
            timeDue: props.data.timeDue,
          },
        ]),
        rollbackOnError: true,
        revalidate: true,
      });
      toast.success("Task marked not favourite!");
    } catch (error) {
      toast.error("There was an error. Try again.");
    }
  }
  //Works as expected wrt optimistic UI
  async function handleClickToFavourite() {
    try {
      await mutate("userTodos", setATodoAsFavourite(props.data.id), {
        optimisticData: SortByStarThenDateDueThenTime([
          ...data.filter((d: Todo) => (d.id == props.data.id ? false : true)),
          {
            todoName: props.data.todoName,
            isStarred: true,
            todoDetails: props.data.todoDetails,
            isCompleted: props.data.isCompleted,
            dateDue: props.data.dateDue,
            timeDue: props.data.timeDue,
          },
        ]),
        rollbackOnError: true,
        revalidate: true,
      });
      toast.success("Task marked favourite!");
    } catch (error) {
      toast.error("There was an error. Try again.");
    }
  }

  return (
    <div className="overflow-hidden max-w-sm min-w-full sm:min-w-96 min-h-16 m-2 flex flex-row bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <div className="bg-white w-2/12 items-center flex justify-center">
        {props.data.isCompleted ? (
          <RiCheckboxCircleFill
            onClick={(e) => handleClickToUnComplete()}
            size={20}
          />
        ) : (
          <RiCheckboxBlankCircleLine
            onClick={(e) => handleClickToComplete()}
            size={20}
          />
        )}
      </div>
      <div className="bg-white w-8/12 flex flex-col text-center justify-center">
        <h3 className="font-medium">{props.data.todoName}</h3>
        <p className="italic">{props.data.todoDetails}</p>
        <p>
          {props.data.dateDue
            ? props.data.timeDue
              ? `Due by ${format(props.data.dateDue, "do MMM yyyy")} at ${
                  props.data.timeDue
                }`
              : `Due by ${format(props.data.dateDue, "do MMM yyyy")}`
            : ""}
        </p>
      </div>
      <div className="bg-white w-2/12 items-center flex flex-col justify-center">
        {props.data.isStarred ? (
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
};

export default TodoCard;
