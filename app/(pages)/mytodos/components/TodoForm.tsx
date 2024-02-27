"use client";
import toast from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSWRConfig } from "swr";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { addTodoToSB, fetcher, sortByFavThenTime2 } from "./helperFunctions";
import { MdOutlineAddTask } from "react-icons/md";

const TodoForm = (props: any) => {
  const [wantsToAddTask, setWantsToAddTask] = useState(false);
  const [taskName, setTaskName] = useState("");
  const { mutate } = useSWRConfig();
  const { data } = useSWR("userTodos");
  //Form Stuff
  type Inputs = {
    taskName: string;
    taskDetails: string;
    dueDate: string;
    dueTime: string;
    isStarred: boolean;
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (formInputs) => {
    try {
      console.log(formInputs);
      await mutate("userTodos", addTodoToSB(formInputs), {
        optimisticData: sortByFavThenTime2([
          ...data,
          {
            name: formInputs.taskName,
            details: formInputs.taskDetails,
            due_date: formInputs.dueDate,
            due_time: formInputs.dueTime,
            is_starred: formInputs.isStarred,
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
            className="bg-red-400 text-white font-bold px-2 rounded-md text-center "
            onClick={(e) => {
              setWantsToAddTask(false);
            }}
          >
            X
          </button>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col max-w-sm"
          >
            <input
              {...register("taskName", { required: true })}
              placeholder="Task title..."
              onChange={(e) => {
                setTaskName(e.target.value);
              }}
            />

            {errors.taskName && (
              <p role="alert" className="text-red-400">
                {"⚠️ A title is required."}
              </p>
            )}

            <input
              {...register("taskDetails")}
              placeholder="Details (optional)"
            />

            <input
              {...register("dueDate", { min: "2024-01-02" })}
              type="date"
            />
            {errors.dueDate && (
              <p role="alert" className="text-red-400">
                {"⚠️ Date must be after Jan 1, 2024"}
              </p>
            )}

            <input {...register("dueTime")} type="time" />
            <label>Importance (optional):</label>
            <select {...register("isStarred")}>
              <option value="false">Normal</option>
              <option value="true">High</option>
            </select>
            {taskName ? (
              <input type="submit" className="bg-red-300 p-2 mt-5" />
            ) : (
              ""
            )}
          </form>
        </>
      ) : (
        <button
          onClick={(e) => setWantsToAddTask(true)}
          className="flex flex-row text-center justify-center items-center"
        >
          <MdOutlineAddTask /> <p className="ml-2">Add a task</p>
        </button>
      )}
    </>
  );
};
export default TodoForm;
