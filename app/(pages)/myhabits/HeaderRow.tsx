import { add, format } from "date-fns";
import React from "react";

export default function HeaderRow(props: { startingDate: Date }) {
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
                key={`header-${d}`}
              >
                {format(d, "EEE MMM dd")}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
