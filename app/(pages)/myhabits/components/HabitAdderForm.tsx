"use client";
import toast from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSWRConfig } from "swr";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { MdOutlineAddTask } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";
import { addANewHabitToSB } from "./serverFunctions";

const fetcher = async () => "a";

const HabitAdderForm = (props: any) => {
  const [wantsToAddHabbit, setWantsToAddHabbit] = useState(false);
  const [habbitName, setHabbitName] = useState("");
  const { mutate } = useSWRConfig();
  const { data } = useSWR("userHabits");
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

  const onSubmit: SubmitHandler<Inputs> = async (formInputs) => {
    try {
      setWantsToAddHabbit(false);
      console.log(formInputs);
      addANewHabitToSB(formInputs);

      toast.success("Successfully added!");
    } catch (error) {
      toast.error("Error adding habit. Please try again.");
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
      {wantsToAddHabbit ? (
        <>
          <button
            className="bg-[#358960] text-white font-bold px-2 rounded-md text-center hover:bg-[#2a6d4c] "
            onClick={(e) => {
              setWantsToAddHabbit(false);
            }}
          >
            <IoCloseOutline size={25} />
          </button>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col max-w-sm"
          >
            <input
              {...register("habitName", { required: true })}
              placeholder="Habit name..."
              onChange={(e) => {
                setHabbitName(e.target.value);
              }}
            />

            {errors.habitName && (
              <p role="alert" className="text-red-400">
                {"⚠️ A name is required."}
              </p>
            )}

            <input
              {...register("habitDetails")}
              placeholder="Details (optional)"
            />

            <div className="flex flex-row">
              <label>{"Repeats every "}</label>
              <input
                {...register("repeatsEveryXdays", { min: 1, max: 365 })}
                type="number"
                className="w-10 ml-2"
                placeholder={"1"}
              ></input>

              <label>days (default daily=1)</label>
            </div>
            {errors.repeatsEveryXdays && (
              <p role="alert" className="text-red-400">
                {"⚠️ Enter a number between 1 and 365."}
              </p>
            )}

            {habbitName ? (
              <input
                type="submit"
                className="bg-[#358960] p-2 mt-1 rounded-sm hover:bg-[#2a6d4c] text-white"
              />
            ) : (
              <input
                type="submit"
                className="bg-[#363737] p-2 mt-1 rounded-sm hover:bg-[#2a6d4c] text-white"
              />
            )}
          </form>
        </>
      ) : (
        <button
          onClick={(e) => setWantsToAddHabbit(true)}
          className="flex flex-row text-center justify-center items-center border-gray-200 border rounded-md bg-gray-200 px-2 shadow-sm hover:bg-gray-300"
        >
          <MdOutlineAddTask /> <p className="ml-2">Add a habit!</p>
        </button>
      )}
    </>
  );
};
export default HabitAdderForm;
