"use client";
import toast from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSWRConfig } from "swr";
import useSWR from "swr";
import { useEffect } from "react";
import { addTodoToSB, customfn, fetcher } from "./helperFunctions";

const TodoForm = (props: any) => {
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
        optimisticData: [
          ...data,
          {
            name: formInputs.taskName,
            details: formInputs.taskDetails,
            due_date: formInputs.dueDate,
            due_time: formInputs.dueTime,
            is_starred: formInputs.isStarred,
          },
        ],
        rollbackOnError: true,
        populateCache: true,
        revalidate: false,
      });
      toast.success("Successfully added!");
    } catch (error) {
      toast.error("eeee");
      console.log(error);
    }
  };
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <label>Task (required): </label>
      <input
        {...register("taskName", { required: true })}
        placeholder="Task title..."
      />
      {errors.taskName && (
        <p role="alert" className="text-red-400">
          {"⚠️ A title is required."}
        </p>
      )}
      <label>Details (optional):</label>
      <input {...register("taskDetails")} placeholder="Details (optional)" />
      <label>Due Date (optional):</label>
      <input {...register("dueDate", { min: "2024-01-02" })} type="date" />
      {errors.dueDate && (
        <p role="alert" className="text-red-400">
          {"⚠️ Date must be after Jan 1, 2024"}
        </p>
      )}
      <label>Due Time (optional):</label>
      <input {...register("dueTime")} type="time" />
      <label>Importance (optional):</label>
      <select {...register("isStarred")}>
        <option value="false">Normal</option>
        <option value="true">High</option>
      </select>
      <input type="submit" className="bg-red-300 p-2 mt-5" />
    </form>
  );
};
export default TodoForm;
