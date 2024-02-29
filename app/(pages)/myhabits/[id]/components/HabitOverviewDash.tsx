import { createClient } from "@/utils/supabase/server";
import React from "react";
import HabitActivityCalendar from "./HabitActivityCalendar";
import ActivityCalendar from "react-activity-calendar";
import { add, format, parse, parseISO } from "date-fns";
const arraySort = require("array-sort");

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

  console.log("yaya");
  console.log(props.repeatsDays);

  console.log(habitDoLog ? habitDoLog[0] : "");
  const daysDone: any = [];

  habitDoLog?.forEach((e) => {
    daysDone.push(e.dateDone);
    dates.push({ date: e.dateDone, count: 1, level: 2 });
    let whichItCovers: any = [];
    for (let i = 1; i < props.repeatsDays; i++) {
      whichItCovers.push(format(add(e.dateDone, { days: i }), "yyyy-MM-dd"));
    }
    console.log(whichItCovers);
    console.log("///////");
    whichItCovers.forEach((e: any) => {
      daysDone.includes(e) ? "" : dates.push({ date: e, count: 0, level: 1 });
    });
  });

  arraySort(dates, ["date"]);

  console.log(dates);
  return (
    <div className="border border-black min-w-sm md:min-w-[550px] lg:min-w-[750px] xl:min-w-[1000px]">
      <h1>user: {props.user.id}</h1>
      <h2>ayya</h2>
      <div className="flex flex-col md:flex-row w-full items-center justify-evenly">
        <div className="bg-blue-50 size-64"></div>
        <div className="bg-red-50 size-64">{daysDone.length} Days done</div>
      </div>
      <div
        className="text-center items-center overflow-scroll mix-w-sm pt-5"
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
