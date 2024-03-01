import { createClient } from "@/utils/supabase/server";
import React from "react";
import HabitActivityCalendar from "./HabitActivityCalendar";
import ActivityCalendar from "react-activity-calendar";
import { add, format, parse, parseISO } from "date-fns";
const arraySort = require("array-sort");
import { summary } from "date-streaks";
import Gauge from "./Gauge";

const HabitOverviewDash = async (props: any) => {
  const sb = createClient();

  let { data: habitDoLog, error } = await sb
    .from("habitDoLog")
    .select("*")
    .eq("habitDoneFK", props.habitID);

  let { data: habits } = await sb
    .from("habits")
    .select("*")
    .eq("id", props.habitID);

  const dates = [
    { date: "2024-01-01", count: 0, level: 0 },
    { date: "2024-12-31", count: 0, level: 0 },
  ];

  const datesActivityDone: string[] = [];
  habitDoLog?.forEach((e) => {
    dates.push({ date: e.dateDone, count: 1, level: 2 });
    datesActivityDone.push(e.dateDone);
  });
  habitDoLog?.forEach((e) => {
    for (let i = 1; i < props.repeatsDays; i++) {
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
    <div className=" min-w-sm md:min-w-[550px] lg:min-w-[750px] xl:min-w-[1000px]">
      <h1>user: {props.user.id}</h1>
      <h2>ayya</h2>
      <div className="flex flex-col md:flex-row w-full items-center justify-evenly  text-center">
        <div className="size-64 rounded-md border border-gray-300 shadow-sm bg-gray-50 ">
          <div className="mt-7 mx-10">
            <Gauge value={96} />
          </div>
          <h1>Habit Strength</h1>
        </div>
        <div className="size-64 rounded-md border border-gray-300 shadow-sm justify-evenly flex flex-col text-center bg-gray-50">
          <h1>
            <span className="font-bold">
              {summaryOfHabitEntries.currentStreak}{" "}
            </span>
            Current Streak
          </h1>
          <h1>
            <span className="font-bold">
              {summaryOfHabitEntries.longestStreak}
            </span>{" "}
            Longest Streak
          </h1>
          <h1>
            <span className="font-bold">{dates.length - 2}</span> Dates Covered
          </h1>
        </div>
      </div>
      <div
        className="text-center items-center overflow-scroll pt-5  max-w-sm md:max-w-[550px] lg:max-w-[750px] xl:max-w-[1000px]"
        style={{ scrollbarWidth: "none" }}
      >
        <ActivityCalendar
          weekStart={1}
          maxLevel={2}
          hideColorLegend={true}
          hideTotalCount={false}
          showWeekdayLabels={true}
          data={dates}
          theme={{
            light: ["hsl(0, 0%, 92%)", "rgb(37,95,67)"],
            dark: ["#333", "rgb(214, 16, 174)"],
          }}
        />
      </div>
    </div>
  );
};

export default HabitOverviewDash;
