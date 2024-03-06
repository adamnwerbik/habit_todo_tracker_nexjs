import React from "react";
import HabitCell from "./HabitCell";

export default function HabitRow(props: {
  habitID: number;
  allHabitData: any[];
  allHabitLogData: any[]; //for now
}) {
  return (
    <div className="flex flex-col ">
      <div className="flex flex-row ">
        <div className="w-24 justify-center text-center bg-gray-300 border-gray-400 border">
          {props.habitID}
        </div>
        <div className="w-72 md:w-[500px] lg:w-[700px] xl:w-[750px] bg-gray-300 flex flex-row">
          <HabitCell />
          <HabitCell />
          <HabitCell />
          <HabitCell />
          <HabitCell />
          <HabitCell />
          <HabitCell />
        </div>
      </div>
    </div>
  );
}
