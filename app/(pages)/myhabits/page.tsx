"use client";

import useSWR from "swr";
import { fetchHabits, fetchLogData } from "./Fns";

const page = () => {
  const { data: habits } = useSWR("habits", fetchHabits);
  const { data: log } = useSWR("log", fetchLogData);
  return (
    <div className="flex flex-row">
      <h1>Page</h1>
      <div className="bg-blue-100">
        {habits ? habits.map((h) => <div>{h.habitName}</div>) : "N"}
      </div>
      <div className="bg-red-100">
        {log ? log.map((h) => <div>yaya</div>) : "N"}
      </div>
    </div>
  );
};

export default page;
