"use client";
import { add, format } from "date-fns";
import React from "react";
import HabitAdderForm from "./HabitAdderForm";
import useSWR, { useSWRConfig } from "swr";
import { Habit, fetcher } from "./ServerFns";

export const HeaderRow = (props: { startingDate: Date }) => {
  const dates = [];
  for (let i = 6; i > -1; i--) {
    dates.push(add(props.startingDate, { days: -i }));
  }
  return (
    <div className="flex flex-col mt-2">
      <div className="flex flex-row ">
        <div className="w-24 justify-center text-center bg-gray-300 border-gray-400 border">
          Habit Name
        </div>
        <div className="w-72 md:w-[500px] lg:w-[700px] xl:w-[750px] bg-gray-300 flex flex-row">
          {dates.map((d) => {
            return (
              <div
                className="w-[100%] text-center border border-gray-400"
                data-day={d}
              >
                {format(d, "EEE MMM dd")}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const HabitCell = (props: {
  dateForCell: Date;
  habitID: number;
  covered: boolean;
  checked: boolean;
}) => {
  function getBackGroundColour() {
    return props.covered ? "#90EE90" : "#FFFFFF";
  }
  const { mutate } = useSWRConfig();
  const { data } = useSWR(`${props.habitID}`);
  return <div>yaya</div>;
};

export function HabitRow(props: { habitData: Habit; startingDate: Date }) {
  const dates = [];
  for (let i = 6; i > -1; i--) {
    dates.push(add(props.startingDate, { days: -i }));
  }
  return (
    <div className="flex flex-col">
      <div className="flex flex-row ">
        <div className="w-24 justify-center text-center bg-gray-300 border-gray-400 border">
          Habit Name
        </div>
        <div className="w-72 md:w-[500px] lg:w-[700px] xl:w-[750px] bg-gray-300 flex flex-row">
          {dates.map((d) => {
            return (
              <HabitCell
                className="w-[100%] text-center border border-gray-400"
                data-day={d}
              >
                {format(d, "EEE MMM dd")}
              </HabitCell>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function HabitDashboard(props: { startingDate: Date }) {
  const { data, isLoading, error } = useSWR("userHabits", fetcher);
  if (isLoading) {
    return (
      <div className="min-w-96 flex flex-col items-center text-center">
        <h1>Habit Dashboard</h1>
        <HabitAdderForm />
        <HeaderRow startingDate={new Date()} />
        Loading habits...
      </div>
    );
  }
  return (
    <div className="min-w-96 flex flex-col items-center text-center">
      <h1>Habit Dashboard</h1>
      <HabitAdderForm />
      <HeaderRow startingDate={props.startingDate} />
      {data.map((e: Habit) => (
        <HabitRow habitData={e} startingDate={props.startingDate} />
      ))}
    </div>
  );
}
