"use client";

import useSWR from "swr";
import { fetchHabits, fetchLogData } from "./Fns";
import HeaderRow from "./HeaderRow";
import HabitRow from "./HabitRow";

const page = () => {
  const { data: habits, error: habbitError } = useSWR("habits", fetchHabits);
  const { data: log, error: logError } = useSWR("allUserLogs", fetchLogData);

  if (habits && log) {
    const habitIDs = new Set();
    habits.map((h: any) => habitIDs.add(h.id));

    return (
      <>
        <h1>Your habits </h1>

        <HeaderRow startingDate={new Date()} />
        {Array.from(habitIDs).map((h: any) => (
          <HabitRow habitID={h} allHabitData={habits} allHabitLogData={log} />
        ))}
      </>
    );
  }
};

export default page;
