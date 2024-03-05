"use client";
import { Habit, fetcherHabitDoLog } from "../components/ServerFns";
import React from "react";
import useSWR from "swr";
import ActivityCal from "./ActivityCal";
import { add, format } from "date-fns";
import { summary } from "date-streaks";

export default function HabitSummary(props: {
  habitID: number;
  habitData: Habit[];
}) {
  const { data, isLoading, mutate } = useSWR(
    `${props.habitID}`,
    fetcherHabitDoLog
  );
  var arraySort = require("array-sort");

  const dates = [
    { date: "2024-01-01", count: 0, level: 0 },
    { date: "2024-12-31", count: 0, level: 0 },
  ];

  const datesActivityDone: string[] = [];
  data?.forEach((e) => {
    dates.push({ date: e.dateDone, count: 1, level: 2 });
    datesActivityDone.push(e.dateDone);
  });

  data?.forEach((e) => {
    for (let i = 1; i < props.habitData[0].repeatsEveryXdays; i++) {
      let candidateDate = format(add(e.dateDone, { days: i }), "yyyy-MM-dd");
      if (datesActivityDone.includes(candidateDate)) {
        ("");
      } else {
        dates.push({ date: candidateDate, count: 0, level: 1 });
        datesActivityDone.push(candidateDate);
      }
    }
  });

  arraySort(dates, ["date"]);
  arraySort(datesActivityDone, ["date"]);

  const summaryOfHabitEntries = summary({ dates: datesActivityDone });

  return (
    <div>
      <h1>Summary: {props.habitData[0].habitName}</h1>
      <div className="flex flex-col md:flex-row justify-evenly items-center md:min-w-[700px] lg:min-w-[800px]">
        <div className="size-48 m-2 rounded-md border-gray-200 border shadow">
          GRAPH
        </div>
        <div className="size-48 m-2 rounded-md border-gray-200 border shadow">
          <div className="flex flex-col justify-evenly h-full text-xl">
            <div>{summaryOfHabitEntries.currentStreak} Current Streak</div>
            <div>{summaryOfHabitEntries.longestStreak} Longest Streak</div>
            <div>{dates.length - 2} Days covered</div>
          </div>
        </div>
      </div>
      <div className="overflow-hidden mt-4">
        <ActivityCal dates={dates} />
      </div>
    </div>
  );
}
