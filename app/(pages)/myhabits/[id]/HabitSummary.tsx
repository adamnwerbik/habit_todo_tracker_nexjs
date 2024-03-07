"use client";
import { Habit, fetcherHabitDoLog } from "../components/ServerFns";
import React from "react";
import useSWR from "swr";
import ActivityCal from "./ActivityCal";
import { add, format } from "date-fns";
import { summary } from "date-streaks";
import { Gauge } from "react-circular-gauge";
import { Activity } from "react-activity-calendar";
import HabitEditDeleteBtns from "./HabitEditDeleteBtns";
import dynamic from "next/dynamic";

const DynamicComponent = dynamic(() => import("./ActivityCal"), {
  ssr: false,
});

export default function HabitSummary(props: {
  habitID: number;
  habitData: Habit[];
}) {
  const { data, isLoading, mutate } = useSWR(
    `${props.habitID}`,
    fetcherHabitDoLog
  );
  var arraySort = require("array-sort");

  const dates: Activity[] = [
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

  function scoreHabits(dates: Activity[]) {
    const dateToday = format(new Date(), "yyyy-MM-dd");
    const datesInLast7Days: string[] = [];
    const datesInLast30Days: string[] = [];

    for (let i = 1; i < 8; i++) {
      datesInLast7Days.push(format(add(dateToday, { days: -i }), "yyyy-MM-dd"));
    }
    for (let i = 1; i < 31; i++) {
      datesInLast30Days.push(
        format(add(dateToday, { days: -i }), "yyyy-MM-dd")
      );
    }
    let countLast7 = 0;
    let countLast30 = 0;
    dates.forEach((d) => {
      if (datesInLast7Days.includes(d.date)) {
        countLast7++;
      }
      if (datesInLast30Days.includes(d.date)) {
        countLast30++;
      }
    });
    return (countLast30++ / 30 + countLast7 / 7) * 50;
  }

  const summaryOfHabitEntries = summary({ dates: datesActivityDone });
  scoreHabits(dates);
  return (
    <div>
      <h1>Habit: {props.habitData[0].habitName}</h1>
      <HabitEditDeleteBtns id={props.habitID} />
      <div className="flex flex-col md:flex-row justify-evenly items-center md:min-w-[700px] lg:min-w-[800px]">
        <div className="size-48 m-2 rounded-md border-gray-200 border shadow">
          <div className="p-2 items-center flex flex-col">
            <div>
              <h2>Habit Strength</h2>
            </div>
            <div className=" max-w-36 max-h-36 ">
              <Gauge
                value={scoreHabits(dates)}
                minValue={0}
                maxValue={100}
                arcWidth={0.11}
                trackWidth={0.03}
                arcColor={"#358960"}
                trackColor={"#E5E7EB"}
                animated={true}
              />
            </div>
          </div>
        </div>
        <div className="size-48 m-2 rounded-md border-gray-200 border shadow">
          <div className="flex flex-col justify-evenly h-full text-xl">
            <div>
              <span className="font-bold">
                {summaryOfHabitEntries.currentStreak}
              </span>
              {" Current Streak"}
            </div>
            <div>
              <span className="font-bold">
                {summaryOfHabitEntries.longestStreak}
              </span>{" "}
              Longest Streak
            </div>
            <div>
              <span className="font-bold">{dates.length - 2}</span> Days covered
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-hidden mt-4">
        <DynamicComponent dates={dates} />
      </div>
    </div>
  );
}
