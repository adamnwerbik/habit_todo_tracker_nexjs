"use client";
import { add, format, parse } from "date-fns";
import React from "react";
import HabitAdderForm from "./HabitAdderForm";
import useSWR, { useSWRConfig } from "swr";
import { Habit, addAHabitDoLog, fetcher, fetcherHabitDoLog } from "./ServerFns";
import Link from "next/link";
import { BarLoader } from "react-spinners";
import { ImCheckmark } from "react-icons/im";
import { HeaderRow } from "./HabitHeaderRow";
import { HabitRow } from "./HabitRow";

export default function HabitDashboard(props: { startingDate: Date }) {
  const { data, isLoading, error } = useSWR("userHabits", fetcher);
  if (isLoading) {
    return (
      <div className="min-w-96 flex flex-col items-center text-center">
        <HabitAdderForm />
        <HeaderRow startingDate={new Date()} />
        <div className="mt-5">
          <BarLoader color="#36d7b7" />
        </div>
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <div className="min-w-96 flex flex-col items-center text-center">
      <HabitAdderForm />
      <HeaderRow startingDate={props.startingDate} />
      {data.map((e: Habit) => (
        <HabitRow habitData={e} startingDate={props.startingDate} key={e.id} />
      ))}
      {data ? (
        <div>Tip: Click on a habit name to view stats and other info!</div>
      ) : (
        ""
      )}
    </div>
  );
}
