"use client";
import { MouseEventHandler, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useSWR from "swr";
import { Habit, fetcher } from "../components/ServerFns";

const HabitEditForm = (props: {
  id: number;
  onCancel: MouseEventHandler<HTMLButtonElement>;
}) => {
  //Form Stuff
  type Inputs = {
    habitName: string;
    habitDetails: string;
    repeatsEveryXdays: number;
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<Inputs>();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      props.onCancel;
    }
  }, [isSubmitSuccessful, reset]);
  const onSubmit: SubmitHandler<Inputs> = async (formInputs) => {
    try {
      console.log(formInputs);
      reset();
      //mutate habit data swr
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);
  console.log(props.id);
  const { data: existingData } = useSWR("userHabits", fetcher);
  console.log(existingData);
  const existingHabitData = existingData?.filter(
    (d: Habit) => d.id == props.id
  );
  console.log(existingHabitData);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col max-w-sm">
      <button
        className="border border-gray-200 hover:bg-gray-100"
        onClick={props.onCancel}
      >
        Cancel
      </button>
      <input
        {...register("habitName", { required: true })}
        placeholder={
          existingHabitData ? existingHabitData[0].habitName : "Habit Name"
        }
      />
      {errors.habitName && (
        <p role="alert" className="text-red-400">
          {"⚠️ A name is required."}
        </p>
      )}
      <input
        {...register("habitDetails")}
        placeholder={
          existingHabitData
            ? existingHabitData[0].habitDetails.length > 2
              ? existingHabitData[0].habitDetails
              : "Habit Details"
            : "Habit Details"
        }
      />
      <div className="flex flex-row">
        <label>{"Repeats every "}</label>
        <input
          {...register("repeatsEveryXdays", { min: 1, max: 365 })}
          type="number"
          className="w-10 ml-2"
          placeholder={
            existingHabitData ? existingHabitData[0].repeatsEveryXdays : 1
          }
        ></input>

        <label>days (default daily=1)</label>
      </div>
      {errors.repeatsEveryXdays && (
        <p role="alert" className="text-red-400">
          {"⚠️ Enter a number between 1 and 365."}
        </p>
      )}
      <button
        className="border border-gray-200 hover:bg-gray-100"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};
export default HabitEditForm;
