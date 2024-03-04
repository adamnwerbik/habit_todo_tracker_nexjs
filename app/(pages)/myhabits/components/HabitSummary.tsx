"use client";
import { Habit, fetcherHabitDoLog } from "./ServerFns";
import React from "react";
import ActivityCalendar from "react-activity-calendar";
import useSWR from "swr";

export default function HabitSummary(props: {
  habitID: number;
  habitName: string | null;
}) {
  const { data, isLoading, mutate } = useSWR(
    `${props.habitID}`,
    fetcherHabitDoLog
  );

  return (
    <div>
      <h1>Summary: {props.habitName}</h1>
      <div className="flex flex-col md:flex-row justify-evenly items-center md:min-w-[700px] lg:min-w-[800px]">
        <div className="size-48 m-2 rounded-md border-gray-200 border shadow">
          GRAPH
        </div>
        <div className="size-48 m-2 rounded-md border-gray-200 border shadow">
          STATS
        </div>
      </div>
      <div className="overflow-hidden mt-4">
        <ActivityCalendar
          data={[
            { date: "2024-01-01", count: 1, level: 1 },
            { date: "2024-12-31", count: 1, level: 1 },
          ]}
        />
      </div>
    </div>
  );
}
