"use client";
import toast from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSWRConfig } from "swr";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { MdOutlineAddTask } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";
import { SortByStarThenDateDueThenTime } from "./TodoCard";
import { addATaskToSB } from "./serverFns";
import { Todo } from "./TodoOverview";

const TodoForm = (props: any) => {
  const [wantsToAddTask, setWantsToAddTask] = useState(false);
  const [taskName, setTaskName] = useState("");
  const { mutate } = useSWRConfig();
  const { data } = useSWR("userTodos");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<Todo>();
  const onSubmit: SubmitHandler<Todo> = async (formInputs) => {
    try {
      setWantsToAddTask(false);
      console.log("FORM INPUTS BELOW");
      console.log(formInputs);
      await mutate("userTodos", addATaskToSB(formInputs), {
        optimisticData: SortByStarThenDateDueThenTime([
          ...data,
          {
            todoName: formInputs.todoName,
            todoDetails: formInputs.todoDetails,
            isStarred: formInputs.isStarred ? true : false,
            dateDue: formInputs.dateDue,
            timeDue: formInputs.timeDue,
          },
        ]),
        rollbackOnError: true,
        populateCache: true,
        revalidate: false,
      });
      toast.success("Successfully added!");
    } catch (error) {
      toast.error("Error adding todo. Please try again.");
      console.log(error);
    }
  };
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <>
      {wantsToAddTask ? (
        <>
          <button
            className="bg-[#358960] text-white font-bold px-2 rounded-md text-center hover:bg-[#2a6d4c] "
            onClick={(e) => {
              setWantsToAddTask(false);
            }}
          >
            <IoCloseOutline size={25} />
          </button>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col max-w-sm"
          >
            <input
              {...register("todoName", { required: true })}
              placeholder="Task title..."
              onChange={(e) => {
                setTaskName(e.target.value);
              }}
            />

            {errors.todoName && (
              <p role="alert" className="text-red-400">
                {"⚠️ A title is required."}
              </p>
            )}

            <input
              {...register("todoDetails")}
              placeholder="Details (optional)"
            />

            <input
              {...register("dateDue", { min: "2024-01-02" })}
              type="date"
            />
            {errors.dateDue && (
              <p role="alert" className="text-red-400">
                {"⚠️ Date must be after Jan 1, 2024"}
              </p>
            )}

            <input {...register("timeDue")} type="time" />
            <label>Importance (optional):</label>
            <select {...register("isStarred")}>
              <option value="">Normal</option>
              <option value="true">High ⭐</option>
            </select>
            {taskName ? (
              <input
                type="submit"
                className="bg-[#358960] p-2 mt-5 rounded-sm hover:bg-[#2a6d4c] text-white"
              />
            ) : (
              ""
            )}
          </form>
        </>
      ) : (
        <button
          onClick={(e) => setWantsToAddTask(true)}
          className="flex flex-row text-center justify-center items-center border-gray-200 border rounded-md bg-gray-200 px-2 shadow-sm hover:bg-gray-300"
        >
          <MdOutlineAddTask /> <p className="ml-2">Add a task</p>
        </button>
      )}
    </>
  );
};
export default TodoForm;
