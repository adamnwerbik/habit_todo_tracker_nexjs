"use client";
import { add, format } from "date-fns";
import React, { useState } from "react";

export const HabitHeader = (props: any) => {
  const dates = [];
  for (let i = 0; i < 7; i++) {
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
              <div
                className="w-[100%] text-center border border-gray-400"
                data-day={d}
                onClick={(e) => {
                  console.log(e.currentTarget.getAttribute("data-day"));
                }}
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

export const HabitRow = (props: {
  habitName: string;
  habitID: number;
  startingDate: Date;
}) => {
  const dates = [0, 1, 2, 3, 4, 5, 6];
  return (
    <div className="flex flex-col">
      <div className="flex flex-row ">
        <div className="w-24 bg-gray-300 justify-center text-center border-gray-400 border ">
          {props.habitName}
        </div>
        <div className="w-72 md:w-[500px] lg:w-[700px] xl:w-[750px] bg-gray-200 flex flex-row rounded-sm">
          {dates.map((d) => {
            return (
              <HabitCell
                date={add(props.startingDate, { days: -d })}
                habitID={props.habitID}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const HabitCell = (props: { date: Date; habitID: number }) => {
  const [checkedOff, setCheckedOff] = useState(false);
  return (
    <div
      className="w-[100%] min-w-[1/7] text-center border border-gray-400"
      data-day={props.date}
      onClick={(e) => {
        console.log(
          `${e.currentTarget.getAttribute("data-day")} for habitID ${
            props.habitID
          } `
        );
        setCheckedOff((prev) => !prev);
      }}
    >
      {checkedOff ? "Y" : "N"}
    </div>
  );
};
