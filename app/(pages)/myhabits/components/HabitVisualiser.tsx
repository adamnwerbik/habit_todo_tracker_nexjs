"use client";
import React from "react";
import { Habit } from "./helperFunctions";
import { add, format } from "date-fns";

const HabitVisualiser = (props: any) => {
  const data = props.data;
  const dates = [];
  for (let i = 6; i > -1; i--) {
    dates.push(add(new Date(), { days: -i }));
  }
  return (
    <div className="flex flex-col">
      <div className="flex flex-row ">
        <div className="w-24 bg-purple-400 justify-center text-center ">
          Habit Name
        </div>
        <div className="w-96 bg-yellow-400 flex flex-row  ">
          {dates.map((d) => {
            return (
              <div
                className="w-1/6 text-center border border-black"
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
      <div className="flex flex-row ">
        <div className="w-24 bg-purple-400 justify-center text-center ">
          Habit Name
        </div>
        <div className="w-96 bg-yellow-400 flex flex-row  ">
          {dates.map((d) => {
            return (
              <div
                className="w-1/6 text-center border border-black"
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
      <div className="flex flex-row ">
        <div className="w-24 bg-purple-400 justify-center text-center ">
          Habit Name
        </div>
        <div className="w-96 bg-yellow-400 flex flex-row  ">
          {dates.map((d) => {
            return (
              <div
                className="w-1/6 text-center border border-black"
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
      <div className="flex flex-row ">
        <div className="w-24 bg-purple-400 justify-center text-center ">
          Habit Name
        </div>
        <div className="w-96 bg-yellow-400 flex flex-row  ">
          {dates.map((d) => {
            return (
              <div
                className="w-1/6 text-center border border-black"
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

export default HabitVisualiser;
